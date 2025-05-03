import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePaymentStatus } from "../services/apiAppointmnets";
import { toast } from "react-toastify";

export function useTogglePaymentStatus() {
  const queryClient = useQueryClient();

  const {
    mutate: toggleAppointmentPayment,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ appointmentId, paymentStatus }) =>
      togglePaymentStatus(appointmentId, paymentStatus),
    onSuccess: () => {
      // Invalidate and refetch appointments queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      toast.success("Payment status updated successfully!", {
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
      console.error("Error updating payment status:", err);
      toast.error(err.message || "Failed to update payment status", {
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

  return { toggleAppointmentPayment, isPending, error };
}
