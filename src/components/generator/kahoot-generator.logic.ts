"use client";

import { GenerateQuizParams, QuizQuestion } from "@/lib/types";
import { useLocale } from "next-intl";
import { useState } from "react";

const languageMap: Record<string, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
};

// Generate quiz function
const generateQuizData = async (url: string, params: GenerateQuizParams) => {
  const questionsCount = params.numberOfQuestions;

  const prompt = `Generate a quiz with ${questionsCount} questions about "${
    params.topic
  }" in ${languageMap[params.locale] || "English"}. 
  
  Required format:
  Question – max 120 chars
  Answer 1 – max 75 chars
  Answer 2 – max 75 chars
  Answer 3 – max 75 chars
  Answer 4 – max 75 chars
  Time limit (sec) – 5, 10, 20, 30, 60, 90, 120, or 240 secs
  Correct answer(s) – choose at least one (1, 2, 3, or 4)
  
  Provide the output as a JSON array of objects.
  Example: [
    {
      "Question": "What film won the 2020 Oscar?",
      "Answer 1": "Joker",
      "Answer 2": "Once Upon a Time",
      "Answer 3": "1917",
      "Answer 4": "Parasite",
      "Time limit (sec)": 20,
      "Correct answer(s)": 4
    }
  ]
  
  Respond ONLY with JSON, no additional text.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  try {
    return JSON.parse(result.text);
  } catch (error) {
    // Clean the response by removing markdown code blocks
    let cleanedText = result.text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    try {
      return JSON.parse(cleanedText);
    } catch (e) {
      // Last resort: try to extract JSON array from the text
      const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Failed to parse response");
    }
  }
};

export default function useKahootGenerator() {
  const locale = useLocale();

  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("5");
  const [customNumber, setCustomNumber] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  console.log("questions", questions);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;

    const questionsCount =
      numberOfQuestions === "custom" ? customNumber : numberOfQuestions;
    if (!questionsCount || Number.parseInt(questionsCount) < 1) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateQuizData(`/${locale}/api/generate`, {
        topic,
        numberOfQuestions: questionsCount,
        locale,
      });
      setQuestions(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
