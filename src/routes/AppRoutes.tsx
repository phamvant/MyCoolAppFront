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

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { authentication, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!authentication && !loading) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

const AppRoutes: React.FC = () => {
  const basename = import.meta.env.DEV ? "/" : "/MyCoolAppFront/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Outlet />}>
            {DashboardRoutes}
            {UserRoutes}
            {RequestRoutes}
            {ExamRoutes}
            <Route path="/" element={<Navigate to="/exams" replace />} />
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
