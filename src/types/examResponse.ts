export interface ResponseAnswer {
  id: number;
  content: string;
  correct: boolean;
}

export interface ResponseQuestion {
  id: number;
  topicId: number;
  topicName: string;
  readingId: number;
  content: string;
  explain: string;
  type: string;
  link: string;
  isError: number;
  answers: ResponseAnswer[];
}

export interface ResponseInstance {
  id: number;
  examId: number;
  name: string;
  progress: number;
  startDate: string;
  status: string;
  currentDifficultLevel: string;
  currentQuestionIdx: number;
  correctAnswerNumber: number;
  incorrectAnswerNumber: number;
}

export interface UserResponse {
  id: number;
  questionId: number;
  selectedAnswerId: number[] | number;
}

export interface NextQuestionsResponse {
  questionDTOS: ResponseQuestion[];
  instanceDTO: ResponseInstance;
}

export interface ExamResumeResponse extends NextQuestionsResponse {
  userResponseDTOS: UserResponse[];
}

export interface ExamResult extends ExamResumeResponse {}
