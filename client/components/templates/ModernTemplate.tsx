"use client";

import PreviewHeader from "../resume/PreviewHeader";
import PreviewSummary from "../resume/PreviewSummary";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";

export default function ModernTemplate() {
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl">

      <div className="bg-blue-700 text-white p-8">
        <PreviewHeader />
      </div>

      <div className="grid grid-cols-12">

        <aside className="col-span-4 bg-gray-50 p-6 border-r">

          <PreviewSkills />

          <PreviewLanguages />

          <PreviewCertifications />

          <PreviewAchievements />

          <PreviewInterests />

        </aside>

        <main className="col-span-8 p-8">

          <PreviewSummary />

          <PreviewExperience />

          <PreviewProjects />

          <PreviewEducation />

        </main>

      </div>

    </div>
  );
}