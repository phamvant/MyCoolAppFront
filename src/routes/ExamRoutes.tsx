import { Route } from "react-router-dom";
import Exams from "../pages/Exam/Exams";
import Exam from "../pages/Exam/Exam";

const ExamRoutes = (
  <>
    <Route path="/practice" element={<Exams />} />
    <Route path="/practice/:id" element={<Exam />} />
  </>
);

export default ExamRoutes;
