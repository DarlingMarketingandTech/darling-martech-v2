import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/syne";
import "@fontsource-variable/jetbrains-mono";
import { Analytics } from "@vercel/analytics/next";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Darling MarTech",
  description:
    "Strategy, systems, and execution for growth-stage businesses that need one accountable operator across the full marketing stack.",
  canonicalUrl: "https://darlingmartech.com",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#0C0C0E] text-[#F5F4F0]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
