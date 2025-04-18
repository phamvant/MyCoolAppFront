import React from "react";
import { Loader2 } from "lucide-react";

interface DialogProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  status: "idle" | "loading" | "success" | "error";
  instanceId: number | null;
  isOpen: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  onClose,
  onConfirm,
  title,
  message,
  status,
  instanceId,
  isOpen,
}) => {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-card shadow-lg rounded-2xl p-6 max-w-md w-full md:mx-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          {status === "error" ? (
            <div className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
              Error
            </div>
          ) : status === "loading" ? (
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : status === "success" && instanceId ? (
            <a
              href={`exams/${instanceId}`}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
              target="_blank"
              onClick={onClose}
            >
              Go to Exam
            </a>
          ) : (
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={() => {
                  onConfirm();
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors"
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
