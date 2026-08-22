"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function SkillsForm() {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;

    setResumeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now().toString(),
          name: skill.trim(),
        },
      ],
    }));

    setSkill("");
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill.id !== id
      ),
    }));
  };

  return (
    <SectionCard title="Skills">

      <input
        placeholder="Type a skill and press Enter"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
          }
        }}
        className="w-full border rounded-lg p-3"
      />

      <div className="flex flex-wrap gap-3 mt-5">

        {resumeData.skills.map((skill) => (

          <div
            key={skill.id}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >

            {skill.name}

            <button
              onClick={() =>
                removeSkill(skill.id)
              }
              className="font-bold"
            >
              ×
            </button>

          </div>

        ))}

      </div>

    </SectionCard>
  );
}