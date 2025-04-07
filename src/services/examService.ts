import configuration from "../configuration/EnvConfig";
import {
  NextQuestionsResponse,
  ExamResumeResponse,
} from "../types/examResponse";
import {
  Question,
  TMChoiceQuestion,
  TOpenQuestion,
  TSChoiceQuestion,
} from "../types/exam";
import { ResponseQuestion } from "../types/examResponse";
import Cookies from "js-cookie";

export interface AnswerSubmission {
  answerId: number[] | string;
  questionId: number;
}

export const getCsrfToken: () => string | undefined = () =>
  Cookies.get("XSRF-TOKEN");

export const examService = {
  resumeExam: async (instanceId: number): Promise<ExamResumeResponse> => {
    const csrfToken = getCsrfToken();
    const response = await fetch(
      `${configuration.BACKEND_URL}/exam-instances/${instanceId}/resume`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": csrfToken ?? "", // Spring expects this header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to start exam");
    }

    return response.json();
  },

  processNextQuestion: async (
    instanceId: number,
    answers: AnswerSubmission[]
  ): Promise<NextQuestionsResponse> => {
    const csrfToken = getCsrfToken();

    const response = await fetch(
      `${configuration.BACKEND_URL}/exam-instances/${instanceId}/process-next-question`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": csrfToken ?? "", // Spring expects this header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to process next question");
    }

    return response.json();
  },

  parseResponseQuestion: (response: ExamResumeResponse): Question[] => {
    return response.questionDTOS.map((q: ResponseQuestion, idx: number) => {
      const baseQuestion = {
        id: q.id,
        idx,
        question: q.content,
        isAnswered: false,
      };

      switch (q.type) {
        case "multiple_choice": {
          const userAnswer = response
            .userResponseDTOS!.filter((r) => r.questionId === q.id)
            .map((r) => r.selectedAnswerId);
          return {
            ...baseQuestion,
            type: "multiple_choice" as const,
            userAnswer: userAnswer,
            isAnswered: userAnswer.length > 0,
            readOnly: userAnswer.length > 0,
            options: q.answers.map((a) => ({ id: a.id, content: a.content })),
          } as TMChoiceQuestion;
        }
        case "single": {
          const userAnswer = response.userResponseDTOS
            .filter((r) => r.questionId === q.id)
            .map((r) => r.selectedAnswerId);
          return {
            ...baseQuestion,
            type: "single" as const,
            isAnswered: userAnswer.length > 0,
            readOnly: userAnswer.length > 0,
            options: q.answers.map((a) => ({ id: a.id, content: a.content })),
          } as TSChoiceQuestion;
        }
        case "open":
          return {
            ...baseQuestion,
            type: "open" as const,
            userAnswer: "",
          } as TOpenQuestion;
        default:
          throw new Error(`Unsupported question type: ${q.type}`);
      }
    });
  },
};
