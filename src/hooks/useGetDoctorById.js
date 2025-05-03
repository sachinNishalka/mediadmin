import { useQuery } from "@tanstack/react-query";
import { getDoctorById } from "../services/apiDoctor";
import { toast } from "react-toastify";

export function useGetDoctorById(doctorId) {
  const {
    data: doctor,
    isPending,
    error,
  } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctorById(doctorId),
    onError: (err) => {
      console.error("Error fetching doctor:", err);
      toast.error("Failed to load doctor details", {
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

  return { doctor, isPending, error };
}
