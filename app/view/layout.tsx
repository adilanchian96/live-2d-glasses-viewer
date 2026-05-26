import type { Viewport } from "next";
import "../glasses.css";

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
