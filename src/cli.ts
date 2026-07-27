#!/usr/bin/env node
import { Command, Option } from "commander";
import { ICON_LIBRARIES, assertLibrary, libraryMatchesLicenses, normalizeLicenseFilters } from "./catalog.js";
import { downloadIconsAsSvg } from "./download.js";
import { getUsageExamples } from "./examples.js";
import { formatDetails, formatDownloads, formatExamples, formatIconList, formatLibraries, parseOutputFormat, type OutputFormat } from "./format.js";
import { IconService } from "./icon-service.js";
import { checkInstalledSkills, installSkills } from "./skill-install.js";

const VERSION = "0.1.0";

type GlobalOptions = {
  format: string;
};

const service = new IconService();
const commandName = process.argv.slice(2).find(arg => !arg.startsWith("-"));
if (commandName !== "install") {
  const warning = checkInstalledSkills();
  if (warning) {
    process.stderr.write(warning);
  }
}

const program = new Command()
  .name("react-icons-search-cli")
  .description("Search and inspect React Icons from the terminal.")
  .version(VERSION)
  .addOption(new Option("--format <format>", "output format").choices(["table", "json", "yaml"]).default("table"));

program
  .command("install")
  .description("Install bundled agent skill files.")
  .option("--skills [target]", "install skills into the current project: agents (default), claude, or all")
  .option("--skills-dir <dir>", "install skill into a custom skills directory")
  .option("--force", "replace a target skill directory even when it contains unmanaged files")
  .action(async (options: { skills?: boolean | string; skillsDir?: string; force?: boolean }) => {
    const installed = await installSkills(options);
    for (const item of installed) {
      write(`Installed ${item.target} skill: ${item.directory}\n`);
    }
  });

program
  .command("libraries")
  .alias("libs")
  .description("List available react-icons libraries.")
  .option("--counts", "load each icon package and include exact icon counts")
  .action(async (options: { counts?: boolean }) => {
    const format = outputFormat();
    const libraries = options.counts ? await service.getLibrariesWithCounts() : service.getIconLibraries();
    write(formatLibraries(libraries, format));
  });

program
  .command("search")
  .description("Search icons by name. Queries can be scoped as prefix:term, such as fa:user.")
  .argument("<query>", "search query")
  .option("-l, --library <prefix>", "limit search to one react-icons library prefix")
  .option("--license <licenses>", "comma-separated icon licenses to allow, such as MIT,ISC,Apache-2.0")
  .option("-n, --limit <number>", "maximum icons to print", parsePositiveInteger, 20)
  .option("--exhaustive", "scan every icon library before ranking results")
  .action(async (query: string, options: { library?: string; license?: string; limit: number; exhaustive?: boolean }) => {
    const icons = await service.searchIcons(query, {
      exhaustive: options.exhaustive,
      libraryPrefix: options.library,
      licenses: parseLicenses(options.license),
      limit: options.limit,
    });
    write(formatIconList(icons, outputFormat()));
  });

program
  .command("list")
  .description("List icons in a specific react-icons library.")
  .argument("<libraryPrefix>", `library prefix, for example: ${ICON_LIBRARIES.slice(0, 8).map(library => library.prefix).join(", ")}`)
  .option("-f, --filter <query>", "filter icon names within the library")
  .option("--license <licenses>", "comma-separated icon licenses to allow, such as MIT,ISC,Apache-2.0")
  .option("-n, --limit <number>", "maximum icons to print", parsePositiveInteger, 50)
  .action(async (libraryPrefix: string, options: { filter?: string; license?: string; limit: number }) => {
    const licenses = parseLicenses(options.license);
    const library = assertLibrary(libraryPrefix);
    const icons = !libraryMatchesLicenses(library, licenses)
      ? []
      : options.filter
        ? await service.searchIcons(options.filter, { libraryPrefix, licenses, limit: options.limit, exhaustive: true })
        : (await service.getIconsFromPackage(libraryPrefix)).slice(0, options.limit);
    write(formatIconList(icons, outputFormat()));
  });

program
  .command("details")
  .alias("icon")
  .description("Show details and import snippets for one icon.")
  .argument("<libraryPrefix>", "library prefix, such as fa")
  .argument("<iconName>", "icon export name, such as FaUser")
  .action(async (libraryPrefix: string, iconName: string) => {
    const details = await service.getIconDetails(libraryPrefix, iconName);
    write(formatDetails(details, outputFormat()));
  });

program
  .command("examples")
  .description("Print React usage examples for a library and optional icon.")
  .argument("[libraryPrefix]", "library prefix", "fa")
  .option("-i, --icon <iconName>", "specific icon export name to use in examples")
  .action(async (libraryPrefix: string, options: { icon?: string }) => {
    const examples = await getUsageExamples(service, libraryPrefix, options.icon);
    write(formatExamples(examples, outputFormat()));
  });

program
  .command("download")
  .alias("export")
  .description("Render one or more icons to SVG image files.")
  .argument("<libraryPrefix>", "library prefix, such as fa")
  .argument("<iconNames...>", "icon export names, such as FaUser FaHome or FaUser,FaHome")
  .option("-o, --out-dir <dir>", "directory for downloaded SVG files", ".")
  .option("--filename <filename>", "output filename for a single icon")
  .option("--size <size>", "SVG width and height", "24")
  .option("--color <color>", "icon color", "currentColor")
  .option("--title <title>", "SVG title; defaults to a readable icon name")
  .option("--aria-label <label>", "SVG aria-label; defaults to a readable icon name")
  .action(async (libraryPrefix: string, iconNames: string[], options: {
    ariaLabel?: string;
    color: string;
    filename?: string;
    outDir: string;
    size: string;
    title?: string;
  }) => {
    const downloads = await downloadIconsAsSvg(service, libraryPrefix, iconNames, {
      ariaLabel: options.ariaLabel,
      color: options.color,
      filename: options.filename,
      outDir: options.outDir,
      size: parseSize(options.size),
      title: options.title,
    });
    write(formatDownloads(downloads, outputFormat()));
  });

program
  .command("prefixes")
  .description("Print only available library prefixes, one per line.")
  .action(() => {
    write(`${ICON_LIBRARIES.map(library => library.prefix).join("\n")}\n`);
  });

program.showHelpAfterError();

program.parseAsync(process.argv).catch(error => {
  process.stderr.write(formatCliError(error));
  process.exitCode = 1;
});

function outputFormat(): OutputFormat {
  const options = program.opts<GlobalOptions>();
  return parseOutputFormat(options.format);
}

function parsePositiveInteger(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Expected a positive integer, got '${value}'.`);
  }
  return parsed;
}

function parseSize(value: string): string | number {
  const parsed = Number.parseFloat(value);
  if (Number.isFinite(parsed) && String(parsed) === value && parsed > 0) {
    return parsed;
  }
  if (!value.trim()) {
    throw new Error("Expected a non-empty SVG size.");
  }
  return value;
}

function parseLicenses(value: string | undefined): string[] | undefined {
  return normalizeLicenseFilters(value ? [value] : undefined);
}

function write(text: string): void {
  process.stdout.write(text);
}

function formatCliError(error: unknown): string {
  if (error instanceof Error) {
    if (process.env.REACT_ICONS_SEARCH_DEBUG === "1") {
      return `${error.stack ?? error.message}\n`;
    }
    return `Error: ${error.message}\n`;
  }
  return `Error: ${String(error)}\n`;
}
