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
      className="..."
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Plus size={18} />
      )}

      {loading ? "Creating..." : "Create Resume"}
    </button>
  );
}