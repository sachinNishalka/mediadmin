import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllStaff } from "../hooks/useGetAllStaff";
import { useGetAllDoctors } from "../hooks/useGetAllDoctors";
import { useUpdateDuties } from "../hooks/useUpdateDuties";
import { useDeleteDuties } from "../hooks/useDeleteDuties";
import { useGetAllDuties } from "../hooks/useGetAllDuties";
import { toast } from "react-toastify";
import CustomCalendar from "../components/CustomCalendar";
import Modal from "../components/Modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function EditDuties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState({
    value: "",
    isValid: true,
    validationMessage: "",
  });

  const [selectedTime, setSelectedTime] = useState({
    value: "",
    isValid: true,
    validationMessage: "",
  });

  const [selectedDutyId, setSelectedDutyId] = useState(null);
  const [validForm, setValidForm] = useState(false);

  const { staff, isPending: isLoadingStaff } = useGetAllStaff();
  const { doctors, isPending: isLoadingDoctors } = useGetAllDoctors();
  const { duties, isPending: isLoadingDuties } = useGetAllDuties();
  const { updateExistingDuty, isPending: isUpdating } = useUpdateDuties();
  const { deleteExistingDuty, isPending: isDeleting } = useDeleteDuties();

  // Watch the selected doctor to get their availability
  const watchedDoctorId = watch("doctor_id");
  const selectedDoctor = doctors?.find(
    (doc) => doc.id === Number(watchedDoctorId)
  );

  const handleEdit = (duty) => {
    setSelectedDutyId(duty.id);
    setValue("staff_id", duty.staff_id);
    setValue("doctor_id", duty.doctor_id);
    setSelectedDate({
      value: new Date(duty.duty_date),
      isValid: true,
      validationMessage: "",
    });
    setSelectedTime({
      value: duty.duty_time,
      isValid: true,
      validationMessage: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (dutyId) => {
    if (window.confirm("Are you sure you want to delete this duty?")) {
      deleteExistingDuty(dutyId);
    }
  };

  const onSubmit = (data) => {
    if (!validForm) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    updateExistingDuty({
      dutyId: selectedDutyId,
      staff_id: data.staff_id,
      doctor_id: data.doctor_id,
      duty_date: selectedDate.value.toISOString().split("T")[0],
      duty_time: selectedTime.value,
    });

    setIsModalOpen(false);
    reset();
    setSelectedDate({ value: "", isValid: true, validationMessage: "" });
    setSelectedTime({ value: "", isValid: true, validationMessage: "" });
    setSelectedDutyId(null);
  };

  if (isLoadingStaff || isLoadingDoctors || isLoadingDuties) {
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
        <h2 className="text-2xl font-semibold text-gray-900">Staff Duties</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all staff duty assignments
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
                      Staff Name
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {duties?.map((duty) => {
                    const staffMember = staff.find(
                      (s) => s.id === duty.staff_id
                    );
                    const doctor = doctors.find((d) => d.id === duty.doctor_id);
                    return (
                      <tr key={duty.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {staffMember?.first_name} {staffMember?.last_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {doctor?.fullName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {new Date(duty.duty_date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {duty.duty_time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(duty)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(duty.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
          setSelectedDate({ value: "", isValid: true, validationMessage: "" });
          setSelectedTime({ value: "", isValid: true, validationMessage: "" });
          setSelectedDutyId(null);
        }}
        title="Edit Duty Assignment"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff Member
            </label>
            <select
              {...register("staff_id", {
                required: "Please select a staff member",
              })}
              className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            >
              <option value="">Select staff member...</option>
              {staff?.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
            {errors.staff_id && (
              <span className="text-red-500 text-xs mt-1">
                {errors.staff_id.message}
              </span>
            )}
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            <select
              {...register("doctor_id", { required: "Please select a doctor" })}
              className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            >
              <option value="">Select doctor...</option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
            {errors.doctor_id && (
              <span className="text-red-500 text-xs mt-1">
                {errors.doctor_id.message}
              </span>
            )}
          </div>

          {/* Doctor's Available Times Info */}
          {selectedDoctor && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Doctor's Availability
              </h4>
              <div className="space-y-2">
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Available Days:</span>{" "}
                  {selectedDoctor.available_days?.join(", ")}
                </div>
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Available Time Slots:</span>{" "}
                  {selectedDoctor.available_time_slots?.join(", ")}
                </div>
              </div>
            </div>
          )}

          {/* Calendar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <CustomCalendar
              selectedDate={selectedDate.value}
              onDateSelect={(date) => {
                setSelectedDate({
                  value: date,
                  isValid: true,
                  validationMessage: "",
                });
                setValidForm(true);
              }}
              enabledDays={selectedDoctor?.available_days}
              disabled={!selectedDoctor}
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {selectedDoctor?.available_time_slots?.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setSelectedTime({
                      value: time,
                      isValid: true,
                      validationMessage: "",
                    });
                    setValidForm(true);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border ${
                    selectedTime.value === time
                      ? "bg-primary-50 border-primary-500 text-primary-600"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isUpdating || !validForm}
              className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update Duty"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
