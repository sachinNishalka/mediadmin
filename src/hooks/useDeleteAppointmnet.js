import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../services/apiAppointmnets";
import { toast } from "react-toastify";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteExistingAppointment,
    isPending,
    error,
  } = useMutation({
    mutationFn: (appointmentId) => deleteAppointment(appointmentId),
    onSuccess: () => {
      // Invalidate and refetch appointments queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      toast.success("Appointment deleted successfully!", {
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
    onError: (err) => {
      console.error("Error deleting appointment:", err);
      toast.error(err.message || "Failed to delete appointment", {
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

  return { deleteExistingAppointment, isPending, error };
}
