import { ChevronRight, ChevronLeft, Home, Users, MessageCircle, Settings, Building } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const NavItem: React.FC<{
        to: string;
        label: string;
        className?: string;
        children?: React.ReactNode;
    }> = ({ to, label, className, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `
        flex items-center p-2 rounded-lg
        ${className}
        ${isActive
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-600'
                } 
        ${isCollapsed ? 'justify-center' : ''}
      `}
        >
            {children}
            {!isCollapsed && <span className="ml-3">{label}</span>}
        </NavLink>
    );

    return <>
        <aside
            className={`
          bg-white border-r
          ${isCollapsed ? 'w-21' : 'w-64'}
        `}
        >
            <div className="flex items-center justify-between p-5 border-b">
                {!isCollapsed && (
                    <Link
                        to="/"
                        className="text-3xl font-bold text-blue-600"
                    >
                        Mgmt
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-3 rounded-full hover:bg-gray-100"
                >
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-5 space-y-2">
                {/* <NavItem
                    to="/"
                    label="Dashboard"
                >
                    <Home className="w-6 h-5" />
                </NavItem> */}
                <NavItem
                    to="/users"
                    label="Users"
                >
                    <Users className="w-6 h-5" />
                </NavItem>
                <NavItem
                    to="/departments"
                    label="Departments"
                >
                    <Building className="w-6 h-5" />
                </NavItem>
                <NavItem
                    to="/requests"
                    label="Requests"
                >
                <button className="relative">
                    <MessageCircle className="w-6 h-5" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        3
                    </span>
                </button>
                </NavItem>
                <NavItem
                    to="/settings"
                    label="Settings"
                >
                    <Settings className="w-6 h-5" />
                </NavItem>
            </nav>
        </aside >
    </>
}

export default Sidebar;