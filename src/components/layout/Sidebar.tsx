"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  ClipboardCheck,
  Heart,
  User,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  locale: string;
}

export default function Sidebar({ locale }: SidebarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const menuItems = [
    {
      href: `/${locale}/dashboard`,
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    { href: `/${locale}/lessons`, label: t("lessons"), icon: BookOpen },
    { href: `/${locale}/ai-tutor`, label: t("aiTutor"), icon: Bot },
    { href: `/${locale}/mock-exam`, label: t("mockExam"), icon: ClipboardCheck },
    { href: `/${locale}/kaigo`, label: t("kaigo"), icon: Heart },
    { href: `/${locale}/profile`, label: t("profile"), icon: User },
    { href: `/${locale}/pricing`, label: t("pricing"), icon: CreditCard },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sakura-50 text-sakura-600"
                  : "text-navy-700 hover:bg-gray-50 hover:text-navy-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
