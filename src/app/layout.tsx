import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NihonGO! - AI-Powered Japanese Language Platform",
  description:
    "AI-powered Japanese learning platform designed for foreign workers in Japan. From JLPT preparation to specialized nursing care Japanese.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
