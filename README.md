# TomoView

A cute animated companion for **Meta Ray-Ban Display** glasses. Consumer landing page at `/`, avatar viewer at `/view`.

Built with Next.js; character assets from [openclaw-live2d](../openclaw-live2d).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Setup landing page, QR code, copy link, help |
| `/view` | What the glasses load (600×600 avatar) |

## Environment

Set your public HTTPS origin so the QR code and copy button show the correct URL:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

On Vercel, `VERCEL_URL` is used automatically if this is unset.

## Development

```bash
npm install
npm run copy-assets   # from ../openclaw-live2d/assets if needed
npm run dev
```

- Landing: http://localhost:3000  
- Viewer: http://localhost:3000/view  

HTTPS locally: `npx next dev --experimental-https -H 0.0.0.0`

## Deploy

Deploy to Vercel (or any HTTPS host). Set `NEXT_PUBLIC_SITE_URL` to your production URL.

**Add on glasses:** Scan the landing page QR code (Meta AI deeplink `fb-viewapp://web_app_deep_link?...`) or manually paste **`https://your-domain/view`** in Meta AI → Web apps.

## Meta glasses

Official docs: [Web Apps for Meta Ray-Ban Display](https://wearables.developer.meta.com/docs/develop/webapps)
