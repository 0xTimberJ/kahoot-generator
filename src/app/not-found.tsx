import "@/app/globals.css";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">{t("title")}</h2>
        <h3 className="text-xl font-semibold text-gray-700">{t("subtitle")}</h3>
        <p className="text-gray-600">{t("description")}</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
