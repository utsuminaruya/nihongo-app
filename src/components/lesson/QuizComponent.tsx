"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Star,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { QuizQuestion } from "@/lib/lesson-data";

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const t = useTranslations("lessons");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [fillInAnswer, setFillInAnswer] = useState("");

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (answer === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    },
    [isAnswered, currentQuestion]
  );

  const handleFillInSubmit = useCallback(() => {
    if (isAnswered || !fillInAnswer.trim()) return;
    setSelectedAnswer(fillInAnswer.trim());
    setIsAnswered(true);
    if (fillInAnswer.trim() === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }, [isAnswered, fillInAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFillInAnswer("");
    }
  }, [isLastQuestion]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setFillInAnswer("");
  }, []);

  const handleViewResults = useCallback(() => {
    onComplete(score, questions.length);
  }, [score, questions.length, onComplete]);

  const scorePercent = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (scorePercent === 100) return t("perfect");
    if (scorePercent >= 80) return t("great");
    if (scorePercent >= 60) return t("good");
    return t("keepPracticing");
  };

  // Results screen
  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              scorePercent >= 80
                ? "bg-gold-100"
                : scorePercent >= 60
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            <Trophy
              className={`w-12 h-12 ${
                scorePercent >= 80
                  ? "text-gold-500"
                  : scorePercent >= 60
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-navy-800 mb-2">
            {t("quizResults")}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{getResultMessage()}</p>

          {/* Score display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-4xl font-bold text-sakura-500">{score}</span>
            <span className="text-2xl text-gray-400">/</span>
            <span className="text-4xl font-bold text-gray-300">
              {questions.length}
            </span>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              >
                <Star
                  className={`w-10 h-10 ${
                    i < Math.ceil((score / questions.length) * 3)
                      ? "text-gold-400 fill-gold-400"
                      : "text-gray-200"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-navy-800 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t("tryAgain")}
            </button>
            <button
              onClick={handleViewResults}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-sakura-500 text-white rounded-xl font-medium hover:bg-sakura-600 transition-colors shadow-md"
            >
              {t("viewResults")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            {t("questionOf", {
              current: currentIndex + 1,
              total: questions.length,
            })}
          </span>
          <span>
            {t("score")}: {score}/{currentIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sakura-500 rounded-full"
            animate={{
              width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            {/* Question type badge */}
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${
                currentQuestion.type === "multiple-choice"
                  ? "bg-blue-100 text-blue-700"
                  : currentQuestion.type === "fill-in-blank"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {currentQuestion.type === "multiple-choice"
                ? t("selectAnswer")
                : currentQuestion.type === "fill-in-blank"
                ? t("fillInBlank")
                : t("readingQuestion")}
            </span>

            {/* Question text */}
            <h3 className="text-xl font-bold text-navy-800 mb-6 font-jp">
              {currentQuestion.question}
            </h3>

            {/* Answer options */}
            {currentQuestion.type === "fill-in-blank" &&
            !currentQuestion.options ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={fillInAnswer}
                  onChange={(e) => setFillInAnswer(e.target.value)}
                  disabled={isAnswered}
                  placeholder={t("yourAnswer")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent text-lg font-jp disabled:bg-gray-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFillInSubmit();
                  }}
                />
                {!isAnswered && (
                  <button
                    onClick={handleFillInSubmit}
                    disabled={!fillInAnswer.trim()}
                    className="px-6 py-2.5 bg-sakura-500 text-white rounded-xl font-medium hover:bg-sakura-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("viewResults")}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-3">
                {currentQuestion.options?.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption =
                    option === currentQuestion.correctAnswer;

                  let optionStyle =
                    "border-gray-200 bg-white hover:border-sakura-300 hover:bg-sakura-50";
                  if (isAnswered) {
                    if (isCorrectOption) {
                      optionStyle =
                        "border-green-500 bg-green-50 ring-2 ring-green-200";
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle =
                        "border-red-500 bg-red-50 ring-2 ring-red-200";
                    } else {
                      optionStyle = "border-gray-200 bg-gray-50 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={isAnswered}
                      className={`flex items-center gap-3 w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                      whileHover={!isAnswered ? { scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          isAnswered && isCorrectOption
                            ? "bg-green-500 text-white"
                            : isAnswered && isSelected && !isCorrectOption
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isAnswered && isCorrectOption ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : isAnswered && isSelected && !isCorrectOption ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="font-medium text-navy-800 font-jp">
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-xl ${
                    isCorrect
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={`font-bold ${
                        isCorrect ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isCorrect ? t("correct") : t("incorrect")}
                    </span>
                  </div>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">{t("correctAnswer")}: </span>
                      <span className="font-jp">
                        {currentQuestion.correctAnswer}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex justify-end"
        >
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-sakura-500 text-white rounded-xl font-medium hover:bg-sakura-600 transition-colors shadow-md"
          >
            {isLastQuestion ? t("viewResults") : t("nextQuestion")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
