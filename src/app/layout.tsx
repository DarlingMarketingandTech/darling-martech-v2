import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/data/site-config";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

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
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
      email: siteConfig.founder.email,
      url: siteConfig.url,
      homeLocation: siteConfig.founder.location,
      sameAs: siteConfig.founder.linkedIn ? [siteConfig.founder.linkedIn] : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.founder.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indianapolis",
        addressRegion: "IN",
        addressCountry: "US",
      },
      founder: {
        "@type": "Person",
        name: siteConfig.founder.name,
      },
    },
  ];

  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0C0C0E] text-[#F5F4F0]">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
