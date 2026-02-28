"use client";

import { motion } from "framer-motion";
import { Check, Crown, Zap, Shield, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PlanTier } from "@/lib/plans";

interface PricingCardProps {
  tier: PlanTier;
  name: string;
  price: number;
  featureKeys: string[];
  popular?: boolean;
  currentPlan?: boolean;
  onSelect: (tier: PlanTier) => void;
  isLoading?: boolean;
  index?: number;
}

const TIER_ICONS: Record<PlanTier, typeof CreditCard> = {
  FREE: Zap,
  BASIC: CreditCard,
  PRO: Crown,
  PREMIUM: Shield,
};

const TIER_COLORS: Record<PlanTier, { bg: string; text: string; icon: string }> = {
  FREE: {
    bg: "bg-gray-100 hover:bg-gray-200",
    text: "text-navy-800",
    icon: "text-gray-500",
  },
  BASIC: {
    bg: "bg-navy-800 hover:bg-navy-700",
    text: "text-white",
    icon: "text-navy-400",
  },
  PRO: {
    bg: "bg-sakura-500 hover:bg-sakura-600",
    text: "text-white",
    icon: "text-sakura-400",
  },
  PREMIUM: {
    bg: "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700",
    text: "text-white",
    icon: "text-gold-400",
  },
};

export default function PricingCard({
  tier,
  name,
  price,
  featureKeys,
  popular = false,
  currentPlan = false,
  onSelect,
  isLoading = false,
  index = 0,
}: PricingCardProps) {
  const t = useTranslations("pricing");
  const tLanding = useTranslations("landing");
  const Icon = TIER_ICONS[tier];
  const colors = TIER_COLORS[tier];

  function getButtonLabel() {
    if (currentPlan) return t("currentPlan");
    if (tier === "FREE") return t("startFree");
    return t("subscribe");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col bg-white rounded-2xl p-6 sm:p-8 ${
        popular
          ? "ring-2 ring-sakura-500 shadow-xl scale-[1.02]"
          : "border border-gray-200 shadow-sm"
      }`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sakura-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
          {tLanding("planPopular")}
        </div>
      )}

      {/* Current plan badge */}
      {currentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-400 text-navy-800 text-xs font-semibold rounded-full whitespace-nowrap">
          {t("currentPlan")}
        </div>
      )}

      {/* Tier icon and name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            tier === "PRO"
              ? "bg-sakura-100"
              : tier === "PREMIUM"
              ? "bg-gold-100"
              : tier === "BASIC"
              ? "bg-navy-100"
              : "bg-gray-100"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              tier === "PRO"
                ? "text-sakura-500"
                : tier === "PREMIUM"
                ? "text-gold-500"
                : tier === "BASIC"
                ? "text-navy-600"
                : "text-gray-500"
            }`}
          />
        </div>
        <h3 className="text-lg font-bold text-navy-800">{name}</h3>
      </div>

      {/* Price */}
      <div className="mb-6">
        {price === 0 ? (
          <div>
            <span className="text-4xl font-bold text-navy-800">
              {tLanding("planFree")}
            </span>
          </div>
        ) : (
          <div>
            <span className="text-4xl font-bold text-navy-800">
              ¥{price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              {tLanding("perMonth")}
            </span>
            <p className="text-xs text-gray-400 mt-1">{t("monthlyBilling")}</p>
          </div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {featureKeys.map((featureKey, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                tier === "PRO"
                  ? "text-sakura-500"
                  : tier === "PREMIUM"
                  ? "text-gold-500"
                  : "text-green-500"
              }`}
            />
            <span className="text-gray-600">{tLanding(featureKey)}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(tier)}
        disabled={currentPlan || isLoading}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
          currentPlan
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : `${colors.bg} ${colors.text}`
        } ${isLoading ? "opacity-70 cursor-wait" : ""}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t("subscribe")}...
          </span>
        ) : (
          getButtonLabel()
        )}
      </button>
    </motion.div>
  );
}
