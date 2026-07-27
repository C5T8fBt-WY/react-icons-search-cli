#!/usr/bin/env node
import {
  ICON_LIBRARIES,
  IconService,
  assertLibrary,
  checkInstalledSkills,
  downloadIconsAsSvg,
  getUsageExamples,
  installSkills,
  libraryMatchesLicenses,
  normalizeLicenseFilters
} from "./chunk-6QBFHHEO.js";

// src/cli.ts
import { Command, Option } from "commander";

// src/format.ts
import { stringify as toYaml } from "yaml";
function formatOutput(value, format) {
  if (format === "json") {
    return `${JSON.stringify(value, null, 2)}
`;
  }
  if (format === "yaml") {
    return toYaml(value);
  }
  return formatTableValue(value);
}
function parseOutputFormat(value) {
  if (value === "table" || value === "json" || value === "yaml") {
    return value;
  }
  throw new Error(`Unsupported output format '${value}'. Expected one of: table, json, yaml.`);
}
function formatLibraries(libraries, format) {
  if (format !== "table") {
    return formatOutput(libraries, format);
  }
  const rows = libraries.map((library) => ({
    Prefix: library.prefix,
    Name: library.name,
    Icons: library.totalIcons?.toString() ?? "-",
    License: library.license,
    URL: library.url
  }));
  return table(rows);
}
function formatIconList(icons, format) {
  if (format !== "table") {
    return formatOutput(icons, format);
  }
  if (icons.length === 0) {
    return "No icons found.\n";
  }
  return table(icons.map((icon) => ({
    Icon: icon.iconName,
    Library: `${icon.libraryName} (${icon.libraryPrefix})`,
    License: icon.license,
    Import: `import { ${icon.iconName} } from "${icon.importPath}";`
  })));
}
function formatDetails(details, format) {
  if (format !== "table") {
    return formatOutput(details, format);
  }
  return [
    details.iconName,
    `Library: ${details.libraryName} (${details.libraryPrefix})`,
    `License: ${details.license} (${details.licenseUrl})`,
    `Source: ${details.sourceUrl}`,
    `Import: ${details.usage.import}`,
    `JSX: ${details.usage.jsx}`,
    `With props: ${details.usage.withProps}`,
    ""
  ].join("\n");
}
function formatExamples(examples, format) {
  if (format !== "table") {
    return formatOutput(examples, format);
  }
  return Object.values(examples).map((example) => [
    `## ${example.title}`,
    example.description,
    "",
    "```tsx",
    example.code,
    "```"
  ].join("\n")).join("\n\n") + "\n";
}
function formatDownloads(downloads, format) {
  if (format !== "table") {
    return formatOutput(downloads, format);
  }
  return table(downloads.map((download) => ({
    Icon: download.iconName,
    Library: download.libraryPrefix,
    License: download.license,
    Format: download.format,
    Bytes: download.bytes,
    File: download.filePath,
    Notice: download.noticeFilePath
  })));
}
function formatTableValue(value) {
  if (Array.isArray(value) && value.every(isRecord)) {
    return table(value);
  }
  if (isRecord(value)) {
    return Object.entries(value).map(([key, item]) => `${key}: ${String(item)}`).join("\n") + "\n";
  }
  return `${String(value)}
`;
}
function table(rows) {
  if (rows.length === 0) {
    return "\n";
  }
  const headers = Object.keys(rows[0] ?? {});
  const widths = headers.map((header) => Math.max(header.length, ...rows.map((row) => String(row[header] ?? "").length)));
  const line = headers.map((header, index) => header.padEnd(widths[index] ?? header.length)).join("  ");
  const divider = widths.map((width) => "-".repeat(width)).join("  ");
  const body = rows.map((row) => headers.map((header, index) => String(row[header] ?? "").padEnd(widths[index] ?? 0)).join("  "));
  return [line, divider, ...body].join("\n") + "\n";
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/cli.ts
var VERSION = "0.1.0";
var service = new IconService();
var commandName = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
if (commandName !== "install") {
  const warning = checkInstalledSkills();
  if (warning) {
    process.stderr.write(warning);
  }
}
var program = new Command().name("react-icons-search-cli").description("Search and inspect React Icons from the terminal.").version(VERSION).addOption(new Option("--format <format>", "output format").choices(["table", "json", "yaml"]).default("table"));
program.command("install").description("Install bundled agent skill files.").option("--skills [target]", "install skills into the current project: agents (default), claude, or all").option("--skills-dir <dir>", "install skill into a custom skills directory").option("--force", "replace a target skill directory even when it contains unmanaged files").action(async (options) => {
  const installed = await installSkills(options);
  for (const item of installed) {
    write(`Installed ${item.target} skill: ${item.directory}
`);
  }
});
program.command("libraries").alias("libs").description("List available react-icons libraries.").option("--counts", "load each icon package and include exact icon counts").action(async (options) => {
  const format = outputFormat();
  const libraries = options.counts ? await service.getLibrariesWithCounts() : service.getIconLibraries();
  write(formatLibraries(libraries, format));
});
program.command("search").description("Search icons by name. Queries can be scoped as prefix:term, such as fa:user.").argument("<query>", "search query").option("-l, --library <prefix>", "limit search to one react-icons library prefix").option("--license <licenses>", "comma-separated icon licenses to allow, such as MIT,ISC,Apache-2.0").option("-n, --limit <number>", "maximum icons to print", parsePositiveInteger, 20).option("--exhaustive", "scan every icon library before ranking results").action(async (query, options) => {
  const icons = await service.searchIcons(query, {
    exhaustive: options.exhaustive,
    libraryPrefix: options.library,
    licenses: parseLicenses(options.license),
    limit: options.limit
  });
  write(formatIconList(icons, outputFormat()));
});
program.command("list").description("List icons in a specific react-icons library.").argument("<libraryPrefix>", `library prefix, for example: ${ICON_LIBRARIES.slice(0, 8).map((library) => library.prefix).join(", ")}`).option("-f, --filter <query>", "filter icon names within the library").option("--license <licenses>", "comma-separated icon licenses to allow, such as MIT,ISC,Apache-2.0").option("-n, --limit <number>", "maximum icons to print", parsePositiveInteger, 50).action(async (libraryPrefix, options) => {
  const licenses = parseLicenses(options.license);
  const library = assertLibrary(libraryPrefix);
  const icons = !libraryMatchesLicenses(library, licenses) ? [] : options.filter ? await service.searchIcons(options.filter, { libraryPrefix, licenses, limit: options.limit, exhaustive: true }) : (await service.getIconsFromPackage(libraryPrefix)).slice(0, options.limit);
  write(formatIconList(icons, outputFormat()));
});
program.command("details").alias("icon").description("Show details and import snippets for one icon.").argument("<libraryPrefix>", "library prefix, such as fa").argument("<iconName>", "icon export name, such as FaUser").action(async (libraryPrefix, iconName) => {
  const details = await service.getIconDetails(libraryPrefix, iconName);
  write(formatDetails(details, outputFormat()));
});
program.command("examples").description("Print React usage examples for a library and optional icon.").argument("[libraryPrefix]", "library prefix", "fa").option("-i, --icon <iconName>", "specific icon export name to use in examples").action(async (libraryPrefix, options) => {
  const examples = await getUsageExamples(service, libraryPrefix, options.icon);
  write(formatExamples(examples, outputFormat()));
});
program.command("download").alias("export").description("Render one or more icons to SVG image files.").argument("<libraryPrefix>", "library prefix, such as fa").argument("<iconNames...>", "icon export names, such as FaUser FaHome or FaUser,FaHome").option("-o, --out-dir <dir>", "directory for downloaded SVG files", ".").option("--filename <filename>", "output filename for a single icon").option("--size <size>", "SVG width and height", "24").option("--color <color>", "icon color", "currentColor").option("--title <title>", "SVG title; defaults to a readable icon name").option("--aria-label <label>", "SVG aria-label; defaults to a readable icon name").action(async (libraryPrefix, iconNames, options) => {
  const downloads = await downloadIconsAsSvg(service, libraryPrefix, iconNames, {
    ariaLabel: options.ariaLabel,
    color: options.color,
    filename: options.filename,
    outDir: options.outDir,
    size: parseSize(options.size),
    title: options.title
  });
  write(formatDownloads(downloads, outputFormat()));
});
program.command("prefixes").description("Print only available library prefixes, one per line.").action(() => {
  write(`${ICON_LIBRARIES.map((library) => library.prefix).join("\n")}
`);
});
program.showHelpAfterError();
program.parseAsync(process.argv).catch((error) => {
  process.stderr.write(formatCliError(error));
  process.exitCode = 1;
});
function outputFormat() {
  const options = program.opts();
  return parseOutputFormat(options.format);
}
function parsePositiveInteger(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Expected a positive integer, got '${value}'.`);
  }
  return parsed;
}
function parseSize(value) {
  const parsed = Number.parseFloat(value);
  if (Number.isFinite(parsed) && String(parsed) === value && parsed > 0) {
    return parsed;
  }
  if (!value.trim()) {
    throw new Error("Expected a non-empty SVG size.");
  }
  return value;
}
function parseLicenses(value) {
  return normalizeLicenseFilters(value ? [value] : void 0);
}
function write(text) {
  process.stdout.write(text);
}
function formatCliError(error) {
  if (error instanceof Error) {
    if (process.env.REACT_ICONS_SEARCH_DEBUG === "1") {
      return `${error.stack ?? error.message}
`;
    }
    return `Error: ${error.message}
`;
  }
  return `Error: ${String(error)}
`;
}
//# sourceMappingURL=cli.js.map