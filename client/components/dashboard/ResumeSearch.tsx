"use client";

import { Search, X } from "lucide-react";

interface ResumeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeSearch({
  value,
  onChange,
}: ResumeSearchProps) {
  return (
    <div className="relative w-full sm:max-w-md">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      <input
        type="text"
        value={value}
        placeholder="Search resumes by title or template..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition shadow-2xs"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md transition cursor-pointer"
          title="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}