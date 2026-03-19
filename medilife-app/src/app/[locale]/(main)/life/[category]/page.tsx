'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Clock, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { getArticlesByCategory } from '../_data/articles';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    back: { ja: '生活ガイドに戻る', vi: 'Quay lại hướng dẫn', en: 'Back to Life Guide', zh: '返回生活指南', id: 'Kembali ke Panduan', tl: 'Bumalik sa Gabay', my: 'လမ်းညွှန်သို့ ပြန်' },
    min_read: { ja: '分で読める', vi: 'phút đọc', en: 'min read', zh: '分钟阅读', id: 'mnt baca', tl: 'min basa', my: 'မိနစ် ဖတ်ရ' },
    easy: { ja: '簡単', vi: 'Dễ', en: 'Easy', zh: '简单', id: 'Mudah', tl: 'Madali', my: 'လွယ်ကူ' },
    medium: { ja: '普通', vi: 'Trung bình', en: 'Medium', zh: '中等', id: 'Sedang', tl: 'Katamtaman', my: 'အလယ်အလတ်' },
    hard: { ja: '難しい', vi: 'Khó', en: 'Hard', zh: '困难', id: 'Sulit', tl: 'Mahirap', my: 'ခက်ခဲ' },
    no_articles: { ja: 'この カテゴリには記事がまだありません', vi: 'Chưa có bài viết trong danh mục này', en: 'No articles in this category yet', zh: '此类别暂无文章', id: 'Belum ada artikel di kategori ini', tl: 'Wala pang artikulo sa kategoryang ito', my: 'ဤအမျိုးအစားတွင် ဆောင်းပါးမရှိသေးပါ' },
    articles: { ja: '記事', vi: 'bài viết', en: 'articles', zh: '篇文章', id: 'artikel', tl: 'artikulo', my: 'ဆောင်းပါး' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const categoryLabels: Record<string, Record<string, string>> = {
  housing: { ja: '住居', vi: 'Nhà ở', en: 'Housing', zh: '住房', id: 'Perumahan', tl: 'Pabahay', my: 'အိမ်ရာ' },
  banking: { ja: '銀行', vi: 'Ngân hàng', en: 'Banking', zh: '银行', id: 'Perbankan', tl: 'Bangko', my: 'ဘဏ်' },
  transport: { ja: '交通', vi: 'Giao thông', en: 'Transport', zh: '交通', id: 'Transportasi', tl: 'Transportasyon', my: 'သယ်ယူပို့ဆောင်ရေး' },
  tax_pension: { ja: '税金・年金', vi: 'Thuế & Lương hưu', en: 'Tax & Pension', zh: '税金·年金', id: 'Pajak & Pensiun', tl: 'Buwis at Pensyon', my: 'အခွန်နှင့်ပင်စင်' },
  garbage: { ja: 'ゴミ出し', vi: 'Phân loại rác', en: 'Garbage', zh: '垃圾分类', id: 'Sampah', tl: 'Basura', my: 'အမှိုက်' },
  emergency: { ja: '緊急時', vi: 'Khẩn cấp', en: 'Emergency', zh: '紧急情况', id: 'Darurat', tl: 'Emergency', my: 'အရေးပေါ်' },
  shopping: { ja: '買い物', vi: 'Mua sắm', en: 'Shopping', zh: '购物', id: 'Belanja', tl: 'Pamimili', my: 'ဈေးဝယ်' },
  communication: { ja: '通信', vi: 'Liên lạc', en: 'Communication', zh: '通讯', id: 'Komunikasi', tl: 'Komunikasyon', my: 'ဆက်သွယ်ရေး' },
  childcare: { ja: '育児', vi: 'Chăm sóc trẻ', en: 'Childcare', zh: '育儿', id: 'Penitipan Anak', tl: 'Pag-aalaga ng Bata', my: 'ကလေးပြုစုခြင်း' },
  legal_rights: { ja: '法律・権利', vi: 'Pháp luật & Quyền', en: 'Legal Rights', zh: '法律权益', id: 'Hak Hukum', tl: 'Legal na Karapatan', my: 'ဥပဒေအခွင့်အရေး' },
  culture: { ja: '文化', vi: 'Văn hóa', en: 'Culture', zh: '文化', id: 'Budaya', tl: 'Kultura', my: 'ယဉ်ကျေးမှု' },
  food: { ja: '食事', vi: 'Ẩm thực', en: 'Food', zh: '饮食', id: 'Makanan', tl: 'Pagkain', my: 'အစားအသောက်' },
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

export default function CategoryPage() {
  const params = useParams();
  const locale = params.locale as string;
  const category = params.category as string;

  const categoryArticles = getArticlesByCategory(category);
  const catLabel = categoryLabels[category.toLowerCase()]?.[locale] || categoryLabels[category.toLowerCase()]?.['en'] || category;

  return (
    <div className="space-y-5">
      {/* Back button */}
      <Link href={`/${locale}/life`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />
        {t(locale, 'back')}
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{catLabel}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {categoryArticles.length} {t(locale, 'articles')}
        </p>
      </div>

      {/* Article list */}
      {categoryArticles.length === 0 ? (
        <Card className="text-center py-8 text-slate-500">
          {t(locale, 'no_articles')}
        </Card>
      ) : (
        <div className="space-y-3">
          {categoryArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link href={`/${locale}/life/${category}/${article.id}`}>
                <Card hoverable padding="sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 leading-snug">
                        {article.title[locale] || article.title['en']}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {article.summary[locale] || article.summary['en']}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {article.readTime} {t(locale, 'min_read')}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full ${difficultyColors[article.difficulty]}`}>
                          <BookOpen className="h-3 w-3" />
                          {t(locale, article.difficulty)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
