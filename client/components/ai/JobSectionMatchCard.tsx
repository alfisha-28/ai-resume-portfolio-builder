"use client";

import { Briefcase, Code, GraduationCap, CheckCircle, AlertCircle } from "lucide-react";
import type { SectionMatchDetail } from "@/services/ai.service";

interface JobSectionMatchCardProps {
  experienceMatch: SectionMatchDetail;
  projectMatch: SectionMatchDetail;
  educationMatch: {
    score: number;
    compatibility: string;
  };
}

export default function JobSectionMatchCard({
  experienceMatch,
  projectMatch,
  educationMatch,
}: JobSectionMatchCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-900">Experience & Portfolio Alignment</h3>

      {/* Experience Match */}
      <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Work Experience Fit</h4>
              <p className="text-[11px] text-gray-500">Alignment of past roles, seniority, and responsibilities</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(
              experienceMatch.score
            )}`}
          >
            {experienceMatch.score}% Match
          </span>
        </div>

        {/* Strengths & Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
            <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Identified Strengths
            </span>
            {experienceMatch.strengths.length > 0 ? (
              <ul className="space-y-1 text-emerald-900 pl-4 list-disc">
                {experienceMatch.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-emerald-700 italic">No specific strengths flagged.</p>
            )}
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5">
            <span className="font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Areas to Emphasize
            </span>
            {experienceMatch.gaps.length > 0 ? (
              <ul className="space-y-1 text-amber-900 pl-4 list-disc">
                {experienceMatch.gaps.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            ) : (
              <p className="text-amber-700 italic">Experience is well-aligned with role scope.</p>
            )}
          </div>
        </div>
      </div>

      {/* Projects Match */}
      <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Projects & Technical Breadth</h4>
              <p className="text-[11px] text-gray-500">Tech stack and scope overlap in your showcased projects</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(
              projectMatch.score
            )}`}
          >
            {projectMatch.score}% Match
          </span>
        </div>

        {/* Strengths & Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
            <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Relevant Project Highlights
            </span>
            {projectMatch.strengths.length > 0 ? (
              <ul className="space-y-1 text-emerald-900 pl-4 list-disc">
                {projectMatch.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-emerald-700 italic">No specific project highlights flagged.</p>
            )}
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5">
            <span className="font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Project Recommendations
            </span>
            {projectMatch.gaps.length > 0 ? (
              <ul className="space-y-1 text-amber-900 pl-4 list-disc">
                {projectMatch.gaps.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            ) : (
              <p className="text-amber-700 italic">Projects clearly support your target technology stack.</p>
            )}
          </div>
        </div>
      </div>

      {/* Education Match */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Education & Qualifications</h4>
            <p className="text-xs text-gray-500">{educationMatch.compatibility}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${getScoreColor(
            educationMatch.score
          )}`}
        >
          {educationMatch.score}%
        </span>
      </div>
    </div>
  );
}
