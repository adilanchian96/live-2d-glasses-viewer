import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw Live2D — Glasses",
  description: "Live2D avatar for Meta Ray-Ban Display glasses",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

/** Meta Ray-Ban Display: fixed 600×600 additive waveguide viewport. */
export const viewport: Viewport = {
  width: 600,
  height: 600,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
