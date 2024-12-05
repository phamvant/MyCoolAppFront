import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen">
                <Topbar />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;