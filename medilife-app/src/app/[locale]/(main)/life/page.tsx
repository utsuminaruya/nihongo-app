'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Landmark,
  Train,
  Calculator,
  Trash2,
  AlertTriangle,
  ShoppingCart,
  Smartphone,
  Baby,
  Scale,
  Heart,
  UtensilsCrossed,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { key: 'HOUSING', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { key: 'BANKING', icon: Landmark, color: 'bg-emerald-100 text-emerald-600' },
  { key: 'TRANSPORT', icon: Train, color: 'bg-purple-100 text-purple-600' },
  { key: 'TAX_PENSION', icon: Calculator, color: 'bg-amber-100 text-amber-600' },
  { key: 'GARBAGE', icon: Trash2, color: 'bg-green-100 text-green-600' },
  { key: 'EMERGENCY', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  { key: 'SHOPPING', icon: ShoppingCart, color: 'bg-pink-100 text-pink-600' },
  { key: 'COMMUNICATION', icon: Smartphone, color: 'bg-indigo-100 text-indigo-600' },
  { key: 'CHILDCARE', icon: Baby, color: 'bg-rose-100 text-rose-600' },
  { key: 'LEGAL_RIGHTS', icon: Scale, color: 'bg-slate-100 text-slate-600' },
  { key: 'CULTURE', icon: Heart, color: 'bg-orange-100 text-orange-600' },
  { key: 'FOOD', icon: UtensilsCrossed, color: 'bg-yellow-100 text-yellow-600' },
];

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '生活ガイド', vi: 'Hướng dẫn cuộc sống', en: 'Life Guide', zh: '生活指南', id: 'Panduan Hidup', tl: 'Gabay sa Buhay', my: 'ဘဝလမ်းညွှန်' },
    subtitle: { ja: '日本での生活に役立つ情報', vi: 'Thông tin hữu ích cho cuộc sống tại Nhật', en: 'Useful info for life in Japan', zh: '在日生活实用信息', id: 'Info berguna untuk hidup di Jepang', tl: 'Kapaki-pakinabang na impormasyon', my: 'ဂျပန်တွင်နေထိုင်ရန် အသုံးဝင်သော အချက်အလက်' },
    search: { ja: '記事を検索...', vi: 'Tìm kiếm bài viết...', en: 'Search articles...', zh: '搜索文章...', id: 'Cari artikel...', tl: 'Maghanap ng artikulo...', my: 'ဆောင်းပါးရှာ...' },
    HOUSING: { ja: '住居', vi: 'Nhà ở', en: 'Housing', zh: '住房', id: 'Perumahan', tl: 'Pabahay', my: 'အိမ်ရာ' },
    BANKING: { ja: '銀行', vi: 'Ngân hàng', en: 'Banking', zh: '银行', id: 'Perbankan', tl: 'Bangko', my: 'ဘဏ်' },
    TRANSPORT: { ja: '交通', vi: 'Giao thông', en: 'Transport', zh: '交通', id: 'Transportasi', tl: 'Transportasyon', my: 'သယ်ယူပို့ဆောင်ရေး' },
    TAX_PENSION: { ja: '税金・年金', vi: 'Thuế & Lương hưu', en: 'Tax & Pension', zh: '税金·年金', id: 'Pajak & Pensiun', tl: 'Buwis at Pensyon', my: 'အခွန်နှင့်ပင်စင်' },
    GARBAGE: { ja: 'ゴミ出し', vi: 'Phân loại rác', en: 'Garbage', zh: '垃圾分类', id: 'Sampah', tl: 'Basura', my: 'အမှိုက်' },
    EMERGENCY: { ja: '緊急時', vi: 'Khẩn cấp', en: 'Emergency', zh: '紧急情况', id: 'Darurat', tl: 'Emergency', my: 'အရေးပေါ်' },
    SHOPPING: { ja: '買い物', vi: 'Mua sắm', en: 'Shopping', zh: '购物', id: 'Belanja', tl: 'Pamimili', my: 'ဈေးဝယ်' },
    COMMUNICATION: { ja: '通信', vi: 'Liên lạc', en: 'Communication', zh: '通讯', id: 'Komunikasi', tl: 'Komunikasyon', my: 'ဆက်သွယ်ရေး' },
    CHILDCARE: { ja: '育児', vi: 'Chăm sóc trẻ', en: 'Childcare', zh: '育儿', id: 'Penitipan Anak', tl: 'Pag-aalaga ng Bata', my: 'ကလေးပြုစုခြင်း' },
    LEGAL_RIGHTS: { ja: '法律・権利', vi: 'Pháp luật & Quyền', en: 'Legal Rights', zh: '法律权益', id: 'Hak Hukum', tl: 'Legal na Karapatan', my: 'ဥပဒေအခွင့်အရေး' },
    CULTURE: { ja: '文化', vi: 'Văn hóa', en: 'Culture', zh: '文化', id: 'Budaya', tl: 'Kultura', my: 'ယဉ်ကျေးမှု' },
    FOOD: { ja: '食事', vi: 'Ẩm thực', en: 'Food', zh: '饮食', id: 'Makanan', tl: 'Pagkain', my: 'အစားအသောက်' },
    popular: { ja: '人気の記事', vi: 'Bài viết phổ biến', en: 'Popular Articles', zh: '热门文章', id: 'Artikel Populer', tl: 'Mga Sikat na Artikulo', my: 'လူကြိုက်များသောဆောင်းပါး' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const popularArticles = [
  { title: { ja: '日本の銀行口座の開き方', en: 'How to Open a Bank Account in Japan' }, category: 'banking', id: 'open-bank-account', views: 12500 },
  { title: { ja: 'ゴミの分別ルール完全ガイド', en: 'Complete Guide to Garbage Sorting' }, category: 'garbage', id: 'garbage-sorting-rules', views: 10200 },
  { title: { ja: '在留カードの住所変更・更新手続き', en: 'Updating and Renewing Your Residence Card' }, category: 'legal_rights', id: 'residence-card-update', views: 9800 },
  { title: { ja: '国民健康保険の加入手続き', en: 'Joining National Health Insurance' }, category: 'banking', id: 'national-health-insurance', views: 8900 },
  { title: { ja: '電車の乗り方完全ガイド', en: 'Complete Guide to Riding Trains' }, category: 'transport', id: 'reading-train-map', views: 8500 },
];

export default function LifeGuidePage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = searchQuery
    ? categories.filter((cat) =>
        t(locale, cat.key).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder={t(locale, 'search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* カテゴリグリッド */}
      <div className="grid grid-cols-3 gap-3">
        {filteredCategories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/${locale}/life/${cat.key.toLowerCase()}`}>
                <Card hoverable className="flex flex-col items-center gap-2 py-4">
                  <div className={`rounded-xl p-3 ${cat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center leading-tight">
                    {t(locale, cat.key)}
                  </span>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 人気の記事 */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{t(locale, 'popular')}</h3>
        <div className="space-y-2">
          {popularArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
                  <Link href={`/${locale}/life/${article.category}/${article.id}`}>
                <Card hoverable padding="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {locale === 'ja' ? article.title.ja : article.title.en}
                      </p>
                      <p className="text-xs text-text-light mt-0.5">
                        {t(locale, article.category.toUpperCase())} · {article.views.toLocaleString()} views
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
