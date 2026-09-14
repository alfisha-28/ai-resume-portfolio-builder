"use client";

import Link from "next/link";
import { FileText, SearchX, Plus, RotateCcw, LayoutTemplate } from "lucide-react";

interface ResumeEmptyStateProps {
  onCreate: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function ResumeEmptyState({
  onCreate,
  searchQuery,
  onClearSearch,
}: ResumeEmptyStateProps) {
  const isSearchEmpty = Boolean(searchQuery && searchQuery.trim().length > 0);

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/70 p-12 sm:p-16 text-center space-y-4 shadow-xs">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs ${
          isSearchEmpty
            ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
            : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
        }`}
      >
        {isSearchEmpty ? <SearchX size={30} /> : <FileText size={30} />}
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {isSearchEmpty ? "No matching resumes found" : "No resumes created yet"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {isSearchEmpty
            ? `We couldn't find any resumes matching "${searchQuery}". Try searching with a different title or keyword.`
            : "Build your first professional resume with AI-assisted bullet points, ATS scoring, and recruiter-approved templates."}
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        {isSearchEmpty ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Clear Search</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Plus size={15} />
              <span>Create First Resume</span>
            </button>
            <Link
              href="/dashboard/templates"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              <LayoutTemplate size={14} className="text-slate-500" />
              <span>Explore Templates</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}