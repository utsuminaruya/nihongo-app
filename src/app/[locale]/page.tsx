"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  BookOpen,
  Heart,
  Globe,
  Check,
  ChevronDown,
  Star,
} from "lucide-react";
import { PLANS } from "@/lib/plans";

export default function HomePage() {
  const t = useTranslations("landing");
  const { locale } = useParams();

  const features = [
    {
      icon: Bot,
      title: t("featureAiTutor"),
      description: t("featureAiTutorDesc"),
    },
    {
      icon: BookOpen,
      title: t("featureJlpt"),
      description: t("featureJlptDesc"),
    },
    {
      icon: Heart,
      title: t("featureKaigo"),
      description: t("featureKaigoDesc"),
    },
    {
      icon: Globe,
      title: t("featureMultilingual"),
      description: t("featureMultilingualDesc"),
    },
  ];

  const testimonials = [
    {
      name: t("testimonial1Name"),
      role: t("testimonial1Role"),
      quote: t("testimonial1Quote"),
      rating: 5,
    },
    {
      name: t("testimonial2Name"),
      role: t("testimonial2Role"),
      quote: t("testimonial2Quote"),
      rating: 5,
    },
    {
      name: t("testimonial3Name"),
      role: t("testimonial3Role"),
      quote: t("testimonial3Quote"),
      rating: 5,
    },
  ];

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
  ];

  const planFeatureKeys: Record<string, string[]> = {
    FREE: ["planFeature_3lessons", "planFeature_basicAi", "planFeature_n5Content"],
    BASIC: ["planFeature_unlimitedLessons", "planFeature_noAds", "planFeature_n5n3Content", "planFeature_flashcards"],
    PRO: ["planFeature_allBasic", "planFeature_unlimitedAi", "planFeature_jlptMock", "planFeature_essayCorrection", "planFeature_allContent"],
    PREMIUM: ["planFeature_allPro", "planFeature_kaigoCourse", "planFeature_oneOnOne", "planFeature_enterprise"],
  };

  const plans = [
    { tier: "FREE", name: PLANS.FREE.name, price: PLANS.FREE.price, popular: false },
    { tier: "BASIC", name: PLANS.BASIC.name, price: PLANS.BASIC.price, popular: false },
    { tier: "PRO", name: PLANS.PRO.name, price: PLANS.PRO.price, popular: true },
    { tier: "PREMIUM", name: PLANS.PREMIUM.name, price: PLANS.PREMIUM.price, popular: false },
  ];

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-sakura-50 via-white to-gold-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/signup`}
              className="inline-flex items-center justify-center px-8 py-3 bg-sakura-500 text-white font-semibold rounded-xl hover:bg-sakura-600 transition-colors text-lg"
            >
              {t("ctaStart")}
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-navy-800 text-navy-800 font-semibold rounded-xl hover:bg-navy-800 hover:text-white transition-colors text-lg"
            >
              {t("ctaLearnMore")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-sakura-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-sakura-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section id="pricing" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {t("pricingTitle")}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t("pricingSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 ${
                  plan.popular
                    ? "ring-2 ring-sakura-500 shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sakura-500 text-white text-xs font-semibold rounded-full">
                    {t("planPopular")}
                  </div>
                )}
                <h3 className="text-lg font-bold text-navy-800 mb-1">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-navy-800">
                      {t("planFree")}
                    </span>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-navy-800">
                        ¥{plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">{t("perMonth")}</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {planFeatureKeys[plan.tier].map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/signup`}
                  className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-sakura-500 text-white hover:bg-sakura-600"
                      : "bg-gray-100 text-navy-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.price === 0 ? t("planSignupFree") : t("planSignup")}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ユーザーの声セクション */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {t("testimonialsTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold-400 fill-gold-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-navy-800">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQセクション */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {t("faqTitle")}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-sakura-500 to-sakura-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {t("ctaTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sakura-100 mb-8"
          >
            {t("ctaSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={`/${locale}/signup`}
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-sakura-500 font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              {t("ctaStart")}
            </Link>
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
          className={`w-4 h-4 text-gray-400 transition-transform ${
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
