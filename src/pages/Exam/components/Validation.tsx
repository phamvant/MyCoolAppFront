import { ExamInstanceResponse } from "../Exams";

export const validateInstance = (response: ExamInstanceResponse) => {
  if (!response.id || typeof response.id !== "number") {
    throw new Error("Invalid instance ID");
  }
  if (!response.examId || typeof response.examId !== "number") {
    throw new Error("Invalid instance exam");
  }
  if (
    (!response.progress || typeof response.progress !== "number") &&
    response.progress !== 0
  ) {
    throw new Error("Invalid instance progress");
  }
  return response;
};
