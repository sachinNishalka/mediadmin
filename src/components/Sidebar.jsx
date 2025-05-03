import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Add Staff", href: "/staff/add", icon: UserGroupIcon },
  { name: "Assign Duties", href: "/staff/duties", icon: CalendarIcon },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400 md:hidden"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900">MediAdmin</h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Secondary Navigation */}
            {secondaryNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-gray-50 text-gray-700"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-gray-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Help Center Section */}
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-primary-50 p-4">
              <h3 className="text-sm font-medium text-primary-800">
                Need help?
              </h3>
              <p className="mt-1 text-sm text-primary-600">
                Check our documentation
              </p>
              <button className="mt-3 text-sm font-medium text-primary-700 hover:text-primary-800">
                Visit Help Center →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
