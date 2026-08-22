"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";
import { Language } from "@/types/resume";

const PROFICIENCY_LEVELS: Language["proficiency"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Native",
];

export default function LanguagesForm() {
  const { resumeData, setResumeData } = useResume();

  const addLanguage = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now().toString(),
          name: "",
          proficiency: "Intermediate" as Language["proficiency"],
        },
      ],
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const handleChange = (
    id: string,
    field: keyof Omit<Language, "id">,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }));
  };

  return (
    <SectionCard title="Languages">
      <div className="space-y-4">
        {resumeData.languages.map((lang) => (
          <div
            key={lang.id}
            className="grid grid-cols-2 gap-4 items-center border rounded-lg p-4 bg-gray-50"
          >
            <input
              placeholder="Language (e.g. English)"
              value={lang.name}
              onChange={(e) => handleChange(lang.id, "name", e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-3">
              <select
                value={lang.proficiency}
                onChange={(e) => handleChange(lang.id, "proficiency", e.target.value)}
                className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PROFICIENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addLanguage}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Language
      </button>
    </SectionCard>
  );
}
