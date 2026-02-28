'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Search,
  MapPin,
  Banknote,
  Clock,
  Bookmark,
  Filter,
  Building2,
  BadgeCheck,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '求人検索', vi: 'Tìm việc làm', en: 'Job Search', zh: '找工作', id: 'Cari Kerja', tl: 'Maghanap ng Trabaho', my: 'အလုပ်ရှာ' },
    subtitle: { ja: 'あなたに合った仕事を見つけましょう', vi: 'Tìm công việc phù hợp với bạn', en: 'Find the right job for you', zh: '找到适合你的工作', id: 'Temukan pekerjaan yang cocok', tl: 'Hanapin ang tamang trabaho', my: 'သင့်အတွက် သင့်တော်သောအလုပ်ကိုရှာပါ' },
    search: { ja: '職種、キーワードで検索', vi: 'Tìm theo ngành, từ khóa', en: 'Search by job title, keyword', zh: '按职位、关键词搜索', id: 'Cari berdasarkan jabatan', tl: 'Maghanap ayon sa titulo', my: 'ရာထူး၊ သော့ချက်စကားလုံးဖြင့်ရှာ' },
    filter: { ja: 'フィルター', vi: 'Bộ lọc', en: 'Filter', zh: '筛选', id: 'Filter', tl: 'Filter', my: 'စစ်ထုတ်' },
    featured: { ja: 'おすすめ求人', vi: 'Việc làm nổi bật', en: 'Featured Jobs', zh: '推荐职位', id: 'Lowongan Unggulan', tl: 'Mga Featured na Trabaho', my: 'အကြံပြုအလုပ်များ' },
    allJobs: { ja: 'すべての求人', vi: 'Tất cả việc làm', en: 'All Jobs', zh: '所有职位', id: 'Semua Lowongan', tl: 'Lahat ng Trabaho', my: 'အလုပ်အားလုံး' },
    saved: { ja: '保存済み', vi: 'Đã lưu', en: 'Saved', zh: '已保存', id: 'Tersimpan', tl: 'Na-save', my: 'သိမ်းထား' },
    applied: { ja: '応募済み', vi: 'Đã ứng tuyển', en: 'Applied', zh: '已投递', id: 'Sudah Dilamar', tl: 'Na-apply', my: 'လျှောက်ထားပြီး' },
    fullTime: { ja: '正社員', vi: 'Toàn thời gian', en: 'Full-time', zh: '全职', id: 'Penuh Waktu', tl: 'Full-time', my: 'အချိန်ပြည့်' },
    partTime: { ja: 'パート', vi: 'Bán thời gian', en: 'Part-time', zh: '兼职', id: 'Paruh Waktu', tl: 'Part-time', my: 'အချိန်ပိုင်း' },
    perMonth: { ja: '/月', vi: '/tháng', en: '/mo', zh: '/月', id: '/bulan', tl: '/buwan', my: '/လ' },
    mediflow: { ja: 'メディフロー求人', vi: 'Việc MediFlow', en: 'MediFlow', zh: 'MediFlow', id: 'MediFlow', tl: 'MediFlow', my: 'MediFlow' },
    apply: { ja: '応募する', vi: 'Ứng tuyển', en: 'Apply', zh: '申请', id: 'Lamar', tl: 'Mag-apply', my: 'လျှောက်ထားမည်' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const demoJobs = [
  {
    id: '1',
    company: '介護施設ひまわり',
    title: { ja: '介護職員', en: 'Care Worker' },
    location: '東京都新宿区',
    salary: { min: 220000, max: 280000 },
    type: 'FULL_TIME',
    isMediflow: true,
    visaTypes: ['特定技能1号'],
    requiredLevel: 'N4',
    posted: '2日前',
  },
  {
    id: '2',
    company: '株式会社テックジャパン',
    title: { ja: 'ITエンジニア', en: 'IT Engineer' },
    location: '東京都渋谷区',
    salary: { min: 300000, max: 450000 },
    type: 'FULL_TIME',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務'],
    requiredLevel: 'N3',
    posted: '1週間前',
  },
  {
    id: '3',
    company: 'レストラン桜',
    title: { ja: '調理スタッフ', en: 'Kitchen Staff' },
    location: '大阪府大阪市',
    salary: { min: 200000, max: 250000 },
    type: 'FULL_TIME',
    isMediflow: true,
    visaTypes: ['特定技能1号'],
    requiredLevel: 'N4',
    posted: '3日前',
  },
  {
    id: '4',
    company: 'コンビニファミマ 新宿店',
    title: { ja: 'コンビニスタッフ', en: 'Convenience Store Staff' },
    location: '東京都新宿区',
    salary: { min: 1150, max: 1300 },
    type: 'PART_TIME',
    isMediflow: false,
    visaTypes: ['留学'],
    requiredLevel: 'N3',
    posted: '5日前',
  },
  {
    id: '5',
    company: '建設会社マルイチ',
    title: { ja: '建設作業員', en: 'Construction Worker' },
    location: '埼玉県さいたま市',
    salary: { min: 250000, max: 320000 },
    type: 'FULL_TIME',
    isMediflow: true,
    visaTypes: ['特定技能1号'],
    requiredLevel: 'N4',
    posted: '1日前',
  },
];

type Tab = 'all' | 'saved' | 'applied';

export default function JobsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  return (
    <div className="space-y-5">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* タブ */}
      <div className="flex gap-2">
        {(['all', 'saved', 'applied'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t(locale, tab === 'all' ? 'allJobs' : tab)}
          </button>
        ))}
      </div>

      {/* 検索 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder={t(locale, 'search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition-colors">
          <Filter className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* 求人リスト */}
      <div className="space-y-3">
        {demoJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card hoverable>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-text-light">{job.company}</p>
                    <p className="font-semibold text-slate-800">
                      {locale === 'ja' ? job.title.ja : job.title.en}
                    </p>
                  </div>
                </div>
                <button className="rounded-full p-1.5 hover:bg-slate-100 transition-colors">
                  <Bookmark className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.isMediflow && (
                  <Badge variant="info">
                    <BadgeCheck className="h-3 w-3 mr-0.5" />
                    {t(locale, 'mediflow')}
                  </Badge>
                )}
                <Badge variant="default">
                  {job.type === 'FULL_TIME' ? t(locale, 'fullTime') : t(locale, 'partTime')}
                </Badge>
                <Badge variant="default">JLPT {job.requiredLevel}</Badge>
                {job.visaTypes.map((v) => (
                  <Badge key={v} variant="outline">{v}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-text-light mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {job.posted}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-blue-600 font-bold">
                  <Banknote className="h-4 w-4" />
                  <span>
                    ¥{job.salary.min.toLocaleString()} - ¥{job.salary.max.toLocaleString()}
                    {job.type === 'PART_TIME' ? '/h' : t(locale, 'perMonth')}
                  </span>
                </div>
                <Button size="sm">{t(locale, 'apply')}</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
