import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../services/apiAppointmnets";
import { toast } from "react-toastify";

export function useGetAllAppointments() {
  const {
    data: appointments,
    isPending,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
    onError: (err) => {
      console.error("Error fetching appointments:", err);
      toast.error("Failed to load appointments", {
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

  return { appointments, isPending, error };
}
