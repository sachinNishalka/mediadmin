import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetAllStaff } from "../hooks/useGetAllStaff";
import { useGetAllDoctors } from "../hooks/useGetAllDoctors";
import { useCreateStaffDuty } from "../hooks/useCreateStaffDuty";
import { toast } from "react-toastify";
import CustomCalendar from "../components/CustomCalendar";

export default function AssignDuties() {
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

  const [validForm, setValidForm] = useState(false);

  const { staff, isPending: isLoadingStaff } = useGetAllStaff();
  const { doctors, isPending: isLoadingDoctors } = useGetAllDoctors();
  const { createNewDuty, isPending: isCreating } = useCreateStaffDuty();

  // Watch the selected doctor to get their availability
  const watchedDoctorId = watch("doctor_id");
  // Convert watchedDoctorId (string) to number to match doc.id
  const selectedDoctor = doctors?.find(
    (doc) => doc.id === Number(watchedDoctorId)
  );

  // Validate form when date or time changes
  useEffect(() => {
    if (
      selectedDate.isValid &&
      selectedTime.isValid &&
      selectedDate.value &&
      selectedTime.value
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [selectedDate, selectedTime]);

  // Function to validate date
  const validateDate = (date) => {
    if (!date) {
      setSelectedDate({
        value: "",
        isValid: false,
        validationMessage: "Please select a date",
      });
      return;
    }

    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    if (!selectedDoctor?.available_days.includes(dayName)) {
      setSelectedDate({
        value: date,
        isValid: false,
        validationMessage: "Selected date is not available for this doctor",
      });
      return;
    }

    setSelectedDate({
      value: date,
      isValid: true,
      validationMessage: "",
    });
  };

  // Function to validate time
  const validateTime = (time) => {
    if (!time) {
      setSelectedTime({
        value: "",
        isValid: false,
        validationMessage: "Please select a time",
      });
      return;
    }

    setSelectedTime({
      value: time,
      isValid: true,
      validationMessage: "",
    });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    validateDate(date);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    validateTime(time);
  };

  const onSubmit = (data) => {
    if (!validForm) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    createNewDuty({
      staff_id: data.staff_id,
      doctor_id: data.doctor_id,
      duty_date: selectedDate.value.toISOString().split("T")[0],
      duty_time: selectedTime.value,
    });

    // Reset form
    reset();
    setSelectedDate({ value: "", isValid: true, validationMessage: "" });
    setSelectedTime({ value: "", isValid: true, validationMessage: "" });
  };

  if (isLoadingStaff || isLoadingDoctors) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Assign Staff Duties
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Assign staff members to doctors based on their availability.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 space-y-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Staff Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Staff Member
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
                Select Doctor
              </label>
              <select
                {...register("doctor_id", {
                  required: "Please select a doctor",
                })}
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
          </div>

          {/* Doctor's Available Times Info - Only show when doctor is selected */}
          {selectedDoctor && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Doctor's Availability
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <CustomCalendar
                selectedDate={selectedDate.value}
                onDateSelect={handleDateSelect}
                enabledDays={selectedDoctor?.available_days}
                disabled={!selectedDoctor}
              />
              {!selectedDate.isValid && (
                <span className="text-red-500 text-xs mt-1">
                  {selectedDate.validationMessage}
                </span>
              )}
              {!selectedDoctor && (
                <div className="mt-2 text-sm text-gray-600">
                  Please select a doctor to see available dates
                </div>
              )}
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {selectedDoctor?.available_time_slots?.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
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
              {!selectedTime.isValid && (
                <span className="text-red-500 text-xs mt-1">
                  {selectedTime.validationMessage}
                </span>
              )}
              {!selectedDoctor && (
                <div className="mt-2 text-sm text-gray-600">
                  Please select a doctor to see available time slots
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <button
            type="submit"
            disabled={isCreating || !validForm}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Assigning Duty..." : "Assign Duty"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper function to get day name
function getDayName(day) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
