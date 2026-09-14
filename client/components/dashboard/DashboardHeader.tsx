"use client";

import Link from "next/link";
import { LayoutTemplate } from "lucide-react";
import CreateResumeButton from "./CreateResumeButton";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  onCreate: () => void;
  creating?: boolean;
  totalResumes?: number;
}

export default function DashboardHeader({
  onCreate,
  creating = false,
  totalResumes,
}: DashboardHeaderProps) {
  const { data: user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-2">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
            Career Command Center
          </span>
          {typeof totalResumes === "number" && (
            <span className="text-xs text-slate-500 font-medium">
              • {totalResumes} {totalResumes === 1 ? "resume" : "resumes"} created
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {firstName ? `Welcome back, ${firstName} 👋` : "My Resumes & Career Hub"}
        </h1>

        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
          Create, optimize with AI scoring, and manage recruiter-ready resumes and portfolios.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/dashboard/templates"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition hover:border-slate-300"
          title="Browse Resume Templates"
        >
          <LayoutTemplate size={16} className="text-slate-500" />
          <span>Templates</span>
        </Link>

        <CreateResumeButton onClick={onCreate} loading={creating} />
      </div>
    </div>
  );
}