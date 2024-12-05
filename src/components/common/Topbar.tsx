import React from "react";
import ProfileButton from "./ProfileButton";

const Topbar: React.FC = () => {
    const handleLogout = () => {
        console.log("Logging out...");
    };

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="flex items-center space-x-4">
                <ProfileButton 
                    initials="JD"
                    name="John Doe"
                    email="john@example.com"
                    userId="1"
                    onLogout={handleLogout}
                />
            </div>
        </header>
    );
};

export default Topbar;