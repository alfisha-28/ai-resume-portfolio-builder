"use client";

import { FileText, CheckCircle2, Clock3, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import type { Resume } from "@/types/resume";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";

interface DashboardStatsProps {
  resumes: Resume[];
}

export default function DashboardStats({ resumes }: DashboardStatsProps) {
  const total = resumes.length;
  const completed = resumes.filter((r) => calculateResumeCompletion(r).percentage >= 80).length;
  const drafts = total - completed;
  const avgCompletion =
    total > 0
      ? Math.round(resumes.reduce((sum, r) => sum + calculateResumeCompletion(r).percentage, 0) / total)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard title="Total Resumes" value={total} icon={<FileText size={24} />} color="bg-blue-100 text-blue-600" />
      <StatCard title="Completed" value={completed} icon={<CheckCircle2 size={24} />} color="bg-green-100 text-green-600" />
      <StatCard title="In Progress" value={drafts} icon={<Clock3 size={24} />} color="bg-yellow-100 text-yellow-600" />
      <StatCard title="Avg. Completion" value={`${avgCompletion}%`} icon={<TrendingUp size={24} />} color="bg-purple-100 text-purple-600" />
    </div>
  );
}
