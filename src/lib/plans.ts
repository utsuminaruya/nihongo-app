/**
 * サブスクリプションプラン定義
 * クライアント・サーバー両方から安全にインポート可能
 */
export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    features: [
      "1日3レッスン",
      "基本AIチューター",
      "N5コンテンツ",
    ],
  },
  BASIC: {
    name: "Basic",
    price: 980,
    features: [
      "無制限レッスン",
      "広告なし",
      "N5〜N3コンテンツ",
      "単語帳機能",
    ],
  },
  PRO: {
    name: "Pro",
    price: 1980,
    features: [
      "Basicの全機能",
      "AIチューター無制限",
      "JLPT模擬試験",
      "作文添削",
      "N5〜N1全コンテンツ",
    ],
  },
  PREMIUM: {
    name: "Premium",
    price: 2980,
    features: [
      "Proの全機能",
      "介護特化コース",
      "1on1サポート",
      "企業連携機能",
    ],
  },
} as const;

export type PlanTier = keyof typeof PLANS;
