import Stripe from "stripe";

// Stripeインスタンス（サーバーサイド専用）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe =
  stripeSecretKey && !stripeSecretKey.includes("placeholder")
    ? new Stripe(stripeSecretKey, {
        apiVersion: "2026-02-25.clover",
        typescript: true,
      })
    : null;

// Stripe Price IDs
export const PRICE_IDS = {
  BASIC: process.env.STRIPE_BASIC_PRICE_ID,
  PRO: process.env.STRIPE_PRO_PRICE_ID,
  PREMIUM: process.env.STRIPE_PREMIUM_PRICE_ID,
};

// PLANSを再エクスポート（後方互換性のため）
export { PLANS } from "./plans";
