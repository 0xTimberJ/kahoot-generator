"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";
import { Locale, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useTransition } from "react";

export const Header = () => {
  const tHeader = useTranslations("header");
  const tLanguages = useTranslations("languages");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <header className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Sparkles className="size-4 md:size-6 text-white" />
            </div>
            <div>
              <h1 className="md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {tHeader("title")}
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                {tHeader("subtitle")}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            {/* <Globe className="h-4 w-4 text-gray-500" /> */}
            <Select
              value={locale}
              onValueChange={onSelectChange}
              disabled={isPending}
            >
              <SelectTrigger className="w-fit md:min-w-32">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languageSelectOptions.map((option) => (
                  <SelectItem key={option.locale} value={option.locale}>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={option.iconSrc}
                        alt={option.altDescription}
                        width={20}
                        height={20}
                      />
                      <span className="hidden md:block text-sm">
                        {tLanguages(option.locale)}
                      </span>
                      <span className="text-xs md:hidden uppercase">
                        {option.locale}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export const languageSelectOptions = [
  {
    altDescription: "United Kingdom",
    iconSrc:
      "https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
    locale: "en",
  },
  {
    altDescription: "France",
    iconSrc:
      "https://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg",
    locale: "fr",
  },
  {
    altDescription: "España",
    iconSrc:
      "https://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg",
    locale: "es",
  },
  {
    altDescription: "Deutschland",
    iconSrc:
      "https://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg",
    locale: "de",
  },
  {
    altDescription: "Italia",
    iconSrc:
      "https://purecatamphetamine.github.io/country-flag-icons/3x2/IT.svg",
    locale: "it",
  },
];
