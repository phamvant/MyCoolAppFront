import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProgressBar from "../../components/common/ProgressBar";
import configuration from "../../configuration/EnvConfig";
import { validateInstance } from "./components/Validation";
import { useAuth } from "../../hooks/UseAuth";
import Dialog from "../../components/common/InstanceCreateDialog";

interface Exam extends ExamResponse {
  author: string;
  favorite?: boolean;
  image: string;
  public: boolean;
}

interface ExamResponse {
  id: number;
  name: string;
  description: string;
  public: boolean;
}

export interface ExamInstance extends ExamInstanceResponse {
  exam: Exam;
}

export interface ExamInstanceResponse {
  id: number;
  examId: number;
  progress?: number;
  startDate: string;
  favourite: boolean;
}

const img =
  "https://static.vecteezy.com/system/resources/thumbnails/009/315/297/small/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-check-list-render-png.png";

const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examInstances, setExamInstances] = useState<ExamInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { authentication, loading } = useAuth();

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.allSettled([
          fetch(
            `${configuration.BACKEND_URL}/exams${
              authentication ? "" : "/public"
            }`,
            {
              credentials: "include",
            }
          ),
          fetch(`${configuration.BACKEND_URL}/exam-instances`, {
            credentials: "include",
          }),
        ]);

        // Check if any requests failed
        const [examData, instanceData] = (await Promise.all(
          responses.map(async (result) => {
            if (result.status === "fulfilled") {
              try {
                return await result.value.json();
              } catch (error) {
                console.error("Error fetching exams:", error);
                return [] as ExamResponse[] | ExamInstanceResponse[];
              }
            }
            return [] as ExamResponse[] | ExamInstanceResponse[];
          })
        )) as [ExamResponse[], ExamInstanceResponse[]];

        if (!Array.isArray(examData)) {
          throw new Error("Invalid data format");
        }

        const validatedExams = examData.map((exam) => {
          if (!exam.id || typeof exam.id !== "number") {
            throw new Error("Invalid exam ID");
          }
          if (!exam.name || typeof exam.name !== "string") {
            throw new Error("Invalid exam name");
          }
          if (!exam.description || typeof exam.description !== "string") {
            throw new Error("Invalid exam description");
          }
          if (!exam.public) {
            exam.public = false;
          }

          return exam;
        });

        const validatedInstances = instanceData.map((instance) => {
          return validateInstance(instance);
        });

        const mappedExams = validatedExams.map((exam) => {
          return {
            ...exam,
            favorite: false,
            public: false,
            image: img,
            author: "John Doe",
          };
        });

        setExams(mappedExams);

        setExamInstances(() => {
          return validatedInstances.map((instance) => {
            return {
              ...instance,
              exam: mappedExams.find((exam) => exam.id === instance.examId)!,
            };
          });
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setExams([]);
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [authentication, loading]);

  useEffect(() => {}, [examInstances, isLoading]);

  return (
    <div className="p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Practice</h1>
        <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Exam
        </button>
      </div>

      <div className="flex flex-col gap-4 md:gap-10">
        {examInstances.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-10 ">
            <div>
              <h1 className="text-2xl text-textMuted mb-4">Continue</h1>
              <div className="flex flex-wrap gap-4 md:gap-10">
                {examInstances.map((instance) => {
                  return (
                    <ExamInstanceCard key={instance.id} instance={instance} />
                  );
                })}
              </div>
            </div>
            <div className="w-full h-[1px] bg-border" />
          </div>
        )}
        <div>
          <h1 className="text-2xl text-textMuted mb-4">
            {authentication ? "My Practice" : "Public Practice"}
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-10">
            {exams.map((exam) => {
              return <ExamCard key={exam.id} exam={exam} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamCard: React.FC<{
  exam: Exam;
}> = ({ exam }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [instance, setInstance] = useState<ExamInstanceResponse | null>(null);

  useEffect(() => {
    if (!isDialogOpen) {
      setStatus("idle");
    }
  }, [isDialogOpen]);

  const createNewInstance = async (examId: string) => {
    setStatus("loading");
    try {
      const response = await fetch(
        `${configuration.BACKEND_URL}/exam-instances/create/${examId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = (await response.json()) as ExamInstanceResponse;
      console.log(data);
      setStatus("success");
      setInstance(data);
    } catch (error) {
      console.error("Error fetching URL:", error);
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full md:w-auto bg-card rounded-2xl shadow-md min-w-[16rem] gap-6 p-6 hover:scale-105 transition-all duration-300 ">
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onConfirm={() => {
          createNewInstance(`${exam.id}`);
        }}
        status={status}
        instanceId={instance?.id ?? null}
        title={"Take Test"}
        message={"Are you sure you want to take this test?"}
      />
      <p className="text-textMuted/60 mb-6 text-right">{exam.author}</p>
      <div className="flex flex-col w-full items-center size-fit gap-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={exam.image}
            alt={exam.name}
            className="md:size-12 size-10"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{exam.name}</h3>
          </div>
          <div
            className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Take Test
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamInstanceCard: React.FC<{ instance: ExamInstance }> = ({
  instance,
}) => {
  return (
    <div className="w-full md:w-auto bg-white p-6 rounded-2xl shadow-md flex flex-col items-center size-fit min-w-[16rem] gap-6 hover:scale-105 transition-all duration-300">
      <div className="w-full flex items-center justify-between gap-10">
        {instance.progress !== undefined && (
          <ProgressBar progress={instance.progress} />
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src={instance.exam.image}
          alt={instance.exam.name}
          className="size-12 "
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{instance.exam.name}</h3>
        </div>
        <a href={`/MyCoolAppFront/exams/${instance.id}`} target="_blank">
          <div className="bg-primary text-white px-4 py-2 rounded-full">
            Take Test
          </div>
        </a>
      </div>
    </div>
  );
};

export default Exams;
