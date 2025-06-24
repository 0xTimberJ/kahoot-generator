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

  const prompt = `Analyze the input and determine if it contains:
1) A simple topic/subject to generate questions about
2) Pre-formatted questions in tabular format that need to be converted to JSON

Input: "${params.topic}"

TARGET: ${questionsCount} questions in ${
    languageMap[params.locale] || "English"
  }

IF INPUT IS A SIMPLE TOPIC:
Generate ${questionsCount} quiz questions about the topic.

IF INPUT CONTAINS TABULAR QUESTIONS:
Convert the existing questions to JSON format. If there are fewer than ${questionsCount} questions, generate additional questions in the same style/subject to reach exactly ${questionsCount} questions.
`;

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
    return result.questions;
  } catch (error) {
    console.log("error", error);
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
    } catch (error) {
      console.log("error", error);
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
