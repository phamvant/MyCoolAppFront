import { Route } from "react-router-dom";
import Exams from "../pages/Exam/Exams";
import Exam from "../pages/Exam/Exam";

const ExamRoutes = (
  <>
    <Route path="/exams" element={<Exams />} />
    <Route path="/exams/:id" element={<Exam />} />
  </>
);

export default ExamRoutes;
