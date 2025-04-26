import { Route } from "react-router-dom";
import Exams from "../pages/Exam/Exams";
import ExamPage from "../pages/ExamPage";
import ExamResult from "../pages/Exam/ExamResult";

const ExamRoutes = (
  <>
    <Route path="/exams" element={<Exams />} />
    <Route path="/exams/:instanceId" element={<ExamPage />} />
    <Route path="/exams/:instanceId/result" element={<ExamResult />} />
  </>
);

export default ExamRoutes;
