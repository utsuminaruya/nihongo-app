import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "きこえる介護日本語 | 外国人介護職向け日本語学習",
  description:
    "介護現場で「本当に困る」40語を音声で学ぶ。省略語・専門用語・気持ちの言葉を文脈で身につける外国人介護職向けアプリ。",
  keywords: ["介護", "日本語", "外国人", "ベトナム語", "学習"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF8F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
