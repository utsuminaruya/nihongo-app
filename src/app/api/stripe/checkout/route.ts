import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, PRICE_IDS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import type { PlanTier } from "@/lib/plans";

const TIER_TO_PRICE_ID: Record<Exclude<PlanTier, "FREE">, string | undefined> = {
  BASIC: PRICE_IDS.BASIC,
  PRO: PRICE_IDS.PRO,
  PREMIUM: PRICE_IDS.PREMIUM,
};

export async function POST(request: NextRequest) {
  try {
    const { tier } = (await request.json()) as { tier: PlanTier };

    // FREEプランはcheckout不要
    if (!tier || tier === "FREE") {
      return NextResponse.json(
        { error: "Invalid plan tier" },
        { status: 400 }
      );
    }

    const priceId = TIER_TO_PRICE_ID[tier as Exclude<PlanTier, "FREE">];

    // Stripeがプレースホルダーの場合、モック成功レスポンスを返す
    if (!stripe) {
      return NextResponse.json({
        url: `${request.nextUrl.origin}/en/pricing?mock_checkout=success&tier=${tier}`,
        mock: true,
      });
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID not configured for this tier" },
        { status: 400 }
      );
    }

    // 現在のユーザーを取得
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // ユーザーのStripe Customer IDを取得（既存の場合）
    const { data: profile } = await supabase
      .from("users")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    // Stripe Checkout セッションを作成
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/en/pricing?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${request.nextUrl.origin}/en/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        tier,
      },
    };

    // 既存のStripe顧客IDがあれば使用
    if (profile?.stripe_customer_id) {
      sessionParams.customer = profile.stripe_customer_id;
    } else {
      sessionParams.customer_email = profile?.email || user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
