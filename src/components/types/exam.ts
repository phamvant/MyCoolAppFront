export type QuestionType = "single" | "multiple" | "open";

export interface BaseQuestion {
  id: number;
  idx: number;
  type: QuestionType;
  question: string;
  isAnswered: boolean;
}

export interface TMChoiceQuestion extends BaseQuestion {
  userAnswer: number[];
  options: string[];
  type: "multiple";
}

export interface TSChoiceQuestion extends BaseQuestion {
  userAnswer: number[];
  options: string[];
  type: "single";
}

export interface TOpenQuestion extends BaseQuestion {
  type: "open";
  userAnswer: string;
}

export type Question = TMChoiceQuestion | TSChoiceQuestion | TOpenQuestion;
