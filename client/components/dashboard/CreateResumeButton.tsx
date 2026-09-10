"use client";

import { Loader2, Plus } from "lucide-react";

interface CreateResumeButtonProps {
  loading?: boolean;
  onClick: () => void;
}

export default function CreateResumeButton({ loading = false, onClick }: CreateResumeButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
<<<<<<< HEAD
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-3 rounded-xl transition-colors"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
=======
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Plus size={18} />
      )}
>>>>>>> origin/main
      {loading ? "Creating..." : "Create Resume"}
    </button>
  );
}
