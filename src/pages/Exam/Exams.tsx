import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProgressBar from "../../components/common/ProgressBar";
import configuration from "../../configuration/EnvConfig";
import { useNavigate } from "react-router-dom";

interface Exam {
  id: number;
  name: string;
  // description: string;
  progress: number;
  favorite: boolean;
  image: string;
  // public: boolean;
}

const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${configuration.BACKEND_URL}/exam-instances`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        const validatedExams = data.map((exam) => {
          if (!exam.id || typeof exam.id !== "number") {
            throw new Error("Invalid exam ID");
          }
          if (!exam.name || typeof exam.name !== "string") {
            throw new Error("Invalid exam name");
          }
          // if (!exam.description || typeof exam.description !== "string") {
          //   throw new Error("Invalid exam description");
          // }
          if (!exam.progress) {
            exam.progress = 0;
          }
          if (!exam.favorite) {
            exam.favorite = false;
          }
          if (!exam.image) {
            exam.image =
              "https://static.vecteezy.com/system/resources/thumbnails/009/315/297/small/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-check-list-render-png.png";
          }
          return exam;
        });

        setExams(validatedExams);
        setIsError(null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setIsError("Failed to fetch exams");
        setExams([]);
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    navigate("/error");
  }

  return (
    <div className="p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exams</h1>
        <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Exam
        </button>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-10 lg:gap-16">
        {exams.map((exam) => {
          return <ExamCard key={exam.id} exam={exam} />;
        })}
      </div>
    </div>
  );
};

const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center size-fit min-w-[13rem] lg:min-w-[16rem] gap-6 hover:scale-105 transition-all duration-300">
      <div className="w-full flex items-center justify-between gap-10">
        <ProgressBar progress={exam.progress} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src={exam.image} alt={exam.name} className="size-12 " />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{exam.name}</h3>
        </div>
        <a href={`/MyCoolAppFront/exams/${exam.id}`}>
          <div className="bg-primary text-white px-4 py-2 rounded-full">
            Take Test
          </div>
        </a>
      </div>
    </div>
  );
};

export default Exams;
