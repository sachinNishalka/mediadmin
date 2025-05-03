import supabase from "./supabase";

export async function createStaffDuty({
  staff_id,
  doctor_id,
  duty_date,
  duty_time,
}) {
  // First check if staff exists
  const { data: staffExists, error: staffError } = await supabase
    .from("staff")
    .select("id")
    .eq("id", staff_id)
    .single();

  if (staffError || !staffExists) {
    throw new Error("Invalid staff ID");
  }

  // Check if doctor exists
  const { data: doctorExists, error: doctorError } = await supabase
    .from("doctor")
    .select("id")
    .eq("id", doctor_id)
    .single();

  if (doctorError || !doctorExists) {
    throw new Error("Invalid doctor ID");
  }

  // Check for existing duty at the same time
  const { data: existingDuty, error: existingDutyError } = await supabase
    .from("staff_duties")
    .select("id")
    .eq("staff_id", staff_id)
    .eq("duty_date", duty_date)
    .eq("duty_time", duty_time)
    .single();

  if (existingDuty) {
    throw new Error("Staff already has a duty at this time");
  }

  // Create the duty
  const { data, error } = await supabase.from("staff_duties").insert([
    {
      staff_id,
      doctor_id,
      duty_date,
      duty_time,
    },
  ]).select(`
      *,
      staff:staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor:doctor_id (
        id,
        fullName
      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStaffDuties(staffId) {
  const { data, error } = await supabase
    .from("staff_duties")
    .select(
      `
      *,
      staff!staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor!doctor_id (
        id,
        fullName,
        specialization,
        available_days,
        available_time_slots
      )
    `
    )
    .eq("staff_id", staffId)
    .order("duty_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDoctorDuties(doctorId) {
  const { data, error } = await supabase
    .from("staff_duties")
    .select(
      `
      *,
      staff:staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor:doctor_id (
        id,
        fullName
      )
    `
    )
    .eq("doctor_id", doctorId)
    .order("duty_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDutiesByDate(date) {
  const { data, error } = await supabase
    .from("staff_duties")
    .select(
      `
      *,
      staff:staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor:doctor_id (
        id,
        fullName
      )
    `
    )
    .eq("duty_date", date)
    .order("duty_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateDuty(
  dutyId,
  { staff_id, doctor_id, duty_date, duty_time }
) {
  // First check if staff exists
  if (staff_id) {
    const { data: staffExists, error: staffError } = await supabase
      .from("staff")
      .select("id")
      .eq("id", staff_id)
      .single();

    if (staffError || !staffExists) {
      throw new Error("Invalid staff ID");
    }
  }

  // Check if doctor exists
  if (doctor_id) {
    const { data: doctorExists, error: doctorError } = await supabase
      .from("doctor")
      .select("id")
      .eq("id", doctor_id)
      .single();

    if (doctorError || !doctorExists) {
      throw new Error("Invalid doctor ID");
    }
  }

  // Check for existing duty at the same time if date or time is being updated
  if (duty_date || duty_time) {
    const { data: currentDuty } = await supabase
      .from("staff_duties")
      .select("staff_id, duty_date, duty_time")
      .eq("id", dutyId)
      .single();

    const checkDate = duty_date || currentDuty.duty_date;
    const checkTime = duty_time || currentDuty.duty_time;
    const checkStaffId = staff_id || currentDuty.staff_id;

    const { data: existingDuty, error: existingDutyError } = await supabase
      .from("staff_duties")
      .select("id")
      .eq("staff_id", checkStaffId)
      .eq("duty_date", checkDate)
      .eq("duty_time", checkTime)
      .neq("id", dutyId)
      .single();

    if (existingDuty) {
      throw new Error("Staff already has a duty at this time");
    }
  }

  // Update the duty
  const { data, error } = await supabase
    .from("staff_duties")
    .update({
      ...(staff_id && { staff_id }),
      ...(doctor_id && { doctor_id }),
      ...(duty_date && { duty_date }),
      ...(duty_time && { duty_time }),
    })
    .eq("id", dutyId).select(`
      *,
      staff:staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor:doctor_id (
        id,
        fullName
      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateDutyStatus(dutyId, status) {
  const { data, error } = await supabase
    .from("staff_duties")
    .update({ status })
    .eq("id", dutyId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteDuty(dutyId) {
  const { error } = await supabase
    .from("staff_duties")
    .delete()
    .eq("id", dutyId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getAllDuties() {
  const { data, error } = await supabase
    .from("staff_duties")
    .select(
      `
      *,
      staff!staff_id (
        id,
        first_name,
        last_name,
        email
      ),
      doctor!doctor_id (
        id,
        fullName,
        specialization,
        available_days,
        available_time_slots
      )
    `
    )
    .order("duty_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
