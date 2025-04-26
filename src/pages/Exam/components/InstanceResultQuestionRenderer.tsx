import React from "react";
import { Question as ComponentQuestion } from "../../../types/exam";
import { MultipleChoiceQuestionResult } from "../../../components/question/MultipleChoiceQuestion";
import { SingleChoiceQuestion } from "../../../components/question/SingleChoiceQuestion";
import { OpenQuestion } from "../../../components/question/OpenQuestion";

interface InstanceResultQuestionRendererProps {
  question: ComponentQuestion;
}

const InstanceResultQuestionRenderer: React.FC<
  InstanceResultQuestionRendererProps
> = ({ question }) => {
  switch (question.type) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestionResult
          question={question}
          selectedOptions={question.userAnswer}
        />
      );
    case "single":
      return (
        <SingleChoiceQuestion
          question={question}
          selectedOption={question.userAnswer[0]}
          readOnly={true}
          onSelect={() => {}}
        />
      );
    case "open":
      return (
        <OpenQuestion
          question={question}
          answer={question.userAnswer as string}
          readOnly={true}
          onAnswerChange={() => {}}
        />
      );
    default:
      return null;
  }
};

export default InstanceResultQuestionRenderer;
