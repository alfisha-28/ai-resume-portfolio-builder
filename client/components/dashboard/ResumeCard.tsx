"use client";

import Link from "next/link";
import { CalendarDays, FileText, LayoutTemplate, Sparkles, Target, ArrowUpRight } from "lucide-react";
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
<<<<<<< HEAD
  onRename: (id: string, newTitle: string) => void;
=======
>>>>>>> origin/main
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
<<<<<<< HEAD
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
=======
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
>>>>>>> origin/main
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
<<<<<<< HEAD
  onRename,
=======
>>>>>>> origin/main
}: ResumeCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(title);

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== title) onRename(id, trimmed);
    setRenaming(false);
  };

  const getCompletionBadge = (pct: number) => {
    if (pct >= 80) return { bg: "bg-emerald-500", text: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (pct >= 50) return { bg: "bg-blue-500", text: "text-blue-700 bg-blue-50 border-blue-200" };
    if (pct >= 25) return { bg: "bg-amber-500", text: "text-amber-700 bg-amber-50 border-amber-200" };
    return { bg: "bg-rose-500", text: "text-rose-700 bg-rose-50 border-rose-200" };
  };

  const badge = getCompletionBadge(completion);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
              <FileText size={20} />
            </div>
<<<<<<< HEAD
            <div className="min-w-0">
              {renaming ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={handleRenameSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameSubmit();
                    if (e.key === "Escape") setRenaming(false);
                  }}
                  className="text-base font-bold border-b-2 border-blue-500 outline-none w-full bg-transparent py-0.5"
                />
              ) : (
                <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
                  {title || "Untitled Resume"}
                </h2>
              )}
              <div className="mt-1 flex items-center gap-1.5 text-gray-500 text-xs capitalize">
                <LayoutTemplate size={12} className="text-gray-400" />
                <span>{template} Template</span>
=======

            <div>
              <h2 className="font-semibold text-lg leading-tight">
                {title || "Untitled Resume"}
              </h2>

              <div className="mt-1 flex items-center gap-2 text-gray-500 text-sm capitalize">
                <LayoutTemplate size={15} />
                {template}
>>>>>>> origin/main
              </div>
            </div>
          </div>

          <ResumeActions
            resumeId={id}
            onDelete={() => onDelete(id)}
            onDuplicate={() => onDuplicate(id)}
<<<<<<< HEAD
            onRename={() => {
              setRenameValue(title);
              setRenaming(true);
            }}
          />
        </div>

        {/* Completion Indicator */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Completion Progress</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.text}`}>
              {completion}%
            </span>
=======
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Completion</span>
            <span className="font-medium">{completion}%</span>
>>>>>>> origin/main
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
<<<<<<< HEAD
              className={`h-full rounded-full transition-all duration-500 ${badge.bg}`}
=======
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
>>>>>>> origin/main
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <CalendarDays size={13} />
          <span>{formatDate(updatedAt)}</span>
=======
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <CalendarDays size={15} />
          {formatDate(updatedAt)}
>>>>>>> origin/main
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/resume/${id}/match`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 text-xs font-semibold transition"
            title="Match Resume against Job Description"
          >
            <Target size={12} className="text-blue-600" />
            <span>Match</span>
          </Link>
          <Link
            href={`/dashboard/resume/${id}/analyze`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/80 text-xs font-semibold transition"
            title="Analyze ATS compatibility"
          >
            <Sparkles size={12} className="text-purple-600" />
            <span>ATS</span>
          </Link>
          <Link
            href={`/dashboard/resume/edit/${id}`}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold transition shadow-2xs"
          >
            <span>Edit</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
