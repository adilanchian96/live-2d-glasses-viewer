import type { Metadata } from "next";
import { TOMOVIEW_SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(TOMOVIEW_SITE_URL),
  title: "TomoView",
  description:
    "A cute companion for Meta Ray-Ban Display glasses.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
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
