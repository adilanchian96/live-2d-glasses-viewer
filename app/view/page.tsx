import Script from "next/script";
import GlassesAvatar from "@/components/GlassesAvatar";

export default function ViewerPage() {
  return (
    <>
      <Script src="/live2dcubismcore.min.js" strategy="beforeInteractive" />
      <main className="glasses-app" aria-label="TomoView avatar">
        <GlassesAvatar />
      </main>
    </>
  );
}
