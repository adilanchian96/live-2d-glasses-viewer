import type { Metadata, Viewport } from "next";
import "../glasses.css";

export const metadata: Metadata = {
  title: "TomoView",
  description: "TomoView avatar for Meta Ray-Ban Display",
};

/** Meta Ray-Ban Display: fixed 600×600 additive waveguide viewport. */
export const viewport: Viewport = {
  width: 600,
  height: 600,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
