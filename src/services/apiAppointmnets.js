import supabase from "./supabase";

export async function getAllAppointments() {
  // Step 1: Fetch all reservations
  const { data: reservations, error: rError } = await supabase
    .from("reservation")
    .select("*");

  if (rError) throw new Error(rError.message);

  // Step 2: Get user_ids from reservations
  const userIds = reservations.map((r) => r.userid);

  // Step 3: Fetch all patients where user_id in those reservations
  const { data: patients, error: pError } = await supabase
    .from("patients")
    .select("*")
    .in("user_id", userIds);

  if (pError) throw new Error(pError.message);

  // Step 4: Fetch doctors similarly (if needed)
  const doctorIds = reservations.map((r) => r.doctorid);
  const { data: doctors, error: dError } = await supabase
    .from("doctor")
    .select("*")
    .in("id", doctorIds);

  if (dError) throw new Error(dError.message);

  // Step 5: Manually join them in JS
  const result = reservations.map((res) => {
    const patient = patients.find((p) => p.user_id === res.userid);
    const doctor = doctors.find((d) => d.id === res.doctorid);
    return {
      reservation_id: res.id,
      date: res.date,
      time: res.time,
      payment: res.payment,
      patient,
      doctor,
    };
  });

  return result;
}

export async function getAppointmentsByUserId(userId) {
  const { data, error } = await supabase
    .from("reservation")
    .select(
      `
      *,
      doctor (
        id,
        fullName,
        specialization,
        appointment_fee
      )
    `
    )
    .eq("userid", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAppointmentsByDoctorId(doctorId) {
  const { data, error } = await supabase
    .from("reservation")
    .select(
      `
      *,
      doctor (
        id,
        fullName,
        specialization,
        appointment_fee
      )
    `
    )
    .eq("doctorid", doctorId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAppointmentById(appointmentId) {
  const { data, error } = await supabase
    .from("reservation")
    .select(
      `
      *,
      doctor (
        id,
        fullName,
        specialization,
        appointment_fee
      )
    `
    )
    .eq("id", appointmentId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function togglePaymentStatus(appointmentId, paymentStatus) {
  const { data, error } = await supabase
    .from("reservation")
    .update({ payment: paymentStatus })
    .eq("id", appointmentId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteAppointment(appointmentId) {
  const { data, error } = await supabase
    .from("reservation")
    .delete()
    .eq("id", appointmentId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
