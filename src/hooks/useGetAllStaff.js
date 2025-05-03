import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../services/apiStaff";
import { toast } from "react-toastify";

export function useGetAllStaff() {
  const {
    data: staff,
    isPending,
    error,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: getAllStaff,
    onError: (err) => {
      console.error("Error fetching staff:", err);
      toast.error("Failed to load staff details", {
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

  return { staff, isPending, error };
}
