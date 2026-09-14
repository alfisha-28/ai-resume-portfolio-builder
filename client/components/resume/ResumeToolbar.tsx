"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Globe,
  Sparkles,
  Target,
  Wand2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
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
  const { resumeData, setResumeData, setIsDirty } = useResume();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(resumeData.title || "");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeData.title || "Resume",
  });

  const handleSaveTitle = () => {
    const trimmed = titleInput.trim();
    if (trimmed && trimmed !== resumeData.title) {
      setResumeData((prev) => ({ ...prev, title: trimmed }));
      setIsDirty(true);
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="no-print bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs p-3.5 sm:p-4 rounded-2xl mb-5 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Back Link & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-5 w-px bg-slate-200 shrink-0 hidden sm:block" />

          {/* Inline Editable Title */}
          <div className="min-w-0 flex items-center gap-2">
            {isEditingTitle ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  autoFocus
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") {
                      setTitleInput(resumeData.title || "");
                      setIsEditingTitle(false);
                    }
                  }}
                  className="text-sm font-bold border-b-2 border-blue-600 outline-none bg-slate-50 px-2 py-1 rounded-sm w-48 sm:w-64"
                />
                <button
                  type="button"
                  onClick={handleSaveTitle}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition cursor-pointer"
                  title="Save title"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTitleInput(resumeData.title || "");
                    setIsEditingTitle(false);
                  }}
                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-md transition cursor-pointer"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {resumeData.title || "Untitled Resume"}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setTitleInput(resumeData.title || "");
                    setIsEditingTitle(true);
                  }}
                  className="text-slate-400 hover:text-blue-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Rename resume"
                >
                  <Pencil size={13} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions, AI Suite, Save & Export */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* AI Career Tools */}
          {resumeId && (
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80">
              <Link
                href={`/dashboard/resume/${resumeId}/tailor`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                title="Tailor bullet points to target job description"
              >
                <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden md:inline">AI Tailor</span>
              </Link>
              <Link
                href={`/dashboard/resume/${resumeId}/match`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-blue-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                title="Match resume against job description"
              >
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline">Job Match</span>
              </Link>
              <Link
                href={`/dashboard/resume/${resumeId}/analyze`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 text-purple-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                title="Analyze ATS compatibility and keyword density"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span className="hidden md:inline">ATS Score</span>
              </Link>
              <Link
                href={`/dashboard/portfolio?resumeId=${resumeId}`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                title="Generate live portfolio from this resume"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Portfolio</span>
              </Link>
            </div>
          )}

          {/* Auto-save Status Indicator */}
          <div className="hidden sm:flex items-center px-2">
            <SaveStatus
              isSaving={isSaving}
              hasUnsavedChanges={hasUnsavedChanges}
              lastSaved={lastSaved}
              saveError={saveError}
            />
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={() => handlePrint()}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 bg-white text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Download or Print PDF"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export PDF</span>
          </button>

          {/* Manual Save Button */}
          <SaveButton loading={isSaving} onClick={onSave} />
        </div>
      </div>
    </div>
  );
}
