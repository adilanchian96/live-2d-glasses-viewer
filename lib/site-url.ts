const DEFAULT_APP_NAME = "TomoView";

/** Canonical production origin for TomoView. */
export const TOMOVIEW_SITE_URL = "https://tomoview.vercel.app";

/** Public HTTPS origin for QR codes, deeplinks, and copy-paste. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  return TOMOVIEW_SITE_URL;
}

/** Display name shown when adding the web app in Meta AI. */
export function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME?.trim() || DEFAULT_APP_NAME;
}

/** HTTPS URL the glasses load (avatar viewer). */
export function getViewerUrl(): string {
  return `${getSiteUrl()}/view`;
}

/**
 * Meta AI deeplink — scanning opens the app and pre-fills Add Web App.
 * @see https://github.com/facebookincubator/meta-wearables-webapp (publish-to-vercel skill)
 */
export function getMetaAiDeepLink(
  viewerUrl: string = getViewerUrl(),
  appName: string = getAppName(),
): string {
  const params = new URLSearchParams({
    appName,
    appUrl: viewerUrl,
  });
  return `fb-viewapp://web_app_deep_link?${params.toString()}`;
}
