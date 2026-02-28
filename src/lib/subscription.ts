/**
 * サブスクリプション関連のヘルパー関数
 * クライアント・サーバー両方から安全にインポート可能
 */
import type { PlanTier } from "./plans";

/**
 * プランの優先度マップ（数値が高いほど上位プラン）
 */
const TIER_PRIORITY: Record<PlanTier, number> = {
  FREE: 0,
  BASIC: 1,
  PRO: 2,
  PREMIUM: 3,
};

/**
 * 各プランの1日のレッスン上限
 */
const DAILY_LESSON_LIMITS: Record<PlanTier, number> = {
  FREE: 3,
  BASIC: Infinity,
  PRO: Infinity,
  PREMIUM: Infinity,
};

/**
 * ユーザーのプランが必要なプラン以上かチェック
 */
export function canAccessFeature(
  userTier: string,
  requiredTier: string
): boolean {
  const userPriority = TIER_PRIORITY[userTier as PlanTier] ?? 0;
  const requiredPriority = TIER_PRIORITY[requiredTier as PlanTier] ?? 0;
  return userPriority >= requiredPriority;
}

/**
 * プランに応じた1日のレッスン上限を取得
 */
export function getDailyLessonLimit(tier: string): number {
  return DAILY_LESSON_LIMITS[tier as PlanTier] ?? 3;
}

/**
 * 残りのレッスン数を取得
 */
export function getRemainingLessons(
  tier: string,
  completedToday: number
): number {
  const limit = getDailyLessonLimit(tier);
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - completedToday);
}

/**
 * ユーザーがレッスンを受けられるかチェック
 */
export function canTakeLesson(tier: string, completedToday: number): boolean {
  return getRemainingLessons(tier, completedToday) > 0;
}

/**
 * プランの表示名を取得
 */
export function getTierDisplayName(tier: string): string {
  const names: Record<string, string> = {
    FREE: "Free",
    BASIC: "Basic",
    PRO: "Pro",
    PREMIUM: "Premium",
  };
  return names[tier] ?? "Free";
}

/**
 * プラン間のアップグレードかダウングレードかを判定
 */
export function isUpgrade(currentTier: string, newTier: string): boolean {
  const currentPriority = TIER_PRIORITY[currentTier as PlanTier] ?? 0;
  const newPriority = TIER_PRIORITY[newTier as PlanTier] ?? 0;
  return newPriority > currentPriority;
}
