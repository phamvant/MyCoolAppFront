import { TMChoiceQuestion } from "../../types/exam";

interface MultipleChoiceProps {
  question: TMChoiceQuestion;
  selectedOptions: number[];
  onSelect: (option: number) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceProps> = ({
  question,
  selectedOptions,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`p-4 text-left rounded-lg border ${
              selectedOptions.includes(option.id)
                ? "bg-primary/10 border-primary shadow-md"
                : "border-gray-200 hover:bg-primary/5"
            } transition-all`}
            onClick={() => {
              if (!question.readOnly) {
                onSelect(option.id);
              }
            }}
          >
            {option.content}
          </button>
        ))}
      </div>
    </div>
  );
};
