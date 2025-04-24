import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastLocation, setLastLocation] = useState(location);

  useEffect(() => {
    console.log(location, lastLocation);
    if (
      location.pathname !== lastLocation.pathname &&
      lastLocation.pathname.includes("exams/")
    ) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) {
        navigate(lastLocation.pathname, { replace: true });
      } else {
        setLastLocation(location);
      }
    } else {
      setLastLocation(location);
    }
  }, [location, lastLocation, navigate]);

  return (
    <div>
      <Topbar />
      <main className="flex gap-2 pt-20 bg-gray-50 h-screen">
        <Sidebar />
        <div className="bg-card rounded-xl flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
