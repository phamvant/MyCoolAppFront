import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "../components/common/Layout";
import DashboardRoutes from "./DashboardRoutes";
import UserRoutes from "./UserRoutes";
import RequestRoutes from "./RequestRoutes";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import ExamRoutes from "./ExamRoutes";
import { Landing } from "../pages/Landing";

const AppRoutes: React.FC = () => {
  // const basename = "/MyCoolAppFront";

  // const initializeCsrf = async () => {
  //   await fetch(`${configuration.BACKEND_URL}/csrf-token`, {
  //     credentials: "include",
  //   });
  // };
  // useEffect(() => {
  //   initializeCsrf();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Outlet />}>
            {DashboardRoutes}
            {UserRoutes}
            {RequestRoutes}
            {ExamRoutes}
            <Route path="/" element={<Landing />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/exams/:id" element={<Exam />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
