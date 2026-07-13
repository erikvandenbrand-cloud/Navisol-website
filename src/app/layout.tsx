import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/language-context";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Navisol | Aluminium jachtbouw & ontwikkel- en bouwpartner",
  description:
    "Navisol ontwerpt en bouwt aluminium jachten op maat en is de ontwikkel- & bouwpartner voor botenmerken. Alles onder één dak, in Elburg, Nederland.",
  keywords:
    "jachtbouw op maat, aluminium jachtbouw, custom yacht building, design and build partner, botenmerken, Elburg, Nederland",
  authors: [{ name: "Navisol" }],
  openGraph: {
    title: "Navisol | Aluminium jachtbouw & ontwikkel- en bouwpartner",
    description:
      "Aluminium jachten op maat en ontwikkel- & bouwpartner voor botenmerken. Alles onder één dak.",
    url: "https://www.navisol.nl",
    siteName: "Navisol",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <ClientBody>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </ClientBody>
        </LanguageProvider>
      </body>
    </html>
  );
}
