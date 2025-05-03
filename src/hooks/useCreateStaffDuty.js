import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffDuty } from "../services/apiStaffDuties";
import { toast } from "react-toastify";

export function useCreateStaffDuty() {
  const queryClient = useQueryClient();

  const {
    mutate: createNewDuty,
    isPending,
    error,
  } = useMutation({
    mutationFn: createStaffDuty,
    onSuccess: () => {
      // Invalidate and refetch duties queries
      queryClient.invalidateQueries({ queryKey: ["duties"] });
      queryClient.invalidateQueries({ queryKey: ["staffDuties"] });
      queryClient.invalidateQueries({ queryKey: ["doctorDuties"] });

      toast.success("Duty assigned successfully!", {
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
      console.error("Error creating duty:", err);
      toast.error(err.message || "Failed to assign duty", {
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

  return { createNewDuty, isPending, error };
}
