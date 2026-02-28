import Link from "next/link";
import { useTranslations } from "next-intl";
import { LINE_URLS, APP_NAME } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-lg font-bold text-gold-400 mb-2">
              {APP_NAME}
            </h3>
            <p className="text-sm text-gray-300 mb-4">{t("description")}</p>
            <p className="text-sm text-gray-400">{t("company")}</p>
          </div>

          {/* LINEリンク */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
              LINE
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={LINE_URLS.employers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {t("forEmployers")}
                </a>
              </li>
              <li>
                <a
                  href={LINE_URLS.jobSeekers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {t("forJobSeekers")}
                </a>
              </li>
            </ul>
          </div>

          {/* 法的リンク */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {t("company")}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
