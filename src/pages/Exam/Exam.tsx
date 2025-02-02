import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Question } from "../../components/types/exam";
import { MultipleChoiceQuestion } from "../../components/question/MultipleChoiceQuestion";
import { SingleChoiceQuestion } from "../../components/question/SingleChoiceQuestion";
import ExamTopbar from "./components/ExamTopbar";
import ExamNavigateButton from "./components/ExamNavigationButton";
import { dummyQuestions } from "./components/dummy";
import { OpenQuestion } from "../../components/question/OpenQuestion";
import { useNavigate, useParams } from "react-router-dom";

const QuestionRenderer = (
  question: Question,
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
) => {
  const handleMultipleSelect = (option: number) => {
    setQuestions((prev: Question[]) => {
      const newQuestions = [...prev];
      const currentAnswers = [...(prev[question.idx].userAnswer as number[])];

      if (currentAnswers.includes(option)) {
        const newVal = currentAnswers.filter((o) => o !== option);
        newQuestions[question.idx].userAnswer = newVal;
      } else {
        newQuestions[question.idx].userAnswer = [...currentAnswers, option];
      }

      if (newQuestions[question.idx].userAnswer.length === 0) {
        newQuestions[question.idx].isAnswered = false;
      } else {
        newQuestions[question.idx].isAnswered = true;
      }

      return newQuestions;
    });
  };

  const handleSingleSelect = (option: number) => {
    setQuestions((prev: Question[]) => {
      const newQuestions = [...prev];
      newQuestions[question.idx].userAnswer = [option];
      newQuestions[question.idx].isAnswered = true;
      return newQuestions;
    });
  };

  const handleOpenAnswerChange = (answer: string) => {
    setQuestions((prev: Question[]) => {
      const newQuestions = [...prev];
      newQuestions[question.idx].userAnswer = answer;
      newQuestions[question.idx].isAnswered = answer.length > 0;
      return newQuestions;
    });
  };

  switch (question.type) {
    case "multiple":
      return (
        <MultipleChoiceQuestion
          question={question}
          selectedOptions={question.userAnswer}
          onSelect={handleMultipleSelect}
        />
      );
    case "single":
      return (
        <SingleChoiceQuestion
          question={question}
          selectedOption={question.userAnswer[0]}
          onSelect={handleSingleSelect}
        />
      );
    case "open":
      return (
        <OpenQuestion
          question={question}
          answer={question.userAnswer as string}
          onAnswerChange={handleOpenAnswerChange}
        />
      );
    default:
      return null;
  }
};

const Exam: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/error");
    }
  }, [id, navigate]);

  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem("examQuestions");
    return savedQuestions ? JSON.parse(savedQuestions) : dummyQuestions;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const savedIndex = localStorage.getItem("examCurrentIndex");
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem("examTimeLeft");
    return savedTime ? parseInt(savedTime) : 600;
  });

  const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = ""; // This is needed for some browsers to show the confirmation dialog.
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("examQuestions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("examCurrentIndex", currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem("examTimeLeft", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <ExamTopbar currentIndex={currentIndex} questions={questions} />
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 mr-2" />
          <p className="w-10">{formatTime(timeLeft)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mx-auto gap-10 mb-10">
        <ExamNavigateButton
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          questions={questions}
        />
      </div>
      <div className="grid grid-cols-2 bg-gray-100/50 rounded-xl shadow-md p-20 gap-10 h-fit">
        <p>{questions[currentIndex]?.question}</p>
        {questions[currentIndex] &&
          QuestionRenderer(questions[currentIndex], setQuestions)}
      </div>
    </div>
  );
};

export default Exam;
