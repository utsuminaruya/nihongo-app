"use client";

import { useCallback, useMemo } from "react";
import { useUserStore } from "@/stores/user-store";
import {
  canAccessFeature,
  getDailyLessonLimit,
  getRemainingLessons,
  canTakeLesson,
  isUpgrade,
} from "@/lib/subscription";
import type { PlanTier } from "@/lib/plans";

/**
 * サブスクリプション状態を管理するカスタムフック
 */
export function useSubscription() {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  const userTier: PlanTier = (user?.subscriptionTier as PlanTier) ?? "FREE";

  const checkAccess = useCallback(
    (requiredTier: string) => canAccessFeature(userTier, requiredTier),
    [userTier]
  );

  const dailyLimit = useMemo(
    () => getDailyLessonLimit(userTier),
    [userTier]
  );

  const remaining = useCallback(
    (completedToday: number) => getRemainingLessons(userTier, completedToday),
    [userTier]
  );

  const canLesson = useCallback(
    (completedToday: number) => canTakeLesson(userTier, completedToday),
    [userTier]
  );

  const checkUpgrade = useCallback(
    (newTier: string) => isUpgrade(userTier, newTier),
    [userTier]
  );

  const handleCheckout = useCallback(
    async (tier: PlanTier) => {
      try {
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Checkout error:", error);
        throw error;
      }
    },
    []
  );

  const handleManageSubscription = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Portal error:", error);
      throw error;
    }
  }, []);

  return {
    userTier,
    isLoading,
    isPaid: userTier !== "FREE",
    isBasic: userTier === "BASIC",
    isPro: userTier === "PRO",
    isPremium: userTier === "PREMIUM",
    checkAccess,
    dailyLimit,
    remaining,
    canLesson,
    checkUpgrade,
    handleCheckout,
    handleManageSubscription,
  };
}
