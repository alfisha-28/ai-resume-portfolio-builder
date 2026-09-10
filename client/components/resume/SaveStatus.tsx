"use client";

import { AlertCircle, CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Props {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  saveError?: boolean;
}

export default function SaveStatus({ isSaving, hasUnsavedChanges, lastSaved, saveError }: Props) {
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-blue-600 text-sm">
        <Loader2 size={15} className="animate-spin" />
        Saving...
      </div>
    );
  }

  if (saveError) {
    return (
      <div className="flex items-center gap-2 text-red-500 text-sm">
        <AlertCircle size={15} />
        Save failed
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className="flex items-center gap-2 text-orange-500 text-sm">
        <Circle size={12} className="fill-orange-500" />
        Unsaved changes
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600 text-sm">
      <CheckCircle2 size={15} />
      {lastSaved ? `Saved at ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saved"}
    </div>
  );
}
