"use client";

import { FileText, SearchX, Plus, RotateCcw } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 p-12 sm:p-16 text-center space-y-4">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isSearchEmpty ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
        }`}
      >
        {isSearchEmpty ? <SearchX size={28} /> : <FileText size={28} />}
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-lg font-bold text-gray-900">
          {isSearchEmpty ? "No matching resumes found" : "No resumes created yet"}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {isSearchEmpty
            ? `We couldn't find any resumes matching "${searchQuery}". Try searching by a different keyword or template name.`
            : "Build your first professional resume with AI-assisted bullet points, ATS scoring, and recruiter-approved templates."}
        </p>
      </div>

      <div className="pt-2">
        {isSearchEmpty ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition shadow-2xs"
          >
            <RotateCcw size={14} />
            <span>Clear Search</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <Plus size={15} />
            <span>Create First Resume</span>
          </button>
        )}
      </div>
    </div>
  );
}