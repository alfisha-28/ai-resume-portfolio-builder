"use client";

import PreviewHeader from "../resume/PreviewHeader";
import PreviewSummary from "../resume/PreviewSummary";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";

export default function MinimalTemplate() {
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-10 mx-auto shadow-xl font-sans">
      <PreviewHeader />
      <div className="mt-8 space-y-1">
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
    </div>
  );
}
