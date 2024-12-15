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
import Departments from "../pages/Departments";
import Users from "../pages/Users";
import RequestChat from "../pages/RequestChat";
import { useAuth } from "../hooks/UseAuth";
import Login from "../pages/Login";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authentication, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              element={
                <div className="p-6 overflow-auto">
                  <Outlet />
                </div>
              }
            >
              <Route path="/" element={<Users />} />
              {DashboardRoutes}
              {UserRoutes}
              {RequestRoutes}
              <Route path="/departments" element={<Departments />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
            <Route path="/request/:id" element={<RequestChat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
