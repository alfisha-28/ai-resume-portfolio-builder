<<<<<<< HEAD
"use client";

import { useQuery } from "@tanstack/react-query";
import { getResumes } from "@/services/resume.service";
import type { Resume } from "@/types/resume";

export function useDashboard() {
  return useQuery<Resume[]>({
    queryKey: ["resumes"],
    queryFn: getResumes,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
}
=======
// Re-export useResumes as useDashboard to avoid breaking the dashboard page import.
// All resume fetching is consolidated in useResumes.
export { useResumes as useDashboard } from "./useResumes";
>>>>>>> origin/main
