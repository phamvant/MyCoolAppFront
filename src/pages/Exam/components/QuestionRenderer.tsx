import React from "react";
import { Question as ComponentQuestion } from "../../../types/exam";
import { MultipleChoiceQuestion } from "../../../components/question/MultipleChoiceQuestion";
import { SingleChoiceQuestion } from "../../../components/question/SingleChoiceQuestion";
import { OpenQuestion } from "../../../components/question/OpenQuestion";

interface QuestionRendererProps {
  question: ComponentQuestion;
  setQuestions: React.Dispatch<React.SetStateAction<ComponentQuestion[]>>;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  setQuestions,
}) => {
  const handleMultipleSelect = (selectedAnswerId: number) => {
    setQuestions((prev: ComponentQuestion[]) => {
      const newQuestions = [...prev];
      const currentAnswers = [...(prev[question.idx].userAnswer as number[])];

      if (currentAnswers.includes(selectedAnswerId)) {
        const newVal = currentAnswers.filter((o) => o !== selectedAnswerId);
        newQuestions[question.idx].userAnswer = newVal;
      } else {
        newQuestions[question.idx].userAnswer = [
          ...currentAnswers,
          selectedAnswerId,
        ];
      }

      if (newQuestions[question.idx].userAnswer.length === 0) {
        newQuestions[question.idx].isAnswered = false;
      } else {
        newQuestions[question.idx].isAnswered = true;
      }

      return newQuestions;
    });
  };

  const handleSingleSelect = (selectedAnswerId: number) => {
    setQuestions((prev: ComponentQuestion[]) => {
      const newQuestions = [...prev];
      newQuestions[question.idx].userAnswer = [selectedAnswerId];
      newQuestions[question.idx].isAnswered = true;
      return newQuestions;
    });
  };

  const handleOpenAnswerChange = (answer: string) => {
    setQuestions((prev: ComponentQuestion[]) => {
      const newQuestions = [...prev];
      newQuestions[question.idx].userAnswer = answer;
      newQuestions[question.idx].isAnswered = answer.length > 0;
      return newQuestions;
    });
  };

  switch (question.type) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          selectedOptions={question.userAnswer}
          onSelect={handleMultipleSelect}
          readOnly={false}
        />
      );
    case "single":
      return (
        <SingleChoiceQuestion
          question={question}
          selectedOption={question.userAnswer[0]}
          onSelect={handleSingleSelect}
          readOnly={false}
        />
      );
    case "open":
      return (
        <OpenQuestion
          question={question}
          answer={question.userAnswer as string}
          onAnswerChange={handleOpenAnswerChange}
          readOnly={false}
        />
      );
    default:
      return null;
  }
};

export default QuestionRenderer;
