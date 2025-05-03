import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../services/apiDoctor";
import { toast } from "react-toastify";

export function useGetAllDoctors() {
  const {
    data: doctors,
    isPending,
    error,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
    onError: (err) => {
      console.error("Error fetching doctors:", err);
      toast.error("Failed to load doctor details", {
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

  return { doctors, isPending, error };
}
