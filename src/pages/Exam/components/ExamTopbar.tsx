import { BookmarkIcon } from "lucide-react";
import { Question } from "../../../components/types/exam";

export const ExamTopbar: React.FC<{
  currentIndex: number;
  questions: Question[];
}> = ({ currentIndex, questions }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-gray-500 w-28">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <div className="w-48 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all"
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
