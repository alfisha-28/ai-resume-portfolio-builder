"use client";

import {
  FileText,
  CheckCircle2,
  Clock3,
  LayoutTemplate,
} from "lucide-react";

import StatCard from "./StatCard";
import type { Resume } from "@/types/resume";

import { calculateResumeCompletion } from "@/utils/resumeCompletion";

interface DashboardStatsProps {
  resumes: Resume[];
}

export default function DashboardStats({
  resumes,
}: DashboardStatsProps) {
  const total = resumes.length;

  const completed = resumes.filter(
  (resume) => calculateResumeCompletion(resume).percentage >= 100
).length;

  const drafts = total - completed;

  const templates = new Set(
    resumes.map((resume) => resume.template)
  ).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Resumes"
        value={total}
        icon={<FileText size={28} />}
        color="bg-blue-100 text-blue-600"
      />

      <StatCard
        title="Completed"
        value={completed}
        icon={<CheckCircle2 size={28} />}
        color="bg-green-100 text-green-600"
      />

      <StatCard
        title="Drafts"
        value={drafts}
        icon={<Clock3 size={28} />}
        color="bg-yellow-100 text-yellow-600"
      />

      <StatCard
        title="Templates"
        value={templates}
        icon={<LayoutTemplate size={28} />}
        color="bg-purple-100 text-purple-600"
      />
    </div>
  );
}