'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  MessageSquare,
  Trophy,
  Star,
  Target,
  Clock,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { motion } from 'framer-motion';
import { courses } from './_data/lessons';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '日本語学習', vi: 'Học tiếng Nhật', en: 'Learn Japanese', zh: '学日语', id: 'Belajar Bahasa Jepang', tl: 'Matuto ng Japanese', my: 'ဂျပန်စာသင်ယူ' },
    subtitle: { ja: 'レベルに合った学習コンテンツ', vi: 'Nội dung phù hợp với trình độ', en: 'Content matched to your level', zh: '适合你水平的学习内容', id: 'Konten sesuai level Anda', tl: 'Content ayon sa iyong level', my: 'သင့်အဆင့်နှင့်ကိုက်ညီသော' },
    dailyGoal: { ja: '今日の目標', vi: 'Mục tiêu hôm nay', en: "Today's Goal", zh: '今日目标', id: 'Target Hari Ini', tl: 'Target Ngayon', my: 'ယနေ့ပန်းတိုင်' },
    lessonsCompleted: { ja: 'レッスン完了', vi: 'Bài đã hoàn thành', en: 'Lessons Done', zh: '已完成课程', id: 'Pelajaran Selesai', tl: 'Natapos na Aralin', my: 'ပြီးသောသင်ခန်းစာ' },
    streak: { ja: '連続日数', vi: 'Chuỗi ngày', en: 'Day Streak', zh: '连续天数', id: 'Hari Beruntun', tl: 'Sunod-sunod na Araw', my: 'ဆက်တိုက်ရက်' },
    courses: { ja: 'コース一覧', vi: 'Danh sách khóa học', en: 'Courses', zh: '课程列表', id: 'Daftar Kursus', tl: 'Listahan ng Kurso', my: 'သင်တန်းစာရင်း' },
    aiTutor: { ja: 'AI日本語チューター', vi: 'Gia sư AI tiếng Nhật', en: 'AI Japanese Tutor', zh: 'AI日语导师', id: 'Tutor AI Bahasa Jepang', tl: 'AI Japanese Tutor', my: 'AI ဂျပန်စာဆရာ' },
    aiTutorDesc: { ja: 'AIと会話練習しよう', vi: 'Luyện hội thoại với AI', en: 'Practice conversation with AI', zh: '与AI练习对话', id: 'Latihan percakapan dengan AI', tl: 'Mag-practice ng conversation sa AI', my: 'AI နှင့်စကားပြောလေ့ကျင့်' },
    mockExam: { ja: 'JLPT模擬試験', vi: 'Thi thử JLPT', en: 'JLPT Mock Exam', zh: 'JLPT模拟考试', id: 'Ujian Mock JLPT', tl: 'JLPT Mock Exam', my: 'JLPT စာမေးပွဲစမ်း' },
    mockExamDesc: { ja: 'N5〜N3の本番形式で腕試し', vi: 'Luyện thi N5〜N3 theo format thật', en: 'Practice N5–N3 in real exam format', zh: 'N5〜N3真题格式练习', id: 'Uji N5-N3 dalam format asli', tl: 'Subukan sa N5-N3 format', my: 'N5〜N3 တကယ့်ပုံစံဖြင့်' },
    startLesson: { ja: '開始', vi: 'Bắt đầu', en: 'Start', zh: '开始', id: 'Mulai', tl: 'Simulan', my: 'စတင်' },
    continue: { ja: '続きから', vi: 'Tiếp tục', en: 'Continue', zh: '继续', id: 'Lanjutkan', tl: 'Magpatuloy', my: 'ဆက်လုပ်' },
    beginner: { ja: '初級', vi: 'Sơ cấp', en: 'Beginner', zh: '初级', id: 'Pemula', tl: 'Baguhan', my: 'အခြေခံ' },
    intermediate: { ja: '中級', vi: 'Trung cấp', en: 'Intermediate', zh: '中级', id: 'Menengah', tl: 'Intermediate', my: 'အလယ်' },
    advanced: { ja: '上級', vi: 'Cao cấp', en: 'Advanced', zh: '高级', id: 'Lanjutan', tl: 'Advanced', my: 'အဆင့်မြင့်' },
    lessons: { ja: 'レッスン', vi: 'bài học', en: 'lessons', zh: '节课', id: 'pelajaran', tl: 'aralin', my: 'သင်ခန်းစာ' },
    hours: { ja: '時間', vi: 'giờ', en: 'hrs', zh: '小时', id: 'jam', tl: 'oras', my: 'နာရီ' },
    quickLearn: { ja: 'クイック学習', vi: 'Học nhanh', en: 'Quick Learn', zh: '快速学习', id: 'Belajar Cepat', tl: 'Mabilis na Matuto', my: 'မြန်ဆန်သောသင်ယူမှု' },
    phrasebook: { ja: '常用フレーズ集', vi: 'Tập hợp cụm từ thường dùng', en: 'Phrasebook', zh: '常用短语集', id: 'Buku Frasa', tl: 'Phrasebook', my: 'စကားစုစာအုပ်' },
    phrasebookDesc: { ja: '職場・医療・緊急時のフレーズを確認', vi: 'Xem cụm từ cho công việc, y tế, khẩn cấp', en: 'Quick-access phrases for work, medical, emergency', zh: '职场、医疗、紧急情况的短语', id: 'Frasa cepat untuk kerja, medis, darurat', tl: 'Mabilis na access sa mga parirala para sa trabaho', my: 'အလုပ်ခွင်၊ ဆေးဘက်ဆိုင်ရာ၊ အရေးပေါ် စကားစုများ' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

// Quick phrases by situation
const quickPhrases = [
  {
    situation: { ja: '職場', en: 'Work', vi: 'Làm việc', zh: '工作' },
    phrases: [
      { ja: 'お先に失礼します', reading: 'Osaki ni shitsurei shimasu', en: 'Excuse me for leaving first' },
      { ja: 'ご確認をお願いします', reading: 'Go-kakunin wo onegaishimasu', en: 'Please review this' },
      { ja: '少々お待ちください', reading: 'Shoushou omachi kudasai', en: 'Please wait a moment' },
    ],
  },
  {
    situation: { ja: '医療', en: 'Medical', vi: 'Y tế', zh: '医疗' },
    phrases: [
      { ja: '頭が痛いです', reading: 'Atama ga itai desu', en: 'I have a headache' },
      { ja: '保険証はこれです', reading: 'Hoken-shou wa kore desu', en: 'This is my insurance card' },
      { ja: 'アレルギーがあります', reading: 'Arerugii ga arimasu', en: 'I have an allergy' },
    ],
  },
  {
    situation: { ja: '緊急時', en: 'Emergency', vi: 'Khẩn cấp', zh: '紧急' },
    phrases: [
      { ja: '助けてください！', reading: 'Tasukete kudasai!', en: 'Help me please!' },
      { ja: '救急車を呼んでください', reading: 'Kyuukyuusha wo yonde kudasai', en: 'Please call an ambulance' },
      { ja: '日本語がわかりません', reading: 'Nihongo ga wakarimasen', en: 'I don\'t understand Japanese' },
    ],
  },
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

      {/* AI・クイック機能 */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/${locale}/ai-assistant`}>
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

      {/* クイック学習フレーズ */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-bold text-slate-800">{t(locale, 'quickLearn')}</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {quickPhrases.map((group, gi) => (
            <div key={gi} className="flex-shrink-0 w-64 bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                {group.situation[locale as keyof typeof group.situation] || group.situation.en}
              </p>
              <div className="space-y-2">
                {group.phrases.map((ph, pi) => (
                  <div key={pi} className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-slate-800">{ph.ja}</p>
                    <p className="text-[11px] text-slate-400">{ph.reading}</p>
                    <p className="text-xs text-slate-600">{ph.en}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* コース一覧 */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{t(locale, 'courses')}</h3>
        <div className="space-y-3">
          {courses.map((course, index) => {
            const completedLessons = index === 0 ? 2 : index === 1 ? 4 : index === 2 ? 1 : 0;
            const progress = completedLessons / course.totalLessons;
            const courseTitle = course.title[locale] || course.title['en'];
            const courseDesc = course.description[locale] || course.description['en'];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Link href={`/${locale}/learn/${course.id}`}>
                  <Card hoverable>
                    <div className="flex items-start gap-3">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center flex-shrink-0`}>
                        <BookOpen className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="font-bold text-slate-800 text-sm leading-tight">
                            {courseTitle}
                          </p>
                          <Badge variant={course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'info'}>
                            {t(locale, course.level)}
                          </Badge>
                          {course.jlptLevel !== 'none' && (
                            <Badge variant="outline">{course.jlptLevel}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{courseDesc}</p>
                        <div className="flex items-center gap-3 mb-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {course.totalLessons} {t(locale, 'lessons')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.estimatedHours} {t(locale, 'hours')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all`}
                              style={{ width: `${progress * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-light whitespace-nowrap">
                            {completedLessons}/{course.totalLessons}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
