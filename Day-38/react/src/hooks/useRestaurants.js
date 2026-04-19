import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "@/services/publicApi.js";

export default function useRestaurants() {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
    staleTime: 10 * 60 * 1000,  
  });
}
