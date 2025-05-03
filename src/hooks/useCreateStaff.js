import { useMutation } from "@tanstack/react-query";
import { createStaff } from "../services/apiStaff";
import { toast, Bounce } from "react-toastify";

export function useCreateStaff() {
  const {
    mutate: createNewStaff,
    isPending,
    error,
  } = useMutation({
    mutationFn: createStaff,
    onError: (err) => {
      console.error("Error creating staff:", err);
      // Here you could add toast notifications or other error handling
    },
    onSuccess: () => {
      toast.success("Staff created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  return { createNewStaff, isPending, error };
}
