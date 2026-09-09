"use client";

import { useResume } from "@/context/ResumeContext";
import PreviewSummary from "../resume/PreviewSummary";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";

export default function ProfessionalTemplate() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl">
      <div className="bg-slate-800 text-white px-10 py-8">
        <h1 className="text-3xl font-bold">{resumeData.fullName || "Your Name"}</h1>
        <p className="text-slate-300 mt-1">{resumeData.jobTitle || "Professional Title"}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
          {resumeData.email && <span>{resumeData.email}</span>}
          {resumeData.phone && <span>{resumeData.phone}</span>}
          {resumeData.location && <span>{resumeData.location}</span>}
          {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
          {resumeData.github && <span>{resumeData.github}</span>}
          {resumeData.portfolio && <span>{resumeData.portfolio}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <aside className="col-span-1 bg-slate-50 px-6 py-8 border-r border-slate-200">
          <PreviewSkills />
          <PreviewLanguages />
          <PreviewCertifications />
          <PreviewInterests />
        </aside>
        <main className="col-span-2 px-8 py-8">
          <PreviewSummary />
          <PreviewExperience />
          <PreviewProjects />
          <PreviewEducation />
          <PreviewAchievements />
        </main>
      </div>
    </div>
  );
}
