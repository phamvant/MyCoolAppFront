import { ArrowLeft, ArrowRight } from "lucide-react";
import { Question } from "../../../types/exam";

const ExamNavigateButton: React.FC<{
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  questions: Question[];
  onSubmit?: () => void;
}> = ({ currentIndex, setCurrentIndex, questions, onSubmit }) => {
  const handleNext = () => {
    if (currentIndex === questions.length - 1 && onSubmit) {
      onSubmit();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className={`text-white p-4 rounded-full flex items-center gap-2 shadow-md transition-all
              ${
                currentIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 active:scale-95"
              }
              `}
        onClick={() => setCurrentIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        className={`text-white p-4 rounded-full flex items-center gap-2 justify-between shadow-md transition-all
              ${
                !questions[currentIndex]?.isAnswered
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 active:scale-95"
              }
              `}
        onClick={handleNext}
        disabled={!questions[currentIndex]?.isAnswered}
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
};

export default ExamNavigateButton;
