import React from "react";
import { Clock } from "lucide-react";
import { useExamTimer } from "../../../hooks/useExamTimer";

interface TimerProps {
  instanceId: number;
}

const Timer: React.FC<TimerProps> = ({ instanceId }) => {
  const { formattedTime, isActive } = useExamTimer(instanceId);

  return (
    <div className={`flex items-center gap-2 ${!isActive ? "opacity-50" : ""}`}>
      <Clock className="w-5 h-5 text-gray-600" />
      <span className="font-medium text-gray-700">{formattedTime}</span>
    </div>
  );
};

export default Timer;
