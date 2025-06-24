import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { routing } from "@/i18n/routing";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout(props: Props) {
  const { children, params } = props;
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "header" });

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t("keywords"),
    openGraph: {
      type: "website",
      siteName: t("title"),
      title: {
        default: t("title"),
        template: t("title"),
      },
      description: t("subtitle"),
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: t("title"),
        template: t("title"),
      },
      description: t("subtitle"),
    },
  };
}
