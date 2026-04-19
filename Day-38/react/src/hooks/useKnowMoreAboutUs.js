import { useQuery } from "@tanstack/react-query";
import { getAllKnowMoreAboutUs } from "@/services/publicApi.js";

export default function useKnowMoreAboutUs() {
  return useQuery({
    queryKey: ["knowMoreAboutUs"],
    queryFn: getAllKnowMoreAboutUs,
     staleTime: 10 * 60 * 1000, 
  });
}