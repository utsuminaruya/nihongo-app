"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { JLPT_LEVELS } from "@/lib/constants";
import { User, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LANGUAGE_OPTIONS: { code: string; name: string }[] = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "tl", name: "Tagalog" },
  { code: "my", name: "မြန်မာ" },
];

export default function ProfilePage() {
  const { locale } = useParams();
  const router = useRouter();
  const { authUser, profile, isLoading: authLoading } = useAuth();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("vi");
  const [currentLevel, setCurrentLevel] = useState("N5");
  const [targetLevel, setTargetLevel] = useState("N3");
  const [timezone, setTimezone] = useState("Asia/Tokyo");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setNativeLanguage(profile.nativeLanguage);
      setCurrentLevel(profile.currentLevel);
      setTargetLevel(profile.targetLevel);
      setTimezone(profile.timezone);
    }
  }, [profile]);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push(`/${locale}/login`);
    }
  }, [authLoading, authUser, locale, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!authUser) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("users")
      .update({
        name,
        native_language: nativeLanguage,
        current_level: currentLevel,
        target_level: targetLevel,
        timezone,
      })
      .eq("id", authUser.id);

    if (error) {
      toast.error("保存に失敗しました");
    } else {
      toast.success("プロフィールを更新しました");
    }
    setIsSaving(false);
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-sakura-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-sakura-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-sakura-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">プロフィール</h1>
          <p className="text-sm text-gray-500">{authUser?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 名前 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-navy-800 mb-1"
          >
            名前 / Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        {/* 母語 */}
        <div>
          <label
            htmlFor="nativeLanguage"
            className="block text-sm font-medium text-navy-800 mb-1"
          >
            母語 / Native Language
          </label>
          <select
            id="nativeLanguage"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent bg-white"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* 現在のレベル */}
        <div>
          <label
            htmlFor="currentLevel"
            className="block text-sm font-medium text-navy-800 mb-1"
          >
            現在のレベル / Current Level
          </label>
          <select
            id="currentLevel"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent bg-white"
          >
            {JLPT_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* 目標レベル */}
        <div>
          <label
            htmlFor="targetLevel"
            className="block text-sm font-medium text-navy-800 mb-1"
          >
            目標レベル / Target Level
          </label>
          <select
            id="targetLevel"
            value={targetLevel}
            onChange={(e) => setTargetLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent bg-white"
          >
            {JLPT_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* タイムゾーン */}
        <div>
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-navy-800 mb-1"
          >
            タイムゾーン / Timezone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent bg-white"
          >
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (ICT)</option>
            <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
            <option value="Asia/Manila">Asia/Manila (PHT)</option>
            <option value="Asia/Yangon">Asia/Yangon (MMT)</option>
          </select>
        </div>

        {/* サブスクリプション状態 */}
        {profile && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-navy-800 mb-1">
              プラン / Plan
            </p>
            <p className="text-sm text-gray-600">
              {profile.subscriptionTier === "FREE" && "Free プラン"}
              {profile.subscriptionTier === "BASIC" && "Basic プラン (¥980/月)"}
              {profile.subscriptionTier === "PRO" && "Pro プラン (¥1,980/月)"}
              {profile.subscriptionTier === "PREMIUM" &&
                "Premium プラン (¥2,980/月)"}
            </p>
          </div>
        )}

        {/* 保存ボタン */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 bg-sakura-500 text-white font-semibold rounded-xl hover:bg-sakura-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          保存する
        </button>
      </form>
    </div>
  );
}
