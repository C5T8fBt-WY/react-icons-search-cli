import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = path.join(repoDir, "skills", "react-icons-search-cli");
const skillText = readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
const frontmatterMatch = skillText.match(/^---\r?\n([\s\S]*?)\r?\n---/);

assert.ok(frontmatterMatch, "SKILL.md must begin with YAML frontmatter");
const frontmatter = parse(frontmatterMatch[1]);
assert.equal(frontmatter.name, path.basename(skillDir), "skill name must match its directory");
assert.match(frontmatter.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
assert.ok(
  typeof frontmatter.description === "string" && frontmatter.description.length > 0,
  "skill description is required",
);
assert.ok(frontmatter.description.length <= 1024, "skill description exceeds 1024 characters");
assert.equal(frontmatter.license, "MIT");
assert.doesNotMatch(frontmatter["allowed-tools"] ?? "", /\b(?:npm|npx):\*/);

const openAi = parse(readFileSync(path.join(skillDir, "agents", "openai.yaml"), "utf8"));
assert.match(openAi.interface.display_name, /\S/);
assert.ok(openAi.interface.short_description.length >= 25);
assert.ok(openAi.interface.short_description.length <= 64);
assert.match(openAi.interface.default_prompt, /\$react-icons-search-cli\b/);

process.stdout.write("Agent Skill validation passed.\n");
