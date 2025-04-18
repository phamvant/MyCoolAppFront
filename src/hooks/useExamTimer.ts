import { useState, useEffect, useCallback } from "react";
import configuration from "../configuration/EnvConfig";

export const useExamTimer = (instanceId: number) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const fetchRemainingTime = useCallback(async () => {
    try {
      const response = await fetch(
        `${configuration.BACKEND_URL}/exam-instances/${instanceId}/remaining-time`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch remaining time");
      const time = await response.json();
      setRemainingTime(time);
    } catch (error) {
      console.error("Error fetching remaining time:", error);
    }
  }, [instanceId]);

  useEffect(() => {
    // Initial fetch
    fetchRemainingTime();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(() => {
      if (isActive) {
        fetchRemainingTime();
      }
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchRemainingTime, isActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    remainingTime,
    formattedTime: formatTime(remainingTime),
    isActive,
    setIsActive,
  };
};
