'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  MessageSquare,
  Trophy,
  Play,
  Star,
  Target,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '日本語学習', vi: 'Học tiếng Nhật', en: 'Learn Japanese', zh: '学日语', id: 'Belajar Bahasa Jepang', tl: 'Matuto ng Japanese', my: 'ဂျပန်စာသင်ယူ' },
    subtitle: { ja: 'レベルに合った学習コンテンツ', vi: 'Nội dung phù hợp với trình độ', en: 'Content matched to your level', zh: '适合你水平的学习内容', id: 'Konten sesuai level Anda', tl: 'Content ayon sa iyong level', my: 'သင့်အဆင့်နှင့်ကိုက်ညီသော' },
    dailyGoal: { ja: '今日の目標', vi: 'Mục tiêu hôm nay', en: "Today's Goal", zh: '今日目标', id: 'Target Hari Ini', tl: 'Target Ngayon', my: 'ယနေ့ပန်းတိုင်' },
    lessonsCompleted: { ja: 'レッスン完了', vi: 'Bài đã hoàn thành', en: 'Lessons Done', zh: '已完成课程', id: 'Pelajaran Selesai', tl: 'Natapos na Aralin', my: 'ပြီးသောသင်ခန်းစာ' },
    streak: { ja: '連続日数', vi: 'Chuỗi ngày', en: 'Day Streak', zh: '连续天数', id: 'Hari Beruntun', tl: 'Sunod-sunod na Araw', my: 'ဆက်တိုက်ရက်' },
    courses: { ja: 'コース', vi: 'Khóa học', en: 'Courses', zh: '课程', id: 'Kursus', tl: 'Kurso', my: 'သင်တန်း' },
    aiTutor: { ja: 'AI日本語チューター', vi: 'Gia sư AI tiếng Nhật', en: 'AI Japanese Tutor', zh: 'AI日语导师', id: 'Tutor AI Bahasa Jepang', tl: 'AI Japanese Tutor', my: 'AI ဂျပန်စာဆရာ' },
    aiTutorDesc: { ja: 'AIと会話練習しよう', vi: 'Luyện hội thoại với AI', en: 'Practice conversation with AI', zh: '与AI练习对话', id: 'Latihan percakapan dengan AI', tl: 'Mag-practice ng conversation sa AI', my: 'AI နှင့်စကားပြောလေ့ကျင့်' },
    mockExam: { ja: 'JLPT模擬試験', vi: 'Thi thử JLPT', en: 'JLPT Mock Exam', zh: 'JLPT模拟考试', id: 'Ujian Mock JLPT', tl: 'JLPT Mock Exam', my: 'JLPT စာမေးပွဲစမ်း' },
    mockExamDesc: { ja: '本番形式で腕試し', vi: 'Luyện thi theo format thật', en: 'Test yourself in real format', zh: '真题格式练习', id: 'Uji diri dalam format asli', tl: 'Subukan sa totoong format', my: 'တကယ့်ပုံစံဖြင့်စမ်းကြည့်' },
    startLesson: { ja: 'レッスン開始', vi: 'Bắt đầu', en: 'Start', zh: '开始学习', id: 'Mulai', tl: 'Simulan', my: 'စတင်မည်' },
    continue: { ja: '続きから', vi: 'Tiếp tục', en: 'Continue', zh: '继续', id: 'Lanjutkan', tl: 'Magpatuloy', my: 'ဆက်လုပ်မည်' },
    beginner: { ja: '初級', vi: 'Sơ cấp', en: 'Beginner', zh: '初级', id: 'Pemula', tl: 'Baguhan', my: 'အခြေခံ' },
    intermediate: { ja: '中級', vi: 'Trung cấp', en: 'Intermediate', zh: '中级', id: 'Menengah', tl: 'Intermediate', my: 'အလယ်အလတ်' },
    advanced: { ja: '上級', vi: 'Cao cấp', en: 'Advanced', zh: '高级', id: 'Lanjutan', tl: 'Advanced', my: 'အဆင့်မြင့်' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const courses = [
  { id: '1', titleKey: 'dailyConversation', title: { ja: '日常会話', en: 'Daily Conversation' }, level: 'beginner', lessons: 20, completed: 8, color: 'from-blue-500 to-blue-600' },
  { id: '2', titleKey: 'workplace', title: { ja: '職場の日本語', en: 'Workplace Japanese' }, level: 'intermediate', lessons: 15, completed: 3, color: 'from-emerald-500 to-emerald-600' },
  { id: '3', titleKey: 'medical', title: { ja: '医療の日本語', en: 'Medical Japanese' }, level: 'intermediate', lessons: 12, completed: 0, color: 'from-amber-500 to-amber-600' },
  { id: '4', titleKey: 'keigo', title: { ja: '敬語マスター', en: 'Keigo Master' }, level: 'advanced', lessons: 18, completed: 0, color: 'from-purple-500 to-purple-600' },
];

export default function LearnPage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* 進捗サマリー */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center bg-blue-50 border-blue-100">
          <Target className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-blue-600">2/3</p>
          <p className="text-[10px] text-text-light">{t(locale, 'dailyGoal')}</p>
        </Card>
        <Card className="text-center bg-emerald-50 border-emerald-100">
          <Trophy className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-emerald-600">11</p>
          <p className="text-[10px] text-text-light">{t(locale, 'lessonsCompleted')}</p>
        </Card>
        <Card className="text-center bg-amber-50 border-amber-100">
          <Star className="h-5 w-5 text-amber-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-amber-600">7</p>
          <p className="text-[10px] text-text-light">{t(locale, 'streak')}</p>
        </Card>
      </div>

      {/* AI機能 */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/${locale}/learn/ai-tutor`}>
          <Card hoverable className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 h-full">
            <MessageSquare className="h-6 w-6 mb-2" />
            <p className="font-bold text-sm">{t(locale, 'aiTutor')}</p>
            <p className="text-xs text-blue-200 mt-1">{t(locale, 'aiTutorDesc')}</p>
          </Card>
        </Link>
        <Link href={`/${locale}/learn/mock-exam`}>
          <Card hoverable className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 h-full">
            <GraduationCap className="h-6 w-6 mb-2" />
            <p className="font-bold text-sm">{t(locale, 'mockExam')}</p>
            <p className="text-xs text-amber-200 mt-1">{t(locale, 'mockExamDesc')}</p>
          </Card>
        </Link>
      </div>

      {/* コース一覧 */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{t(locale, 'courses')}</h3>
        <div className="space-y-3">
          {courses.map((course, index) => {
            const progress = course.completed / course.lessons;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card hoverable>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-800 text-sm truncate">
                          {locale === 'ja' ? course.title.ja : course.title.en}
                        </p>
                        <Badge variant={course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'info'}>
                          {t(locale, course.level)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all`}
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-light whitespace-nowrap">
                          {course.completed}/{course.lessons}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant={course.completed > 0 ? 'primary' : 'outline'}>
                      {course.completed > 0 ? (
                        <Play className="h-3.5 w-3.5" />
                      ) : (
                        t(locale, 'startLesson')
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
