import { Route } from "react-router-dom";
import QuestionEditor from "../pages/Admin/QuestionEditor";

const AdminRoutes = (
  <>
    <Route path="/admin/question-editor" element={<QuestionEditor />} />
  </>
);

export default AdminRoutes;
