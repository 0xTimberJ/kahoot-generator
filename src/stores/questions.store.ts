import { QuizQuestion } from "@/lib/types";
import { create } from "zustand";

type QuestionsStore = {
  topic: string;
  setTopic: (topic: string) => void;

  numberOfQuestions: string;
  setNumberOfQuestions: (numberOfQuestions: string) => void;

  customNumber: string;
  setCustomNumber: (customNumber: string) => void;

  questions: QuizQuestion[];
  setQuestions: (questions: QuizQuestion[]) => void;

  questionsHistory: QuizQuestion[];
  setQuestionsHistory: (questionsHistory: QuizQuestion[]) => void;

  useHistory: boolean;
  setUseHistory: (useHistory: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;

  clearHistory: () => void;
};

export const useQuestionsStore = create<QuestionsStore>()((set) => ({
  topic: "",
  setTopic: (topic: string) => set({ topic }),

  numberOfQuestions: "5",
  setNumberOfQuestions: (numberOfQuestions: string) =>
    set({ numberOfQuestions }),

  customNumber: "",
  setCustomNumber: (customNumber: string) => set({ customNumber }),

  questions: [],
  setQuestions: (questions: QuizQuestion[]) => set({ questions }),

  questionsHistory: [],
  setQuestionsHistory: (questionsHistory: QuizQuestion[]) =>
    set({ questionsHistory }),

  useHistory: false,
  setUseHistory: (useHistory: boolean) => set({ useHistory }),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  error: null,
  setError: (error: Error | null) => set({ error }),

  clearHistory: () => set({ questionsHistory: [], useHistory: false }),
}));
