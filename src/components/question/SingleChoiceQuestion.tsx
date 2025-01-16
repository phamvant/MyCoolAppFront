import { TSChoiceQuestion } from "../types/exam";

interface SingleChoiceProps {
  question: TSChoiceQuestion;
  selectedOption: number | null;
  onSelect: (option: number) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceProps> = ({
  question,
  selectedOption,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`p-4 text-left rounded-lg border ${
              selectedOption === index + 1
                ? "bg-primary/10 border-primary shadow-md"
                : "border-gray-200 hover:bg-primary/5"
            } transition-all`}
            onClick={() => onSelect(index + 1)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
