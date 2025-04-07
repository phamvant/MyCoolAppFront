import React from "react";
import { BookmarkIcon } from "lucide-react";
import { Question } from "../../../types/exam";

interface ExamTopbarProps {
  currentIndex: number;
  questions: Question[];
}

const ExamTopbar: React.FC<ExamTopbarProps> = ({ currentIndex, questions }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-lg font-medium">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
        <BookmarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ExamTopbar;
