"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Key, Wrench, ShieldAlert } from "lucide-react";

interface JobSkillKeywordCardProps {
  matchingSkills: string[];
  missingSkills: string[];
  matchingKeywords: string[];
  missingKeywords: string[];
}

export default function JobSkillKeywordCard({
  matchingSkills,
  missingSkills,
  matchingKeywords,
  missingKeywords,
}: JobSkillKeywordCardProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "keywords">("skills");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Header with Tab Switcher */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {activeTab === "skills" ? (
            <Wrench className="w-4 h-4 text-blue-600" />
          ) : (
            <Key className="w-4 h-4 text-purple-600" />
          )}
          <h3 className="text-sm font-bold text-gray-900">
            {activeTab === "skills" ? "Skills Overlap & Gaps" : "Keywords Alignment"}
          </h3>
        </div>

        <div className="flex items-center p-0.5 bg-gray-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "skills"
                ? "bg-white text-gray-900 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Skills ({matchingSkills.length + missingSkills.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("keywords")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "keywords"
                ? "bg-white text-gray-900 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Keywords ({matchingKeywords.length + missingKeywords.length})
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {activeTab === "skills" ? (
          <>
            {/* Matching Skills */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Matching Skills ({matchingSkills.length})
                </span>
                <span className="text-[11px] text-gray-400">Present in both resume and job</span>
              </div>
              {matchingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {matchingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium rounded-lg"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No direct skill matches detected.</p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Missing / Unrepresented Skills ({missingSkills.length})
                </span>
                <span className="text-[11px] text-gray-400">Required or emphasized in job</span>
              </div>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium rounded-lg"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-600 font-medium">
                  Great job! All critical job skills are represented in your resume.
                </p>
              )}

              {/* Anti-fabrication reminder */}
              {missingSkills.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
                  <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Integrity Notice:</strong> The missing skills above appear in the job
                    description. <em>Add them only if you have genuine, verifiable experience</em>.
                    Do not add tools or technologies you have not used.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Matching Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  Keywords Found in Resume ({matchingKeywords.length})
                </span>
                <span className="text-[11px] text-gray-400">Detected in candidate profile</span>
              </div>
              {matchingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {matchingKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium rounded-lg"
                    >
                      <CheckCircle2 className="w-3 h-3 text-purple-600" />
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No keyword overlap detected.</p>
              )}
            </div>

            {/* Missing Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Missing / Underrepresented Keywords ({missingKeywords.length})
                </span>
                <span className="text-[11px] text-gray-400">High frequency in job description</span>
              </div>
              {missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium rounded-lg"
                    >
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-600 font-medium">
                  Strong keyword alignment! All prominent role keywords are addressed.
                </p>
              )}

              <p className="text-[11px] text-gray-400 mt-1">
                Tip: Seamlessly incorporate missing terminology into your work descriptions or project summaries only where factually applicable.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
