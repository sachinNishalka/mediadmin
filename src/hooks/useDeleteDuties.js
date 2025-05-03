import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDuty } from "../services/apiStaffDuties";
import { toast } from "react-toastify";

export function useDeleteDuties() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteExistingDuty,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteDuty,
    onSuccess: () => {
      // Invalidate and refetch duties queries
      queryClient.invalidateQueries({ queryKey: ["duties"] });
      queryClient.invalidateQueries({ queryKey: ["staffDuties"] });
      queryClient.invalidateQueries({ queryKey: ["doctorDuties"] });

      toast.success("Duty deleted successfully!", {
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
      console.error("Error deleting duty:", err);
      toast.error(err.message || "Failed to delete duty", {
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

  return { deleteExistingDuty, isPending, error };
}
