"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import useResumeCompletion from "@/hooks/useResumeCompletion";
import { getResumeSectionChecklist } from "@/utils/resumeCompletion";

export default function CompletionProgress() {
  const { percentage, completed, total } = useResumeCompletion();
  const { resumeData } = useResume();
  const [expanded, setExpanded] = useState(false);

  const checklist = getResumeSectionChecklist(resumeData);
  const pendingRequired = checklist.filter((item) => item.required && !item.filled);

  const color =
    percentage >= 80
      ? "bg-emerald-500"
      : percentage >= 50
      ? "bg-blue-500"
      : percentage >= 25
      ? "bg-amber-500"
      : "bg-rose-500";

  const label =
    percentage >= 80
      ? "Ready for applications!"
      : percentage >= 50
      ? "Solid foundation"
      : percentage >= 25
      ? "Making progress"
      : "Initial draft";

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-xs transition-all mb-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-900">Resume Completeness</h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {label}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {pendingRequired.length > 0 ? (
              <span className="text-amber-700 font-semibold">
                {pendingRequired.length} key {pendingRequired.length === 1 ? "section needs" : "sections need"} attention
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold">
                All essential sections completed!
              </span>
            )}
            {" "}• {completed} of {total} total sections filled
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{percentage}%</span>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition"
            aria-expanded={expanded}
          >
            <span>{expanded ? "Hide Checklist" : "View Checklist"}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Expandable Section Checklist */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 animate-in fade-in duration-200">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border ${
                item.filled
                  ? "bg-emerald-50/70 text-emerald-800 border-emerald-200/80"
                  : item.required
                  ? "bg-amber-50/70 text-amber-900 border-amber-200/80"
                  : "bg-gray-50 text-gray-500 border-gray-200"
              }`}
            >
              {item.filled ? (
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle
                  size={13}
                  className={item.required ? "text-amber-600 shrink-0" : "text-gray-400 shrink-0"}
                />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
