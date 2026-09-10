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