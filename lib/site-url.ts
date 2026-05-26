const DEFAULT_APP_NAME = "TomoView";

/** Public HTTPS origin (set in production). */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
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
