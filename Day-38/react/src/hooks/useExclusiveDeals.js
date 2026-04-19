import { useQuery } from "@tanstack/react-query";
import { getAllExclusiveDeals } from "@/services/publicApi.js";

export default function useExclusiveDeals() {
  return useQuery({
    queryKey: ["exclusiveDeals"],
    queryFn: getAllExclusiveDeals,
    staleTime: 10 * 60 * 1000, 
  });
}
