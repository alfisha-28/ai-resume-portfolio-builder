"use client";

import React from "react";
import { Cpu, CheckCircle2, Star, AlertTriangle, Info } from "lucide-react";
import type { TailorSkillsSuggestion as TailorSkillsType } from "@/services/ai.service";

interface TailorSkillsSuggestionProps {
  skills: TailorSkillsType;
}

export default function TailorSkillsSuggestion({ skills }: TailorSkillsSuggestionProps) {
  if (!skills) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Skills Strategy</h3>
            <p className="text-xs text-gray-500">
              Categorized recommendations based on job requirements and candidate profile.
            </p>
          </div>
        </div>

        {skills.reason && (
          <span className="text-[11px] text-gray-500 max-w-sm text-right hidden sm:block">
            {skills.reason}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Emphasize (Direct Overlaps) */}
        <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>Emphasize at Top</span>
          </div>
          <p className="text-[11px] text-indigo-800/80">
            High-priority skills explicitly required by this job description that are already in your toolkit.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.emphasize && skills.emphasize.length > 0 ? (
              skills.emphasize.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-indigo-700 border border-indigo-200 shadow-2xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None identified</span>
            )}
          </div>
        </div>

        {/* 2. Keep (Foundation) */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Keep as Foundation</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Valuable secondary or supporting technical competencies to preserve on your resume.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.keep && skills.keep.length > 0 ? (
              skills.keep.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white text-gray-700 border border-gray-200 shadow-2xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None specified</span>
            )}
          </div>
        </div>

        {/* 3. Missing (Anti-Fabrication Notice) */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Missing (User Input Required)</span>
          </div>
          <p className="text-[11px] text-amber-800/80">
            Requested by this posting but absent from your resume. <strong>Add only if you have genuine experience.</strong>
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.missing && skills.missing.length > 0 ? (
              skills.missing.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-amber-800 border border-amber-300 shadow-2xs"
                >
                  + {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">No critical missing skills</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
