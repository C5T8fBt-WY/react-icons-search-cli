import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = path.join(repoDir, "dist", "cli.js");

function runCli(args, cwd = repoDir) {
  const result = runCliRaw(args, cwd);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function runCliRaw(args, cwd = repoDir) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: "utf8",
  });
}

test("search filters results by canonical icon license", () => {
  const results = JSON.parse(runCli(["--format", "json", "search", "user", "--license", "MIT", "--limit", "5"]));
  assert.ok(results.length > 0);
  assert.ok(results.every(icon => icon.license === "MIT"));

  const excluded = JSON.parse(runCli([
    "--format", "json", "search", "user", "--library", "fa", "--license", "MIT",
  ]));
  assert.deepEqual(excluded, []);
});

test("download writes provenance into the SVG and a license sidecar", () => {
  const outputDir = mkdtempSync(path.join(tmpdir(), "react-icons-cli-download-"));
  try {
    const [download] = JSON.parse(runCli([
      "--format", "json", "download", "fa", "FaUser", "--out-dir", outputDir,
    ]));

    assert.equal(download.license, "CC-BY-4.0");
    assert.ok(existsSync(download.filePath));
    assert.ok(existsSync(download.noticeFilePath));
    assert.match(readFileSync(download.filePath, "utf8"), /License: CC-BY-4\.0/);
    assert.match(readFileSync(download.noticeFilePath, "utf8"), /Attribution is required/);
  } finally {
    rmSync(outputDir, { recursive: true, force: true });
  }
});

test("install --skills defaults to the portable .agents directory", () => {
  const consumerDir = mkdtempSync(path.join(tmpdir(), "react-icons-cli-skill-"));
  try {
    const output = runCli(["install", "--skills"], consumerDir);
    const skillPath = path.join(
      consumerDir,
      ".agents",
      "skills",
      "react-icons-search-cli",
      "SKILL.md",
    );

    assert.match(output, /Installed agents skill/);
    assert.ok(existsSync(skillPath));
    assert.match(readFileSync(skillPath, "utf8"), /license: MIT/);
  } finally {
    rmSync(consumerDir, { recursive: true, force: true });
  }
});

test("skill updates refuse to delete unmanaged files", () => {
  const consumerDir = mkdtempSync(path.join(tmpdir(), "react-icons-cli-skill-safety-"));
  try {
    runCli(["install", "--skills"], consumerDir);
    const skillDir = path.join(consumerDir, ".agents", "skills", "react-icons-search-cli");
    const sentinelPath = path.join(skillDir, "user-notes.txt");
    writeFileSync(sentinelPath, "keep me\n", "utf8");

    const result = runCliRaw(["install", "--skills"], consumerDir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /contains unmanaged files/);
    assert.equal(readFileSync(sentinelPath, "utf8"), "keep me\n");
  } finally {
    rmSync(consumerDir, { recursive: true, force: true });
  }
});
