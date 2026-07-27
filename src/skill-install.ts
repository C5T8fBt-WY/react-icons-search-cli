import { randomUUID } from "node:crypto";
import { cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_NAME = "react-icons-search-cli";
const MANAGED_MARKER = ".react-icons-search-cli-managed.json";

export type SkillInstallTarget = "claude" | "agents" | "all";

export type SkillInstallOptions = {
  skills?: boolean | string;
  skillsDir?: string;
  force?: boolean;
};

export type InstalledSkill = {
  target: string;
  directory: string;
};

export async function installSkills(options: SkillInstallOptions): Promise<InstalledSkill[]> {
  if (!options.skills && !options.skillsDir) {
    throw new Error("Nothing to install. Use `react-icons-search-cli install --skills`.");
  }

  const source = bundledSkillDir();
  if (!existsSync(path.join(source, "SKILL.md"))) {
    throw new Error(`Bundled skill not found at ${source}.`);
  }

  const destinations = resolveDestinations(options);
  const installed: InstalledSkill[] = [];
  for (const destination of destinations) {
    assertSafeSkillDestination(destination.directory);
    await replaceSkillDirectory(source, destination.directory, options.force === true);
    installed.push(destination);
  }
  return installed;
}

export function checkInstalledSkills(): string | undefined {
  try {
    const source = bundledSkillDir();
    const staleTargets = defaultDestinations("all")
      .filter(target => existsSync(path.join(target.directory, "SKILL.md")))
      .filter(target => !skillTreesMatch(source, target.directory));

    if (staleTargets.length === 0) {
      return undefined;
    }

    return frame([
      "Installed react-icons-search-cli skill does not match this CLI version.",
      ...staleTargets.map(target => `Outdated: ${path.relative(process.cwd(), target.directory)}`),
      "",
      "Run `react-icons-search-cli install --skills=all` to update local skills.",
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return frame([
      "Could not verify installed react-icons-search-cli skills.",
      message,
    ]);
  }
}

export async function readBundledSkill(): Promise<string> {
  return await readFile(path.join(bundledSkillDir(), "SKILL.md"), "utf8");
}

function bundledSkillDir(): string {
  const distDir = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(distDir, "..", "skills", SKILL_NAME);
}

function resolveDestinations(options: SkillInstallOptions): InstalledSkill[] {
  if (options.skillsDir) {
    return [{
      target: "custom",
      directory: path.resolve(options.skillsDir, SKILL_NAME),
    }];
  }

  return defaultDestinations(normalizeTarget(options.skills));
}

function normalizeTarget(value: boolean | string | undefined): SkillInstallTarget {
  if (value === true || value === undefined || value === false) {
    return "agents";
  }
  const normalized = value.toLowerCase();
  if (normalized === "claude" || normalized === "agents" || normalized === "all") {
    return normalized;
  }
  throw new Error(`Unsupported skills target '${value}'. Expected one of: claude, agents, all.`);
}

function defaultDestinations(target: SkillInstallTarget): InstalledSkill[] {
  const destinations: InstalledSkill[] = [];
  if (target === "claude" || target === "all") {
    destinations.push({
      target: "claude",
      directory: path.resolve(process.cwd(), ".claude", "skills", SKILL_NAME),
    });
  }
  if (target === "agents" || target === "all") {
    destinations.push({
      target: "agents",
      directory: path.resolve(process.cwd(), ".agents", "skills", SKILL_NAME),
    });
  }
  return destinations;
}

function assertSafeSkillDestination(directory: string): void {
  const resolved = path.resolve(directory);
  if (path.basename(resolved) !== SKILL_NAME) {
    throw new Error(`Refusing to install skill outside a '${SKILL_NAME}' directory: ${resolved}`);
  }
}

async function replaceSkillDirectory(source: string, destination: string, force: boolean): Promise<void> {
  const parent = path.dirname(destination);
  const stage = path.join(parent, `.${SKILL_NAME}.stage-${randomUUID()}`);
  const backup = path.join(parent, `.${SKILL_NAME}.backup-${randomUUID()}`);

  await mkdir(parent, { recursive: true });
  if (existsSync(destination) && !force) {
    await assertNoUnknownFiles(source, destination);
  }

  try {
    await cp(source, stage, { recursive: true });
    await writeFile(
      path.join(stage, MANAGED_MARKER),
      `${JSON.stringify({ managedBy: SKILL_NAME }, null, 2)}\n`,
      "utf8",
    );

    const hadExisting = existsSync(destination);
    if (hadExisting) {
      await rename(destination, backup);
    }
    try {
      await rename(stage, destination);
      if (hadExisting) {
        await rm(backup, { recursive: true, force: true });
      }
    } catch (error) {
      if (hadExisting && existsSync(backup)) {
        await rm(destination, { recursive: true, force: true });
        await rename(backup, destination);
      }
      throw error;
    }
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

async function assertNoUnknownFiles(source: string, destination: string): Promise<void> {
  const sourceFiles = new Set(await listRelativeFiles(source));
  const destinationFiles = await listRelativeFiles(destination);
  const unknown = destinationFiles.filter(file => file !== MANAGED_MARKER && !sourceFiles.has(file));
  if (unknown.length > 0) {
    throw new Error(
      `Refusing to replace '${destination}' because it contains unmanaged files: ${unknown.join(", ")}. ` +
      "Re-run with --force to replace the directory.",
    );
  }
}

async function listRelativeFiles(root: string, current = root): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(current)) {
    const absolute = path.join(current, entry);
    const metadata = await stat(absolute);
    if (metadata.isDirectory()) {
      files.push(...await listRelativeFiles(root, absolute));
    } else {
      files.push(path.relative(root, absolute));
    }
  }
  return files.sort();
}

function skillTreesMatch(source: string, destination: string): boolean {
  const sourceFiles = listRelativeFilesSync(source);
  const destinationFiles = new Set(listRelativeFilesSync(destination));
  return sourceFiles.every(file =>
    destinationFiles.has(file) &&
    readFileSync(path.join(source, file), "utf8") === readFileSync(path.join(destination, file), "utf8"));
}

function listRelativeFilesSync(root: string, current = root): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(current)) {
    const absolute = path.join(current, entry);
    if (statSync(absolute).isDirectory()) {
      files.push(...listRelativeFilesSync(root, absolute));
    } else if (entry !== MANAGED_MARKER) {
      files.push(path.relative(root, absolute));
    }
  }
  return files.sort();
}

function frame(lines: string[]): string {
  const width = Math.max(...lines.map(line => line.length));
  const top = `╔${"═".repeat(width + 2)}╗`;
  const bottom = `╚${"═".repeat(width + 2)}╝`;
  const body = lines.map(line => `║ ${line.padEnd(width)} ║`);
  return [top, ...body, bottom].join("\n") + "\n";
}
