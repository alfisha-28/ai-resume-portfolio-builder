"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Globe, Sparkles, Target, Wand2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import SaveButton from "./SaveButton";
import SaveStatus from "./SaveStatus";
import { useResume } from "@/context/ResumeContext";

interface ResumeToolbarProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  saveError?: boolean;
  onSave: () => void;
  printRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumeToolbar({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
  saveError,
  onSave,
  printRef,
}: ResumeToolbarProps) {
  const params = useParams();
  const resumeId = params?.id as string | undefined;
  const { resumeData } = useResume();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeData.title || "Resume",
  });

  return (
    <div className="no-print sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 -mx-6 -mt-6 mb-2">
      <div className="flex items-center gap-4 min-w-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <span className="text-gray-300 shrink-0">|</span>
        <h1 className="text-sm font-semibold text-gray-800 truncate">
          {resumeData.title || "Untitled Resume"}
        </h1>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <SaveStatus
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          lastSaved={lastSaved}
          saveError={saveError}
        />

        {resumeId && (
          <>
            <Link
              href={`/dashboard/resume/${resumeId}/tailor`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">AI Tailor</span>
            </Link>
            <Link
              href={`/dashboard/resume/${resumeId}/match`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Match Job</span>
            </Link>
            <Link
              href={`/dashboard/resume/${resumeId}/analyze`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">ATS Score</span>
            </Link>
            <Link
              href={`/dashboard/portfolio?resumeId=${resumeId}`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
              title="Transform this resume into a public web portfolio"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>
          </>
        )}

        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export PDF</span>
        </button>

        <SaveButton loading={isSaving} onClick={onSave} />
      </div>
    </div>
  );
}
