import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  gradientFrom = "from-blue-500",
  gradientTo = "to-cyan-500",
  hoverFrom = "from-blue-600",
  hoverTo = "to-cyan-600",
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:bg-gradient-to-r ${hoverFrom} ${hoverTo} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default GradientButton;
