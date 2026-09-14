"use client";

import { AlertCircle, CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Props {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  saveError?: boolean;
}

export default function SaveStatus({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
  saveError,
}: Props) {
  if (isSaving) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-medium">
        <Loader2 size={12} className="animate-spin text-blue-600" />
        <span>Saving...</span>
      </div>
    );
  }

  if (saveError) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-xs font-medium">
        <AlertCircle size={12} className="text-red-600" />
        <span>Save failed</span>
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-medium">
        <Circle size={8} className="fill-amber-500 text-amber-500 animate-pulse" />
        <span>Unsaved changes</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
      <CheckCircle2 size={12} className="text-emerald-600" />
      <span>
        {lastSaved
          ? `Saved ${lastSaved.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "Saved in Cloud"}
      </span>
    </div>
  );
}
