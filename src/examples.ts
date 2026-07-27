import { IconService, humanizeIconName, usageFor } from "./icon-service.js";

export type UsageExamples = {
  basic: UsageExample;
  withProps: UsageExample;
  withContext: UsageExample;
  dynamicImport: UsageExample;
};

export type UsageExample = {
  title: string;
  description: string;
  code: string;
};

export async function getUsageExamples(service: IconService, libraryPrefix = "fa", requestedIconName?: string): Promise<UsageExamples> {
  const library = service.getLibraryByPrefix(libraryPrefix);
  if (!library) {
    throw new Error(`Unknown react-icons library prefix '${libraryPrefix}'.`);
  }

  const icons = await service.getIconsFromPackage(libraryPrefix);
  const iconName = requestedIconName ?? pickExampleIcon(libraryPrefix, icons.map(icon => icon.iconName));
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
}`,
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
}`,
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
}`,
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
}`,
    },
  };
}

function pickExampleIcon(libraryPrefix: string, icons: string[]): string {
  const preferredByPrefix: Record<string, string> = {
    fa: "FaUser",
    fa6: "FaUser",
    fi: "FiUser",
    lu: "LuUser",
    md: "MdHome",
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

function toTitleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
