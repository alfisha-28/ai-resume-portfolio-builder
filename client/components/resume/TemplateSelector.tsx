"use client";

import Image from "next/image";
import { Check, ChevronDown, ChevronUp, LayoutTemplate, Palette } from "lucide-react";
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import type { ResumeTemplate } from "@/types/resume";

const templates: readonly {
  id: ResumeTemplate;
  name: string;
  image: string;
  description: string;
}[] = [
  {
    id: "classic",
    name: "Classic",
    image: "/templates/classic.png",
    description: "Traditional & clean, ideal for corporate & finance roles",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/templates/modern.png",
    description: "Sleek contemporary layout with bold headers",
  },
  {
    id: "minimal",
    name: "Minimal",
    image: "/templates/minimal.png",
    description: "Generous whitespace & focused typography for tech & design",
  },
  {
    id: "professional",
    name: "Professional",
    image: "/templates/professional.png",
    description: "Structured executive design for leadership & managers",
  },
];

export default function TemplateSelector() {
  const { resumeData, setResumeData, setIsDirty } = useResume();
  const [isOpen, setIsOpen] = useState(false);

  const activeTemplate =
    templates.find((t) => t.id === resumeData.template) || templates[0];

  const handleSelect = (templateId: ResumeTemplate) => {
    if (templateId !== resumeData.template) {
      setResumeData((prev) => ({ ...prev, template: templateId }));
      setIsDirty(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-5 overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <LayoutTemplate size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Resume Template
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 capitalize">
                <Palette size={11} />
                {activeTemplate.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              {activeTemplate.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <span>{isOpen ? "Hide Templates" : "Change Template"}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expandable Templates Grid */}
      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-100 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3">
            {templates.map((template) => {
              const isSelected = resumeData.template === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelect(template.id)}
                  className={`relative rounded-xl border-2 overflow-hidden transition-all text-left group focus:outline-hidden cursor-pointer ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md"
                      : "border-slate-200 hover:border-blue-300 hover:shadow-xs"
                  }`}
                >
                  {/* Image Preview Container */}
                  <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden">
                    <Image
                      src={template.image}
                      alt={`${template.name} Template Preview`}
                      fill
                      unoptimized
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Label */}
                  <div
                    className={`py-2 px-3 text-xs font-semibold text-center transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-700 group-hover:bg-slate-50"
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
      )}
    </div>
  );
}
