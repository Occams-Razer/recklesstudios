import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Preloader from "./components/Preloader/Preloader";
import Nav from "./components/Nav/Nav";
import Grain from "./components/Grain/Grain";
import Cursor from "./components/Cursor/Cursor";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-geist",
  display: "swap",
  weight: ["400", "500"],
});

const mincho = localFont({
  // Latin subset of HG Heisei Mincho (the full 3 MB TTF is kept for reference).
  src: "./fonts/HGHeiseiMincho-latin.woff2",
  variable: "--font-mincho",
  display: "swap",
  preload: true,
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "Reckless Studios",
    template: "%s — Reckless Studios",
  },
  description:
    "Reckless Studios is an independent film studio in Madison, Wisconsin, making thoughtful, high-quality short films for audiences across the world.",
  openGraph: {
    title: "Reckless Studios",
    description: "Independent film studio. Madison, Wisconsin.",
    type: "website",
    images: [{ url: "/work/one-last-shot.webp", width: 1600, height: 2390 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${geistMono.variable} ${mincho.variable}`}
    >
      <head>
        {/* Marks JS as available before first paint so the SSR'd preloader curtain
            only shows when the intro can actually run. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Nav />
          {children}
        </SmoothScroll>
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
