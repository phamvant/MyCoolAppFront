import { Settings, Building } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const NavItem: React.FC<{
    to: string;
    label: string;
    className?: string;
    children?: React.ReactNode;
  }> = ({ to, label, className, children }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(to);

    return (
      <a
        href={to}
        className={`
          flex items-center p-4 rounded-3xl
          transition-all duration-300
          text-primary
          text-xl
          ${isActive ? "bg-primary/10 shadow-md" : "text-textMuted"}
          hover:bg-primary/10
          ${className}
          `}
      >
        {children}
        <span className="ml-3">{label}</span>
      </a>
    );
  };

  return (
    <aside className="rounded-xl bg-card lg:min-w-[350px] hidden md:block">
      <nav className="p-5 space-y-4">
        <NavItem to="/exams" label="Exams">
          <Building className="w-6 h-5" />
        </NavItem>
        {/* <NavItem to="/requests" label="Requests">
          <button className="relative">
            <MessageCircle className="w-6 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
        </NavItem> */}
        <NavItem to="/settings" label="Settings">
          <Settings className="w-6 h-5" />
        </NavItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
