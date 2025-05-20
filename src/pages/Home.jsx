import React from "react";
import { useGetAllPatients } from "../hooks/useGetAllPatients";
import { useGetAllDoctors } from "../hooks/useGetAllDoctors";
import { useGetAllDuties } from "../hooks/useGetAllDuties";
import { useGetAllStaff } from "../hooks/useGetAllStaff";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const { patients, isPending: isLoadingPatients } = useGetAllPatients();
  const { doctors, isPending: isLoadingDoctors } = useGetAllDoctors();
  const { duties, isPending: isLoadingDuties } = useGetAllDuties();
  const { staff, isPending: isLoadingStaff } = useGetAllStaff();

  const isLoading =
    isLoadingPatients || isLoadingDoctors || isLoadingDuties || isLoadingStaff;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter today's duties
  const todaysDuties = duties?.filter((duty) => duty.duty_date === today) || [];

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments =
    duties?.filter((duty) => {
      const dutyDate = new Date(duty.duty_date);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      return dutyDate >= today && dutyDate <= nextWeek;
    }) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Patients */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
              <UserGroupIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">
                Total Patients
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {patients?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <UserIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">
                Total Doctors
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {doctors?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Total Staff */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Staff</h2>
              <p className="text-2xl font-semibold text-gray-900">
                {staff?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Today's Duties */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
              <CalendarDaysIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">
                Today's Duties
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {todaysDuties.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/staff/add"
          className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
              <PlusIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-900">
                Add New Staff
              </h2>
              <p className="text-sm text-gray-500">
                Register a new staff member
              </p>
            </div>
          </div>
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
        </Link>

        {/* Add New Doctor Card */}
        <Link
          to="/doctors/add"
          className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <UserIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-900">
                Add New Doctor
              </h2>
              <p className="text-sm text-gray-500">Register a new doctor</p>
            </div>
          </div>
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          to="/staff/duties"
          className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-900">
                Assign Duties
              </h2>
              <p className="text-sm text-gray-500">Schedule staff duties</p>
            </div>
          </div>
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          to="/appointments"
          className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-900">
                View Appointments
              </h2>
              <p className="text-sm text-gray-500">
                Manage patient appointments
              </p>
            </div>
          </div>
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
        </Link>
      </div>

      {/* Today's Duties and Upcoming Appointments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Duties */}
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Today's Duties
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Staff assignments for today
            </p>
          </div>
          <div className="border-t border-gray-100">
            {todaysDuties.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No duties scheduled for today
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {todaysDuties.map((duty) => (
                  <li key={duty.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {duty.staff?.first_name} {duty.staff?.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          with Dr. {duty.doctor?.fullName}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {duty.duty_time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Upcoming Appointments
            </h2>
            <p className="mt-1 text-sm text-gray-500">Next 7 days</p>
          </div>
          <div className="border-t border-gray-100">
            {upcomingAppointments.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No upcoming appointments
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {upcomingAppointments.slice(0, 5).map((appointment) => (
                  <li key={appointment.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(appointment.duty_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Dr. {appointment.doctor?.fullName} -{" "}
                          {appointment.duty_time}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.staff?.first_name}{" "}
                        {appointment.staff?.last_name}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
