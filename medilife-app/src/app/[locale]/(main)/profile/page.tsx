'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Globe,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  FileText,
  MessageSquare,
  Heart,
} from 'lucide-react';
import { Card, Badge, Avatar, Button } from '@/components/ui';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: 'マイページ', vi: 'Trang cá nhân', en: 'My Page', zh: '个人中心', id: 'Halaman Saya', tl: 'Aking Pahina', my: 'ကိုယ်ရေးစာမျက်နှာ' },
    editProfile: { ja: 'プロフィール編集', vi: 'Chỉnh sửa hồ sơ', en: 'Edit Profile', zh: '编辑资料', id: 'Edit Profil', tl: 'I-edit ang Profile', my: 'ကိုယ်ရေးပြင်ဆင်' },
    settings: { ja: '設定', vi: 'Cài đặt', en: 'Settings', zh: '设置', id: 'Pengaturan', tl: 'Settings', my: 'ဆက်တင်' },
    language: { ja: '言語設定', vi: 'Cài đặt ngôn ngữ', en: 'Language', zh: '语言设置', id: 'Bahasa', tl: 'Wika', my: 'ဘာသာစကား' },
    notifications: { ja: '通知設定', vi: 'Cài đặt thông báo', en: 'Notifications', zh: '通知设置', id: 'Notifikasi', tl: 'Notipikasyon', my: 'အကြောင်းကြားစာ' },
    subscription: { ja: 'サブスクリプション', vi: 'Gói đăng ký', en: 'Subscription', zh: '订阅', id: 'Langganan', tl: 'Subscription', my: 'စာရင်းသွင်း' },
    visa: { ja: 'ビザ情報', vi: 'Thông tin Visa', en: 'Visa Info', zh: '签证信息', id: 'Info Visa', tl: 'Visa Info', my: 'ဗီဇာအချက်အလက်' },
    help: { ja: 'ヘルプ・お問合せ', vi: 'Trợ giúp & Liên hệ', en: 'Help & Support', zh: '帮助与支持', id: 'Bantuan', tl: 'Tulong at Suporta', my: 'အကူအညီ' },
    logout: { ja: 'ログアウト', vi: 'Đăng xuất', en: 'Logout', zh: '退出登录', id: 'Keluar', tl: 'Mag-logout', my: 'ထွက်မည်' },
    freePlan: { ja: '無料プラン', vi: 'Gói miễn phí', en: 'Free Plan', zh: '免费方案', id: 'Paket Gratis', tl: 'Libreng Plan', my: 'အခမဲ့အစီအစဉ်' },
    upgrade: { ja: 'アップグレード', vi: 'Nâng cấp', en: 'Upgrade', zh: '升级', id: 'Upgrade', tl: 'I-upgrade', my: 'အဆင့်မြှင့်' },
    myActivity: { ja: 'アクティビティ', vi: 'Hoạt động', en: 'My Activity', zh: '我的活动', id: 'Aktivitas', tl: 'Aktibidad', my: 'ကိုယ်ရေးလုပ်ဆောင်ချက်' },
    savedArticles: { ja: '保存した記事', vi: 'Bài viết đã lưu', en: 'Saved Articles', zh: '已保存文章', id: 'Artikel Tersimpan', tl: 'Na-save na Artikulo', my: 'သိမ်းထားသောဆောင်းပါး' },
    aiHistory: { ja: 'AI相談履歴', vi: 'Lịch sử tư vấn AI', en: 'AI Chat History', zh: 'AI咨询记录', id: 'Riwayat AI', tl: 'AI Chat History', my: 'AI တိုင်ပင်မှတ်တမ်း' },
    favorites: { ja: 'お気に入り', vi: 'Yêu thích', en: 'Favorites', zh: '收藏', id: 'Favorit', tl: 'Paborito', my: 'အကြိုက်ဆုံး' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

export default function ProfilePage() {
  const params = useParams();
  const locale = params.locale as string;

  const menuGroups = [
    {
      title: t(locale, 'myActivity'),
      items: [
        { icon: FileText, label: t(locale, 'savedArticles'), href: '#' },
        { icon: MessageSquare, label: t(locale, 'aiHistory'), href: '#' },
        { icon: Heart, label: t(locale, 'favorites'), href: '#' },
      ],
    },
    {
      title: t(locale, 'settings'),
      items: [
        { icon: Globe, label: t(locale, 'language'), href: `/${locale}/profile/settings` },
        { icon: Bell, label: t(locale, 'notifications'), href: `/${locale}/profile/settings` },
        { icon: Shield, label: t(locale, 'visa'), href: `/${locale}/visa` },
        { icon: CreditCard, label: t(locale, 'subscription'), href: '#' },
        { icon: HelpCircle, label: t(locale, 'help'), href: '#' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* プロフィールカード */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
        <div className="flex items-center gap-4 mb-4">
          <Avatar size="lg" className="border-2 border-white/30" />
          <div>
            <h2 className="text-xl font-bold">Nguyen Van A</h2>
            <p className="text-blue-200 text-sm">nguyen@example.com</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-0">
              <Star className="h-3 w-3 mr-0.5" />
              {t(locale, 'freePlan')}
            </Badge>
          </div>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
            {t(locale, 'upgrade')}
          </Button>
        </div>
      </Card>

      {/* メニュー */}
      {menuGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3 className="text-sm font-semibold text-text-light mb-2 px-1">{group.title}</h3>
          <Card padding="none">
            {group.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                >
                  <Icon className="h-5 w-5 text-slate-500" />
                  <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </Card>
        </div>
      ))}

      {/* ログアウト */}
      <button className="flex items-center gap-3 w-full rounded-2xl bg-white p-4 text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-slate-100">
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">{t(locale, 'logout')}</span>
      </button>
    </div>
  );
}
