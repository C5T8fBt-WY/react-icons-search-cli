import { IconType } from 'react-icons';

type IconLibraryInfo = {
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
type IconLicenseInfo = {
    id: string;
    url: string;
    attributionRequired: boolean;
    shareAlike: boolean;
};
declare const ICON_LICENSES: IconLicenseInfo[];
declare const ICON_LIBRARIES: IconLibraryInfo[];
declare function getLibrary(prefix: string): IconLibraryInfo | undefined;
declare function assertLibrary(prefix: string): IconLibraryInfo;
declare function normalizeLicenseFilters(values: string[] | undefined): string[] | undefined;
declare function libraryMatchesLicenses(library: IconLibraryInfo, licenses: string[] | undefined): boolean;

type IconMetadata = {
    iconName: string;
    libraryPrefix: string;
    libraryName: string;
    license: string;
    licenseUrl: string;
    sourceUrl: string;
    importPath: string;
};
type IconDetails = IconMetadata & {
    usage: {
        import: string;
        jsx: string;
        withProps: string;
    };
};
type SearchOptions = {
    libraryPrefix?: string;
    limit?: number;
    exhaustive?: boolean;
    licenses?: string[];
};
declare class IconService {
    private readonly iconCache;
    getIconLibraries(): IconLibraryInfo[];
    getLibraryByPrefix(prefix: string): IconLibraryInfo | undefined;
    getLibrariesWithCounts(): Promise<Array<IconLibraryInfo & {
        totalIcons: number;
    }>>;
    getIconsFromPackage(packagePrefix: string): Promise<IconMetadata[]>;
    searchIcons(query: string, options?: SearchOptions): Promise<IconMetadata[]>;
    getIconDetails(libraryPrefix: string, iconName: string): Promise<IconDetails>;
    getIconComponent(libraryPrefix: string, iconName: string): Promise<IconType>;
    private loadIconPackage;
}
declare function usageFor(libraryPrefix: string, iconName: string): IconDetails["usage"];
declare function humanizeIconName(iconName: string): string;

type DownloadOptions = {
    outDir: string;
    filename?: string;
    size: string | number;
    color: string;
    title?: string;
    ariaLabel?: string;
};
type DownloadedIcon = {
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
declare function downloadIconsAsSvg(service: IconService, libraryPrefix: string, iconNames: string[], options: DownloadOptions): Promise<DownloadedIcon[]>;
declare function normalizeIconNames(iconNames: string[]): string[];

type UsageExamples = {
    basic: UsageExample;
    withProps: UsageExample;
    withContext: UsageExample;
    dynamicImport: UsageExample;
};
type UsageExample = {
    title: string;
    description: string;
    code: string;
};
declare function getUsageExamples(service: IconService, libraryPrefix?: string, requestedIconName?: string): Promise<UsageExamples>;

type SkillInstallTarget = "claude" | "agents" | "all";
type SkillInstallOptions = {
    skills?: boolean | string;
    skillsDir?: string;
    force?: boolean;
};
type InstalledSkill = {
    target: string;
    directory: string;
};
declare function installSkills(options: SkillInstallOptions): Promise<InstalledSkill[]>;
declare function readBundledSkill(): Promise<string>;

export { type DownloadOptions, type DownloadedIcon, ICON_LIBRARIES, ICON_LICENSES, type IconDetails, type IconLibraryInfo, type IconLicenseInfo, type IconMetadata, IconService, type InstalledSkill, type SearchOptions, type SkillInstallOptions, type SkillInstallTarget, type UsageExample, type UsageExamples, assertLibrary, downloadIconsAsSvg, getLibrary, getUsageExamples, humanizeIconName, installSkills, libraryMatchesLicenses, normalizeIconNames, normalizeLicenseFilters, readBundledSkill, usageFor };
