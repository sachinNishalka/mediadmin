import supabase from "./supabase";

export async function createStaff({
  first_name,
  last_name,
  address,
  telephone,
  qualification,
  email,
  password,
  age,
}) {
  // First create auth user to get user_id
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // Then create staff record with user_id reference
  const { data, error } = await supabase.from("staff").insert([
    {
      user_id: authData.user.id,
      first_name,
      last_name,
      address,
      telephone,
      qualification,
      email,
      age,
    },
  ]);

  if (error) {
    // Clean up auth user if staff creation fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw new Error(error.message);
  }

  return data;
}

export async function getAllStaff() {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("first_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStaffById(staffId) {
  const { data, error } = await supabase
    .from("staff")
    .select(
      `
      *,
      staff_duties (
        id,
        duty_date,
        duty_time,
        doctor:doctor_id (
          id,
          first_name,
          last_name
        )
      )
    `
    )
    .eq("id", staffId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
