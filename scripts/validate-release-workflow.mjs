import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflowPath = path.join(repoDir, ".github", "workflows", "publish.yml");
const workflow = parse(readFileSync(workflowPath, "utf8"));

assert.ok(workflow.on.push.branches.includes("main"), "publish workflow must run on pushes to main");
assert.equal(workflow.permissions.contents, "read");

const publishJob = workflow.jobs.publish;
assert.equal(publishJob["runs-on"], "ubuntu-latest");
assert.equal(publishJob.permissions.contents, "read");
assert.equal(publishJob.permissions["id-token"], "write");

const checkout = publishJob.steps.find(step => step.uses?.startsWith("actions/checkout@"));
const setupNode = publishJob.steps.find(step => step.uses?.startsWith("actions/setup-node@"));
const versionCheck = publishJob.steps.find(step => step.id === "version");
const publish = publishJob.steps.find(step => step.run === "npm publish");

assert.equal(checkout.uses, "actions/checkout@v6");
assert.equal(setupNode.uses, "actions/setup-node@v6");
assert.equal(setupNode.with["node-version"], "24");
assert.equal(setupNode.with["package-manager-cache"], false);
assert.match(versionCheck.run, /npm view/);
assert.match(versionCheck.run, /E404/);
assert.equal(publish.if, "steps.version.outputs.should_publish == 'true'");

process.stdout.write("npm release workflow validation passed.\n");
