import { Clock, Check, Loader2, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Question } from "../../components/types/exam";
import { MultipleChoiceQuestion } from "../../components/question/MultipleChoiceQuestion";
import { SingleChoiceQuestion } from "../../components/question/SingleChoiceQuestion";
import ExamTopbar from "./components/ExamTopbar";
import ExamNavigateButton from "./components/ExamNavigationButton";
import { dummyQuestions } from "./components/dummy";
import { OpenQuestion } from "../../components/question/OpenQuestion";
import { useNavigate, useParams } from "react-router-dom";
import configuration from "../../configuration/EnvConfig";
import { ExamInstanceResponse } from "./Exams";

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
  const [examInstance, setExamInstance] = useState<ExamInstanceResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/error");
    }
  }, [id, navigate, examInstance]);

  useEffect(() => {
    const fetchExamInstance = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${configuration.BACKEND_URL}/exam-instances/${id}`,
          {
            credentials: "include",
          }
        );
        const data = (await response.json()) as ExamInstanceResponse;
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to fetch exam instance");
        }
        setExamInstance(data);
      } catch (error) {
        console.log(error);
        setIsError("Failed to fetch exam instance");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamInstance();
  }, [id]);

  const [questions, setQuestions] = useState<Question[]>(dummyQuestions);

  useEffect(() => {
    const savedExam = localStorage.getItem(`exam-${id}`);
    if (savedExam) {
      if (JSON.parse(savedExam).timeLeft === 0) {
        localStorage.removeItem(`exam-${id}`);
        return;
      }
      const parsedExam = JSON.parse(savedExam);
      setQuestions(parsedExam.questions);
      setCurrentIndex(parsedExam.currentIndex);
      setTimeLeft(parsedExam.timeLeft);
    }
  }, [id]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600);

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
    localStorage.setItem(
      `exam-${id}`,
      JSON.stringify({
        examId: id,
        currentIndex: currentIndex,
        questions: questions,
        timeLeft: timeLeft,
      })
    );
  }, [timeLeft, currentIndex, questions, id]);

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

  if (isError) {
    navigate("/error");
  }

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const handleSave = async () => {
    setSaveStatus("saving");
    const savePromise = new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(true);
        } else {
          reject();
        }
      }, 2000)
    );

    savePromise
      .then(() => {
        setSaveStatus("saved");
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      })
      .catch(() => {
        setSaveStatus("error");
      });
  };

  return (
    <div className="h-screen xl:pt-20">
      <div className="p-6 flex flex-col max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <ExamTopbar currentIndex={currentIndex} questions={questions} />
          <div className="flex items-center gap-2 ">
            <Clock className="w-5 h-5 mr-2" />
            <p className="w-10">{formatTime(timeLeft)}</p>
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className={`text-white px-4 py-2 rounded-full flex items-center ml-4 ${
                saveStatus === "saving"
                  ? "bg-gray-400"
                  : saveStatus === "saved"
                  ? "bg-green-500 hover:bg-green-600"
                  : saveStatus === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Saved
                </>
              ) : saveStatus === "error" ? (
                <>
                  <X className="w-5 h-5 mr-2" />
                  Error
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save
                </>
              )}
            </button>
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
    </div>
  );
};

export default Exam;
