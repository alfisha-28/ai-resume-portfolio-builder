"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";
import AISkillsSuggester from "@/components/ai/AISkillsSuggester";

export default function SkillsForm() {
  const { resumeData, setResumeData } = useResume();
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;

    // Avoid duplicate skill names
    if (resumeData.skills.some((s) => s.name.toLowerCase() === skill.trim().toLowerCase())) {
      setSkill("");
      return;
    }

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
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    <SectionCard title="Skills">
      <div className="space-y-4">
        {/* AI Skills Suggester */}
        <AISkillsSuggester />

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Add Skill</label>
          <div className="flex gap-2">
            <input
              placeholder="Type a skill and press Enter (e.g., Next.js, Docker, Figma)"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="flex-1 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Current Skills List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              Active Skills ({resumeData.skills.length})
            </span>
          </div>

          {resumeData.skills.length === 0 ? (
            <p className="text-xs text-gray-400 italic py-2">
              No skills added yet. Type a skill above or click &quot;Suggest Skills with AI&quot;.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-2xs group"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(s.id)}
                    className="text-blue-400 hover:text-red-500 transition-colors font-bold ml-0.5"
                    aria-label={`Remove ${s.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}