/**
 * Glasses route: minimal HTML + sequential script boot (no React).
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
      {/* Single boot script: Cubism core, then glasses-viewer.js */}
      <script src="/glasses-boot.js" />
    </>
  );
}
