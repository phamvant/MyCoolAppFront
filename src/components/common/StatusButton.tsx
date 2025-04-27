interface StatusButtonProps {
  status: "idle" | "loading" | "success" | "error";
  loadingText: string;
  successText: string;
  errorText: string;
  defaultText: string;
  loadingIcon: React.ReactNode;
  successIcon: React.ReactNode;
  errorIcon: React.ReactNode;
  defaultIcon: React.ReactNode;
  onClick: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  status,
  loadingText,
  successText,
  errorText,
  defaultText,
  loadingIcon,
  successIcon,
  errorIcon,
  defaultIcon,
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-r 
        ${
          status === "loading"
            ? "from-gray-500 to-gray-600"
            : status === "success"
            ? "from-green-500 to-emerald-500"
            : status === "error"
            ? "from-red-500 to-rose-500"
            : "from-blue-500 to-cyan-500"
        } 
        hover:bg-gradient-to-r 
        ${
          status === "loading"
            ? "from-gray-600 to-gray-700"
            : status === "success"
            ? "from-green-600 to-emerald-600"
            : status === "error"
            ? "from-red-600 to-rose-600"
            : "from-blue-600 to-cyan-600"
        } 
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
      onClick={onClick}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? loadingIcon
        : status === "success"
        ? successIcon
        : status === "error"
        ? errorIcon
        : defaultIcon}
      {status === "loading"
        ? loadingText
        : status === "success"
        ? successText
        : status === "error"
        ? errorText
        : defaultText}
    </button>
  );
};

export default StatusButton;
