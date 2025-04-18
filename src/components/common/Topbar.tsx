import React, { useState } from "react";
import ProfileButton from "./ProfileButton";
import { Menu } from "lucide-react";
// import { useTheme } from "../../hooks/UseTheme";
import MobileMenu from "./MobileMenu";

const Topbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <header className="bg-white shadow-sm p-4 flex justify-between items-center mb-2 fixed top-0 w-full z-40">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <a href="/" className="text-3xl font-bold text-primary ml-4">
            GMAT
          </a>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-3 py-2 rounded-full bg-gray-100 hidden md:block focus:outline-none text-text"
          />
        </div>
        <div className="flex items-center space-x-4">
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button> */}
          <ProfileButton />
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Topbar;
