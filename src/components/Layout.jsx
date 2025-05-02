import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-0">
        <Topbar />
        <main className="flex-1 overflow-auto bg-gray-50 p-6 pt-24 md:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
