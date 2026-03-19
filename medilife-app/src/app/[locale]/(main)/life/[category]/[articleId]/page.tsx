'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Clock, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, List, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { getArticleById, getArticlesByCategory, ArticleSection } from '../../_data/articles';

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
    toc: { ja: '目次', vi: 'Mục lục', en: 'Contents', zh: '目录', id: 'Daftar Isi', tl: 'Talaan', my: 'မာတိကာ' },
    related: { ja: '関連記事', vi: 'Bài liên quan', en: 'Related Articles', zh: '相关文章', id: 'Artikel Terkait', tl: 'Kaugnay na Artikulo', my: 'ဆက်စပ်ဆောင်းပါးများ' },
    updated: { ja: 'この情報は定期的に更新されます', vi: 'Thông tin này được cập nhật thường xuyên', en: 'This information is regularly updated', zh: '此信息定期更新', id: 'Informasi ini diperbarui secara berkala', tl: 'Ang impormasyong ito ay regular na ina-update', my: 'ဤသတင်းအချက်အလက်ကို ပုံမှန်မွမ်းမံသည်' },
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

function RenderSection({ section, locale, index }: { section: ArticleSection; locale: string; index: number }) {
  switch (section.type) {
    case 'heading':
      return (
        <h3
          id={`heading-${index}`}
          className="text-base font-bold text-slate-800 mt-6 mb-2 scroll-mt-20"
        >
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

  const [readProgress, setReadProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const article = getArticleById(articleId);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setReadProgress(100);
        return;
      }
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setReadProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Build table of contents from heading sections
  const headings = contentSections
    .map((s, i) => ({ ...s, index: i }))
    .filter((s) => s.type === 'heading');

  // Related articles (same category, excluding current)
  const relatedArticles = getArticlesByCategory(category)
    .filter((a) => a.id !== articleId)
    .slice(0, 3);

  return (
    <div ref={contentRef} className="space-y-4 pb-8">
      {/* Reading progress bar — fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

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

      {/* Table of Contents */}
      {headings.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-blue-100 bg-blue-50 overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-blue-700"
            onClick={() => setTocOpen((o) => !o)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t(locale, 'toc')}
            </span>
            <ChevronRight
              className={`h-4 w-4 transition-transform ${tocOpen ? 'rotate-90' : ''}`}
            />
          </button>
          {tocOpen && (
            <div className="px-4 pb-3 space-y-1.5 border-t border-blue-100">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#heading-${h.index}`}
                  className="block text-sm text-blue-600 hover:text-blue-800 truncate py-0.5"
                >
                  {i + 1}. {getText(h.text, locale)}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-100 p-4 space-y-1"
      >
        {contentSections.map((section, index) => (
          <RenderSection key={index} section={section} locale={locale} index={index} />
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
        <CheckCircle2 className="h-4 w-4 text-green-400" />
        <span>{t(locale, 'updated')}</span>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base font-bold text-slate-800 mb-3">{t(locale, 'related')}</h3>
          <div className="space-y-2">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} href={`/${locale}/life/${category}/${rel.id}`}>
                <Card hoverable padding="sm">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {rel.title[locale] || rel.title['en']}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {rel.readTime} {t(locale, 'min_read')}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
