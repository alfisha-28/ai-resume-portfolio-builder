"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Props {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
}

export default function SaveStatus({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
}: Props) {
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <Loader2
          size={18}
          className="animate-spin"
        />

        Saving...
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className="flex items-center gap-2 text-orange-500">
        <Circle size={14} />

        Unsaved Changes
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600">
      <CheckCircle2 size={18} />

      {lastSaved
        ? `Saved ${lastSaved.toLocaleTimeString()}`
        : "Saved"}
    </div>
  );
}