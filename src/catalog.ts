export type IconLibraryInfo = {
  prefix: string;
  componentPrefix: string;
  name: string;
  description: string;
  license: string;
  licenseUrl: string;
  attributionRequired: boolean;
  shareAlike: boolean;
  url: string;
};

export type IconLicenseInfo = {
  id: string;
  url: string;
  attributionRequired: boolean;
  shareAlike: boolean;
};

export const ICON_LICENSES: IconLicenseInfo[] = [
  { id: "Apache-2.0", url: "https://www.apache.org/licenses/LICENSE-2.0", attributionRequired: false, shareAlike: false },
  { id: "CC-BY-3.0", url: "https://creativecommons.org/licenses/by/3.0/", attributionRequired: true, shareAlike: false },
  { id: "CC-BY-4.0", url: "https://creativecommons.org/licenses/by/4.0/", attributionRequired: true, shareAlike: false },
  { id: "CC-BY-SA-3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/", attributionRequired: true, shareAlike: true },
  { id: "CC0-1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", attributionRequired: false, shareAlike: false },
  { id: "ISC", url: "https://opensource.org/license/isc-license-txt", attributionRequired: false, shareAlike: false },
  { id: "MIT", url: "https://opensource.org/license/mit", attributionRequired: false, shareAlike: false },
  { id: "MPL-2.0", url: "https://www.mozilla.org/MPL/2.0/", attributionRequired: false, shareAlike: false },
  { id: "OFL-1.1", url: "https://openfontlicense.org/open-font-license-official-text/", attributionRequired: false, shareAlike: false },
];

type IconLibraryDefinition = Omit<IconLibraryInfo, "licenseUrl" | "attributionRequired" | "shareAlike">;

const ICON_LIBRARY_DEFINITIONS: IconLibraryDefinition[] = [
  {
    prefix: "ai",
    componentPrefix: "Ai",
    name: "Ant Design Icons",
    description: "Icons from Ant Design",
    license: "MIT",
    url: "https://github.com/ant-design/ant-design-icons",
  },
  {
    prefix: "bi",
    componentPrefix: "Bi",
    name: "BoxIcons",
    description: "High quality web icons",
    license: "MIT",
    url: "https://github.com/atisawd/boxicons",
  },
  {
    prefix: "bs",
    componentPrefix: "Bs",
    name: "Bootstrap Icons",
    description: "Icons from Bootstrap",
    license: "MIT",
    url: "https://github.com/twbs/icons",
  },
  {
    prefix: "cg",
    componentPrefix: "Cg",
    name: "css.gg",
    description: "Pure CSS icons",
    license: "MIT",
    url: "https://github.com/astrit/css.gg",
  },
  {
    prefix: "ci",
    componentPrefix: "Ci",
    name: "Circum Icons",
    description: "Circle-based icons",
    license: "MPL-2.0",
    url: "https://circumicons.com/",
  },
  {
    prefix: "di",
    componentPrefix: "Di",
    name: "Devicons",
    description: "Developer tool icons",
    license: "MIT",
    url: "https://vorillaz.github.io/devicons/",
  },
  {
    prefix: "fa",
    componentPrefix: "Fa",
    name: "Font Awesome 5",
    description: "Popular icon toolkit",
    license: "CC-BY-4.0",
    url: "https://fontawesome.com/",
  },
  {
    prefix: "fa6",
    componentPrefix: "Fa",
    name: "Font Awesome 6",
    description: "Font Awesome 6 icons",
    license: "CC-BY-4.0",
    url: "https://fontawesome.com/",
  },
  {
    prefix: "fc",
    componentPrefix: "Fc",
    name: "Flat Color Icons",
    description: "Colored flat icons",
    license: "MIT",
    url: "https://github.com/icons8/flat-color-icons",
  },
  {
    prefix: "fi",
    componentPrefix: "Fi",
    name: "Feather",
    description: "Simply beautiful icons",
    license: "MIT",
    url: "https://feathericons.com/",
  },
  {
    prefix: "gi",
    componentPrefix: "Gi",
    name: "Game Icons",
    description: "Icons for games",
    license: "CC-BY-3.0",
    url: "https://game-icons.net/",
  },
  {
    prefix: "go",
    componentPrefix: "Go",
    name: "GitHub Octicons",
    description: "GitHub's icons",
    license: "MIT",
    url: "https://octicons.github.com/",
  },
  {
    prefix: "gr",
    componentPrefix: "Gr",
    name: "Grommet-Icons",
    description: "Grommet UI icons",
    license: "Apache-2.0",
    url: "https://github.com/grommet/grommet-icons",
  },
  {
    prefix: "hi",
    componentPrefix: "Hi",
    name: "Heroicons",
    description: "Tailwind UI icons",
    license: "MIT",
    url: "https://github.com/tailwindlabs/heroicons",
  },
  {
    prefix: "hi2",
    componentPrefix: "Hi",
    name: "Heroicons 2",
    description: "Heroicons v2",
    license: "MIT",
    url: "https://github.com/tailwindlabs/heroicons",
  },
  {
    prefix: "im",
    componentPrefix: "Im",
    name: "IcoMoon Free",
    description: "IcoMoon icon set",
    license: "CC-BY-4.0",
    url: "https://github.com/Keyamoon/IcoMoon-Free",
  },
  {
    prefix: "io",
    componentPrefix: "Io",
    name: "Ionicons 4",
    description: "Ionic Framework icons v4",
    license: "MIT",
    url: "https://ionicons.com/",
  },
  {
    prefix: "io5",
    componentPrefix: "Io",
    name: "Ionicons 5",
    description: "Ionic Framework icons v5",
    license: "MIT",
    url: "https://ionicons.com/",
  },
  {
    prefix: "lia",
    componentPrefix: "Lia",
    name: "Icons8 Line Awesome",
    description: "Beautiful icon set",
    license: "MIT",
    url: "https://icons8.com/line-awesome",
  },
  {
    prefix: "lu",
    componentPrefix: "Lu",
    name: "Lucide",
    description: "Fork of Feather Icons",
    license: "ISC",
    url: "https://lucide.dev/",
  },
  {
    prefix: "md",
    componentPrefix: "Md",
    name: "Material Design Icons",
    description: "Google's Material Design icons",
    license: "Apache-2.0",
    url: "http://google.github.io/material-design-icons/",
  },
  {
    prefix: "pi",
    componentPrefix: "Pi",
    name: "Phosphor Icons",
    description: "Flexible icon family",
    license: "MIT",
    url: "https://github.com/phosphor-icons/core",
  },
  {
    prefix: "ri",
    componentPrefix: "Ri",
    name: "Remix Icon",
    description: "Neutral-style icon system",
    license: "Apache-2.0",
    url: "https://github.com/Remix-Design/RemixIcon",
  },
  {
    prefix: "rx",
    componentPrefix: "Rx",
    name: "Radix Icons",
    description: "Radix UI Icon set",
    license: "MIT",
    url: "https://icons.radix-ui.com",
  },
  {
    prefix: "si",
    componentPrefix: "Si",
    name: "Simple Icons",
    description: "Brand icons",
    license: "CC0-1.0",
    url: "https://simpleicons.org/",
  },
  {
    prefix: "sl",
    componentPrefix: "Sl",
    name: "Simple Line Icons",
    description: "Simple and clean line icons",
    license: "MIT",
    url: "https://thesabbir.github.io/simple-line-icons/",
  },
  {
    prefix: "tb",
    componentPrefix: "Tb",
    name: "Tabler Icons",
    description: "Fully customizable icons",
    license: "MIT",
    url: "https://github.com/tabler/tabler-icons",
  },
  {
    prefix: "tfi",
    componentPrefix: "Tfi",
    name: "Themify Icons",
    description: "Themify icon set",
    license: "MIT",
    url: "https://github.com/lykmapipo/themify-icons",
  },
  {
    prefix: "ti",
    componentPrefix: "Ti",
    name: "Typicons",
    description: "Rounded icon set",
    license: "CC-BY-SA-3.0",
    url: "http://s-ings.com/typicons/",
  },
  {
    prefix: "vsc",
    componentPrefix: "Vsc",
    name: "VS Code Icons",
    description: "Visual Studio Code icons",
    license: "CC-BY-4.0",
    url: "https://github.com/microsoft/vscode-codicons",
  },
  {
    prefix: "wi",
    componentPrefix: "Wi",
    name: "Weather Icons",
    description: "Weather-themed icons",
    license: "OFL-1.1",
    url: "https://erikflowers.github.io/weather-icons/",
  },
];

