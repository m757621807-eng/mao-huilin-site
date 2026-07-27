import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC, Cormorant_Garamond } from "next/font/google";
import AmbientLight from "@/components/background/AmbientLight";
import GrainOverlay from "@/components/background/GrainOverlay";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cjk-serif",
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cjk-sans",
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-latin-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "毛荟琳 MAO HUILIN",
  description: "毛荟琳 — 模特，决策研究者，LOOK AI 创作者。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${notoSerifSC.variable} ${notoSansSC.variable} ${cormorant.variable} antialiased`}
    >
      <body className="bg-white text-neutral-800">
        <AmbientLight />
        <GrainOverlay />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
