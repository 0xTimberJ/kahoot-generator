import { Card, CardContent } from "@/components/ui/card";
import { QuizQuestion } from "@/lib/types";
import { CheckCircle, Clock, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuizStatsProps {
  questions: QuizQuestion[];
  locale: string;
}

export default function QuizStats({ questions, locale }: QuizStatsProps) {
  const tLanguages = useTranslations("languages");

  const totalTime = Math.round(
    questions.reduce((acc, q) => acc + q["Time limit (sec)"], 0) / 60
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
        <CardContent className="p-6 flex items-center space-x-4">
          <CheckCircle className="h-10 w-10" />
          <div>
            <p className="text-2xl font-bold">{questions.length}</p>
            <p className="text-green-100">Questions générées</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
        <CardContent className="p-6 flex items-center space-x-4">
          <Clock className="h-10 w-10" />
          <div>
            <p className="text-2xl font-bold">{totalTime}</p>
            <p className="text-blue-100">Minutes de jeu</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
        <CardContent className="p-6 flex items-center space-x-4">
          <Trophy className="h-10 w-10" />
          <div>
            <p className="text-2xl font-bold">{tLanguages(`${locale}`)}</p>
            <p className="text-purple-100">Langue du quiz</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
