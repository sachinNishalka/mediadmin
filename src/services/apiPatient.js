import supabase from "./supabase";

export async function getAllPatients() {
  const { data, error } = await supabase.from("patients").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPatientById(patientId) {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", patientId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createPatient(patientData) {
  const { data, error } = await supabase
    .from("patients")
    .insert([patientData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatePatient(patientId, patientData) {
  const { data, error } = await supabase
    .from("patients")
    .update(patientData)
    .eq("id", patientId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePatient(patientId) {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", patientId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
