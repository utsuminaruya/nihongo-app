"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { JLPT_LEVELS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Globe, Target, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Step = "language" | "level" | "target";

const LANGUAGE_OPTIONS: { code: string; name: string; flag: string }[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭" },
  { code: "my", name: "မြန်မာ", flag: "🇲🇲" },
];

const LEVEL_DESCRIPTIONS: Record<string, { ja: string; en: string }> = {
  N5: { ja: "初心者", en: "Beginner" },
  N4: { ja: "初級", en: "Elementary" },
  N3: { ja: "中級", en: "Intermediate" },
  N2: { ja: "上級", en: "Upper Intermediate" },
  N1: { ja: "最上級", en: "Advanced" },
};

export default function OnboardingPage() {
  const { locale } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("language");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const steps: Step[] = ["language", "level", "target"];
  const currentStepIndex = steps.indexOf(step);

  async function handleComplete() {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("ログインが必要です");
      router.push(`/${locale}/login`);
      return;
    }

    const { error } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      native_language: nativeLanguage,
      current_level: currentLevel,
      target_level: targetLevel,
    });

    if (error) {
      toast.error("プロフィールの保存に失敗しました");
    } else {
      toast.success("ようこそ NihonGO! へ！");
      router.push(`/${locale}/dashboard`);
    }
    setIsLoading(false);
  }

  function goNext() {
    if (step === "language" && nativeLanguage) setStep("level");
    else if (step === "level" && currentLevel) setStep("target");
    else if (step === "target" && targetLevel) handleComplete();
  }

  function goBack() {
    if (step === "level") setStep("language");
    else if (step === "target") setStep("level");
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* プログレスバー */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= currentStepIndex ? "bg-sakura-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: 母語選択 */}
          {step === "language" && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sakura-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-sakura-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-800">
                    あなたの母語は？
                  </h2>
                  <p className="text-sm text-gray-500">
                    What is your native language?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setNativeLanguage(lang.code)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      nativeLanguage === lang.code
                        ? "border-sakura-500 bg-sakura-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium text-navy-800">
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: 現在のレベル */}
          {step === "level" && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-800">
                    今の日本語レベルは？
                  </h2>
                  <p className="text-sm text-gray-500">
                    What is your current Japanese level?
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {JLPT_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentLevel(level)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      currentLevel === level
                        ? "border-sakura-500 bg-sakura-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-navy-800">
                        {level}
                      </span>
                      <span className="text-sm text-gray-500">
                        {LEVEL_DESCRIPTIONS[level].ja} /{" "}
                        {LEVEL_DESCRIPTIONS[level].en}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: 目標レベル */}
          {step === "target" && (
            <motion.div
              key="target"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-800">
                    目標レベルは？
                  </h2>
                  <p className="text-sm text-gray-500">
                    What is your target level?
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {JLPT_LEVELS.filter(
                  (level) =>
                    JLPT_LEVELS.indexOf(level) <
                    JLPT_LEVELS.indexOf(
                      currentLevel as (typeof JLPT_LEVELS)[number]
                    )
                ).map((level) => (
                  <button
                    key={level}
                    onClick={() => setTargetLevel(level)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      targetLevel === level
                        ? "border-sakura-500 bg-sakura-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-navy-800">
                        {level}
                      </span>
                      <span className="text-sm text-gray-500">
                        {LEVEL_DESCRIPTIONS[level].ja} /{" "}
                        {LEVEL_DESCRIPTIONS[level].en}
                      </span>
                    </div>
                  </button>
                ))}
                {/* 目標レベルの選択肢が無い場合（N1の場合） */}
                {JLPT_LEVELS.filter(
                  (level) =>
                    JLPT_LEVELS.indexOf(level) <
                    JLPT_LEVELS.indexOf(
                      currentLevel as (typeof JLPT_LEVELS)[number]
                    )
                ).length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-3">
                      既にN1レベルです！上級スキルの向上を目指しましょう。
                    </p>
                    <button
                      onClick={() => setTargetLevel("N1")}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        targetLevel === "N1"
                          ? "border-sakura-500 bg-sakura-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg font-bold text-navy-800">
                        N1 マスター
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between mt-8">
          {currentStepIndex > 0 ? (
            <button
              onClick={goBack}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-navy-800 hover:text-sakura-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              戻る
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={goNext}
            disabled={
              isLoading ||
              (step === "language" && !nativeLanguage) ||
              (step === "level" && !currentLevel) ||
              (step === "target" && !targetLevel)
            }
            className="flex items-center gap-1 px-6 py-2.5 bg-sakura-500 text-white text-sm font-semibold rounded-xl hover:bg-sakura-600 transition-colors disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {step === "target" ? "始める！" : "次へ"}
            {step !== "target" && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
