"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Languages,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  Volume2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Lesson } from "@/lib/lesson-data";

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

type Step = "grammar" | "vocabulary" | "examples" | "practice";

const steps: Step[] = ["grammar", "vocabulary", "examples", "practice"];

export default function LessonContent({ lesson, onComplete }: LessonContentProps) {
  const t = useTranslations("lessons");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const stepIcons: Record<Step, React.ReactNode> = {
    grammar: <BookOpen className="w-5 h-5" />,
    vocabulary: <Languages className="w-5 h-5" />,
    examples: <MessageCircle className="w-5 h-5" />,
    practice: <PlayCircle className="w-5 h-5" />,
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            {t("step", { current: currentStepIndex + 1, total: steps.length })}
          </span>
        </div>
        <div className="flex gap-2">
          {steps.map((step, i) => (
            <button
              key={step}
              onClick={() => setCurrentStepIndex(i)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                i === currentStepIndex
                  ? "bg-sakura-500 text-white shadow-md"
                  : i < currentStepIndex
                  ? "bg-sakura-100 text-sakura-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {stepIcons[step]}
              <span className="hidden sm:inline">{t(step)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === "grammar" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-sakura-500" />
                {t("grammar")}
              </h2>
              {lesson.grammar.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="bg-sakura-50 rounded-lg px-4 py-3 mb-4 inline-block">
                    <span className="text-xl font-bold text-sakura-700 font-jp">
                      {point.pattern}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{point.explanation}</p>
                  <div className="space-y-2">
                    {point.examples.map((ex, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3"
                      >
                        <Volume2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-navy-800 font-jp">{ex}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {currentStep === "vocabulary" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
                <Languages className="w-6 h-6 text-sakura-500" />
                {t("vocabulary")}
              </h2>
              <div className="grid gap-3">
                {lesson.vocabulary.map((vocab, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-navy-800 font-jp">
                          {vocab.word}
                        </span>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-sakura-600 font-jp">
                            {vocab.reading}
                          </span>
                          <span className="text-sm text-gray-500">
                            {vocab.meaning}
                          </span>
                        </div>
                      </div>
                      <Volume2 className="w-5 h-5 text-gray-300 hover:text-sakura-500 cursor-pointer transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "examples" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-sakura-500" />
                {t("examples")}
              </h2>
              {lesson.examples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Volume2 className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 hover:text-sakura-500 cursor-pointer transition-colors" />
                      <div>
                        <p className="text-lg font-bold text-navy-800 font-jp">
                          {example.japanese}
                        </p>
                        <p className="text-sm text-sakura-600 font-jp mt-1">
                          {example.reading}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {example.english}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {currentStep === "practice" && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-navy-800 flex items-center justify-center gap-2">
                <PlayCircle className="w-6 h-6 text-sakura-500" />
                {t("practice")}
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="w-20 h-20 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlayCircle className="w-10 h-10 text-sakura-500" />
                </div>
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  {t("startQuiz")}
                </h3>
                <p className="text-gray-500 mb-6">
                  {lesson.quiz.length} {t("quiz").toLowerCase()} {t("quiz").toLowerCase() !== "questions" ? "" : ""}
                </p>
                <button
                  onClick={onComplete}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-sakura-500 text-white font-semibold rounded-xl hover:bg-sakura-600 transition-colors shadow-md"
                >
                  {t("startQuiz")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            currentStepIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-navy-800 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("previousStep")}
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-sakura-500 text-white rounded-xl font-medium hover:bg-sakura-600 transition-colors shadow-sm"
        >
          {currentStepIndex === steps.length - 1 ? t("startQuiz") : t("nextStep")}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
