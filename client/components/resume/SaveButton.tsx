"use client";

import { Loader2, Save } from "lucide-react";

interface SaveButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function SaveButton({
  loading,
  onClick,
}: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
      flex
      items-center
      gap-2
      rounded-lg
      bg-blue-600
      px-5
      py-2.5
      text-white
      font-medium
      hover:bg-blue-700
      disabled:opacity-60
    "
    >
      {loading ? (
        <Loader2
          size={18}
          className="animate-spin"
        />
      ) : (
        <Save size={18} />
      )}

      {loading ? "Saving..." : "Save"}
    </button>
  );
}