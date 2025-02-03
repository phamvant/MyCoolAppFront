import { Route } from "react-router-dom";
import Exams from "../pages/Exam/Exams";

const ExamRoutes = (
  <>
    <Route path="/exams" element={<Exams />} />
  </>
);

export default ExamRoutes;
