"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewInterests() {
  const { resumeData } = useResume();

  if (!resumeData.interests.length) return null;

  return (
    <>
      <SectionTitle title="Interests" />

      <div className="flex flex-wrap gap-2">
        {resumeData.interests.map((interest) => (
          <span
            key={interest.id}
            className="
              px-3
              py-1
              rounded-full
              bg-purple-50
              border
              border-purple-200
              text-purple-700
              text-sm
            "
          >
            {interest.name}
          </span>
        ))}
      </div>
    </>
  );
}