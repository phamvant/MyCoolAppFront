import React from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 mr-2" />
      <p className="w-10">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
