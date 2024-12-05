import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileButtonProps {
    initials: string;
    name: string;
    email: string;
    userId: string | number;
    onLogout?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
    initials,
    name,
    email,
    userId,
    onLogout = () => {},
}) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        setShowProfileMenu(false);
        navigate(`/user/${userId}`);
    };

    return (
        <div className="relative" ref={profileRef}>
            <div 
                className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
                <span className="text-blue-600">{initials}</span>
            </div>

            <div 
                className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 transform origin-top-right transition-all duration-200 ease-out
                    ${showProfileMenu 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                </div>
                
                <button 
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </button>
                
                <button 
                    onClick={() => navigate('/settings')}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                </button>
                
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