import { ArrowLeft, ArrowRight } from "lucide-react";
import { Question } from "../../../components/types/exam";

const ExamNavigateButton: React.FC<{
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  questions: Question[];
}> = ({ currentIndex, setCurrentIndex, questions }) => {
  return (
    <>
      <button
        className={`text-white px-4 py-2 rounded-full min-w-[150px] flex items-center gap-2 shadow-md
              ${currentIndex === 0 ? "bg-gray-200" : "bg-primary"}
              `}
        onClick={() => setCurrentIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        <ArrowLeft className="size-5" />
        <p className="text-center w-full">Previous</p>
      </button>
      <button
        className={`text-white px-4 py-2 rounded-full min-w-[150px] flex items-center gap-2 justify-between shadow-md
              ${
                currentIndex === questions.length - 1 ||
                !questions[currentIndex].isAnswered
                  ? "bg-gray-200"
                  : "bg-primary"
              }
              `}
        onClick={() => setCurrentIndex(currentIndex + 1)}
        disabled={
          currentIndex === questions.length - 1 ||
          !questions[currentIndex].isAnswered
        }
      >
        <p className="text-center w-full">Next</p>
        <ArrowRight className="size-5" />
      </button>
    </>
  );
};

export default ExamNavigateButton;
