import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import configuration from "../../configuration/EnvConfig";
import GradientButton from "../../components/common/GradientButton";
import { examService } from "../../services/examService";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import StatusButton from "../../components/common/StatusButton";
import { Loader2 } from "lucide-react";
interface Question {
  id: number;
  topicId: number;
  topicName: string;
  readingId: number;
  content: string;
  explain: string;
  type: string;
  link: string;
  answers: {
    id: number | null;
    content: string;
    correct: boolean;
  }[];
  error: boolean;
}

const QuestionEditor: React.FC = () => {
  const { authentication, loading } = useAuth();
  const [searchId, setSearchId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Question | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${configuration.BACKEND_URL}/questions/${searchId}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        setError("Question not found");
        setFormData(null);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to fetch question");
      setFormData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof Question,
    value: string | boolean
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleAnswerChange = (
    index: number,
    field: "content" | "correct",
    value: string | boolean
  ) => {
    if (formData) {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        [field]: value,
      };
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    }
  };

  const handleAddAnswer = () => {
    if (formData) {
      setFormData({
        ...formData,
        answers: [
          ...formData.answers,
          {
            id: null,
            content: "",
            correct: false,
          },
        ],
      });
    }
  };

  const handleRemoveAnswer = (index: number) => {
    if (formData) {
      const updatedAnswers = [...formData.answers];
      updatedAnswers.splice(index, 1);
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    }
  };

  const handleSave = async () => {
    if (formData) {
      setSaveStatus("loading");
      try {
        await examService.updateQuestion(formData.id, {
          id: formData.id,
          content: formData.content,
          explain: formData.explain,
          link: formData.link,
          answers: formData.answers.map((answer) => ({
            id: answer.id,
            content: answer.content,
            correct: answer.correct,
          })),
        });
        setSaveStatus("success");
      } catch (error) {
        console.error("Error saving question:", error);
        setSaveStatus("error");
      } finally {
        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform transition-all duration-300">
          <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            🔍 Search Question
          </h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter question ID"
                className="flex-1 px-6 py-3 border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <GradientButton
                type="submit"
                disabled={isLoading}
                gradientFrom="from-blue-500"
                gradientTo="to-cyan-500"
                hoverFrom="from-blue-600"
                hoverTo="to-cyan-600"
              >
                {isLoading ? "Searching..." : "🔍 Search"}
              </GradientButton>
            </div>
          </form>

          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}

          {formData && (
            <div className="space-y-8">
              {/* Question Type Selection */}
              <div className="flex gap-4">
                <GradientButton
                  gradientFrom={
                    formData.type === "SINGLE_CHOICE"
                      ? "from-blue-500"
                      : "from-blue-400"
                  }
                  gradientTo={
                    formData.type === "SINGLE_CHOICE"
                      ? "to-cyan-500"
                      : "to-blue-500"
                  }
                >
                  🎯 Single Choice
                </GradientButton>
                <GradientButton
                  gradientFrom={
                    formData.type === "MULTIPLE_CHOICE"
                      ? "from-blue-500"
                      : "from-blue-400"
                  }
                  gradientTo={
                    formData.type === "MULTIPLE_CHOICE"
                      ? "to-cyan-500"
                      : "to-blue-500"
                  }
                >
                  🎲 Multiple Choice
                </GradientButton>
              </div>

              {/* Question Content */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Question
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                  />
                </div>

                {/* Options Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      🎨 Answers
                    </label>
                    <GradientButton
                      onClick={handleAddAnswer}
                      gradientFrom="from-green-500"
                      gradientTo="to-emerald-500"
                      hoverFrom="from-green-600"
                      hoverTo="to-emerald-600"
                    >
                      + Add Answer
                    </GradientButton>
                  </div>
                  {formData.answers.map((option, index) => (
                    <div
                      key={option.id || `new-${index}`}
                      className="flex items-center gap-4 group"
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full transition-all duration-300"
                        checked={option.correct}
                        onChange={(e) =>
                          handleAnswerChange(index, "correct", e.target.checked)
                        }
                      />
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                        value={option.content}
                        onChange={(e) =>
                          handleAnswerChange(index, "content", e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemoveAnswer(index)}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💡 Explanation
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    rows={6}
                    value={formData.explain}
                    onChange={(e) =>
                      handleInputChange("explain", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <GradientButton
                  gradientFrom="from-red-200"
                  gradientTo="to-red-300"
                  hoverFrom="from-red-300"
                  hoverTo="to-red-400"
                >
                  ❌ Cancel
                </GradientButton>
                <StatusButton
                  status={saveStatus}
                  loadingText="Saving..."
                  successText="Saved!"
                  errorText="Failed to save"
                  defaultText="Save"
                  loadingIcon={
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  }
                  successIcon={<Check className="w-5 h-5 mr-2" />}
                  errorIcon={<X className="w-5 h-5 mr-2" />}
                  defaultIcon={<Plus className="w-5 h-5 mr-2" />}
                  onClick={handleSave}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
