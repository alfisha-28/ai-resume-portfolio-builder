"use client";

import { useResume } from "@/context/ResumeContext";
import PreviewSummary from "../resume/PreviewSummary";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";

export default function MinimalTemplate() {
  const { resumeData } = useResume();

  const contacts = [
    resumeData.email,
    resumeData.phone,
    resumeData.location,
    resumeData.linkedin,
    resumeData.github,
  ].filter(Boolean);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] px-10 py-8 shadow-xl mx-auto text-gray-900 font-sans">
      {/* Minimal header — left aligned */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {resumeData.fullName || "Your Name"}
        </h1>
        {resumeData.jobTitle && (
          <p className="text-sm text-gray-500 mt-0.5">{resumeData.jobTitle}</p>
        )}
        {contacts.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            {contacts.join("  ·  ")}
          </p>
        )}
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      <PreviewSummary />
      <PreviewExperience />
      <PreviewEducation />
      <PreviewProjects />
      <PreviewSkills />
      <PreviewCertifications />
      <PreviewLanguages />
      <PreviewAchievements />
      <PreviewInterests />
    </div>
  );
}
