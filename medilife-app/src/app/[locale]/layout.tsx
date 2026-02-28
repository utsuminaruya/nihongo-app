import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/constants';
import { Toaster } from 'react-hot-toast';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!LOCALES.includes(locale as typeof LOCALES[number])) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="antialiased bg-background text-foreground">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
