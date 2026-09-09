"use client";

import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import SaveButton from "./SaveButton";
import SaveStatus from "./SaveStatus";

interface ResumeToolbarProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  onSave: () => void;
  printRef: RefObject<HTMLDivElement | null>;
}

export default function ResumeToolbar({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
  onSave,
  printRef,
}: ResumeToolbarProps) {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Resume",
  });

  return (
    <div className="no-print sticky top-0 z-20 bg-white border-b px-6 py-4 flex items-center justify-between">
      <SaveStatus
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSaved={lastSaved}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <Printer size={16} />
          Download PDF
        </button>

        <SaveButton loading={isSaving} onClick={onSave} />
      </div>
    </div>
  );
}
