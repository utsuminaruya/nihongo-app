import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
