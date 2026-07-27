import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconBaseProps } from "react-icons";
import { assertLibrary } from "./catalog.js";
import { humanizeIconName, type IconService } from "./icon-service.js";

export type DownloadOptions = {
  outDir: string;
  filename?: string;
  size: string | number;
  color: string;
  title?: string;
  ariaLabel?: string;
};

export type DownloadedIcon = {
  iconName: string;
  libraryPrefix: string;
  filePath: string;
  noticeFilePath: string;
  format: "svg";
  bytes: number;
  libraryName: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export async function downloadIconsAsSvg(
  service: IconService,
  libraryPrefix: string,
  iconNames: string[],
  options: DownloadOptions,
): Promise<DownloadedIcon[]> {
  const normalizedIconNames = normalizeIconNames(iconNames);
  const library = assertLibrary(libraryPrefix);
  if (options.filename && normalizedIconNames.length > 1) {
    throw new Error("--filename can only be used when downloading one icon.");
  }

  const results: DownloadedIcon[] = [];
  for (const iconName of normalizedIconNames) {
    const component = await service.getIconComponent(libraryPrefix, iconName);
    const svg = renderToSvg(component, iconName, options, {
      libraryName: library.name,
      license: library.license,
      licenseUrl: library.licenseUrl,
      sourceUrl: library.url,
    });
    const filePath = resolveOutputPath(options.outDir, libraryPrefix, iconName, options.filename);
    const noticeFilePath = filePath.replace(/\.svg$/i, ".LICENSE.md");

    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, svg, "utf8");
    await writeFile(noticeFilePath, renderLicenseNotice(iconName, library), "utf8");

    results.push({
      iconName,
      libraryPrefix: libraryPrefix.toLowerCase(),
      filePath,
      noticeFilePath,
      format: "svg",
      bytes: Buffer.byteLength(svg, "utf8"),
      libraryName: library.name,
      license: library.license,
      licenseUrl: library.licenseUrl,
      sourceUrl: library.url,
    });
  }

  return results;
}

export function normalizeIconNames(iconNames: string[]): string[] {
  const normalized = iconNames.flatMap(value => value.split(","))
    .map(value => value.trim())
    .filter(Boolean);

  if (normalized.length === 0) {
    throw new Error("At least one icon name is required.");
  }
  return normalized;
}

function renderToSvg(
  component: (props: IconBaseProps) => React.ReactNode,
  iconName: string,
  options: DownloadOptions,
  provenance: { libraryName: string; license: string; licenseUrl: string; sourceUrl: string },
): string {
  const label = options.ariaLabel ?? (humanizeIconName(iconName) || iconName);
  const props: IconBaseProps = {
    "aria-label": label,
    color: options.color,
    role: "img",
    size: options.size,
    title: options.title ?? label,
  };

  const markup = renderToStaticMarkup(createElement(component, props));
  if (!markup.startsWith("<svg")) {
    throw new Error(`Rendering '${iconName}' did not produce SVG output.`);
  }
  const notice = [
    `Icon: ${iconName} from ${provenance.libraryName}`,
    `Source: ${provenance.sourceUrl}`,
    `License: ${provenance.license} (${provenance.licenseUrl})`,
    "Rendered via react-icons; see the adjacent .LICENSE.md file.",
  ].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!--\n${notice}\n-->\n${markup}\n`;
}

function renderLicenseNotice(iconName: string, library: ReturnType<typeof assertLibrary>): string {
  const obligations = [
    library.attributionRequired
      ? "Attribution is required. Preserve this notice and follow the linked license terms when redistributing the icon."
      : "Preserve all copyright and license notices required by the linked upstream terms.",
    library.shareAlike
      ? "Share-alike terms apply to covered modifications or derivative distributions."
      : undefined,
    library.license === "MPL-2.0"
      ? "MPL-2.0 file-level source and notice requirements may apply to covered modifications."
      : undefined,
  ].filter(Boolean);

  return [
    `# ${iconName} license notice`,
    "",
    `- Icon pack: ${library.name}`,
    `- Source: ${library.url}`,
    `- License: ${library.license}`,
    `- License terms: ${library.licenseUrl}`,
    `- Generated with: react-icons-search-cli via react-icons/${library.prefix}`,
    "",
    ...obligations,
    "",
    "This provenance file does not reproduce every upstream copyright or license notice.",
    "The SVG was rendered from the React Icons component. Its size, color, title, and accessibility attributes may differ from the upstream source.",
    "",
  ].join("\n");
}

function resolveOutputPath(outDir: string, libraryPrefix: string, iconName: string, filename?: string): string {
  const baseName = filename ?? `${libraryPrefix.toLowerCase()}-${iconName}.svg`;
  const withExtension = baseName.toLowerCase().endsWith(".svg") ? baseName : `${baseName}.svg`;
  return path.resolve(outDir, sanitizePathSegments(withExtension));
}

function sanitizePathSegments(filePath: string): string {
  return filePath
    .split(/[\\/]+/)
    .map(segment => segment.replace(/[^A-Za-z0-9._ -]/g, "_"))
    .filter(Boolean)
    .join(path.sep);
}
