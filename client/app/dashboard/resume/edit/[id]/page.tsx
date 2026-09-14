"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertTriangle, RotateCcw } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CompletionProgress from "@/components/dashboard/CompletionProgress";
import ResumeLayout from "@/components/resume/ResumeLayout";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeToolbar from "@/components/resume/ResumeToolbar";
import TemplateSelector from "@/components/resume/TemplateSelector";

import { ResumeProvider, useResume } from "@/context/ResumeContext";
import { getResumeById, updateResume } from "@/services/resume.service";
import { useAutoSave } from "@/hooks/useAutoSave";

function ResumeEditor() {
  const params = useParams();
  const resumeId = params.id as string;
  const { resumeData, loadResume, isDirty, setIsDirty } = useResume();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;

    getResumeById(resumeId)
      .then((resume) => {
        if (!ignore) {
          loadResume(resume);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setLoadError(true);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [resumeId, loadResume]);

  const handleSave = useCallback(
    async (data = resumeData) => {
      await updateResume(resumeId, data);
      setIsDirty(false);
    },
    // resumeData intentionally excluded — useAutoSave passes current data via param
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resumeId, setIsDirty]
  );

  const { isSaving, hasUnsavedChanges, lastSaved, saveError, manualSave } =
    useAutoSave({
      data: resumeData,
      onSave: handleSave,
      delay: 2000,
      enabled: !loading && !loadError && isDirty,
    });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900">
                Loading Resume Editor
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Fetching sections, template settings, and ATS data...
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (loadError) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 p-8 max-w-md text-center rounded-2xl bg-white border border-red-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Unable to load resume
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We couldn&apos;t retrieve this resume from the server. It may have
                been moved, deleted, or a connection error occurred.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
              >
                <ArrowLeft size={14} />
                <span>Return to Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-12">
        {/* Editor Toolbar with Title & AI Tool Navigation */}
        <ResumeToolbar
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          lastSaved={lastSaved}
          saveError={saveError}
          onSave={manualSave}
          printRef={printRef}
        />

        {/* Dynamic ATS Completion Checklist */}
        <CompletionProgress />

        {/* Collapsible Template Picker */}
        <TemplateSelector />

        {/* Split Screen: Content Form & Live Document Preview */}
        <ResumeLayout preview={<ResumePreview printRef={printRef} />}>
          <ResumeForm />
        </ResumeLayout>
      </div>
    </DashboardLayout>
  );
}

export default function Page() {
  return (
    <ResumeProvider>
      <ResumeEditor />
    </ResumeProvider>
  );
}
