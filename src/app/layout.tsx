import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mapleadspro.com"),
  title: {
    default: "MapLeads Pro — Extract Google Maps Leads in Seconds",
    template: "%s | MapLeads Pro",
  },
  description:
    "MapLeads Pro is a Chrome Extension that extracts verified business leads — name, phone, email, website, address, ratings and reviews — directly from Google Maps in bulk.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "MapLeads Pro — Extract Google Maps Leads in Seconds",
    description:
      "Extract verified business leads from Google Maps in bulk. No code, no API, no limits.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MapLeads Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MapLeads Pro — Extract Google Maps Leads in Seconds",
    description:
      "Extract verified business leads from Google Maps in bulk. No code, no API, no limits.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#050505] text-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
