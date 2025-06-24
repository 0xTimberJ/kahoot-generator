"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { exportToExcel } from "@/lib/export-to-excel";
import { useQuestionsStore } from "@/stores/questions.store";
import { Download, History, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import useQuizForm from "./quiz-form.logic";

export default function QuizForm() {
  const tForm = useTranslations("form");
  const tResults = useTranslations("results");
  const logic = useQuizForm();

  const {
    topic,
    numberOfQuestions,
    customNumber,
    questions,
    questionsHistory,
    useHistory,
    setTopic,
    setNumberOfQuestions,
    setCustomNumber,
    isLoading,
    setUseHistory,
    clearHistory,
  } = useQuestionsStore();

  return (
    <Card className="w-full shadow-xl bg-white/80 backdrop-blur-sm pt-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl p-4">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center space-x-2">
            <Sparkles className="size-6" />
            <span>{tForm("createQuiz")}</span>
          </div>
          {useHistory && questionsHistory.length > 0 && (
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              <History className="h-3 w-3 mr-1" />
              {tForm("contextActive")}: {questionsHistory.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-purple-100">
          {tForm("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="topic"
              className="md:text-lg font-semibold text-gray-700"
            >
              {tForm("topic")}
            </Label>
            <Textarea
              id="topic"
              placeholder={tForm("topicPlaceholder")}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
            />
          </div>

          {/* History Controls */}
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useHistory"
                checked={useHistory}
                onCheckedChange={setUseHistory}
                disabled={questionsHistory.length === 0}
              />
              <Label
                htmlFor="useHistory"
                className="text-sm font-medium cursor-pointer"
              >
                {tForm("useHistory")}
                {questionsHistory.length > 0 && (
                  <span className="text-gray-500 ml-1">
                    ({questionsHistory.length} {tResults("questions")})
                  </span>
                )}
              </Label>
            </div>

            {questionsHistory.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {tForm("clearHistory")}
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <Label
                  htmlFor="questions"
                  className="md:text-lg font-semibold text-gray-700"
                >
                  {tForm("numberOfQuestions")}
                </Label>
                <Select
                  value={numberOfQuestions}
                  onValueChange={setNumberOfQuestions}
                >
                  <SelectTrigger className="mt-2 h-12 text-lg border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 {tResults("questions")}</SelectItem>
                    <SelectItem value="5">5 {tResults("questions")}</SelectItem>
                    <SelectItem value="10">
                      10 {tResults("questions")}
                    </SelectItem>
                    <SelectItem value="15">
                      15 {tResults("questions")}
                    </SelectItem>
                    <SelectItem value="20">
                      20 {tResults("questions")}
                    </SelectItem>
                    <SelectItem value="custom">
                      {tForm("customNumber")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {numberOfQuestions === "custom" && (
                <div>
                  <Label
                    htmlFor="customNumber"
                    className="md:text-lg font-semibold text-gray-700"
                  >
                    {tForm("customNumber")}
                  </Label>
                  <Input
                    id="customNumber"
                    type="number"
                    min="1"
                    max="50"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    className="mt-2 text-lg border-2 border-gray-200 focus:border-purple-500"
                    placeholder="1-50"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={logic.generateQuiz}
                disabled={
                  !topic.trim() ||
                  isLoading ||
                  (numberOfQuestions === "custom" &&
                    (!customNumber || Number.parseInt(customNumber) < 1))
                }
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    {tForm("generating")}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-5 w-5" />
                    {tForm("generateQuiz")}
                  </>
                )}
              </Button>

              {questions && questions.length > 0 && (
                <Button
                  onClick={() => exportToExcel(questions, topic)}
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Download className="mr-3 h-5 w-5" />
                  {tForm("exportExcel")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
