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
  const basename = "/MyCoolAppFront";

  return (
    <BrowserRouter basename={basename}>
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
