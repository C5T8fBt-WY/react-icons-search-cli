import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflowPath = path.join(repoDir, ".github", "workflows", "publish.yml");
const workflow = parse(readFileSync(workflowPath, "utf8"));

assert.ok(workflow.on.push.branches.includes("main"));
assert.ok(workflow.on.push["paths-ignore"].includes("**.md"));
assert.equal(workflow.permissions.contents, "read");
assert.equal(workflow.concurrency["cancel-in-progress"], false);

const publishJob = workflow.jobs["version-and-publish"];
assert.match(publishJob.if, /\[skip ci\]/);
assert.equal(publishJob["runs-on"], "ubuntu-latest");
assert.equal(publishJob.permissions.contents, "write");
assert.equal(publishJob.permissions["id-token"], "write");

const checkout = publishJob.steps.find(step => step.uses?.startsWith("actions/checkout@"));
const setupNode = publishJob.steps.find(step => step.uses?.startsWith("actions/setup-node@"));
const version = publishJob.steps.find(step => step.id === "version");
const registry = publishJob.steps.find(step => step.id === "registry");
const updateVersion = publishJob.steps.find(step => step.name === "Update package version");
const verify = publishJob.steps.find(step => step.name === "Verify package");
const commit = publishJob.steps.find(step => step.name === "Commit version and push tag");
const publish = publishJob.steps.find(step => step.name === "Publish to npm");
const release = publishJob.steps.find(step => step.name === "Create GitHub Release");

assert.equal(checkout.uses, "actions/checkout@v6");
assert.equal(checkout.with["fetch-depth"], 0);
assert.equal(setupNode.uses, "actions/setup-node@v6");
assert.equal(setupNode.with["node-version"], "24");
assert.equal(setupNode.with["package-manager-cache"], false);
assert.match(version.run, /git tag -l 'v\*'/);
assert.match(version.run, /parts\[2\] \+ 1/);
assert.match(registry.run, /npm view/);
assert.match(registry.run, /E404/);
assert.match(updateVersion.run, /npm version/);
assert.equal(verify.run, "npm run verify");
assert.match(commit.run, /chore\(release\):/);
assert.match(commit.run, /git push origin "v\$\{version\}"/);
assert.equal(publish.run, "npm publish --provenance");
assert.match(release.run, /gh release create/);
assert.equal(release.env.GH_TOKEN, "${{ github.token }}");
assert.ok(publishJob.steps.indexOf(publish) < publishJob.steps.indexOf(release));

process.stdout.write("npm auto-version release workflow validation passed.\n");
