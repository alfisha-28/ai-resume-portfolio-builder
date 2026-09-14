"use client";

import { Loader2, Plus } from "lucide-react";

interface CreateResumeButtonProps {
  loading?: boolean;
  onClick: () => void;
}

export default function CreateResumeButton({
  loading = false,
  onClick,
}: CreateResumeButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-sm active:scale-[0.98]"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-white" />
      ) : (
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus size={14} className="text-white" />
        </div>
      )}
      <span>{loading ? "Generating Resume..." : "Create New Resume"}</span>
    </button>
  );
}
