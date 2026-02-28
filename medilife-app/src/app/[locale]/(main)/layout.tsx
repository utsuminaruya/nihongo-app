'use client';

import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      <main className="mx-auto max-w-lg pb-20 px-4 pt-4">
        {children}
      </main>
      <BottomNavigation locale={locale} />
    </div>
  );
}
