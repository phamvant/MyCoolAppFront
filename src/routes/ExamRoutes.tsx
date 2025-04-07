import { Route } from "react-router-dom";
import Exams from "../pages/Exam/Exams";
import { ExamPage } from "../pages/ExamPage";

const ExamRoutes = (
  <>
    <Route path="/exams" element={<Exams />} />
    <Route path="/exams/:instanceId" element={<ExamPage />} />
  </>
);

export default ExamRoutes;
