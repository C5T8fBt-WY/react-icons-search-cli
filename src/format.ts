import { stringify as toYaml } from "yaml";
import type { IconDetails, IconMetadata } from "./icon-service.js";
import type { IconLibraryInfo } from "./catalog.js";
import type { UsageExamples } from "./examples.js";
import type { DownloadedIcon } from "./download.js";

export type OutputFormat = "table" | "json" | "yaml";

export function formatOutput(value: unknown, format: OutputFormat): string {
  if (format === "json") {
    return `${JSON.stringify(value, null, 2)}\n`;
  }
  if (format === "yaml") {
    return toYaml(value);
  }
  return formatTableValue(value);
}

export function parseOutputFormat(value: string): OutputFormat {
  if (value === "table" || value === "json" || value === "yaml") {
    return value;
  }
  throw new Error(`Unsupported output format '${value}'. Expected one of: table, json, yaml.`);
}

export function formatLibraries(libraries: Array<IconLibraryInfo & { totalIcons?: number }>, format: OutputFormat): string {
  if (format !== "table") {
    return formatOutput(libraries, format);
  }

  const rows = libraries.map(library => ({
    Prefix: library.prefix,
    Name: library.name,
    Icons: library.totalIcons?.toString() ?? "-",
    License: library.license,
    URL: library.url,
  }));
  return table(rows);
}

export function formatIconList(icons: IconMetadata[], format: OutputFormat): string {
  if (format !== "table") {
    return formatOutput(icons, format);
  }
  if (icons.length === 0) {
    return "No icons found.\n";
  }

  return table(icons.map(icon => ({
    Icon: icon.iconName,
    Library: `${icon.libraryName} (${icon.libraryPrefix})`,
    License: icon.license,
    Import: `import { ${icon.iconName} } from "${icon.importPath}";`,
  })));
}

export function formatDetails(details: IconDetails, format: OutputFormat): string {
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
    "",
  ].join("\n");
}

export function formatExamples(examples: UsageExamples, format: OutputFormat): string {
  if (format !== "table") {
    return formatOutput(examples, format);
  }

  return Object.values(examples)
    .map(example => [
      `## ${example.title}`,
      example.description,
      "",
      "```tsx",
      example.code,
      "```",
    ].join("\n"))
    .join("\n\n") + "\n";
}

export function formatDownloads(downloads: DownloadedIcon[], format: OutputFormat): string {
  if (format !== "table") {
    return formatOutput(downloads, format);
  }

  return table(downloads.map(download => ({
    Icon: download.iconName,
    Library: download.libraryPrefix,
    License: download.license,
    Format: download.format,
    Bytes: download.bytes,
    File: download.filePath,
    Notice: download.noticeFilePath,
  })));
}

function formatTableValue(value: unknown): string {
  if (Array.isArray(value) && value.every(isRecord)) {
    return table(value as Record<string, string | number | undefined>[]);
  }
  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, item]) => `${key}: ${String(item)}`)
      .join("\n") + "\n";
  }
  return `${String(value)}\n`;
}

function table(rows: Array<Record<string, string | number | undefined>>): string {
  if (rows.length === 0) {
    return "\n";
  }

  const headers = Object.keys(rows[0] ?? {});
  const widths = headers.map(header => Math.max(header.length, ...rows.map(row => String(row[header] ?? "").length)));
  const line = headers.map((header, index) => header.padEnd(widths[index] ?? header.length)).join("  ");
  const divider = widths.map(width => "-".repeat(width)).join("  ");
  const body = rows.map(row => headers.map((header, index) => String(row[header] ?? "").padEnd(widths[index] ?? 0)).join("  "));
  return [line, divider, ...body].join("\n") + "\n";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
