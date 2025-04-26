import { useState } from "react";
import { TMChoiceQuestion } from "../../types/exam";

interface MultipleChoiceProps {
  question: TMChoiceQuestion;
  selectedOptions: number[];
  onSelect: (option: number) => void;
  readOnly: boolean;
}

interface MultipleChoiceResultProps {
  question: TMChoiceQuestion;
  selectedOptions: number[];
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceProps> = ({
  question,
  selectedOptions,
  readOnly,
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
              if (!readOnly) {
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
export const MultipleChoiceQuestionResult: React.FC<
  MultipleChoiceResultProps
> = ({ question, selectedOptions }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`p-4 text-left rounded-lg border ${
              selectedOptions.includes(option.id)
                ? option.correct
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : option.correct
                ? "bg-green-100 border-green-500"
                : "border-gray-200"
            } transition-all`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{option.content}</span>
              {selectedOptions.includes(option.id) && (
                <span className="text-sm text-gray-500">(Your answer)</span>
              )}
              {option.correct && (
                <span className="text-sm text-gray-500">(Correct answer)</span>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-primary hover:text-primary/80 transition-colors self-start"
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </button>
          {showExplanation && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{question.explain}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
