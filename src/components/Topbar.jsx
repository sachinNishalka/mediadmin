import { useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowPathIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Topbar() {
  const location = useLocation();

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Welcome to MediAdmin";
    return (
      path.split("/")[1].charAt(0).toUpperCase() + path.split("/")[1].slice(1)
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="flex h-16 items-center justify-between px-8 border-b border-gray-100">
        {/* Left side - Greeting and Search */}
        <div className="flex items-center space-x-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500">
              {getGreeting()}, welcome back!
            </p>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search Dashboard"
              className="w-64 rounded-lg bg-gray-50 px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Sync Button */}
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500">
            <ArrowPathIcon className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center rounded-lg p-1.5 hover:bg-gray-50">
            <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-600">
              <UserCircleIcon className="h-8 w-8" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
