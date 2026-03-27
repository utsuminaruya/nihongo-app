'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useVisaStore } from '@/stores/visaStore';
import { useUserStore } from '@/stores/userStore';
import {
  MessageCircle,
  Briefcase,
  Shield,
  Phone,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Map,
} from 'lucide-react';
import { Card, CardTitle } from '@/components/ui';
import { EMERGENCY_CONTACTS } from '@/lib/constants';

// 多言語テキスト
function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    welcome: {
      ja: 'おかえりなさい！',
      vi: 'Chào mừng trở lại!',
      en: 'Welcome back!',
      zh: '欢迎回来！',
      id: 'Selamat datang kembali!',
      tl: 'Maligayang pagbabalik!',
      my: 'ပြန်လာတာ ကြိုဆိုပါတယ်!',
    },
    visaStatus: {
      ja: 'ビザステータス',
      vi: 'Tình trạng Visa',
      en: 'Visa Status',
      zh: '签证状态',
      id: 'Status Visa',
      tl: 'Status ng Visa',
      my: 'ဗီဇာအခြေအနေ',
    },
    daysRemaining: {
      ja: '日残り',
      vi: 'ngày còn lại',
      en: 'days remaining',
      zh: '天剩余',
      id: 'hari tersisa',
      tl: 'araw na natitira',
      my: 'ရက်ကျန်',
    },
    quickActions: {
      ja: 'クイックアクション',
      vi: 'Thao tác nhanh',
      en: 'Quick Actions',
      zh: '快捷操作',
      id: 'Aksi Cepat',
      tl: 'Mabilis na Aksyon',
      my: 'အမြန်လုပ်ဆောင်ချက်',
    },
    aiChat: {
      ja: 'AI相談',
      vi: 'Tư vấn AI',
      en: 'AI Chat',
      zh: 'AI咨询',
      id: 'Konsultasi AI',
      tl: 'AI Konsulta',
      my: 'AI တိုင်ပင်',
    },
    learn: {
      ja: '学習',
      vi: 'Học tập',
      en: 'Learning',
      zh: '学习',
      id: 'Belajar',
      tl: 'Pag-aaral',
      my: 'သင်ယူမှု',
    },
    guide: {
      ja: 'ガイド',
      vi: 'Hướng dẫn',
      en: 'Guide',
      zh: '指南',
      id: 'Panduan',
      tl: 'Gabay',
      my: 'လမ်းညွှန်',
    },
    jobSearch: {
      ja: '求人検索',
      vi: 'Tìm việc làm',
      en: 'Job Search',
      zh: '求职搜索',
      id: 'Cari Kerja',
      tl: 'Maghanap ng Trabaho',
      my: 'အလုပ်ရှာ',
    },
    emergency: {
      ja: '緊急連絡先',
      vi: 'Liên hệ khẩn cấp',
      en: 'Emergency Contacts',
      zh: '紧急联系',
      id: 'Kontak Darurat',
      tl: 'Emergency Contacts',
      my: 'အရေးပေါ်ဖုန်း',
    },
    police: { ja: '警察', vi: 'Cảnh sát', en: 'Police', zh: '警察', id: 'Polisi', tl: 'Pulis', my: 'ရဲ' },
    ambulance: { ja: '救急車', vi: 'Xe cứu thương', en: 'Ambulance', zh: '急救', id: 'Ambulans', tl: 'Ambulansya', my: 'အရေးပေါ်' },
    counseling: { ja: 'よりそいホットライン', vi: 'Yorisoi Hotline', en: 'Yorisoi Hotline', zh: '咨询热线', id: 'Yorisoi Hotline', tl: 'Yorisoi Hotline', my: 'Yorisoi Hotline' },
    recommendedArticles: {
      ja: 'おすすめ記事',
      vi: 'Bài viết đề xuất',
      en: 'Recommended Articles',
      zh: '推荐文章',
      id: 'Artikel Rekomendasi',
      tl: 'Inirerekomendang Artikulo',
      my: 'အကြံပြုဆောင်းပါး',
    },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;

  const { daysRemaining, residenceStatus, expiryDate } = useVisaStore();
  const { name } = useUserStore();

  return (
    <div className="space-y-6">
      {/* ウェルカムメッセージ */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {name ? `${name}さん、` : ''}{t(locale, 'welcome')} 👋
        </h2>
        <p className="text-text-light text-sm mt-1">MediLife</p>
      </div>

      {/* ビザステータスカード */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">{t(locale, 'visaStatus')}</span>
          </div>
          <Link
            href={`/${locale}/visa`}
            className="text-xs text-blue-200 hover:text-white flex items-center gap-1"
          >
            <span>詳細</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        {residenceStatus && (
          <p className="text-blue-100 text-sm mb-2">{residenceStatus}</p>
        )}
        <div className="flex items-end gap-3">
          <span className="text-4xl font-extrabold">{daysRemaining ?? '--'}</span>
          <span className="text-blue-200 mb-1">{t(locale, 'daysRemaining')}</span>
        </div>
        {expiryDate && (
          <p className="text-blue-100 text-xs mt-1">
            {new Date(expiryDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}まで
          </p>
        )}
        <div className="mt-3 h-2 w-full rounded-full bg-blue-800/50">
          <div
            className="h-2 rounded-full bg-white/80 transition-all"
            style={{ width: daysRemaining != null ? `${Math.min((daysRemaining / 365) * 100, 100)}%` : '0%' }}
          />
        </div>
      </Card>

      {/* クイックアクション */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">
          {t(locale, 'quickActions')}
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <QuickActionButton
            href={`/${locale}/ai-assistant`}
            icon={<MessageCircle className="h-6 w-6" />}
            label={t(locale, 'aiChat')}
            color="bg-blue-100 text-blue-600"
          />
          <QuickActionButton
            href={`/${locale}/learn`}
            icon={<GraduationCap className="h-6 w-6" />}
            label={t(locale, 'learn')}
            color="bg-emerald-100 text-emerald-600"
          />
          <QuickActionButton
            href={`/${locale}/life`}
            icon={<Map className="h-6 w-6" />}
            label={t(locale, 'guide')}
            color="bg-amber-100 text-amber-600"
          />
          <QuickActionButton
            href={`/${locale}/jobs`}
            icon={<Briefcase className="h-6 w-6" />}
            label={t(locale, 'jobSearch')}
            color="bg-purple-100 text-purple-600"
          />
        </div>
      </div>

      {/* おすすめ記事 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800">
            {t(locale, 'recommendedArticles')}
          </h3>
          <Link
            href={`/${locale}/life`}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <span>もっと見る</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          <ArticleCard
            href={`/${locale}/life/banking/open-bank-account`}
            icon={<BookOpen className="h-5 w-5 text-blue-600" />}
            titleKey="日本の銀行口座の開き方"
            category="BANKING"
          />
          <ArticleCard
            href={`/${locale}/life/garbage/garbage-sorting-rules`}
            icon={<BookOpen className="h-5 w-5 text-emerald-600" />}
            titleKey="ゴミの分別ルール"
            category="GARBAGE"
          />
          <ArticleCard
            href={`/${locale}/life/legal_rights/residence-card-update`}
            icon={<BookOpen className="h-5 w-5 text-amber-600" />}
            titleKey="在留カードの更新手続き"
            category="LEGAL_RIGHTS"
          />
        </div>
      </div>

      {/* 緊急連絡先 */}
      <Card className="bg-red-50 border-red-200">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <CardTitle className="text-red-700 text-base">
            {t(locale, 'emergency')}
          </CardTitle>
        </div>
        <div className="space-y-2">
          <EmergencyButton
            label={`${t(locale, 'police')} - ${EMERGENCY_CONTACTS.police}`}
            phone={EMERGENCY_CONTACTS.police}
          />
          <EmergencyButton
            label={`${t(locale, 'ambulance')} - ${EMERGENCY_CONTACTS.ambulance}`}
            phone={EMERGENCY_CONTACTS.ambulance}
          />
          <EmergencyButton
            label={`${t(locale, 'counseling')} - ${EMERGENCY_CONTACTS.yorisoi}`}
            phone={EMERGENCY_CONTACTS.yorisoi}
          />
        </div>
      </Card>
    </div>
  );
}

function QuickActionButton({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-transform active:scale-95"
    >
      <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
      <span className="text-[11px] font-medium text-slate-600 text-center leading-tight">
        {label}
      </span>
    </Link>
  );
}

function ArticleCard({
  href,
  icon,
  titleKey,
  category,
}: {
  href: string;
  icon: React.ReactNode;
  titleKey: string;
  category: string;
}) {
  return (
    <Link href={href}>
      <Card hoverable padding="sm">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 rounded-lg bg-slate-50 p-2">{icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{titleKey}</p>
            <p className="text-xs text-text-light">{category}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
        </div>
      </Card>
    </Link>
  );
}

function EmergencyButton({ label, phone }: { label: string; phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="flex items-center gap-2 rounded-lg bg-white p-2.5 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50"
    >
      <Phone className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
