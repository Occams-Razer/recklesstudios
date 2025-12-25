import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
// import localFont from "next/font/local";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});
// const HGHeisei = localFont({
//   src: "../../public/fonts/HGHeiseiMinchotaiW3.ttf",
//   display: "swap",
//   variable: "--hgHeisei",
// });

export const metadata: Metadata = {
  title: "Reckless Studios",
  description: "Independent Film Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
