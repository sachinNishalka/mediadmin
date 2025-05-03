import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../services/apiPatient";
import { toast } from "react-toastify";

export function useGetPatientById(patientId) {
  const {
    data: patient,
    isPending,
    error,
  } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId),
    enabled: Boolean(patientId),
    onError: (err) => {
      console.error("Error fetching patient:", err);
      toast.error("Failed to load patient details", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  return { patient, isPending, error };
}
