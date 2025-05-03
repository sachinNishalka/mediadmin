import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDuty } from "../services/apiStaffDuties";
import { toast } from "react-toastify";

export function useUpdateDuties() {
  const queryClient = useQueryClient();

  const {
    mutate: updateExistingDuty,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ dutyId, ...updateData }) => updateDuty(dutyId, updateData),
    onSuccess: () => {
      // Invalidate and refetch duties queries
      queryClient.invalidateQueries({ queryKey: ["duties"] });
      queryClient.invalidateQueries({ queryKey: ["staffDuties"] });
      queryClient.invalidateQueries({ queryKey: ["doctorDuties"] });

      toast.success("Duty updated successfully!", {
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
      console.error("Error updating duty:", err);
      toast.error(err.message || "Failed to update duty", {
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

  return { updateExistingDuty, isPending, error };
}
