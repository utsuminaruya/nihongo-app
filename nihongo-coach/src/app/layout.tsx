import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nihongo Coach - AI\u65e5\u672c\u8a9e\u30b3\u30fc\u30c1",
  description: "\u5916\u56fd\u4eba\u52b4\u50cd\u8005\u306e\u300c\u4eca\u65e5\u56f0\u3063\u3066\u3044\u308b\u3053\u3068\u300d\u3092\u305d\u306e\u307e\u307e\u65e5\u672c\u8a9e\u5b66\u7fd2\u306b\u5909\u63db\u3059\u308b\u751f\u6d3b\u5bc6\u7740\u578bAI\u30b3\u30fc\u30c1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