const LICENSES_BY_ID = new Map(ICON_LICENSES.map(license => [license.id.toLowerCase(), license]));

export const ICON_LIBRARIES: IconLibraryInfo[] = ICON_LIBRARY_DEFINITIONS.map(library => {
  const license = LICENSES_BY_ID.get(library.license.toLowerCase());
  if (!license) {
    throw new Error(`Missing license metadata for '${library.license}'.`);
  }
  return {
    ...library,
    licenseUrl: license.url,
    attributionRequired: license.attributionRequired,
    shareAlike: license.shareAlike,
  };
});

const LIBRARIES_BY_PREFIX = new Map(ICON_LIBRARIES.map(library => [library.prefix, library]));

export function getLibrary(prefix: string): IconLibraryInfo | undefined {
  return LIBRARIES_BY_PREFIX.get(prefix.toLowerCase());
}

export function assertLibrary(prefix: string): IconLibraryInfo {
  const library = getLibrary(prefix);
  if (!library) {
    throw new Error(`Unknown react-icons library prefix '${prefix}'. Available prefixes: ${ICON_LIBRARIES.map(library => library.prefix).join(", ")}`);
  }
  return library;
}

export function normalizeLicenseFilters(values: string[] | undefined): string[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const requested = values
    .flatMap(value => value.split(","))
    .map(value => value.trim())
    .filter(Boolean);
  const normalized = requested.map(value => {
    const license = LICENSES_BY_ID.get(value.toLowerCase());
    if (!license) {
      throw new Error(`Unknown icon license '${value}'. Available licenses: ${ICON_LICENSES.map(item => item.id).join(", ")}`);
    }
    return license.id;
  });
  return [...new Set(normalized)];
}

export function libraryMatchesLicenses(library: IconLibraryInfo, licenses: string[] | undefined): boolean {
  return !licenses || licenses.includes(library.license);
}

export const PRIORITY_PREFIXES = ["fa", "fa6", "md", "io", "io5", "bs", "fi", "lu", "hi", "hi2"];
