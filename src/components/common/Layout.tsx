import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
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
