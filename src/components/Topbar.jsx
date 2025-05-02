import { useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function Topbar() {
  const location = useLocation();

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    return (
      path.split("/")[1].charAt(0).toUpperCase() + path.split("/")[1].slice(1)
    );
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-30 bg-blue-600 text-white md:relative">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Page Title */}
        <div className="flex items-center pl-12 md:pl-0">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </div>

        {/* Right side - Dashboard Overview */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-lg bg-blue-500 px-4 py-2 pl-10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-blue-200" />
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-5 w-5 text-blue-200" />
              <span className="text-sm">24 Patients</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-200" />
              <span className="text-sm">8 Appointments</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative rounded-full p-1 text-blue-200 hover:bg-blue-500 hover:text-white">
            <BellIcon className="h-6 w-6" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
