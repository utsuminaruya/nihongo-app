"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ChevronDown, CreditCard, Settings } from "lucide-react";
import { PLANS, type PlanTier } from "@/lib/plans";
import { useSubscription } from "@/hooks/useSubscription";
import PricingCard from "@/components/pricing/PricingCard";

const PLAN_FEATURE_KEYS: Record<PlanTier, string[]> = {
  FREE: ["planFeature_3lessons", "planFeature_basicAi", "planFeature_n5Content"],
  BASIC: [
    "planFeature_unlimitedLessons",
    "planFeature_noAds",
    "planFeature_n5n3Content",
    "planFeature_flashcards",
  ],
  PRO: [
    "planFeature_allBasic",
    "planFeature_unlimitedAi",
    "planFeature_jlptMock",
    "planFeature_essayCorrection",
    "planFeature_allContent",
  ],
  PREMIUM: [
    "planFeature_allPro",
    "planFeature_kaigoCourse",
    "planFeature_oneOnOne",
    "planFeature_enterprise",
  ],
};

const COMPARISON_FEATURES = [
  { key: "dailyLessons", free: "3", basic: "unlimited", pro: "unlimited", premium: "unlimited" },
  { key: "aiTutor", free: "basic", basic: "basic", pro: "unlimited", premium: "unlimited" },
  { key: "jlptContent", free: "N5", basic: "N5-N3", pro: "N5-N1", premium: "N5-N1" },
  { key: "noAds", free: false, basic: true, pro: true, premium: true },
  { key: "flashcards", free: false, basic: true, pro: true, premium: true },
  { key: "mockExam", free: false, basic: false, pro: true, premium: true },
  { key: "essayCorrection", free: false, basic: false, pro: true, premium: true },
  { key: "kaigoCourse", free: false, basic: false, pro: false, premium: true },
  { key: "oneOnOneSupport", free: false, basic: false, pro: false, premium: true },
  { key: "enterprise", free: false, basic: false, pro: false, premium: true },
];

const BILLING_FAQS = [
  { qKey: "billingFaq1Q", aKey: "billingFaq1A" },
  { qKey: "billingFaq2Q", aKey: "billingFaq2A" },
  { qKey: "billingFaq3Q", aKey: "billingFaq3A" },
  { qKey: "billingFaq4Q", aKey: "billingFaq4A" },
  { qKey: "billingFaq5Q", aKey: "billingFaq5A" },
];

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tLanding = useTranslations("landing");
  const { locale } = useParams();
  const router = useRouter();
  const {
    userTier,
    isPaid,
    handleCheckout,
    handleManageSubscription,
  } = useSubscription();

  const [loadingTier, setLoadingTier] = useState<PlanTier | null>(null);

  const plans: { tier: PlanTier; name: string; price: number; popular: boolean }[] = [
    { tier: "FREE", name: PLANS.FREE.name, price: PLANS.FREE.price, popular: false },
    { tier: "BASIC", name: PLANS.BASIC.name, price: PLANS.BASIC.price, popular: false },
    { tier: "PRO", name: PLANS.PRO.name, price: PLANS.PRO.price, popular: true },
    { tier: "PREMIUM", name: PLANS.PREMIUM.name, price: PLANS.PREMIUM.price, popular: false },
  ];

  async function handlePlanSelect(tier: PlanTier) {
    if (tier === "FREE") {
      router.push(`/${locale}/signup`);
      return;
    }

    setLoadingTier(tier);
    try {
      await handleCheckout(tier);
    } catch {
      // Error handled in hook
    } finally {
      setLoadingTier(null);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sakura-50 via-white to-gold-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-navy-800 mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-4"
          >
            {t("subtitle")}
          </motion.p>

          {/* Manage subscription button for paid users */}
          {isPaid && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <button
                onClick={handleManageSubscription}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-navy-800 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                {t("managePlan")}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.tier}
                tier={plan.tier}
                name={plan.name}
                price={plan.price}
                featureKeys={PLAN_FEATURE_KEYS[plan.tier]}
                popular={plan.popular}
                currentPlan={userTier === plan.tier}
                onSelect={handlePlanSelect}
                isLoading={loadingTier === plan.tier}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-navy-800 mb-3">
              {t("features")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-4 text-left text-navy-800 font-semibold w-1/3">
                    {t("features")}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.tier}
                      className={`py-4 px-3 text-center font-semibold ${
                        plan.popular ? "text-sakura-500" : "text-navy-800"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50/50" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 text-gray-700">
                      {t(`comparison_${feature.key}`)}
                    </td>
                    {(["free", "basic", "pro", "premium"] as const).map(
                      (planKey) => {
                        const value = feature[planKey];
                        return (
                          <td
                            key={planKey}
                            className="py-3.5 px-3 text-center"
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-gray-300">&mdash;</span>
                              )
                            ) : (
                              <span className="text-gray-700 font-medium">
                                {value === "unlimited"
                                  ? t("unlimited")
                                  : value}
                              </span>
                            )}
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Billing FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-navy-800 mb-3">
              {t("faqTitle")}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {BILLING_FAQS.map((faq, index) => (
              <FaqItem
                key={index}
                question={t(faq.qKey)}
                answer={t(faq.aKey)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-sakura-500 to-sakura-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {tLanding("ctaTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sakura-100 mb-8"
          >
            {tLanding("ctaSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push(`/${locale}/signup`)}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-sakura-500 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              {t("startFree")}
            </button>
            {!isPaid && (
              <button
                onClick={() => handlePlanSelect("PRO")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
              >
                <CreditCard className="w-5 h-5" />
                {t("subscribe")}
              </button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-sm font-medium text-navy-800">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </motion.div>
  );
}
