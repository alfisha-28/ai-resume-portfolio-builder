"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewLanguages() {
  const { resumeData } = useResume();

  if (!resumeData.languages.length) return null;

  return (
    <>
      <SectionTitle title="Languages" />

      <div className="grid grid-cols-2 gap-3">
        {resumeData.languages.map((language) => (
          <div
            key={language.id}
            className="flex justify-between border-b border-gray-200 pb-1"
          >
            <span className="font-medium">
              {language.name}
            </span>

            <span className="text-gray-500 text-sm">
              {language.proficiency}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}