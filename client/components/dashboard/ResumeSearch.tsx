"use client";

import { Search } from "lucide-react";

interface ResumeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeSearch({
  value,
  onChange,
}: ResumeSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        placeholder="Search resumes..."
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          py-3
          pl-11
          pr-4
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          transition
        "
      />
    </div>
  );
}