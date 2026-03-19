'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { getCourseById } from '../_data/lessons';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    back: { ja: '学習トップへ', en: 'Back to Learn', vi: 'Quay lại', zh: '返回', id: 'Kembali', tl: 'Bumalik', my: 'ပြန်' },
    start: { ja: '開始', en: 'Start', vi: 'Bắt đầu', zh: '开始', id: 'Mulai', tl: 'Simulan', my: 'စတင်' },
    continue: { ja: '続きから', en: 'Continue', vi: 'Tiếp tục', zh: '继续', id: 'Lanjutkan', tl: 'Magpatuloy', my: 'ဆက်' },
    completed: { ja: '完了', en: 'Completed', vi: 'Hoàn thành', zh: '已完成', id: 'Selesai', tl: 'Tapos na', my: 'ပြီး' },
    locked: { ja: 'ロック中', en: 'Locked', vi: 'Khóa', zh: '已锁定', id: 'Terkunci', tl: 'Naka-lock', my: 'လော့ခ်' },
    lessons: { ja: 'レッスン', en: 'Lessons', vi: 'Bài học', zh: '课程', id: 'Pelajaran', tl: 'Aralin', my: 'သင်ခန်းစာ' },
    hours: { ja: '時間', en: 'hrs', vi: 'giờ', zh: '小时', id: 'jam', tl: 'oras', my: 'နာရီ' },
    min: { ja: '分', en: 'min', vi: 'phút', zh: '分钟', id: 'mnt', tl: 'min', my: 'မိနစ်' },
    notFound: { ja: 'コースが見つかりません', en: 'Course not found', vi: 'Không tìm thấy khóa học', zh: '未找到课程', id: 'Kursus tidak ditemukan', tl: 'Hindi nahanap ang kurso', my: 'သင်တန်း မတွေ့ပါ' },
    beginner: { ja: '初級', en: 'Beginner', vi: 'Sơ cấp', zh: '初级', id: 'Pemula', tl: 'Baguhan', my: 'အခြေခံ' },
    intermediate: { ja: '中級', en: 'Intermediate', vi: 'Trung cấp', zh: '中级', id: 'Menengah', tl: 'Intermediate', my: 'အလယ်' },
    advanced: { ja: '上級', en: 'Advanced', vi: 'Cao cấp', zh: '高级', id: 'Lanjutan', tl: 'Advanced', my: 'အဆင့်မြင့်' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

export default function CoursePage() {
  const params = useParams();
  const locale = params.locale as string;
  const courseId = params.courseId as string;

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="space-y-4">
        <Link href={`/${locale}/learn`} className="inline-flex items-center gap-1.5 text-sm text-slate-500">
          <ChevronLeft className="h-4 w-4" />
          {t(locale, 'back')}
        </Link>
        <Card className="text-center py-8 text-slate-500">{t(locale, 'notFound')}</Card>
      </div>
    );
  }

  const courseTitle = course.title[locale] || course.title['en'];
  const courseDesc = course.description[locale] || course.description['en'];

  // Mock progress: first 2 lessons completed for demo
  const completedIds = course.lessons.slice(0, Math.min(2, course.lessons.length)).map(l => l.id);

  return (
    <div className="space-y-5">
      <Link href={`/${locale}/learn`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />
        {t(locale, 'back')}
      </Link>

      {/* Course Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className={`rounded-2xl bg-gradient-to-br ${course.color} p-5 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-white/20 text-white border-0 text-xs">
              {t(locale, course.level)}
            </Badge>
            {course.jlptLevel !== 'none' && (
              <Badge variant="default" className="bg-white/20 text-white border-0 text-xs">
                {course.jlptLevel}
              </Badge>
            )}
          </div>
          <h2 className="text-xl font-bold mb-1">{courseTitle}</h2>
          <p className="text-sm text-white/80 mb-3">{courseDesc}</p>
          <div className="flex items-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.totalLessons} {t(locale, 'lessons')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.estimatedHours} {t(locale, 'hours')}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(completedIds.length / course.totalLessons) * 100}%` }}
              />
            </div>
            <p className="text-xs text-white/70 mt-1">{completedIds.length}/{course.totalLessons} {t(locale, 'lessons')}</p>
          </div>
        </div>
      </motion.div>

      {/* Lesson List */}
      <div className="space-y-2">
        {course.lessons.map((lesson, index) => {
          const isCompleted = completedIds.includes(lesson.id);
          const isUnlocked = index === 0 || completedIds.includes(course.lessons[index - 1]?.id);
          const lessonTitle = lesson.title[locale] || lesson.title['en'];

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.06 }}
            >
              {isUnlocked ? (
                <Link href={`/${locale}/learn/${courseId}/${lesson.id}`}>
                  <Card hoverable padding="sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{lessonTitle}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" />
                          {lesson.duration} {t(locale, 'min')}
                        </p>
                      </div>
                      {isCompleted ? (
                        <span className="text-xs text-emerald-500 font-medium">{t(locale, 'completed')}</span>
                      ) : (
                        <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </Card>
                </Link>
              ) : (
                <Card padding="sm" className="opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-500 text-sm truncate">{lessonTitle}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {lesson.duration} {t(locale, 'min')}
                      </p>
                    </div>
                    <Lock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  </div>
                </Card>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
