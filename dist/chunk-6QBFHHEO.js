// src/catalog.ts
var ICON_LICENSES = [
  { id: "Apache-2.0", url: "https://www.apache.org/licenses/LICENSE-2.0", attributionRequired: false, shareAlike: false },
  { id: "CC-BY-3.0", url: "https://creativecommons.org/licenses/by/3.0/", attributionRequired: true, shareAlike: false },
  { id: "CC-BY-4.0", url: "https://creativecommons.org/licenses/by/4.0/", attributionRequired: true, shareAlike: false },
  { id: "CC-BY-SA-3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/", attributionRequired: true, shareAlike: true },
  { id: "CC0-1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", attributionRequired: false, shareAlike: false },
  { id: "ISC", url: "https://opensource.org/license/isc-license-txt", attributionRequired: false, shareAlike: false },
  { id: "MIT", url: "https://opensource.org/license/mit", attributionRequired: false, shareAlike: false },
  { id: "MPL-2.0", url: "https://www.mozilla.org/MPL/2.0/", attributionRequired: false, shareAlike: false },
  { id: "OFL-1.1", url: "https://openfontlicense.org/open-font-license-official-text/", attributionRequired: false, shareAlike: false }
];
var ICON_LIBRARY_DEFINITIONS = [
  {
    prefix: "ai",
    componentPrefix: "Ai",
    name: "Ant Design Icons",
    description: "Icons from Ant Design",
    license: "MIT",
    url: "https://github.com/ant-design/ant-design-icons"
  },
  {
    prefix: "bi",
    componentPrefix: "Bi",
    name: "BoxIcons",
    description: "High quality web icons",
    license: "MIT",
    url: "https://github.com/atisawd/boxicons"
  },
  {
    prefix: "bs",
    componentPrefix: "Bs",
    name: "Bootstrap Icons",
    description: "Icons from Bootstrap",
    license: "MIT",
    url: "https://github.com/twbs/icons"
  },
  {
    prefix: "cg",
    componentPrefix: "Cg",
    name: "css.gg",
    description: "Pure CSS icons",
    license: "MIT",
    url: "https://github.com/astrit/css.gg"
  },
  {
    prefix: "ci",
    componentPrefix: "Ci",
    name: "Circum Icons",
    description: "Circle-based icons",
    license: "MPL-2.0",
    url: "https://circumicons.com/"
  },
  {
    prefix: "di",
    componentPrefix: "Di",
    name: "Devicons",
    description: "Developer tool icons",
    license: "MIT",
    url: "https://vorillaz.github.io/devicons/"
  },
  {
    prefix: "fa",
    componentPrefix: "Fa",
    name: "Font Awesome 5",
    description: "Popular icon toolkit",
    license: "CC-BY-4.0",
    url: "https://fontawesome.com/"
  },
  {
    prefix: "fa6",
    componentPrefix: "Fa",
    name: "Font Awesome 6",
    description: "Font Awesome 6 icons",
    license: "CC-BY-4.0",
    url: "https://fontawesome.com/"
  },
  {
    prefix: "fc",
    componentPrefix: "Fc",
    name: "Flat Color Icons",
    description: "Colored flat icons",
    license: "MIT",
    url: "https://github.com/icons8/flat-color-icons"
  },
  {
    prefix: "fi",
    componentPrefix: "Fi",
    name: "Feather",
    description: "Simply beautiful icons",
    license: "MIT",
    url: "https://feathericons.com/"
  },
  {
    prefix: "gi",
    componentPrefix: "Gi",
    name: "Game Icons",
    description: "Icons for games",
    license: "CC-BY-3.0",
    url: "https://game-icons.net/"
  },
  {
    prefix: "go",
    componentPrefix: "Go",
    name: "GitHub Octicons",
    description: "GitHub's icons",
    license: "MIT",
    url: "https://octicons.github.com/"
  },
  {
    prefix: "gr",
    componentPrefix: "Gr",
    name: "Grommet-Icons",
    description: "Grommet UI icons",
    license: "Apache-2.0",
    url: "https://github.com/grommet/grommet-icons"
  },
  {
    prefix: "hi",
    componentPrefix: "Hi",
    name: "Heroicons",
    description: "Tailwind UI icons",
    license: "MIT",
    url: "https://github.com/tailwindlabs/heroicons"
  },
  {
    prefix: "hi2",
    componentPrefix: "Hi",
    name: "Heroicons 2",
    description: "Heroicons v2",
    license: "MIT",
    url: "https://github.com/tailwindlabs/heroicons"
  },
  {
    prefix: "im",
    componentPrefix: "Im",
    name: "IcoMoon Free",
    description: "IcoMoon icon set",
    license: "CC-BY-4.0",
    url: "https://github.com/Keyamoon/IcoMoon-Free"
  },
  {
    prefix: "io",
    componentPrefix: "Io",
    name: "Ionicons 4",
    description: "Ionic Framework icons v4",
    license: "MIT",
    url: "https://ionicons.com/"
  },
  {
    prefix: "io5",
    componentPrefix: "Io",
    name: "Ionicons 5",
    description: "Ionic Framework icons v5",
    license: "MIT",
    url: "https://ionicons.com/"
  },
  {
    prefix: "lia",
    componentPrefix: "Lia",
    name: "Icons8 Line Awesome",
    description: "Beautiful icon set",
    license: "MIT",
    url: "https://icons8.com/line-awesome"
  },
  {
    prefix: "lu",
    componentPrefix: "Lu",
    name: "Lucide",
    description: "Fork of Feather Icons",
    license: "ISC",
    url: "https://lucide.dev/"
  },
  {
    prefix: "md",
    componentPrefix: "Md",
    name: "Material Design Icons",
    description: "Google's Material Design icons",
    license: "Apache-2.0",
    url: "http://google.github.io/material-design-icons/"
  },
  {
    prefix: "pi",
    componentPrefix: "Pi",
    name: "Phosphor Icons",
    description: "Flexible icon family",
    license: "MIT",
    url: "https://github.com/phosphor-icons/core"
  },
  {
    prefix: "ri",
    componentPrefix: "Ri",
    name: "Remix Icon",
    description: "Neutral-style icon system",
    license: "Apache-2.0",
    url: "https://github.com/Remix-Design/RemixIcon"
  },
  {
    prefix: "rx",
    componentPrefix: "Rx",
    name: "Radix Icons",
    description: "Radix UI Icon set",
    license: "MIT",
    url: "https://icons.radix-ui.com"
  },
  {
    prefix: "si",
    componentPrefix: "Si",
    name: "Simple Icons",
    description: "Brand icons",
    license: "CC0-1.0",
    url: "https://simpleicons.org/"
  },
  {
    prefix: "sl",
    componentPrefix: "Sl",
    name: "Simple Line Icons",
    description: "Simple and clean line icons",
    license: "MIT",
    url: "https://thesabbir.github.io/simple-line-icons/"
  },
  {
    prefix: "tb",
    componentPrefix: "Tb",
    name: "Tabler Icons",
    description: "Fully customizable icons",
    license: "MIT",
    url: "https://github.com/tabler/tabler-icons"
  },
  {
    prefix: "tfi",
    componentPrefix: "Tfi",
    name: "Themify Icons",
    description: "Themify icon set",
    license: "MIT",
    url: "https://github.com/lykmapipo/themify-icons"
  },
  {
    prefix: "ti",
    componentPrefix: "Ti",
    name: "Typicons",
    description: "Rounded icon set",
    license: "CC-BY-SA-3.0",
    url: "http://s-ings.com/typicons/"
  },
  {
    prefix: "vsc",
    componentPrefix: "Vsc",
    name: "VS Code Icons",
    description: "Visual Studio Code icons",
    license: "CC-BY-4.0",
    url: "https://github.com/microsoft/vscode-codicons"
  },
  {
    prefix: "wi",
    componentPrefix: "Wi",
    name: "Weather Icons",
    description: "Weather-themed icons",
    license: "OFL-1.1",
    url: "https://erikflowers.github.io/weather-icons/"
  }
];
var LICENSES_BY_ID = new Map(ICON_LICENSES.map((license) => [license.id.toLowerCase(), license]));
var ICON_LIBRARIES = ICON_LIBRARY_DEFINITIONS.map((library) => {
  const license = LICENSES_BY_ID.get(library.license.toLowerCase());
  if (!license) {
    throw new Error(`Missing license metadata for '${library.license}'.`);
  }
  return {
    ...library,
    licenseUrl: license.url,
    attributionRequired: license.attributionRequired,
    shareAlike: license.shareAlike
  };
});
var LIBRARIES_BY_PREFIX = new Map(ICON_LIBRARIES.map((library) => [library.prefix, library]));
function getLibrary(prefix) {
  return LIBRARIES_BY_PREFIX.get(prefix.toLowerCase());
}
function assertLibrary(prefix) {
  const library = getLibrary(prefix);
  if (!library) {
    throw new Error(`Unknown react-icons library prefix '${prefix}'. Available prefixes: ${ICON_LIBRARIES.map((library2) => library2.prefix).join(", ")}`);
  }
  return library;
}
function normalizeLicenseFilters(values) {
  if (!values || values.length === 0) {
    return void 0;
  }
  const requested = values.flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean);
  const normalized = requested.map((value) => {
    const license = LICENSES_BY_ID.get(value.toLowerCase());
    if (!license) {
      throw new Error(`Unknown icon license '${value}'. Available licenses: ${ICON_LICENSES.map((item) => item.id).join(", ")}`);
    }
    return license.id;
  });
  return [...new Set(normalized)];
}
function libraryMatchesLicenses(library, licenses) {
  return !licenses || licenses.includes(library.license);
}
var PRIORITY_PREFIXES = ["fa", "fa6", "md", "io", "io5", "bs", "fi", "lu", "hi", "hi2"];

