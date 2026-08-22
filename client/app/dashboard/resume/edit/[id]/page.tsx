"use client";

import { useEffect, useCallback, useState } from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CompletionProgress from "@/components/dashboard/CompletionProgress";

import ResumeLayout from "@/components/resume/ResumeLayout";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeToolbar from "@/components/resume/ResumeToolbar";
import TemplateSelector from "@/components/resume/TemplateSelector";

import { ResumeProvider, useResume } from "@/context/ResumeContext";

import {
  getResumeById,
  updateResume,
} from "@/services/resume.service";

import { useAutoSave } from "@/hooks/useAutoSave";

function ResumeEditor() {
  const params = useParams();
  const resumeId = params.id as string;

  const {
    resumeData,
    loadResume,
  } = useResume();

  const [loading, setLoading] = useState(true);

  const handleSave = useCallback(
    async (data = resumeData) => {
      await updateResume(resumeId, data);
    },
    [resumeId, resumeData]
  );

  const {
    isSaving,
    hasUnsavedChanges,
    lastSaved,
  } = useAutoSave({
    data: resumeData,
    onSave: handleSave,
    delay: 2000,
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getResumeById(resumeId);
          

console.log("Resume Response:", response);
console.log("Resume Data:", response.data);
        loadResume(response.data);
      } catch (error) {
        console.error("Failed to load resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, loadResume]);

  if (loading) {
    return (
      <DashboardLayout name="Resume Builder">
        <div className="flex h-96 items-center justify-center">
          Loading Resume...
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
        onSave={() => handleSave()}
      />

      <div className="mt-6 space-y-6">
        <CompletionProgress />

        <TemplateSelector />

        <ResumeLayout
          children={<ResumeForm />}
          preview={<ResumePreview />}
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