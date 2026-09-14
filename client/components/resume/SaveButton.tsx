"use client";

import { Loader2, Save } from "lucide-react";

interface SaveButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function SaveButton({ loading, onClick }: SaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      title="Save changes now"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Save size={14} />
      )}
      <span>{loading ? "Saving..." : "Save"}</span>
    </button>
  );
}