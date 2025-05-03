import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../services/apiPatient";
import { toast } from "react-toastify";

export function useGetAllPatients() {
  const {
    data: patients,
    isPending,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    onError: (err) => {
      console.error("Error fetching patients:", err);
      toast.error("Failed to load patients details", {
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

  return { patients, isPending, error };
}
