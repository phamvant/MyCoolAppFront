import React from "react";
import { useParams } from "react-router-dom";
import Exam from "./Exam/Exam";

export const ExamPage: React.FC = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  if (!instanceId) {
    return <div className="text-center p-4">Invalid exam instance ID</div>;
  }

  return <Exam instanceId={parseInt(instanceId, 10)} />;
};
