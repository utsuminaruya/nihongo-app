"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { getLessonById, getCourseBySlug } from "@/lib/lesson-data";
import LessonContent from "@/components/lesson/LessonContent";
import QuizComponent from "@/components/lesson/QuizComponent";
import XpAnimation from "@/components/lesson/XpAnimation";

type Phase = "study" | "quiz" | "complete";

export default function LessonPage() {
  const t = useTranslations("lessons");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const level = params.level as string;
  const lessonId = params.lessonId as string;

  const [phase, setPhase] = useState<Phase>("study");
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);

  const course = getCourseBySlug(level);
  const lesson = getLessonById(level, lessonId);

  const handleStudyComplete = useCallback(() => {
    setPhase("quiz");
  }, []);

  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      setQuizScore(score);
      setQuizTotal(total);
      setPhase("complete");
      setShowXpAnimation(true);
    },
    []
  );

  const handleXpAnimationComplete = useCallback(() => {
    setShowXpAnimation(false);
  }, []);

  if (!course || !lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-navy-800">Lesson not found</h1>
        <Link
          href={`/${locale}/lessons`}
          className="text-sakura-500 hover:underline mt-4 inline-block"
        >
          {t("backToCourses")}
        </Link>
      </div>
    );
  }

  const xpEarned = Math.round(lesson.xpReward * (quizScore / Math.max(quizTotal, 1)));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* XP Animation */}
      <XpAnimation
        xp={xpEarned}
        show={showXpAnimation}
        onComplete={handleXpAnimationComplete}
      />

      {/* Back navigation */}
      <Link
        href={`/${locale}/lessons/${level}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sakura-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("backToLessons")}
      </Link>

      {/* Lesson header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sakura-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-sakura-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy-800">
              {lesson.titleJa}
            </h1>
            <p className="text-sm text-gray-500">{lesson.title}</p>
          </div>
        </div>

        {/* Phase indicator */}
        <div className="flex gap-2 mt-4">
          {(["study", "quiz", "complete"] as Phase[]).map((p) => (
            <div
              key={p}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                p === phase
                  ? "bg-sakura-500"
                  : phase === "complete" ||
                    (phase === "quiz" && p === "study")
                  ? "bg-sakura-300"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Phase content */}
      {phase === "study" && (
        <LessonContent lesson={lesson} onComplete={handleStudyComplete} />
      )}

      {phase === "quiz" && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <h2 className="text-xl font-bold text-navy-800">{t("quiz")}</h2>
            <p className="text-sm text-gray-500">
              {lesson.quiz.length}{" "}
              {lesson.quiz.length === 1 ? "question" : "questions"}
            </p>
          </motion.div>
          <QuizComponent
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

      {phase === "complete" && !showXpAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-gold-300 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-navy-800 mb-2">
              {t("lessonComplete")}
            </h2>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-sakura-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-sakura-600">
                  {quizScore}/{quizTotal}
                </p>
                <p className="text-xs text-gray-500">{t("score")}</p>
              </div>
              <div className="bg-gold-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-gold-600">
                  +{xpEarned}
                </p>
                <p className="text-xs text-gray-500">{t("xpEarned")}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => router.push(`/${locale}/lessons/${level}`)}
                className="px-6 py-3 bg-sakura-500 text-white rounded-xl font-medium hover:bg-sakura-600 transition-colors shadow-md"
              >
                {t("backToLessons")}
              </button>
              <button
                onClick={() => router.push(`/${locale}/lessons`)}
                className="px-6 py-3 border border-gray-300 text-navy-800 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                {t("backToCourses")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
