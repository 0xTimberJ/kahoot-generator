export interface QuizQuestion {
  Question: string;
  "Answer 1": string;
  "Answer 2": string;
  "Answer 3": string;
  "Answer 4": string;
  "Time limit (sec)": number;
  "Correct answer(s)": number;
}

export interface GenerateQuizParams {
  topic: string;
  numberOfQuestions: string;
  locale: string;
}
