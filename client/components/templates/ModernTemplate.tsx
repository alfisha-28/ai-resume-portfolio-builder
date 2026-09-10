"use client";

import { useResume } from "@/context/ResumeContext";
import PreviewSummary from "../resume/PreviewSummary";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";
import SectionTitle from "../resume/SectionTitle";

export default function ModernTemplate() {
  const { resumeData } = useResume();

  const contacts = [
    resumeData.email,
    resumeData.phone,
    resumeData.location,
    resumeData.linkedin,
    resumeData.github,
    resumeData.portfolio,
  ].filter(Boolean);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl text-gray-900">
      {/* Blue header */}
      <div className="bg-blue-700 text-white px-8 py-7">
        <h1 className="text-3xl font-bold">{resumeData.fullName || "Your Name"}</h1>
        {resumeData.jobTitle && (
          <p className="text-blue-200 text-base mt-1">{resumeData.jobTitle}</p>
        )}
        {contacts.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-blue-100">
            {contacts.map((c, i) => <span key={i}>{c}</span>)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-4 bg-gray-50 p-6 border-r border-gray-200 text-gray-800">
          <PreviewSkills />
          <PreviewLanguages />
          <PreviewCertifications />
          <PreviewAchievements />
          <PreviewInterests />
        </aside>

        {/* Main */}
        <main className="col-span-8 p-7 text-gray-900">
          <PreviewSummary />
          <PreviewExperience />
          <PreviewProjects />
          <PreviewEducation />
        </main>
      </div>
    </div>
  );
}
