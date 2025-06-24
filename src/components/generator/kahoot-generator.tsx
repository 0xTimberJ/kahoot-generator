"use client";

import useKahootGenerator from "./kahoot-generator.logic";
import QuizForm from "./quiz-form";
import QuizQuestionCard from "./quiz-question-card";
import {
  QuizEmptyState,
  QuizErrorState,
  QuizLoadingState,
} from "./quiz-states";
import QuizStats from "./quiz-stats";

export default function KahootGenerator() {
  const {
    locale,
    topic,
    setTopic,
    numberOfQuestions,
    setNumberOfQuestions,
    customNumber,
    setCustomNumber,
    questions,
    isLoading,
    error,
    generateQuiz,
  } = useKahootGenerator();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <QuizForm
        topic={topic}
        setTopic={setTopic}
        numberOfQuestions={numberOfQuestions}
        setNumberOfQuestions={setNumberOfQuestions}
        customNumber={customNumber}
        setCustomNumber={setCustomNumber}
        isLoading={isLoading}
        onGenerate={generateQuiz}
        questions={questions}
      />

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
