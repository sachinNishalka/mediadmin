import { useMutation } from "@tanstack/react-query";
import { createStaff } from "../services/apiStaff";

export function useCreateStaff() {
  const { mutate: createNewStaff, isLoading } = useMutation({
    mutationFn: createStaff,
    onError: (err) => {
      console.error("Error creating staff:", err);
      // Here you could add toast notifications or other error handling
    },
  });

  return { createNewStaff, isLoading };
}
