"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";
import { canAccessFeature, getTierDisplayName } from "@/lib/subscription";
import { useSubscription } from "@/hooks/useSubscription";

interface FeatureGateProps {
  requiredTier: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 機能ゲートコンポーネント
 * ユーザーのサブスクリプションティアが不足している場合、アップグレードプロンプトを表示
 *
 * Usage:
 * <FeatureGate requiredTier="PRO">
 *   <AITutor />
 * </FeatureGate>
 */
export default function FeatureGate({
  requiredTier,
  children,
  fallback,
}: FeatureGateProps) {
  const { userTier, isLoading } = useSubscription();
  const t = useTranslations("pricing");
  const { locale } = useParams();
  const router = useRouter();

  // ロード中はchildren表示（ちらつき防止）
  if (isLoading) {
    return <>{children}</>;
  }

  // アクセス権あり
  if (canAccessFeature(userTier, requiredTier)) {
    return <>{children}</>;
  }

  // カスタムフォールバック
  if (fallback) {
    return <>{fallback}</>;
  }

  // デフォルトのアップグレードプロンプト
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-sakura-50 via-white to-gold-50 border border-sakura-200"
    >
      <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mb-4">
        <Crown className="w-8 h-8 text-sakura-500" />
      </div>
      <h3 className="text-lg font-bold text-navy-800 mb-2">
        {getTierDisplayName(requiredTier)}+ {t("features")}
      </h3>
      <p className="text-sm text-gray-600 text-center mb-6 max-w-sm">
        {t("upgradePrompt")}
      </p>
      <button
        onClick={() => router.push(`/${locale}/pricing`)}
        className="px-6 py-2.5 bg-sakura-500 text-white font-semibold rounded-xl hover:bg-sakura-600 transition-colors text-sm"
      >
        {t("upgrade")}
      </button>
    </motion.div>
  );
}
