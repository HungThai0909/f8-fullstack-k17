import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/services/publicApi.js";

export default function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 10 * 60 * 1000,
  });
}
