/**
 * Glasses route: minimal HTML + pre-bundled JS (no React).
 * Meta Display WebView handles this better than a client component + dynamic imports.
 */
export default function ViewerPage() {
  return (
    <>
      <div id="glasses-status" className="glasses-status">
        Loading TomoView…
      </div>
      <main className="glasses-app" aria-label="TomoView avatar">
        <div id="avatar-host" className="avatar-host" />
      </main>
      <script src="/live2dcubismcore.min.js" />
      <script type="module" src="/glasses-viewer.js" />
    </>
  );
}
