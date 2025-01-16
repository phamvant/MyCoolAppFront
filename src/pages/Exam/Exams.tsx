import React from "react";
import { Plus } from "lucide-react";
import ProgressBar from "../../components/common/ProgressBar";
import { NavLink } from "react-router-dom";

interface Exam {
  id: number;
  name: string;
  description: string;
  progress: number;
  favorite: boolean;
  url: string;
  image: string;
}

const Exams: React.FC = () => {
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
        {Array.from({ length: 10 }).map((_val, idx) => {
          return (
            <ExamCard
              key={idx}
              exam={{
                id: idx + 1,
                name: `Exam-${idx + 1}`,
                description: `Exam-${idx + 1} description`,
                progress: 0.5,
                favorite: false,
                url: `/exams/${idx + 1}`,
                image:
                  "https://static.vecteezy.com/system/resources/thumbnails/009/315/297/small/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-check-list-render-png.png",
              }}
            />
          );
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
        <NavLink to={exam.url}>
          <div className="bg-primary text-white px-4 py-2 rounded-full">
            Take Test
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Exams;
