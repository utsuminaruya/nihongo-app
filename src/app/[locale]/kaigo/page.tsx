import { useTranslations } from "next-intl";

export default function KaigoPage() {
  const t = useTranslations("nav");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-navy-800">{t("kaigo")}</h1>
      <p className="mt-2 text-gray-600">Coming soon...</p>
    </div>
  );
}
