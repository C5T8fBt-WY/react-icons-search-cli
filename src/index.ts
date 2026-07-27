export {
  ICON_LIBRARIES,
  ICON_LICENSES,
  assertLibrary,
  getLibrary,
  libraryMatchesLicenses,
  normalizeLicenseFilters,
  type IconLibraryInfo,
  type IconLicenseInfo,
} from "./catalog.js";
export { downloadIconsAsSvg, normalizeIconNames, type DownloadedIcon, type DownloadOptions } from "./download.js";
export { getUsageExamples, type UsageExample, type UsageExamples } from "./examples.js";
export { IconService, humanizeIconName, usageFor, type IconDetails, type IconMetadata, type SearchOptions } from "./icon-service.js";
export { installSkills, readBundledSkill, type InstalledSkill, type SkillInstallOptions, type SkillInstallTarget } from "./skill-install.js";
