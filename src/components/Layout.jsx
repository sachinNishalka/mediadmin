import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar wrapper with white background and shadow */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Topbar with white background and subtle shadow */}
        <div className="bg-white shadow-sm z-10">
          <Topbar />
        </div>

        {/* Main content with padding and rounded corners */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
