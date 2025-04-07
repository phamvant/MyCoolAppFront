import React, { useEffect, useState } from "react";
import { Question } from "../../types/exam";
import { useNavigate } from "react-router-dom";
import { AnswerSubmission, examService } from "../../services/examService";
import QuestionRenderer from "./components/QuestionRenderer";
import ExamTopbar from "./components/ExamTopbar";
import ExamNavigateButton from "./components/ExamNavigationButton";
import SaveButton from "./components/SaveButton";
import Timer from "./components/Timer";

const Exam: React.FC<{ instanceId: number }> = ({ instanceId }) => {
  const navigate = useNavigate();
  const [examState, setExamState] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  // const [selectedAnswer, setSetlectedAnswers] = useState();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  useEffect(() => {
    if (!instanceId) {
      navigate("/error");
      return;
    }

    const resumeExam = async () => {
      try {
        setExamState("loading");
        const response = await examService.resumeExam(instanceId);

        // Convert ExamQuestion to ComponentQuestion
        const convertedQuestions: Question[] =
          examService.parseResponseQuestion(response);

        setQuestions(convertedQuestions);

        const lastAnsweredIndex =
          convertedQuestions
            .map((q, idx) => ({ isAnswered: q.isAnswered, idx }))
            .filter((q) => q.isAnswered)
            .map((q) => q.idx)
            .pop() ?? 0;

        setCurrentIndex(lastAnsweredIndex + 1);

        setExamState("idle");
      } catch (error) {
        console.error(error);
        setExamState("error");
      }
    };

    resumeExam();
  }, [instanceId, navigate]);

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

  // useEffect(() => {
  //   localStorage.setItem(
  //     `exam-${instanceId}`,
  //     JSON.stringify({
  //       examId: instanceId,
  //       currentIndex: currentIndex,
  //       questions: questions,
  //       timeLeft: timeLeft,
  //     })
  //   );
  // }, [timeLeft, currentIndex, questions, instanceId]);

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

  if (examState === "error") {
    navigate("/error");
  }

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

  const handleSubmit = async () => {
    if (!questions || questions.length === 0) return;

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion.isAnswered) {
      // You might want to show an error message here
      return;
    }

    try {
      setExamState("loading");

      const userAnswers: AnswerSubmission[] = questions.map((q: Question) => {
        return {
          answerId: q.userAnswer,
          questionId: q.id,
        };
      });

      const response = await examService.processNextQuestion(
        instanceId,
        userAnswers
      );
      const convertedQuestions: Question[] = examService.parseResponseQuestion({
        ...response,
        userResponseDTOS: [],
      });

      setQuestions(convertedQuestions);

      setExamState("idle");
    } catch (error) {
      console.error(error);
      setExamState("error");
    }
  };

  return (
    <div className="h-screen relative">
      <div className="p-6 flex flex-col max-w-7xl mx-auto pb-32">
        <div className="flex justify-between items-center mb-6">
          <ExamTopbar currentIndex={currentIndex} questions={questions} />
          <div className="flex items-center gap-2">
            <Timer timeLeft={timeLeft} />
            <SaveButton saveStatus={saveStatus} onSave={handleSave} />
          </div>
        </div>

        {questions.length > 0 && (
          <div className="grid grid-cols-2 bg-gray-100/50 rounded-xl shadow-md p-20 gap-10 h-fit mb-10">
            <p>{questions[currentIndex]?.question}</p>
            {questions[currentIndex] && (
              <QuestionRenderer
                question={questions[currentIndex]}
                setQuestions={setQuestions}
              />
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-4">
          <ExamNavigateButton
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            questions={questions}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Exam;
