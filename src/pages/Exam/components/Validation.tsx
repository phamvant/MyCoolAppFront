import { ExamInstanceResponse } from "../Exams";

export const validateInstance = (response: ExamInstanceResponse) => {
  if (!response.id || typeof response.id !== "number") {
    throw new Error("Invalid instance ID");
  }
  if (!response.examId || typeof response.examId !== "number") {
    throw new Error("Invalid instance exam");
  }
  if (!response.startDate || typeof response.startDate !== "string") {
    throw new Error("Invalid instance start date");
  }
  //   if (
  //     response.favourite === undefined ||
  //     typeof response.favourite !== "boolean"
  //   ) {
  //     throw new Error("Invalid instance favourite");
  //   }
  if (!response.progress || typeof response.progress !== "number") {
    throw new Error("Invalid instance progress");
  }
  return response;
};
