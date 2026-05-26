import type { Metadata, Viewport } from "next";
import { TOMOVIEW_SITE_URL } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(TOMOVIEW_SITE_URL),
  title: "TomoView — A friend on your Meta glasses",
  description:
    "Set up TomoView on Meta Ray-Ban Display glasses. A cute animated companion that lives in your view.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
