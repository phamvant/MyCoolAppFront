import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/UseAuth";

const ProfileButton: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { authentication } = useAuth();

  const onLogout = () => {
    window.open(`http://localhost:8080/api/v1/auth/logout`, "_self");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <div
        className="flex rounded-full items-center justify-center cursor-pointer transition-colors duration-200"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        {!authentication ? (
          <a
            href="/login"
            className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary/90"
          >
            Login
          </a>
        ) : (
          <img
            className="size-8 rounded-full"
            src={authentication.picture}
            alt="Profile"
          />
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 transform origin-top-right transition-all duration-200 ease-out
                    ${
                      showProfileMenu && authentication
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
      >
        {authentication && (
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{authentication.username}</p>
            <p className="text-xs text-gray-500">{authentication.email}</p>
          </div>
        )}

        <a
          href={`/user/${authentication ? authentication.id : ""}`}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </a>

        <a
          href="/settings"
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </a>

        <div className="border-t">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
