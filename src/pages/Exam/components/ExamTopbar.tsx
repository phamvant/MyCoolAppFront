import React from "react";
import { Question } from "../../../types/exam";
import { ResponseInstance } from "../../../types/examResponse";

interface ExamTopbarProps {
  currentIndex: number;
  questions: Question[];
  instance: ResponseInstance;
}

const ExamTopbar: React.FC<ExamTopbarProps> = ({
  currentIndex,
  questions,
  instance,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="text-lg font-medium whitespace-nowrap">
            Q: {currentIndex + 1} / {questions.length}
          </div>
          <div className="flex-1 sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <BookmarkIcon className="w-5 h-5" />
        </button> */}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
        <div className="whitespace-nowrap">
          Correct: {instance.correctAnswerNumber} /{" "}
          {instance.correctAnswerNumber + instance.incorrectAnswerNumber}
        </div>
        <div className="whitespace-nowrap">
          Difficulty: {instance.currentDifficultLevel}
        </div>
        <div className="whitespace-nowrap">
          Topic: {questions[currentIndex].topicName}
        </div>
      </div>
    </div>
  );
};

export default ExamTopbar;
