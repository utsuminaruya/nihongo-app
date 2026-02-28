import { getRequestConfig } from "next-intl/server";
import { type Locale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: string =
    requested && locales.includes(requested as Locale) ? requested : "en";

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});
