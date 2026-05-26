# TomoView

A cute animated companion for **Meta Ray-Ban Display** glasses.

**Live site:** [https://tomoview.vercel.app](https://tomoview.vercel.app)  
**Glasses viewer:** [https://tomoview.vercel.app/view](https://tomoview.vercel.app/view)

| Path | Purpose |
|------|---------|
| `/` | Setup landing page, QR code, copy link, help |
| `/view` | What the glasses load (600×600 avatar) |

Built with Next.js; character assets from [openclaw-live2d](../openclaw-live2d).

## Environment

Defaults to `https://tomoview.vercel.app`. Override only if needed:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tomoview.vercel.app
```

## Development

```bash
npm install
npm run copy-assets   # from ../openclaw-live2d/assets if needed
npm run dev
```

Local dev runs on localhost, but QR/deeplink/copy still point at **tomoview.vercel.app** unless you change `NEXT_PUBLIC_SITE_URL`.

## Deploy

Hosted on Vercel at **https://tomoview.vercel.app**.

**Add on glasses:** Scan the QR on the landing page (opens Meta AI) or paste **`https://tomoview.vercel.app/view`** in Meta AI → Web apps.

### Vercel 401 errors on preview URLs

URLs like `tomoview-xxxx-adilanchian96s-projects.vercel.app` are **preview** deployments. If Vercel **Deployment Protection** is on, the browser gets **401 Unauthorized** for `manifest.webmanifest`, scripts, and the viewer—Meta glasses cannot load the app.

**Fix (pick one):**

1. Use production only: **https://tomoview.vercel.app/view** (not preview URLs).
2. Vercel dashboard → Project → **Settings** → **Deployment Protection** → disable for previews, or allow public access to preview deployments.

Console `Manifest fetch failed, code 401` is a symptom of protection, not a broken manifest file.

## Meta glasses

[Web Apps for Meta Ray-Ban Display](https://wearables.developer.meta.com/docs/develop/webapps)
