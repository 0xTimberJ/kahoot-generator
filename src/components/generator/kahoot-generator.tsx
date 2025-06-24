"use client";

import { useQuestionsStore } from "@/stores/questions.store";
import { useLocale } from "next-intl";
import QuizForm from "./quiz-form";
import QuizQuestionCard from "./quiz-question-card";
import {
  QuizEmptyState,
  QuizErrorState,
  QuizLoadingState,
} from "./quiz-states";
import QuizStats from "./quiz-stats";

export default function KahootGenerator() {
  const locale = useLocale();
  const { isLoading, error, questions } = useQuestionsStore();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <QuizForm />

      {/* Loading State */}
      {isLoading && <QuizLoadingState />}

      {/* Error State */}
      {error && <QuizErrorState />}

      {/* Results Section */}
      {questions && questions.length > 0 && (
        <div className="space-y-6 w-full">
          {/* Stats Cards */}
          <QuizStats questions={questions} locale={locale} />

          {/* Questions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {questions.map((question, index) => (
              <QuizQuestionCard key={index} question={question} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !questions && !error && <QuizEmptyState />}
    </div>
  );
}
