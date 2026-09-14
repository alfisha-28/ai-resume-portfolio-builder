"use client";

import Link from "next/link";
import {
  CalendarDays,
  FileText,
  Sparkles,
  Target,
  ArrowUpRight,
  Check,
  X,
  LayoutTemplate,
} from "lucide-react";
import { useState } from "react";
import ResumeActions from "./ResumeActions";

interface ResumeCardProps {
  id: string;
  title: string;
  template: string;
  completion: number;
  updatedAt: string;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRename?: (id: string, newTitle: string) => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ResumeCard({
  id,
  title,
  template,
  completion,
  updatedAt,
  onDelete,
  onDuplicate,
  onRename,
}: ResumeCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(title);

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== title && onRename) onRename(id, trimmed);
    setRenaming(false);
  };

  const getCompletionBadge = (pct: number) => {
    if (pct >= 80)
      return {
        bg: "bg-emerald-500",
        bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
        badgeText: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
        status: "Recruiter Ready",
      };
    if (pct >= 50)
      return {
        bg: "bg-blue-500",
        bar: "bg-gradient-to-r from-blue-500 to-indigo-500",
        badgeText: "text-blue-700 bg-blue-50 border-blue-200/80",
        status: "Solid Base",
      };
    if (pct >= 25)
      return {
        bg: "bg-amber-500",
        bar: "bg-gradient-to-r from-amber-500 to-orange-500",
        badgeText: "text-amber-700 bg-amber-50 border-amber-200/80",
        status: "Needs Sections",
      };
    return {
      bg: "bg-rose-500",
      bar: "bg-gradient-to-r from-rose-500 to-pink-500",
      badgeText: "text-rose-700 bg-rose-50 border-rose-200/80",
      status: "Initial Draft",
    };
  };

  const badge = getCompletionBadge(completion);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group hover:-translate-y-0.5">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 mt-0.5">
              <FileText size={18} />
            </div>

            <div className="min-w-0 flex-1">
              {renaming ? (
                <div className="flex items-center gap-1.5">
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSubmit();
                      if (e.key === "Escape") setRenaming(false);
                    }}
                    className="text-sm font-bold border-b-2 border-blue-500 outline-none w-full bg-slate-50 px-1 py-0.5 rounded-xs"
                  />
                  <button
                    type="button"
                    onClick={handleRenameSubmit}
                    className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50"
                    title="Save"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenaming(false)}
                    className="p-1 rounded-md text-slate-400 hover:bg-slate-100"
                    title="Cancel"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <Link
                  href={`/dashboard/resume/edit/${id}`}
                  className="block group/title focus:outline-hidden"
                >
                  <h2 className="font-bold text-slate-900 text-base leading-tight truncate group-hover/title:text-blue-600 transition-colors">
                    {title || "Untitled Resume"}
                  </h2>
                </Link>
              )}

              <div className="mt-1 flex items-center gap-1.5 text-slate-400 text-xs capitalize">
                <LayoutTemplate size={12} className="text-slate-400" />
                <span>{template} Template</span>
              </div>
            </div>
          </div>

          <ResumeActions
            resumeId={id}
            onDelete={() => onDelete(id)}
            onDuplicate={() => onDuplicate(id)}
            onRename={
              onRename
                ? () => {
                    setRenameValue(title);
                    setRenaming(true);
                  }
                : undefined
            }
          />
        </div>

        {/* ATS Completion Progress Indicator */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">ATS Optimization</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                {badge.status}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.badgeText}`}
              >
                {completion}%
              </span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${badge.bar}`}
              style={{ width: `${Math.max(completion, 4)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
          <CalendarDays size={13} />
          <span>{formatDate(updatedAt)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/dashboard/resume/${id}/match`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 text-xs font-semibold transition"
            title="Match Resume against Job Description"
          >
            <Target size={12} className="text-blue-600" />
            <span>Match</span>
          </Link>
          <Link
            href={`/dashboard/resume/${id}/analyze`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/80 text-xs font-semibold transition"
            title="Analyze ATS compatibility"
          >
            <Sparkles size={12} className="text-purple-600" />
            <span>ATS</span>
          </Link>
          <Link
            href={`/dashboard/resume/edit/${id}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold transition shadow-2xs group/btn"
          >
            <span>Edit</span>
            <ArrowUpRight
              size={12}
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
