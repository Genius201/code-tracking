type BrowserVersion = {
    browser: string;
    version: string;
    release_date?: string;
    engine?: string;
    engine_version?: string;
};
interface AllBrowsersBrowserVersion extends BrowserVersion {
    year: number | string;
    supports?: string;
    wa_compatible?: boolean;
}
type NestedBrowserVersions = {
    [browser: string]: {
        [version: string]: AllBrowsersBrowserVersion;
    };
};
type Options = {
    /**
     * Whether to include only the minimum compatible browser versions or all compatible versions.
     * Defaults to `false`.
     */
    listAllCompatibleVersions?: boolean;
    /**
     * Whether to include browsers that use the same engines as a core Baseline browser.
     * Defaults to `false`.
     */
    includeDownstreamBrowsers?: boolean;
    /**
     * Pass a date in the format 'YYYY-MM-DD' to get versions compatible with Widely available on the specified date.
     * If left undefined and a `targetYear` is not passed, defaults to Widely available as of the current date.
     * > NOTE: cannot be used with `targetYear`.
     */
    widelyAvailableOnDate?: string | number;
    /**
     * Pass a year between 2015 and the current year to get browser versions compatible with all
     * Newly Available features as of the end of the year specified.
     * > NOTE: cannot be used with `widelyAvailableOnDate`.
     */
    targetYear?: number;
    /**
     * Pass a boolean that determines whether KaiOS is included in browser mappings.  KaiOS implements
     * the Gecko engine used in Firefox.  However, KaiOS also has a different interaction paradigm to
     * other browsers and requires extra consideration beyond simple feature compatibility to provide
     * an optimal user experience.  Defaults to `false`.
     */
    includeKaiOS?: boolean;
};
/**
 * Returns browser versions compatible with specified Baseline targets.
... (truncated for brevity)