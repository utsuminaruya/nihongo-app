'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  ja: { title: '更新タイムライン', back: '戻る' },
  en: { title: 'Renewal Timeline', back: 'Back' },
  vi: { title: 'Timeline gia hạn', back: 'Quay lại' },
  zh: { title: '更新时间线', back: '返回' },
  id: { title: 'Timeline Perpanjangan', back: 'Kembali' },
  tl: { title: 'Timeline ng Pag-renew', back: 'Bumalik' },
  my: { title: 'သက်တမ်းတိုးTimeline', back: 'နောက်သို့' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

const timelineData = [
  { date: '2025-12-01', title: { ja: '書類リスト確認', en: 'Check document list' }, desc: { ja: '必要書類の一覧を確認し、準備を開始', en: 'Review required documents and start preparation' }, status: 'done' },
  { date: '2026-01-15', title: { ja: '在職証明書取得', en: 'Get employment certificate' }, desc: { ja: '勤務先から在職証明書を発行してもらう', en: 'Obtain employment certificate from employer' }, status: 'done' },
  { date: '2026-02-01', title: { ja: '納税証明書取得', en: 'Get tax certificate' }, desc: { ja: '市区町村役場で納税証明書を取得', en: 'Get tax certificate from municipal office' }, status: 'done' },
  { date: '2026-02-15', title: { ja: '申請書記入', en: 'Fill application form' }, desc: { ja: '在留期間更新許可申請書に記入', en: 'Fill in the visa renewal application form' }, status: 'current' },
  { date: '2026-03-01', title: { ja: '入管局に提出', en: 'Submit to immigration' }, desc: { ja: '管轄の入管局で申請書類を提出', en: 'Submit application to immigration office' }, status: 'pending' },
  { date: '2026-03-15', title: { ja: '審査期間', en: 'Review period' }, desc: { ja: '通常2週間〜1ヶ月の審査期間', en: 'Usually 2 weeks to 1 month review period' }, status: 'pending' },
  { date: '2026-04-01', title: { ja: '結果通知・受取', en: 'Receive result' }, desc: { ja: '新しい在留カードを受け取る', en: 'Receive new residence card' }, status: 'pending' },
];

export default function VisaTimelinePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ja';

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 px-4 pt-4 mb-4">
        <Link href={`/${locale}/visa`}><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
        <h1 className="text-xl font-bold">{t(locale, 'title')}</h1>
      </div>

      <div className="px-4">
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
          {timelineData.map((item, i) => {
            const Icon = item.status === 'done' ? CheckCircle2 : item.status === 'current' ? Clock : Circle;
            const color = item.status === 'done' ? 'text-emerald-500' : item.status === 'current' ? 'text-blue-500' : 'text-gray-300';
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex gap-4 pb-6">
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'current' ? 'bg-blue-100' : item.status === 'done' ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className={`flex-1 bg-white rounded-xl p-4 shadow-sm ${item.status === 'current' ? 'ring-2 ring-blue-200' : ''}`}>
                  <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                  <p className="font-semibold text-sm">{locale === 'ja' ? item.title.ja : item.title.en}</p>
                  <p className="text-xs text-gray-500 mt-1">{locale === 'ja' ? item.desc.ja : item.desc.en}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
