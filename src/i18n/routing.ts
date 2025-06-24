import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es", "de", "it"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});
