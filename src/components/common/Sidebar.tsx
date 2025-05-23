import { Settings, BookOpen, Home, Pencil } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

const Sidebar: React.FC = () => {
  const { authentication } = useAuth();
  let isAdmin = false;

  if (authentication) {
    isAdmin = authentication.role === "ADMIN";
  }

  const NavItem: React.FC<{
    to: string;
    label: string;
    className?: string;
    children?: React.ReactNode;
  }> = ({ to, label, className, children }) => {
    const location = useLocation();
    const isActive =
      (to.includes(location.pathname) && location.pathname !== "/") ||
      (label === "Home" && location.pathname === "/");

    return (
      <Link
        to={to}
        className={`
          flex items-center p-4 rounded-full
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
      </Link>
    );
  };

  return (
    <aside className="rounded-xl bg-card hidden md:block">
      <nav className="p-5 space-y-4">
        <NavItem to="/" label="Home">
          <Home className="w-6 h-5" />
        </NavItem>
        <NavItem to="/exams" label="Exams">
          <BookOpen className="w-6 h-5" />
        </NavItem>
        {isAdmin && (
          <NavItem to="/admin/question-editor" label="Question Editor">
            <Pencil className="w-6 h-5" />
          </NavItem>
        )}
        <NavItem to="/settings" label="Settings">
          <Settings className="w-6 h-5" />
        </NavItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