// src/icon-service.ts
var DEFAULT_LIMIT = 20;
var IconService = class {
  iconCache = /* @__PURE__ */ new Map();
  getIconLibraries() {
    return ICON_LIBRARIES;
  }
  getLibraryByPrefix(prefix) {
    return getLibrary(prefix);
  }
  async getLibrariesWithCounts() {
    const results = [];
    for (const library of ICON_LIBRARIES) {
      const icons = await this.getIconsFromPackage(library.prefix);
      results.push({ ...library, totalIcons: icons.length });
    }
    return results;
  }
  async getIconsFromPackage(packagePrefix) {
    const normalizedPrefix = packagePrefix.toLowerCase();
    const library = assertLibrary(normalizedPrefix);
    const cached = this.iconCache.get(normalizedPrefix);
    if (cached) {
      return cached;
    }
    const iconPackage = await this.loadIconPackage(normalizedPrefix);
    const icons = Object.entries(iconPackage).filter(([name, value]) => isIconExport(name, value)).map(([iconName]) => toIconMetadata(iconName, library)).sort((a, b) => a.iconName.localeCompare(b.iconName));
    this.iconCache.set(normalizedPrefix, icons);
    return icons;
  }
  async searchIcons(query, options = {}) {
    const parsed = parseScopedQuery(query, options.libraryPrefix);
    const limit = options.limit ?? DEFAULT_LIMIT;
    const licenses = normalizeLicenseFilters(options.licenses);
    const prefixes = (parsed.libraryPrefix ? [parsed.libraryPrefix] : searchOrder()).filter((prefix) => libraryMatchesLicenses(assertLibrary(prefix), licenses));
    const terms = tokenize(parsed.query);
    if (terms.length === 0) {
      throw new Error("Search query must contain at least one non-space character.");
    }
    const results = [];
    for (const prefix of prefixes) {
      const icons = await this.getIconsFromPackage(prefix);
      for (const icon of icons) {
        const score = scoreIcon(icon, terms);
        if (score !== void 0) {
          results.push({ ...icon, score });
        }
      }
      if (!options.exhaustive && results.length >= limit) {
        break;
      }
    }
    return results.sort((a, b) => a.score - b.score || a.libraryPrefix.localeCompare(b.libraryPrefix) || a.iconName.localeCompare(b.iconName)).slice(0, limit).map(({ score: _score, ...icon }) => icon);
  }
  async getIconDetails(libraryPrefix, iconName) {
    const normalizedPrefix = libraryPrefix.toLowerCase();
    const library = assertLibrary(normalizedPrefix);
    const icons = await this.getIconsFromPackage(normalizedPrefix);
    const icon = icons.find((candidate) => candidate.iconName === iconName);
    if (!icon) {
      throw new Error(`Icon '${iconName}' was not found in react-icons/${normalizedPrefix}.`);
    }
    return {
      ...icon,
      libraryName: library.name,
      usage: usageFor(normalizedPrefix, iconName)
    };
  }
  async getIconComponent(libraryPrefix, iconName) {
    const normalizedPrefix = libraryPrefix.toLowerCase();
    await this.getIconDetails(normalizedPrefix, iconName);
    const iconPackage = await this.loadIconPackage(normalizedPrefix);
    const component = iconPackage[iconName];
    if (typeof component !== "function") {
      throw new Error(`Icon '${iconName}' from react-icons/${normalizedPrefix} is not renderable.`);
    }
    return component;
  }
  async loadIconPackage(packagePrefix) {
    try {
      return await import(`react-icons/${packagePrefix}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load react-icons/${packagePrefix}: ${message}`, { cause: error });
    }
  }
};
function usageFor(libraryPrefix, iconName) {
  return {
    import: `import { ${iconName} } from "react-icons/${libraryPrefix}";`,
    jsx: `<${iconName} />`,
    withProps: `<${iconName} size={24} color="currentColor" aria-label="${humanizeIconName(iconName)}" />`
  };
}
function humanizeIconName(iconName) {
  return iconName.replace(/^[A-Z][a-z0-9]*/, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim().toLowerCase();
}
function toIconMetadata(iconName, library) {
  return {
    iconName,
    libraryPrefix: library.prefix,
    libraryName: library.name,
    license: library.license,
    licenseUrl: library.licenseUrl,
    sourceUrl: library.url,
    importPath: `react-icons/${library.prefix}`
  };
}
function isIconExport(name, value) {
  return typeof value === "function" && /^[A-Z][A-Za-z0-9]*$/.test(name);
}
function parseScopedQuery(query, libraryPrefix) {
  if (libraryPrefix) {
    return {
      query,
      libraryPrefix: assertLibrary(libraryPrefix).prefix
    };
  }
  const match = query.match(/^([a-z0-9]+):(.*)$/i);
  if (!match) {
    return { query };
  }
  return {
    libraryPrefix: assertLibrary(match[1]).prefix,
    query: match[2]
  };
}
function searchOrder() {
  const priority = PRIORITY_PREFIXES.filter((prefix) => getLibrary(prefix));
  const rest = ICON_LIBRARIES.map((library) => library.prefix).filter((prefix) => !priority.includes(prefix));
  return [...priority, ...rest];
}
function tokenize(query) {
  return query.toLowerCase().split(/[^a-z0-9]+/).map((term) => term.trim()).filter(Boolean);
}
function normalizedIconName(iconName) {
  return iconName.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").toLowerCase();
}
function scoreIcon(icon, terms) {
  const compactName = icon.iconName.toLowerCase();
  const spacedName = normalizedIconName(icon.iconName);
  const bareSpacedName = humanizeIconName(icon.iconName);
  const bareCompactName = bareSpacedName.replace(/\s+/g, "");
  const libraryName = icon.libraryName.toLowerCase();
  const haystacks = [compactName, spacedName, bareCompactName, bareSpacedName, libraryName, icon.libraryPrefix];
  if (!terms.every((term) => haystacks.some((haystack) => haystack.includes(term)))) {
    return void 0;
  }
  const firstTerm = terms[0] ?? "";
  if (bareCompactName === firstTerm || bareSpacedName === firstTerm || compactName === firstTerm || spacedName === firstTerm) {
    return 0;
  }
  if (bareCompactName.startsWith(firstTerm) || bareSpacedName.startsWith(firstTerm) || compactName.startsWith(firstTerm) || spacedName.startsWith(firstTerm)) {
    return 1;
  }
  if (bareSpacedName.split(/\s+/).includes(firstTerm) || spacedName.split(/\s+/).includes(firstTerm)) {
    return 2;
  }
  return 3;
}

// src/download.ts
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
async function downloadIconsAsSvg(service, libraryPrefix, iconNames, options) {
  const normalizedIconNames = normalizeIconNames(iconNames);
  const library = assertLibrary(libraryPrefix);
  if (options.filename && normalizedIconNames.length > 1) {
    throw new Error("--filename can only be used when downloading one icon.");
  }
  const results = [];
  for (const iconName of normalizedIconNames) {
    const component = await service.getIconComponent(libraryPrefix, iconName);
    const svg = renderToSvg(component, iconName, options, {
      libraryName: library.name,
      license: library.license,
      licenseUrl: library.licenseUrl,
      sourceUrl: library.url
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
      sourceUrl: library.url
    });
  }
  return results;
}
function normalizeIconNames(iconNames) {
  const normalized = iconNames.flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean);
  if (normalized.length === 0) {
    throw new Error("At least one icon name is required.");
  }
  return normalized;
}
function renderToSvg(component, iconName, options, provenance) {
  const label = options.ariaLabel ?? (humanizeIconName(iconName) || iconName);
  const props = {
    "aria-label": label,
    color: options.color,
    role: "img",
    size: options.size,
    title: options.title ?? label
  };
  const markup = renderToStaticMarkup(createElement(component, props));
  if (!markup.startsWith("<svg")) {
    throw new Error(`Rendering '${iconName}' did not produce SVG output.`);
  }
  const notice = [
    `Icon: ${iconName} from ${provenance.libraryName}`,
    `Source: ${provenance.sourceUrl}`,
    `License: ${provenance.license} (${provenance.licenseUrl})`,
    "Rendered via react-icons; see the adjacent .LICENSE.md file."
  ].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
${notice}
-->
${markup}
`;
}
function renderLicenseNotice(iconName, library) {
  const obligations = [
    library.attributionRequired ? "Attribution is required. Preserve this notice and follow the linked license terms when redistributing the icon." : "Preserve all copyright and license notices required by the linked upstream terms.",
    library.shareAlike ? "Share-alike terms apply to covered modifications or derivative distributions." : void 0,
    library.license === "MPL-2.0" ? "MPL-2.0 file-level source and notice requirements may apply to covered modifications." : void 0
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
    ""
  ].join("\n");
}
function resolveOutputPath(outDir, libraryPrefix, iconName, filename) {
  const baseName = filename ?? `${libraryPrefix.toLowerCase()}-${iconName}.svg`;
  const withExtension = baseName.toLowerCase().endsWith(".svg") ? baseName : `${baseName}.svg`;
  return path.resolve(outDir, sanitizePathSegments(withExtension));
}
function sanitizePathSegments(filePath) {
  return filePath.split(/[\\/]+/).map((segment) => segment.replace(/[^A-Za-z0-9._ -]/g, "_")).filter(Boolean).join(path.sep);
}

// src/examples.ts
async function getUsageExamples(service, libraryPrefix = "fa", requestedIconName) {
  const library = service.getLibraryByPrefix(libraryPrefix);
  if (!library) {
    throw new Error(`Unknown react-icons library prefix '${libraryPrefix}'.`);
  }
  const icons = await service.getIconsFromPackage(libraryPrefix);
  const iconName = requestedIconName ?? pickExampleIcon(libraryPrefix, icons.map((icon) => icon.iconName));
  await service.getIconDetails(libraryPrefix, iconName);
  const usage = usageFor(libraryPrefix, iconName);
  const readableName = humanizeIconName(iconName) || iconName;
  const displayName = toTitleCase(readableName);
  return {
    basic: {
      title: "Basic usage",
      description: `Import and render a ${library.name} icon.`,
      code: `${usage.import}

export function ${iconName}Example() {
  return (
    <span>
      <${iconName} aria-hidden />
      <span>${displayName}</span>
    </span>
  );
}`
    },
    withProps: {
      title: "Customizing icons",
      description: "Pass size, color, className, ARIA, and event props directly to the icon component.",
      code: `${usage.import}

export function ${iconName}Icon() {
  return (
    <${iconName}
      size={24}
      color="currentColor"
      aria-label="${readableName}"
      className="inline-icon"
    />
  );
}`
    },
    withContext: {
      title: "Using IconContext",
      description: "Set default icon props for a subtree.",
      code: `import { IconContext } from "react-icons";
${usage.import}

export function Toolbar() {
  return (
    <IconContext.Provider value={{ size: "1.25rem", color: "currentColor" }}>
      <${iconName} aria-label="${readableName}" />
    </IconContext.Provider>
  );
}`
    },
    dynamicImport: {
      title: "Dynamic icon map",
      description: "Keep dynamic selection explicit so bundlers can tree-shake predictable imports.",
      code: `${usage.import}

const icons = {
  primary: ${iconName},
};

export function DynamicIcon({ variant = "primary" }) {
  const Icon = icons[variant] ?? ${iconName};
  return <Icon aria-hidden />;
}`
    }
  };
}
function pickExampleIcon(libraryPrefix, icons) {
  const preferredByPrefix = {
    fa: "FaUser",
    fa6: "FaUser",
    fi: "FiUser",
    lu: "LuUser",
    md: "MdHome"
  };
  const preferred = preferredByPrefix[libraryPrefix];
  if (preferred && icons.includes(preferred)) {
    return preferred;
  }
  const first = icons[0];
  if (!first) {
    throw new Error(`No icons were found in react-icons/${libraryPrefix}.`);
  }
  return first;
}
function toTitleCase(value) {
  return value.split(/\s+/).filter(Boolean).map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
}

// src/skill-install.ts
import { randomUUID } from "crypto";
import { cp, mkdir as mkdir2, readFile, readdir, rename, rm, stat, writeFile as writeFile2 } from "fs/promises";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import path2 from "path";
import { fileURLToPath } from "url";
var SKILL_NAME = "react-icons-search-cli";
var MANAGED_MARKER = ".react-icons-search-cli-managed.json";
async function installSkills(options) {
  if (!options.skills && !options.skillsDir) {
    throw new Error("Nothing to install. Use `react-icons-search-cli install --skills`.");
  }
  const source = bundledSkillDir();
  if (!existsSync(path2.join(source, "SKILL.md"))) {
    throw new Error(`Bundled skill not found at ${source}.`);
  }
  const destinations = resolveDestinations(options);
  const installed = [];
  for (const destination of destinations) {
    assertSafeSkillDestination(destination.directory);
    await replaceSkillDirectory(source, destination.directory, options.force === true);
    installed.push(destination);
  }
  return installed;
}
function checkInstalledSkills() {
  try {
    const source = bundledSkillDir();
    const staleTargets = defaultDestinations("all").filter((target) => existsSync(path2.join(target.directory, "SKILL.md"))).filter((target) => !skillTreesMatch(source, target.directory));
    if (staleTargets.length === 0) {
      return void 0;
    }
    return frame([
      "Installed react-icons-search-cli skill does not match this CLI version.",
      ...staleTargets.map((target) => `Outdated: ${path2.relative(process.cwd(), target.directory)}`),
      "",
      "Run `react-icons-search-cli install --skills=all` to update local skills."
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return frame([
      "Could not verify installed react-icons-search-cli skills.",
      message
    ]);
  }
}
async function readBundledSkill() {
  return await readFile(path2.join(bundledSkillDir(), "SKILL.md"), "utf8");
}
function bundledSkillDir() {
  const distDir = path2.dirname(fileURLToPath(import.meta.url));
  return path2.resolve(distDir, "..", "skills", SKILL_NAME);
}
function resolveDestinations(options) {
  if (options.skillsDir) {
    return [{
      target: "custom",
      directory: path2.resolve(options.skillsDir, SKILL_NAME)
    }];
  }
  return defaultDestinations(normalizeTarget(options.skills));
}
function normalizeTarget(value) {
  if (value === true || value === void 0 || value === false) {
    return "agents";
  }
  const normalized = value.toLowerCase();
  if (normalized === "claude" || normalized === "agents" || normalized === "all") {
    return normalized;
  }
  throw new Error(`Unsupported skills target '${value}'. Expected one of: claude, agents, all.`);
}
function defaultDestinations(target) {
  const destinations = [];
  if (target === "claude" || target === "all") {
    destinations.push({
      target: "claude",
      directory: path2.resolve(process.cwd(), ".claude", "skills", SKILL_NAME)
    });
  }
  if (target === "agents" || target === "all") {
    destinations.push({
      target: "agents",
      directory: path2.resolve(process.cwd(), ".agents", "skills", SKILL_NAME)
    });
  }
  return destinations;
}
function assertSafeSkillDestination(directory) {
  const resolved = path2.resolve(directory);
  if (path2.basename(resolved) !== SKILL_NAME) {
    throw new Error(`Refusing to install skill outside a '${SKILL_NAME}' directory: ${resolved}`);
  }
}
async function replaceSkillDirectory(source, destination, force) {
  const parent = path2.dirname(destination);
  const stage = path2.join(parent, `.${SKILL_NAME}.stage-${randomUUID()}`);
  const backup = path2.join(parent, `.${SKILL_NAME}.backup-${randomUUID()}`);
  await mkdir2(parent, { recursive: true });
  if (existsSync(destination) && !force) {
    await assertNoUnknownFiles(source, destination);
  }
  try {
    await cp(source, stage, { recursive: true });
    await writeFile2(
      path2.join(stage, MANAGED_MARKER),
      `${JSON.stringify({ managedBy: SKILL_NAME }, null, 2)}
`,
      "utf8"
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
async function assertNoUnknownFiles(source, destination) {
  const sourceFiles = new Set(await listRelativeFiles(source));
  const destinationFiles = await listRelativeFiles(destination);
  const unknown = destinationFiles.filter((file) => file !== MANAGED_MARKER && !sourceFiles.has(file));
  if (unknown.length > 0) {
    throw new Error(
      `Refusing to replace '${destination}' because it contains unmanaged files: ${unknown.join(", ")}. Re-run with --force to replace the directory.`
    );
  }
}
async function listRelativeFiles(root, current = root) {
  const files = [];
  for (const entry of await readdir(current)) {
    const absolute = path2.join(current, entry);
    const metadata = await stat(absolute);
    if (metadata.isDirectory()) {
      files.push(...await listRelativeFiles(root, absolute));
    } else {
      files.push(path2.relative(root, absolute));
    }
  }
  return files.sort();
}
function skillTreesMatch(source, destination) {
  const sourceFiles = listRelativeFilesSync(source);
  const destinationFiles = new Set(listRelativeFilesSync(destination));
  return sourceFiles.every((file) => destinationFiles.has(file) && readFileSync(path2.join(source, file), "utf8") === readFileSync(path2.join(destination, file), "utf8"));
}
function listRelativeFilesSync(root, current = root) {
  const files = [];
  for (const entry of readdirSync(current)) {
    const absolute = path2.join(current, entry);
    if (statSync(absolute).isDirectory()) {
      files.push(...listRelativeFilesSync(root, absolute));
    } else if (entry !== MANAGED_MARKER) {
      files.push(path2.relative(root, absolute));
    }
  }
  return files.sort();
}
function frame(lines) {
  const width = Math.max(...lines.map((line) => line.length));
  const top = `\u2554${"\u2550".repeat(width + 2)}\u2557`;
  const bottom = `\u255A${"\u2550".repeat(width + 2)}\u255D`;
  const body = lines.map((line) => `\u2551 ${line.padEnd(width)} \u2551`);
  return [top, ...body, bottom].join("\n") + "\n";
}

export {
  ICON_LICENSES,
  ICON_LIBRARIES,
  getLibrary,
  assertLibrary,
  normalizeLicenseFilters,
  libraryMatchesLicenses,
  IconService,
  usageFor,
  humanizeIconName,
  downloadIconsAsSvg,
  normalizeIconNames,
  getUsageExamples,
  installSkills,
  checkInstalledSkills,
  readBundledSkill
};
//# sourceMappingURL=chunk-6QBFHHEO.js.map