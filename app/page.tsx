import Script from "next/script";
import GlassesAvatar from "@/components/GlassesAvatar";

export default function Home() {
  return (
    <>
      <Script src="/live2dcubismcore.min.js" strategy="beforeInteractive" />
      <main className="glasses-app" aria-label="Live2D avatar">
        <GlassesAvatar />
      </main>
    </>
  );
}
