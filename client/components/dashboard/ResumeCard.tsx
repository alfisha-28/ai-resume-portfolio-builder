"use client";

import Link from "next/link";
import { CalendarDays, FileText, LayoutTemplate, Sparkles, Target } from "lucide-react";
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
  onRename: (id: string, newTitle: string) => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function ResumeCard({ id, title, template, completion, updatedAt, onDelete, onDuplicate, onRename }: ResumeCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(title);

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== title) onRename(id, trimmed);
    setRenaming(false);
  };

  const completionColor =
    completion >= 80 ? "bg-green-500" : completion >= 50 ? "bg-blue-500" : completion >= 25 ? "bg-yellow-500" : "bg-red-400";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 shrink-0">
              <FileText size={20} />
            </div>
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
                  className="text-base font-semibold border-b border-blue-500 outline-none w-full bg-transparent"
                />
              ) : (
                <h2 className="font-semibold text-base leading-tight truncate">
                  {title || "Untitled Resume"}
                </h2>
              )}
              <div className="mt-1 flex items-center gap-1.5 text-gray-400 text-xs capitalize">
                <LayoutTemplate size={12} />
                {template}
              </div>
            </div>
          </div>
          <ResumeActions
            resumeId={id}
            onDelete={() => onDelete(id)}
            onDuplicate={() => onDuplicate(id)}
            onRename={() => { setRenameValue(title); setRenaming(true); }}
          />
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500">Completion</span>
            <span className="font-medium text-gray-700">{completion}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${completionColor}`} style={{ width: `${completion}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <CalendarDays size={13} />
          {formatDate(updatedAt)}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/resume/${id}/match`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-semibold"
            title="Match Resume against Job Description"
          >
            <Target size={12} />
            <span>Match</span>
          </Link>
          <Link
            href={`/dashboard/resume/${id}/analyze`}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-xs font-semibold"
          >
            <Sparkles size={12} />
            <span>ATS</span>
          </Link>
          <Link href={`/dashboard/resume/edit/${id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit →
          </Link>
        </div>
      </div>
    </div>
  );
}
