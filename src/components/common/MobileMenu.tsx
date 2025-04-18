import React from "react";
import { X, Settings, BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const NavItem: React.FC<{
    to: string;
    label: string;
    icon: React.ReactNode;
  }> = ({ to, label, icon }) => {
    const isActive =
      (to.includes(location.pathname) && location.pathname !== "/") ||
      (label === "Home" && location.pathname === "/");

    return (
      <Link
        to={to}
        onClick={onClose}
        className={`
          flex items-center p-4 rounded-3xl
          transition-all duration-300
          text-primary
          text-xl
          ${isActive ? "bg-primary/10 shadow-md" : "text-textMuted"}
          hover:bg-primary/10
        `}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </Link>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`absolute left-0 top-0 h-full w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-5 space-y-4">
          <NavItem to="/" label="Home" icon={<Home className="w-6 h-5" />} />
          <NavItem
            to="/exams"
            label="Exams"
            icon={<BookOpen className="w-6 h-5" />}
          />
          <NavItem
            to="/settings"
            label="Settings"
            icon={<Settings className="w-6 h-5" />}
          />
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
