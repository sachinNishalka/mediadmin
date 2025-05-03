import React from "react";
import { useGetAllAppointments } from "../hooks/useGetAllAppointments";
import { useTogglePaymentStatus } from "../hooks/useTogglePaymentStatus";
import { useDeleteAppointment } from "../hooks/useDeleteAppointmnet";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

function AllAppointments() {
  const { appointments, isPending: isLoadingAppointments } =
    useGetAllAppointments();
  const { toggleAppointmentPayment, isPending: isUpdatingPayment } =
    useTogglePaymentStatus();
  const { deleteExistingAppointment, isPending: isDeleting } =
    useDeleteAppointment();

  const handlePaymentToggle = (appointmentId, currentStatus) => {
    if (window.confirm("Are you sure you want to change the payment status?")) {
      toggleAppointmentPayment({
        appointmentId,
        paymentStatus: !currentStatus,
      });
    }
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteExistingAppointment(appointmentId);
    }
  };

  if (isLoadingAppointments) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          All Appointments
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all patient appointments
        </p>
      </div>

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      First Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Age
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile Number
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Doctor Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {appointments?.map((appointment) => (
                    <tr key={appointment.reservation_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        {appointment.patient?.firstname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.patient?.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.patient?.age}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.patient?.mobile_number || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.patient?.address || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.doctor?.fullName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {appointment.time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() =>
                            handlePaymentToggle(
                              appointment.reservation_id,
                              appointment.payment
                            )
                          }
                          disabled={isUpdatingPayment}
                          className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                          style={{
                            backgroundColor: appointment.payment
                              ? "#10B981"
                              : "#9CA3AF",
                          }}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              appointment.payment
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                          <span className="sr-only">
                            {appointment.payment ? "Paid" : "Unpaid"}
                          </span>
                        </button>
                        <span className="ml-3 text-sm text-gray-500">
                          {appointment.payment ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        <button
                          onClick={() =>
                            handleDelete(appointment.reservation_id)
                          }
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
