"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useResume } from "@/context/ResumeContext";

const templates = [
  { id: "classic", name: "Classic", image: "/templates/classic.png" },
  { id: "modern", name: "Modern", image: "/templates/modern.png" },
  { id: "minimal", name: "Minimal", image: "/templates/minimal.png" },
  { id: "professional", name: "Professional", image: "/templates/professional.png" },
] as const;

export default function TemplateSelector() {
  const { resumeData, setResumeData } = useResume();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Choose Template</h3>
        <span className="text-xs text-gray-400 capitalize">
          Active: <strong className="text-blue-600">{resumeData.template}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((template) => {
          const isSelected = resumeData.template === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() =>
                setResumeData((prev) => ({ ...prev, template: template.id }))
              }
              className={`relative rounded-xl border-2 overflow-hidden transition-all text-left group focus:outline-none ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
              }`}
            >
              {/* Image Preview Container */}
              <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden">
                <Image
                  src={template.image}
                  alt={`${template.name} Template Preview`}
                  fill
                  unoptimized
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Label */}
              <div
                className={`py-2 px-3 text-xs font-semibold text-center transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 group-hover:bg-slate-50"
                }`}
              >
                {template.name}
              </div>

              {/* Selection Check Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
