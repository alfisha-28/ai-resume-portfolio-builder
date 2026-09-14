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
  const completed = resumes.filter(
    (r) => calculateResumeCompletion(r).percentage >= 80
  ).length;
  const drafts = total - completed;
  const avgCompletion =
    total > 0
      ? Math.round(
          resumes.reduce(
            (sum, r) => sum + calculateResumeCompletion(r).percentage,
            0
          ) / total
        )
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      <StatCard
        title="Total Resumes"
        value={total}
        icon={<FileText size={20} />}
        color="bg-blue-500/10 text-blue-600 border border-blue-500/20"
        subtext="Stored in cloud"
        badge={total > 0 ? `${total} active` : undefined}
      />
      <StatCard
        title="ATS Ready"
        value={completed}
        icon={<CheckCircle2 size={20} />}
        color="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
        subtext="Score ≥ 80%"
        badge={completed > 0 ? "Application Ready" : undefined}
      />
      <StatCard
        title="In Progress"
        value={drafts}
        icon={<Clock3 size={20} />}
        color="bg-amber-500/10 text-amber-600 border border-amber-500/20"
        subtext="Drafts needing polish"
        badge={drafts > 0 ? "Needs Review" : undefined}
      />
      <StatCard
        title="Avg. ATS Score"
        value={`${avgCompletion}%`}
        icon={<TrendingUp size={20} />}
        color="bg-purple-500/10 text-purple-600 border border-purple-500/20"
        subtext="Bypass recruiter filters"
        badge="AI Evaluated"
      />
    </div>
  );
}
