/** Public HTTPS origin for QR codes and copy-paste (set in production). */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

/** URL Meta AI should load as a Web app on the glasses display. */
export function getViewerUrl(): string {
  return `${getSiteUrl()}/view`;
}
