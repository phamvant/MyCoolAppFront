export type QuestionType = "single" | "multiple_choice" | "open";

export interface BaseQuestion {
  id: number;
  idx: number;
  type: QuestionType;
  topicName: string;
  question: string;
  explain: string;
  isAnswered: boolean;
  readOnly: boolean;
}

export interface QuestionOption {
  id: number;
  content: string;
  correct: boolean;
}

export interface TMChoiceQuestion extends BaseQuestion {
  userAnswer: number[];
  options: QuestionOption[];
  type: "multiple_choice";
}

export interface TSChoiceQuestion extends BaseQuestion {
  userAnswer: number[];
  options: QuestionOption[];
  type: "single";
}

export interface TOpenQuestion extends BaseQuestion {
  type: "open";
  userAnswer: string;
}

export type Question = TMChoiceQuestion | TSChoiceQuestion | TOpenQuestion;
