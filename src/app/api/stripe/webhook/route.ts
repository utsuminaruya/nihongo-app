import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

/**
 * Stripe Price IDからティアを逆引き
 */
function getTierFromPriceId(priceId: string): string | null {
  const priceToTier: Record<string, string> = {};

  if (process.env.STRIPE_BASIC_PRICE_ID) {
    priceToTier[process.env.STRIPE_BASIC_PRICE_ID] = "BASIC";
  }
  if (process.env.STRIPE_PRO_PRICE_ID) {
    priceToTier[process.env.STRIPE_PRO_PRICE_ID] = "PRO";
  }
  if (process.env.STRIPE_PREMIUM_PRICE_ID) {
    priceToTier[process.env.STRIPE_PREMIUM_PRICE_ID] = "PREMIUM";
  }

  return priceToTier[priceId] ?? null;
}

/**
 * ユーザーのサブスクリプション情報をデータベースに更新
 */
async function updateUserSubscription(
  userId: string,
  tier: string,
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
) {
  const supabase = createClient();

  const updateData: Record<string, unknown> = {
    subscription_tier: tier,
    updated_at: new Date().toISOString(),
  };

  if (stripeCustomerId) {
    updateData.stripe_customer_id = stripeCustomerId;
  }
  if (stripeSubscriptionId) {
    updateData.stripe_subscription_id = stripeSubscriptionId;
  }

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId);

  if (error) {
    console.error("Failed to update user subscription:", error);
    throw error;
  }
}

/**
 * Stripe Customer IDからユーザーを検索
 */
async function findUserByCustomerId(customerId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  return data;
}

export async function POST(request: NextRequest) {
  // Stripeがプレースホルダーの場合
  if (!stripe) {
    return NextResponse.json({ received: true, mock: true });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Webhook secretが設定されていない場合（開発環境）
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (userId && tier) {
          await updateUserSubscription(
            userId,
            tier,
            session.customer as string,
            session.subscription as string
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await findUserByCustomerId(customerId);
        if (!user) break;

        // アクティブなサブスクリプションの場合、プランを更新
        if (
          subscription.status === "active" ||
          subscription.status === "trialing"
        ) {
          const priceId = subscription.items.data[0]?.price?.id;
          if (priceId) {
            const newTier = getTierFromPriceId(priceId);
            if (newTier) {
              await updateUserSubscription(
                user.id,
                newTier,
                customerId,
                subscription.id
              );
            }
          }
        } else if (
          subscription.status === "past_due" ||
          subscription.status === "unpaid"
        ) {
          // 支払い失敗時 - 猶予期間中はプランを維持
          console.warn(
            `Subscription ${subscription.id} is ${subscription.status} for user ${user.id}`
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await findUserByCustomerId(customerId);
        if (user) {
          // サブスクリプション解約時はFREEに戻す
          await updateUserSubscription(user.id, "FREE", customerId);
        }
        break;
      }

      default:
        // 未処理のイベントはログに残す
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
