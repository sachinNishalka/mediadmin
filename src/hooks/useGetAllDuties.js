import { useQuery } from "@tanstack/react-query";
import { getAllDuties } from "../services/apiStaffDuties";
import { toast } from "react-toastify";

export function useGetAllDuties() {
  const {
    data: duties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["duties"],
    queryFn: getAllDuties,
    onError: (err) => {
      console.error("Error fetching duties:", err);
      toast.error("Failed to load duty details", {
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

  return { duties, isPending, error };
}
