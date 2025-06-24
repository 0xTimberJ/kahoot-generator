import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizQuestion } from "@/lib/types";
import { CheckCircle, Clock } from "lucide-react";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  index: number;
}

export default function QuizQuestionCard({
  question,
  index,
}: QuizQuestionCardProps) {
  return (
    <Card className="shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 pt-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b rounded-t-xl p-4 min-h-36">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm">
            Question {index + 1}
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Clock className="h-3 w-3 mr-1" />
            {question["Time limit (sec)"]}s
          </Badge>
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {question.Question}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3 mb-4">
          {[1, 2, 3, 4].map((num) => {
            const answerKey = `Answer ${num}` as keyof QuizQuestion;
            const isCorrect = question["Correct answer(s)"] === num;
            return (
              <div
                key={num}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  isCorrect
                    ? "bg-green-50 border-green-300 text-green-800"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {num}
                  </span>
                  <span className="flex-1">
                    {question[answerKey] as string}
                  </span>
                  {isCorrect && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
