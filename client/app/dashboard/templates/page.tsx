"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createResume } from "@/services/resume.service";
import type { Resume } from "@/types/resume";

interface TemplateInfo {
  id: Resume["template"];
  name: string;
  description: string;
  badge: string;
  features: string[];
}

const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional single-column layout preferred by corporate recruiters and traditional industries.",
    badge: "Most Popular",
    features: ["ATS-optimized hierarchy", "Clean serif/sans balance", "Standard section order"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with bold header styling and modern accents, ideal for tech and design roles.",
    badge: "Tech & Creative",
    features: ["Accent header band", "Visual skill badges", "Project highlights"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Stripped-down, elegant typography-first design focused entirely on clarity and substance.",
    badge: "ATS Friendly",
    features: ["High whitespace ratio", "Ultra-fast recruiter scan", "Zero clutter"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Executive two-column format with dark sidebar for contact & skills alongside detailed work history.",
    badge: "Executive",
    features: ["Distinct sidebar navigation", "Structured timeline view", "Comprehensive skills display"],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);

  const handleSelectTemplate = async (template: TemplateInfo) => {
    try {
      setCreating(template.id);
      const newResume = await createResume({
        title: `${template.name} Resume`,
        template: template.id,
      });
      toast.success(`Created resume with ${template.name} template!`);
      router.push(`/dashboard/resume/edit/${newResume.id}`);
    } catch {
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setCreating(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Resume Templates</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              <Sparkles className="w-3 h-3" /> 4 Designs
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Choose an ATS-friendly template to begin building your standout resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div className="flex gap-5">
                {/* Thumbnail */}
                <div className="w-28 sm:w-32 aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden shrink-0 relative border border-gray-200">
                  <Image
                    src={`/templates/${tpl.id}.png`}
                    alt={`${tpl.name} Preview`}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-gray-900 truncate">{tpl.name}</h2>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full shrink-0">
                      {tpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{tpl.description}</p>

                  <ul className="mt-3 space-y-1.5">
                    {tpl.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleSelectTemplate(tpl)}
                disabled={creating !== null}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition shadow-sm"
              >
                {creating === tpl.id ? (
                  "Creating Resume..."
                ) : (
                  <>
                    Use This Template <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
