// Canonical URL used for metadata, sitemap and schema. Set NEXT_PUBLIC_SITE_URL
// once a custom domain is live; until then Netlify's build-time URL (the main
// site address, e.g. https://name.netlify.app) is used.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.URL) return process.env.URL;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
