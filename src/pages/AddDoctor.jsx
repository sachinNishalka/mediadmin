import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

const specializations = [
  "neurologist",
  "gynecologist",
  "dermatologist",
  "pediatricians",
  "general",
];

export default function AddDoctor() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      const { error } = await supabase.from("doctor").insert([
        {
          fullName: data.fullName,
          credentials: data.credentials,
          years_of_experience: Number(data.years_of_experience),
          about: data.about,
          appointment_fee: Number(data.appointment_fee),
          is_verified: true,
          profile_image_url: data.profile_image_url,
          specialization: data.specialization,
          available_days: data.available_days
            .split(",")
            .map((d) => d.trim().toLowerCase()),
          available_time_slots: data.available_time_slots
            .split(",")
            .map((t) => t.trim()),
        },
      ]);
      if (error) throw error;
      setSuccess("Doctor added successfully!");
      reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message || "Failed to add doctor");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <span className="text-red-500 text-xs">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credentials</label>
          <input
            type="text"
            {...register("credentials", {
              required: "Credentials are required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.credentials && (
            <span className="text-red-500 text-xs">
              {errors.credentials.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            {...register("years_of_experience", {
              required: "Years of experience is required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.years_of_experience && (
            <span className="text-red-500 text-xs">
              {errors.years_of_experience.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            {...register("about", { required: "About is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.about && (
            <span className="text-red-500 text-xs">{errors.about.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Fee
          </label>
          <input
            type="number"
            {...register("appointment_fee", {
              required: "Appointment fee is required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.appointment_fee && (
            <span className="text-red-500 text-xs">
              {errors.appointment_fee.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image URL
          </label>
          <input
            type="url"
            {...register("profile_image_url", {
              required: "Profile image URL is required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.profile_image_url && (
            <span className="text-red-500 text-xs">
              {errors.profile_image_url.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Specialization
          </label>
          <select
            {...register("specialization", {
              required: "Specialization is required",
            })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select specialization...</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <span className="text-red-500 text-xs">
              {errors.specialization.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Available Days (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. monday, wednesday, friday"
            {...register("available_days", {
              required: "Available days are required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.available_days && (
            <span className="text-red-500 text-xs">
              {errors.available_days.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Available Time Slots (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. 10:00, 14:00, 16:00"
            {...register("available_time_slots", {
              required: "Available time slots are required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.available_time_slots && (
            <span className="text-red-500 text-xs">
              {errors.available_time_slots.message}
            </span>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
}
