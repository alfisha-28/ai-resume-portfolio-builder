"use client";

import SaveButton from "./SaveButton";
import SaveStatus from "./SaveStatus";

interface ResumeToolbarProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  onSave: () => void;
}

export default function ResumeToolbar({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
  onSave,
}: ResumeToolbarProps) {
  return (
    <div
      className="
      no-print
      sticky
      top-0
      z-20
      bg-white
      border-b
      px-6
      py-4
      flex
      items-center
      justify-between
    "
    >
      <SaveStatus
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSaved={lastSaved}
      />

      <div className="flex items-center gap-3">
        <SaveButton
          loading={isSaving}
          onClick={onSave}
        />
      </div>
    </div>
  );
}