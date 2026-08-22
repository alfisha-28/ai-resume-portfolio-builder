"use client";

import { useResume } from "@/context/ResumeContext";

const templates = [
  {
    id: "classic",
    name: "Classic",
  },
  {
    id: "modern",
    name: "Modern",
  },
  {
    id: "minimal",
    name: "Minimal",
  },
  {
    id: "professional",
    name: "Professional",
  },
] as const;

export default function TemplateSelector() {
  const { resumeData, setResumeData } = useResume();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">
        Choose Template
      </h3>

      <div className="flex flex-wrap gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() =>
              setResumeData({
                ...resumeData,
                template: template.id,
              })
            }
            className={`px-4 py-2 rounded-lg border transition-all ${
              resumeData.template === template.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-50 border-gray-300"
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}