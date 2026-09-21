"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewSkills() {
  const { resumeData } = useResume();

  const validSkills = resumeData.skills.filter((skill) => skill.name?.trim());

  if (!validSkills.length) return null;

  return (
    <>
      <SectionTitle title="Skills" />

      <div className="flex flex-wrap gap-2">
        {validSkills.map((skill) => (
          <span
            key={skill.id}
            className="
              px-3
              py-1
              rounded-full
              border
              bg-blue-50
border-blue-200
text-blue-700
hover:bg-blue-100
transition
              text-sm
              text-gray-700
            "
          >
            {skill.name}
          </span>
        ))}
      </div>
    </>
  );
}