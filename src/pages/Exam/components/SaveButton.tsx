import React from "react";
import { Check, Loader2, Save, X } from "lucide-react";

interface FinishButtonProps {
  finishStatus: "idle" | "saving" | "saved" | "error";
  onFinish: () => void;
}

const FinishButton: React.FC<FinishButtonProps> = ({
  finishStatus,
  onFinish,
}) => {
  return (
    <button
      onClick={onFinish}
      disabled={finishStatus === "saving"}
      className={`text-white px-4 py-2 rounded-full flex items-center ml-4 ${
        finishStatus === "saving"
          ? "bg-gray-400"
          : finishStatus === "saved"
          ? "bg-green-500 hover:bg-green-600"
          : finishStatus === "error"
          ? "bg-red-500 hover:bg-red-600"
          : "bg-primary hover:bg-primary/80"
      }`}
    >
      {finishStatus === "saving" ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Finishing...
        </>
      ) : finishStatus === "saved" ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          Finished
        </>
      ) : finishStatus === "error" ? (
        <>
          <X className="w-5 h-5 mr-2" />
          Error
        </>
      ) : (
        <>
          <Save className="w-5 h-5 mr-2" />
          Finish
        </>
      )}
    </button>
  );
};

export default FinishButton;
