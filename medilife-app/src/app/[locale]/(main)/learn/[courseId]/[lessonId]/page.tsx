'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById, LessonContent } from '../../_data/lessons';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    back: { ja: 'コースに戻る', en: 'Back to Course', vi: 'Quay lại', zh: '返回课程', id: 'Kembali', tl: 'Bumalik', my: 'ပြန်' },
    notFound: { ja: 'レッスンが見つかりません', en: 'Lesson not found', vi: 'Không tìm thấy', zh: '未找到', id: 'Tidak ditemukan', tl: 'Hindi nahanap', my: 'မတွေ့ပါ' },
    vocab: { ja: '単語', en: 'Vocabulary', vi: 'Từ vựng', zh: '词汇', id: 'Kosakata', tl: 'Bokabularyo', my: 'ဝေါဟာရ' },
    grammar: { ja: '文法', en: 'Grammar', vi: 'Ngữ pháp', zh: '语法', id: 'Tata Bahasa', tl: 'Gramatikal', my: 'သဒ္ဒါ' },
    dialogue: { ja: '会話', en: 'Dialogue', vi: 'Hội thoại', zh: '对话', id: 'Dialog', tl: 'Diyalogo', my: 'စကားဝိုင်း' },
    quiz: { ja: 'クイズ', en: 'Quiz', vi: 'Bài kiểm tra', zh: '测验', id: 'Kuis', tl: 'Quiz', my: 'မေးဝိုင်း' },
    example: { ja: '例文', en: 'Example', vi: 'Ví dụ', zh: '例句', id: 'Contoh', tl: 'Halimbawa', my: 'နမူနာ' },
    pattern: { ja: 'パターン', en: 'Pattern', vi: 'Mẫu', zh: '句型', id: 'Pola', tl: 'Pattern', my: 'ပုံစံ' },
    correct: { ja: '正解！', en: 'Correct!', vi: 'Đúng rồi!', zh: '正确！', id: 'Benar!', tl: 'Tama!', my: 'မှန်သည်!' },
    incorrect: { ja: '不正解', en: 'Incorrect', vi: 'Sai rồi', zh: '不正确', id: 'Salah', tl: 'Mali', my: 'မမှန်ပါ' },
    next: { ja: '次の問題', en: 'Next', vi: 'Tiếp theo', zh: '下一题', id: 'Berikutnya', tl: 'Susunod', my: 'နောက်တစ်ခု' },
    finish: { ja: 'レッスン完了！', en: 'Lesson Complete!', vi: 'Hoàn thành!', zh: '完成！', id: 'Selesai!', tl: 'Tapos na!', my: 'ပြီးဆုံးပြီ!' },
    score: { ja: 'スコア', en: 'Score', vi: 'Điểm', zh: '得分', id: 'Skor', tl: 'Iskor', my: 'မှတ်' },
    explanation: { ja: '解説', en: 'Explanation', vi: 'Giải thích', zh: '解析', id: 'Penjelasan', tl: 'Paliwanag', my: 'ရှင်းပြချက်' },
    select: { ja: '答えを選んでください', en: 'Select your answer', vi: 'Chọn câu trả lời', zh: '请选择答案', id: 'Pilih jawaban', tl: 'Pumili ng sagot', my: 'အဖြေရွေးပါ' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

function VocabSection({ section, locale }: { section: LessonContent; locale: string }) {
  const title = section.title?.[locale] || section.title?.['en'];
  const items = section.items || [];
  return (
    <div>
      {title && <h3 className="text-base font-bold text-slate-800 mb-3">{title}</h3>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card padding="sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-center min-w-[60px]">
                  <p className="text-2xl font-bold text-slate-800">{item.japanese}</p>
                  <p className="text-xs text-slate-400">{item.reading}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-700 text-sm">
                    {item.meaning[locale] || item.meaning['en'] || item.meaning['ja']}
                  </p>
                  {item.example && (
                    <div className="mt-1.5 bg-blue-50 rounded-lg p-2">
                      <p className="text-xs font-medium text-blue-800">{item.example}</p>
                      {item.exampleReading && <p className="text-[11px] text-blue-500">{item.exampleReading}</p>}
                      {item.exampleMeaning && (
                        <p className="text-[11px] text-blue-600 mt-0.5">
                          {item.exampleMeaning[locale] || item.exampleMeaning['en']}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <button className="rounded-full p-1.5 hover:bg-slate-100 flex-shrink-0">
                  <Volume2 className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GrammarSection({ section, locale }: { section: LessonContent; locale: string }) {
  const title = section.title?.[locale] || section.title?.['en'];
  const grammar = section.grammar || [];
  return (
    <div>
      {title && <h3 className="text-base font-bold text-slate-800 mb-3">{title}</h3>}
      <div className="space-y-4">
        {grammar.map((g, i) => (
          <Card key={i}>
            <div className="bg-amber-50 rounded-lg px-3 py-1.5 inline-block mb-2">
              <p className="text-sm font-bold text-amber-800">{g.pattern}</p>
            </div>
            <p className="text-sm text-slate-600 mb-3">{g.explanation[locale] || g.explanation['en']}</p>
            <div className="space-y-2">
              {g.examples.map((ex, ei) => (
                <div key={ei} className="border-l-2 border-blue-300 pl-3">
                  <p className="text-sm font-medium text-slate-800">{ex.japanese}</p>
                  <p className="text-xs text-slate-400">{ex.reading}</p>
                  <p className="text-xs text-slate-600">{ex.meaning[locale] || ex.meaning['en']}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DialogueSection({ section, locale }: { section: LessonContent; locale: string }) {
  const title = section.title?.[locale] || section.title?.['en'];
  const lines = section.dialogue || [];
  const speakers = Array.from(new Set(lines.map(l => l.speaker)));
  const colors = ['bg-blue-100 text-blue-800', 'bg-emerald-100 text-emerald-800', 'bg-purple-100 text-purple-800'];

  return (
    <div>
      {title && <h3 className="text-base font-bold text-slate-800 mb-3">{title}</h3>}
      <Card>
        <div className="space-y-3">
          {lines.map((line, i) => {
            const colorIdx = speakers.indexOf(line.speaker);
            const isRight = colorIdx % 2 === 1;
            return (
              <motion.div key={i} className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} gap-2`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${colors[colorIdx % colors.length]}`}>
                  {line.speaker.slice(0, 1)}
                </div>
                <div className={`max-w-[75%] rounded-xl p-2.5 ${isRight ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-slate-100 rounded-tl-sm'}`}>
                  <p className={`text-xs font-medium ${isRight ? 'text-white' : 'text-slate-400'} mb-0.5`}>{line.speaker}</p>
                  <p className={`text-sm font-semibold ${isRight ? 'text-white' : 'text-slate-800'}`}>{line.japanese}</p>
                  <p className={`text-[11px] mt-0.5 ${isRight ? 'text-blue-200' : 'text-slate-400'}`}>{line.reading}</p>
                  <p className={`text-xs mt-0.5 ${isRight ? 'text-blue-100' : 'text-slate-600'}`}>
                    {line.meaning[locale] || line.meaning['en']}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function QuizSection({ section, locale, onComplete }: { section: LessonContent; locale: string; onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = section.quiz || [];
  const q = quiz[currentQ];
  if (!q) return null;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= quiz.length) {
      setFinished(true);
      onComplete(correctCount + (selected === q.correct ? 1 : 0));
    } else {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (finished) {
    const score = correctCount + (selected === q.correct ? 1 : 0);
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-3">{score === quiz.length ? '🎉' : score >= quiz.length / 2 ? '👍' : '📚'}</div>
        <p className="text-xl font-bold text-slate-800">{t(locale, 'finish')}</p>
        <p className="text-slate-500 mt-1">{t(locale, 'score')}: {score}/{quiz.length}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-slate-800">{t(locale, 'quiz')}</h3>
        <span className="text-xs text-slate-400">{currentQ + 1}/{quiz.length}</span>
      </div>
      <Card>
        <div className="flex items-start gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="font-semibold text-slate-800 text-sm">
            {q.question[locale] || q.question['en']}
          </p>
        </div>
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            let btnClass = 'w-full text-left p-3 rounded-xl border text-sm font-medium transition-all';
            if (selected === null) {
              btnClass += ' border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700';
            } else if (idx === q.correct) {
              btnClass += ' border-emerald-400 bg-emerald-50 text-emerald-800';
            } else if (idx === selected && selected !== q.correct) {
              btnClass += ' border-red-400 bg-red-50 text-red-800';
            } else {
              btnClass += ' border-slate-100 text-slate-400';
            }
            return (
              <button key={idx} className={btnClass} onClick={() => handleSelect(idx)}>
                <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 p-3 rounded-xl flex items-start gap-2 ${selected === q.correct ? 'bg-emerald-50' : 'bg-red-50'}`}
            >
              {selected === q.correct
                ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
              <div>
                <p className={`text-xs font-bold ${selected === q.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                  {selected === q.correct ? t(locale, 'correct') : t(locale, 'incorrect')}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {q.explanation[locale] || q.explanation['en']}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {showResult && (
          <Button className="w-full mt-3" onClick={handleNext}>
            {currentQ + 1 >= quiz.length ? t(locale, 'finish') : t(locale, 'next')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </Card>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const locale = params.locale as string;
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const lesson = getLessonById(courseId, lessonId);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!lesson) {
    return (
      <div className="space-y-4">
        <Link href={`/${locale}/learn/${courseId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500">
          <ChevronLeft className="h-4 w-4" />
          {t(locale, 'back')}
        </Link>
        <Card className="text-center py-8 text-slate-500">{t(locale, 'notFound')}</Card>
      </div>
    );
  }

  const lessonTitle = lesson.title[locale] || lesson.title['en'];

  return (
    <div className="space-y-6">
      <Link href={`/${locale}/learn/${courseId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />
        {t(locale, 'back')}
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold text-slate-800">{lessonTitle}</h2>
        <p className="text-xs text-slate-400 mt-1">{lesson.duration} {t(locale, 'min')} · {lesson.content.length} sections</p>
      </motion.div>

      {lesson.content.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.08 }}
        >
          {section.type === 'intro' && (
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              {section.title && <h3 className="font-bold text-blue-800 mb-1">{section.title[locale] || section.title['en']}</h3>}
              {section.text && <p className="text-sm text-blue-700">{section.text[locale] || section.text['en']}</p>}
            </div>
          )}
          {section.type === 'vocab' && <VocabSection section={section} locale={locale} />}
          {section.type === 'grammar' && <GrammarSection section={section} locale={locale} />}
          {section.type === 'dialogue' && <DialogueSection section={section} locale={locale} />}
          {section.type === 'quiz' && (
            <QuizSection section={section} locale={locale} onComplete={(score) => setQuizScore(score)} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
