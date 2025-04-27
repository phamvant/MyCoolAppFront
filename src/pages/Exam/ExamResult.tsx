import React, { useEffect, useState } from "react";
import { Question } from "../../types/exam";
import { useNavigate, useParams } from "react-router-dom";
import { examService } from "../../services/examService";
import { X } from "lucide-react";

interface QuestionDetailsModalProps {
  question: Question | null;
  onClose: () => void;
  isOpen: boolean;
}

const QuestionDetailsModal: React.FC<QuestionDetailsModalProps> = ({
  question,
  onClose,
  isOpen,
}) => {
  if (!question) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* Backdrop with fade animation */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
      />

      {/* Modal content with slide and fade animation */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 relative
          transition-all duration-300 transform
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Question {question.idx + 1}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Question Content */}
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-2">Topic: {question.topicName}</p>
              <p className="text-lg">{question.question}</p>
            </div>

            {/* Answers */}
            <div className="space-y-3">
              {question.type !== "open" &&
                question.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border transform transition-all duration-300 delay-[${
                      index * 100
                    }ms]
                    ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }
                    ${
                      option.correct && question.userAnswer.includes(option.id)
                        ? "bg-green-100 border-2 border-green-500"
                        : option.correct
                        ? "bg-green-50 border-2 border-green-500"
                        : question.userAnswer.includes(option.id)
                        ? "bg-red-100 border-2 border-red-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">{option.content}</div>
                      {option.correct && (
                        <span className="text-green-600 ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Explanation with fade-in animation */}
          <div
            className={`mt-6 p-4 bg-gray-50 rounded-lg transform transition-all duration-300 delay-300
              ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <p className="font-semibold mb-2">Explanation:</p>
            <p>{question.explain}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamResult: React.FC = () => {
  const { instanceId } = useParams<{ instanceId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!instanceId) {
      navigate("/error");
      return;
    }

    const resumeExam = async () => {
      try {
        const response = await examService.getExamResult(parseInt(instanceId));
        const convertedQuestions: Question[] =
          examService.parseResponseQuestion(response);
        setQuestions(convertedQuestions);

        const successRate = calculateSuccessRate(convertedQuestions);
        if (successRate >= 80) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    resumeExam();
  }, [instanceId, navigate]);

  useEffect(() => {
    if (selectedQuestion) {
      setIsModalOpen(true);
    }
  }, [selectedQuestion]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedQuestion(null);
    }, 300);
  };

  const calculateSuccessRate = (questions: Question[]) => {
    const correctAnswers = questions.filter((q) => {
      if (q.type === "multiple_choice" || q.type === "single") {
        return q.options.every(
          (opt) => opt.correct === q.userAnswer.includes(opt.id)
        );
      }
      return false;
    }).length;
    return (correctAnswers / questions.length) * 100;
  };

  const getEmojiForScore = (score: number) => {
    if (score >= 90) return "🎉";
    if (score >= 80) return "🌟";
    if (score >= 70) return "👍";
    if (score >= 60) return "😊";
    return "😅";
  };

  const successRate = calculateSuccessRate(questions);
  const emoji = getEmojiForScore(successRate);
  const correctAnswers = questions.filter((q) => {
    if (q.type === "multiple_choice" || q.type === "single") {
      return q.options.every(
        (opt) => opt.correct === q.userAnswer.includes(opt.id)
      );
    }
    return false;
  }).length;

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 flex flex-col max-w-7xl mx-auto pb-32 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <h1 className="text-3xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Exam Results
            </h1>
            <span className="text-4xl">{emoji}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <div className="relative bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 transform hover:scale-105 transition-all">
                  <div className="text-sm text-green-600 font-medium">
                    Total Questions
                  </div>
                  <div className="text-3xl font-bold text-green-700 mt-2">
                    {questions.length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 transform hover:scale-105 transition-all">
                  <div className="text-sm text-blue-600 font-medium">
                    Correct Answers
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mt-2">
                    {correctAnswers}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 transform hover:scale-105 transition-all">
                  <div className="text-sm text-purple-600 font-medium">
                    Success Rate
                  </div>
                  <div className="text-3xl font-bold text-purple-700 mt-2">
                    {Math.round(successRate)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 transform hover:scale-105 transition-all">
                  <div className="text-sm text-yellow-600 font-medium">
                    Time Taken
                  </div>
                  <div className="text-3xl font-bold text-yellow-700 mt-2">
                    30 min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Questions List */}
          <div className="w-1/3 bg-white rounded-xl shadow-lg p-4 overflow-y-auto max-h-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Questions
            </h2>
            <div className="space-y-2">
              {questions.map((question, index) => {
                const correct =
                  question.type === "multiple_choice" ||
                  question.type === "single"
                    ? question.options.every(
                        (opt) =>
                          opt.correct === question.userAnswer.includes(opt.id)
                      )
                    : false;

                return (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      correct
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-red-50 hover:bg-red-100"
                    }`}
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          correct ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        <span className="text-xs size-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm line-clamp-2">
                        {question.question}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Questions Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Array.from({ length: 50 }).map((_, index) => {
                const question = questions.find((q) => q.idx === index);
                const correct = question
                  ? question.type === "multiple_choice" ||
                    question.type === "single"
                    ? question.options.every(
                        (opt) =>
                          opt.correct === question.userAnswer.includes(opt.id)
                      )
                    : false
                  : null;

                return (
                  <div
                    key={index}
                    className={`p-2 rounded-lg border cursor-pointer transition-all transform hover:scale-[1.02] ${
                      question
                        ? correct
                          ? "bg-gradient-to-br from-green-50 to-green-100 border-green-400 hover:shadow-lg hover:shadow-green-100"
                          : "bg-gradient-to-br from-red-50 to-red-100 border-red-400 hover:shadow-lg hover:shadow-red-100"
                        : "bg-gray-100 border-gray-200"
                    }`}
                    onClick={() => question && setSelectedQuestion(question)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          question
                            ? correct
                              ? "bg-green-200"
                              : "bg-red-200"
                            : "bg-gray-200"
                        }`}
                      >
                        <span className="text-sm">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <QuestionDetailsModal
        question={selectedQuestion}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />
    </div>
  );
};

export default ExamResult;
