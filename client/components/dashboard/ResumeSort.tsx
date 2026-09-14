"use client";

import { ArrowUpDown } from "lucide-react";

interface ResumeSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeSort({
  value,
  onChange,
}: ResumeSortProps) {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <ArrowUpDown size={14} />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition cursor-pointer shadow-2xs"
      >
        <option value="updated">Sort: Recently Updated</option>
        <option value="newest">Sort: Newest First</option>
        <option value="oldest">Sort: Oldest First</option>
        <option value="alphabetical">Sort: Alphabetical (A-Z)</option>
        <option value="completion">Sort: Highest ATS Score</option>
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
        ▼
      </div>
    </div>
  );
}