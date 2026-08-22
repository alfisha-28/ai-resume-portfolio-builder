"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardResumes } from "@/services/dashboard.service";
import type { Resume } from "@/types/resume";

export function useDashboard() {
  return useQuery<Resume[]>({
    queryKey: ["dashboard-resumes"],
    queryFn: getDashboardResumes,
  });
}