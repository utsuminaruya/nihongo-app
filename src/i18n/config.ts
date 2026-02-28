export const locales = ["en", "vi", "zh", "id", "tl", "my"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  zh: "中文",
  id: "Bahasa Indonesia",
  tl: "Tagalog",
  my: "မြန်မာ",
};
