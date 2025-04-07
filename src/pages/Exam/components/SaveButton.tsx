import React from "react";
import { Check, Loader2, Save, X } from "lucide-react";

interface SaveButtonProps {
  saveStatus: "idle" | "saving" | "saved" | "error";
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ saveStatus, onSave }) => {
  return (
    <button
      onClick={onSave}
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
  );
};

export default SaveButton;
