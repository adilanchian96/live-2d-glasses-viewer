# Live2D Glasses Viewer

Web app for **Meta Ray-Ban Display** glasses: shows the OpenClaw Live2D avatar in a 600×600 viewport with randomly rotating motions. Built from the same assets and parser as [openclaw-live2d](../openclaw-live2d).

## Meta Ray-Ban Display requirements

| Requirement | This project |
|-------------|--------------|
| Standard HTML/CSS/JS over **HTTPS** | Next.js → deploy to Vercel (or any HTTPS host) |
| **600×600** fixed viewport, no scroll | `app/globals.css`, `viewport` in `app/layout.tsx` |
| **Dark background** (black = transparent on waveguide) | `#000` body + transparent Pixi canvas |
| D-pad / Enter input | Not required for display-only avatar |

Official docs: [Web Apps for Meta Ray-Ban Display](https://wearables.developer.meta.com/docs/develop/webapps) · [Build guide](https://wearables.developer.meta.com/docs/develop/webapps/build)

## Setup

```bash
npm install
npm run copy-assets   # copies from ../openclaw-live2d/assets if missing
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (browser preview). Optional model: `?model=natori` (default: `mao`).

## Test on glasses

1. **Hardware**: Meta Ray-Ban Display glasses, Meta AI app v272+, glasses firmware v125+.
2. **Developer mode**: Meta AI app → Settings → App Info → tap version **5 times** → Enable Developer Mode.
3. **Deploy**: Push to Vercel (or similar) so the app has a public **HTTPS** URL.
4. **Load on device**: Meta AI app → Devices → Display Glasses settings → App connections → **Web apps** → Add your URL.
5. Reload the web app from the glasses menu after each deploy.

## Assets

Live2D models and `live2dcubismcore.min.js` live under `public/` (copied from `openclaw-live2d/assets`). Re-run `npm run copy-assets` after adding models in the Electron app.

## Behavior

- Starts with the model **Idle** motion.
- Every **4–12 seconds**, plays a random motion from the model’s `model3.json` (excluding Idle when other motions exist).
- **Head/eye direction** follows the glasses **IMU** via `DeviceOrientationEvent` (not mouse/cursor). Pointer tracking on the Live2D model is disabled (`autoFocus: false`).
- Black background and alpha-0 Pixi stage so only the avatar draws light on the waveguide.

On some browsers, orientation permission must be granted once (on MRBD this is usually automatic). If the avatar does not look around when you move your head, check that orientation access is allowed for the page.

## Related

- **openclaw-live2d** — Electron overlay + WebSocket commands from OpenClaw
- **live-2d-glasses-viewer** (this repo) — glasses-facing display with ambient random motions
