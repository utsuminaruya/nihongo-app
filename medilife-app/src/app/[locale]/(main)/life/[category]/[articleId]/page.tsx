'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Clock, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, List } from 'lucide-react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { getArticleById, ArticleSection } from '../../_data/articles';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    back: { ja: 'カテゴリに戻る', vi: 'Quay lại danh mục', en: 'Back to Category', zh: '返回分类', id: 'Kembali', tl: 'Bumalik', my: 'ပြန်' },
    min_read: { ja: '分で読める', vi: 'phút đọc', en: 'min read', zh: '分钟阅读', id: 'mnt baca', tl: 'min basa', my: 'မိနစ်' },
    not_found: { ja: '記事が見つかりません', vi: 'Không tìm thấy bài viết', en: 'Article not found', zh: '未找到文章', id: 'Artikel tidak ditemukan', tl: 'Hindi nahanap ang artikulo', my: 'ဆောင်းပါး မတွေ့ပါ' },
    tip: { ja: 'ヒント', vi: 'Mẹo', en: 'Tip', zh: '提示', id: 'Tips', tl: 'Tip', my: 'အကြံပြု' },
    warning: { ja: '注意', vi: 'Lưu ý', en: 'Note', zh: '注意', id: 'Perhatian', tl: 'Babala', my: 'သတိပြုရန်' },
    steps: { ja: 'ステップ', vi: 'Các bước', en: 'Steps', zh: '步骤', id: 'Langkah-langkah', tl: 'Mga Hakbang', my: 'အဆင့်များ' },
    easy: { ja: '簡単', vi: 'Dễ', en: 'Easy', zh: '简单', id: 'Mudah', tl: 'Madali', my: 'လွယ်ကူ' },
    medium: { ja: '普通', vi: 'Trung bình', en: 'Medium', zh: '中等', id: 'Sedang', tl: 'Katamtaman', my: 'အလယ်အလတ်' },
    hard: { ja: '難しい', vi: 'Khó', en: 'Hard', zh: '困难', id: 'Sulit', tl: 'Mahirap', my: 'ခက်ခဲ' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

function getText(obj: Record<string, string> | undefined, locale: string): string {
  if (!obj) return '';
  return obj[locale] || obj['en'] || obj['ja'] || '';
}

function getList(obj: Record<string, string[]> | undefined, locale: string): string[] {
  if (!obj) return [];
  return obj[locale] || obj['en'] || obj['ja'] || [];
}

function RenderSection({ section, locale }: { section: ArticleSection; locale: string }) {
  switch (section.type) {
    case 'heading':
      return (
        <h3 className="text-base font-bold text-slate-800 mt-6 mb-2">
          {getText(section.text, locale)}
        </h3>
      );

    case 'paragraph':
      return (
        <p className="text-sm text-slate-600 leading-relaxed">
          {getText(section.text, locale)}
        </p>
      );

    case 'list': {
      const items = getList(section.items, locale);
      return (
        <ul className="space-y-2 my-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <List className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    case 'steps': {
      const steps = getList(section.steps, locale);
      return (
        <div className="space-y-2 my-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      );
    }

    case 'tip':
      return (
        <div className="my-3 rounded-xl bg-blue-50 border border-blue-100 p-3 flex gap-2">
          <Lightbulb className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">{getText(section.text, locale)}</p>
        </div>
      );

    case 'warning':
      return (
        <div className="my-3 rounded-xl bg-amber-50 border border-amber-100 p-3 flex gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">{getText(section.text, locale)}</p>
        </div>
      );

    default:
      return null;
  }
}

export default function ArticlePage() {
  const params = useParams();
  const locale = params.locale as string;
  const category = params.category as string;
  const articleId = params.articleId as string;

  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="space-y-4">
        <Link href={`/${locale}/life/${category}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ChevronLeft className="h-4 w-4" />
          {t(locale, 'back')}
        </Link>
        <Card className="text-center py-8 text-slate-500">
          {t(locale, 'not_found')}
        </Card>
      </div>
    );
  }

  // Prefer locale-specific content; fallback to English then Japanese
  const contentSections = article.content[locale] || article.content['en'] || article.content['ja'] || [];

  return (
    <div className="space-y-4">
      {/* Back */}
      <Link href={`/${locale}/life/${category}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />
        {t(locale, 'back')}
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold text-slate-800 leading-snug">
          {article.title[locale] || article.title['en']}
        </h2>
        <p className="text-sm text-slate-500 mt-1.5">
          {article.summary[locale] || article.summary['en']}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {article.readTime} {t(locale, 'min_read')}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${difficultyColors[article.difficulty]}`}>
            <BookOpen className="h-3 w-3" />
            {t(locale, article.difficulty)}
          </span>
        </div>
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-100 p-4 space-y-1"
      >
        {contentSections.map((section, index) => (
          <RenderSection key={index} section={section} locale={locale} />
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
        <CheckCircle2 className="h-4 w-4 text-green-400" />
        <span>
          {locale === 'ja' ? 'この情報は定期的に更新されます' : 'This information is regularly updated'}
        </span>
      </div>
    </div>
  );
}
