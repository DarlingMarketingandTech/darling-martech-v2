import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/syne";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darling MarTech",
  description: "Diagnostic-focused marketing technology solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
