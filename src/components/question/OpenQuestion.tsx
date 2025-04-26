import { TOpenQuestion } from "../../types/exam";
import { useRef, useEffect } from "react";

interface OpenQuestionProps {
  question: TOpenQuestion;
  answer: string;
  onAnswerChange: (answer: string) => void;
  readOnly: boolean;
}

export const OpenQuestion: React.FC<OpenQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  readOnly,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answer]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <textarea
        ref={textareaRef}
        className="w-full p-4 border border-gray-200 rounded-lg resize-none min-h-[8rem] max-h-[24rem] overflow-y-auto"
        value={answer}
        onChange={(e) => {
          if (!readOnly) {
            onAnswerChange(e.target.value);
          }
        }}
        placeholder="Type your answer here..."
      />
    </div>
  );
};
