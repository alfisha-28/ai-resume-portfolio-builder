import { useQuery } from "@tanstack/react-query";
import { getResumes } from "@/services/resume.service";

export const useResumes = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};