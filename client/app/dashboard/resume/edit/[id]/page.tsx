"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useParams } from "next/navigation";

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
  const printRef = useRef<HTMLDivElement>(null);

  const { resumeData, loadResume } = useResume();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchResume = async () => {
      try {
        const resume = await getResumeById(resumeId);
        if (!cancelled) {
          loadResume(resume);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setLoading(false);
        }
      }
    };
    fetchResume();
    return () => { cancelled = true; };
  }, [resumeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = useCallback(async () => {
    await updateResume(resumeId, resumeData);
  }, [resumeId, resumeData]);

  const { isSaving, hasUnsavedChanges, lastSaved } = useAutoSave({
    data: resumeData,
    onSave: handleSave,
    delay: 2000,
    enabled: !loading,
  });

  if (loading) {
    return (
      <DashboardLayout name="Resume Builder">
        <div className="flex h-96 items-center justify-center gap-3 text-gray-500">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Loading resume...
        </div>
      </DashboardLayout>
    );
  }

  if (loadError) {
    return (
      <DashboardLayout name="Resume Builder">
        <div className="flex h-96 items-center justify-center">
          <p className="text-red-500">
            Failed to load resume. It may not exist or you may not have access.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout name="Resume Builder">
      <ResumeToolbar
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSaved={lastSaved}
        onSave={handleSave}
        printRef={printRef}
      />

      <div className="mt-6 space-y-6">
        <CompletionProgress />
        <TemplateSelector />
        <ResumeLayout
          children={<ResumeForm />}
          preview={<ResumePreview ref={printRef} />}
        />
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
