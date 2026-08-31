interface UseAdsPolicyOptions {
    vastUrl?: string;
    vastUrls?: string[];
}

export function useAdsPolicy({ vastUrl, vastUrls }: UseAdsPolicyOptions) {
    const hasValidVastUrl = !!vastUrl && vastUrl !== 'none' && vastUrl.trim() !== '';
    const hasValidVastUrls = !!vastUrls && vastUrls.length > 0;
    const shouldPlayAds = hasValidVastUrl || hasValidVastUrls;

    return {
        shouldPlayAds,
        effectiveVastUrl: hasValidVastUrl ? vastUrl : undefined,
        effectiveVastUrls: hasValidVastUrls ? vastUrls : undefined,
        evaluated: true,
    };
}
