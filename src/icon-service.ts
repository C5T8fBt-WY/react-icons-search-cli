import {
  ICON_LIBRARIES,
  PRIORITY_PREFIXES,
  assertLibrary,
  getLibrary,
  libraryMatchesLicenses,
  normalizeLicenseFilters,
  type IconLibraryInfo,
} from "./catalog.js";
import type { IconType } from "react-icons";

export type IconMetadata = {
  iconName: string;
  libraryPrefix: string;
  libraryName: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  importPath: string;
};

export type IconDetails = IconMetadata & {
  usage: {
    import: string;
    jsx: string;
    withProps: string;
  };
};

export type SearchOptions = {
  libraryPrefix?: string;
  limit?: number;
  exhaustive?: boolean;
  licenses?: string[];
};

type IconModule = Record<string, unknown>;

const DEFAULT_LIMIT = 20;

export class IconService {
  private readonly iconCache = new Map<string, IconMetadata[]>();

  getIconLibraries(): IconLibraryInfo[] {
    return ICON_LIBRARIES;
  }

  getLibraryByPrefix(prefix: string): IconLibraryInfo | undefined {
    return getLibrary(prefix);
  }

  async getLibrariesWithCounts(): Promise<Array<IconLibraryInfo & { totalIcons: number }>> {
    const results = [];
    for (const library of ICON_LIBRARIES) {
      const icons = await this.getIconsFromPackage(library.prefix);
      results.push({ ...library, totalIcons: icons.length });
    }
    return results;
  }

  async getIconsFromPackage(packagePrefix: string): Promise<IconMetadata[]> {
    const normalizedPrefix = packagePrefix.toLowerCase();
    const library = assertLibrary(normalizedPrefix);

    const cached = this.iconCache.get(normalizedPrefix);
    if (cached) {
      return cached;
    }

    const iconPackage = await this.loadIconPackage(normalizedPrefix);
    const icons = Object.entries(iconPackage)
      .filter(([name, value]) => isIconExport(name, value))
      .map(([iconName]) => toIconMetadata(iconName, library))
      .sort((a, b) => a.iconName.localeCompare(b.iconName));

    this.iconCache.set(normalizedPrefix, icons);
    return icons;
  }

  async searchIcons(query: string, options: SearchOptions = {}): Promise<IconMetadata[]> {
    const parsed = parseScopedQuery(query, options.libraryPrefix);
    const limit = options.limit ?? DEFAULT_LIMIT;
    const licenses = normalizeLicenseFilters(options.licenses);
    const prefixes = (parsed.libraryPrefix ? [parsed.libraryPrefix] : searchOrder())
      .filter(prefix => libraryMatchesLicenses(assertLibrary(prefix), licenses));
    const terms = tokenize(parsed.query);

    if (terms.length === 0) {
      throw new Error("Search query must contain at least one non-space character.");
    }

    const results: Array<IconMetadata & { score: number }> = [];
    for (const prefix of prefixes) {
      const icons = await this.getIconsFromPackage(prefix);
      for (const icon of icons) {
        const score = scoreIcon(icon, terms);
        if (score !== undefined) {
          results.push({ ...icon, score });
        }
      }

      if (!options.exhaustive && results.length >= limit) {
        break;
      }
    }

    return results
      .sort((a, b) => a.score - b.score || a.libraryPrefix.localeCompare(b.libraryPrefix) || a.iconName.localeCompare(b.iconName))
      .slice(0, limit)
      .map(({ score: _score, ...icon }) => icon);
  }

  async getIconDetails(libraryPrefix: string, iconName: string): Promise<IconDetails> {
    const normalizedPrefix = libraryPrefix.toLowerCase();
    const library = assertLibrary(normalizedPrefix);
    const icons = await this.getIconsFromPackage(normalizedPrefix);
    const icon = icons.find(candidate => candidate.iconName === iconName);

    if (!icon) {
      throw new Error(`Icon '${iconName}' was not found in react-icons/${normalizedPrefix}.`);
    }

    return {
      ...icon,
      libraryName: library.name,
      usage: usageFor(normalizedPrefix, iconName),
    };
  }

  async getIconComponent(libraryPrefix: string, iconName: string): Promise<IconType> {
    const normalizedPrefix = libraryPrefix.toLowerCase();
    await this.getIconDetails(normalizedPrefix, iconName);

    const iconPackage = await this.loadIconPackage(normalizedPrefix);
    const component = iconPackage[iconName];
    if (typeof component !== "function") {
      throw new Error(`Icon '${iconName}' from react-icons/${normalizedPrefix} is not renderable.`);
    }
    return component as IconType;
  }

  private async loadIconPackage(packagePrefix: string): Promise<IconModule> {
    try {
      return await import(`react-icons/${packagePrefix}`) as IconModule;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load react-icons/${packagePrefix}: ${message}`, { cause: error });
    }
  }
}

export function usageFor(libraryPrefix: string, iconName: string): IconDetails["usage"] {
  return {
    import: `import { ${iconName} } from "react-icons/${libraryPrefix}";`,
    jsx: `<${iconName} />`,
    withProps: `<${iconName} size={24} color="currentColor" aria-label="${humanizeIconName(iconName)}" />`,
  };
}

export function humanizeIconName(iconName: string): string {
  return iconName
    .replace(/^[A-Z][a-z0-9]*/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
    .toLowerCase();
}

function toIconMetadata(iconName: string, library: IconLibraryInfo): IconMetadata {
  return {
    iconName,
    libraryPrefix: library.prefix,
    libraryName: library.name,
    license: library.license,
    licenseUrl: library.licenseUrl,
    sourceUrl: library.url,
    importPath: `react-icons/${library.prefix}`,
  };
}

function isIconExport(name: string, value: unknown): boolean {
  return typeof value === "function" && /^[A-Z][A-Za-z0-9]*$/.test(name);
}

function parseScopedQuery(query: string, libraryPrefix?: string): { query: string; libraryPrefix?: string } {
  if (libraryPrefix) {
    return {
      query,
      libraryPrefix: assertLibrary(libraryPrefix).prefix,
    };
  }

  const match = query.match(/^([a-z0-9]+):(.*)$/i);
  if (!match) {
    return { query };
  }

  return {
    libraryPrefix: assertLibrary(match[1]).prefix,
    query: match[2],
  };
}

function searchOrder(): string[] {
  const priority = PRIORITY_PREFIXES.filter(prefix => getLibrary(prefix));
  const rest = ICON_LIBRARIES.map(library => library.prefix).filter(prefix => !priority.includes(prefix));
  return [...priority, ...rest];
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map(term => term.trim())
    .filter(Boolean);
}

function normalizedIconName(iconName: string): string {
  return iconName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase();
}

function scoreIcon(icon: IconMetadata, terms: string[]): number | undefined {
  const compactName = icon.iconName.toLowerCase();
  const spacedName = normalizedIconName(icon.iconName);
  const bareSpacedName = humanizeIconName(icon.iconName);
  const bareCompactName = bareSpacedName.replace(/\s+/g, "");
  const libraryName = icon.libraryName.toLowerCase();
  const haystacks = [compactName, spacedName, bareCompactName, bareSpacedName, libraryName, icon.libraryPrefix];

  if (!terms.every(term => haystacks.some(haystack => haystack.includes(term)))) {
    return undefined;
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
