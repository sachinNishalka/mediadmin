import supabase from "./supabase";

export async function getAllDoctors() {
  const { data, error } = await supabase.from("doctor").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDoctorById(doctorId) {
  const { data, error } = await supabase
    .from("doctor")
    .select(
      `
      *,
      specialization (
        id,
        name
      ),
      availability_slots (
        id,
        day,
        start_time,
        end_time
      ),
      doctor_specialization (
        id,
        specialization_id
      )
    `
    )
    .eq("id", doctorId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDoctorsBySpecialization(specializationId) {
  const { data, error } = await supabase
    .from("doctor")
    .select(
      `
      *,
      specialization (
        id,
        name
      ),
      availability_slots (
        id,
        day,
        start_time,
        end_time
      ),
      doctor_specialization (
        id,
        specialization_id
      )
    `
    )
    .eq("doctor_specialization.specialization_id", specializationId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAvailableDoctors(date) {
  const { data, error } = await supabase
    .from("doctor")
    .select(
      `
      *,
      specialization (
        id,
        name
      ),
      availability_slots (
        id,
        day,
        start_time,
        end_time
      )
    `
    )
    .not("availability_slots", "is", null);

  if (error) {
    throw new Error(error.message);
  }

  // Filter doctors based on their availability for the given date
  const dayOfWeek = new Date(date).getDay();
  return data.filter((doctor) =>
    doctor.availability_slots.some((slot) => slot.day === dayOfWeek)
  );
}
