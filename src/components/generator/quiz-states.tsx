import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function QuizLoadingState() {
  const tResults = useTranslations("results");

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm w-full">
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-pulse"></div>
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 absolute top-4 left-4" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {tResults("aiGenerating")}
          </h3>
          <p className="text-gray-600">{tResults("aiWorkingDescription")}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuizErrorState() {
  const tResults = useTranslations("results");

  return (
    <Card className="shadow-xl bg-red-50 border-red-200 w-full">
      <CardContent className="p-8 text-center">
        <div className="text-red-600 text-lg">
          {tResults("errorGeneration")}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuizEmptyState() {
  const tResults = useTranslations("results");

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm w-full">
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {tResults("noQuiz")}
          </h3>
          <p className="text-gray-600 text-lg max-w-md">
            {tResults("fillForm")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
