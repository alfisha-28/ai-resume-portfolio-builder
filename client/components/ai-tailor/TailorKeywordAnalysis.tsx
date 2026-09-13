"use client";

import React from "react";
import { KeyRound, CheckCircle2, AlertCircle, Flame } from "lucide-react";
import type { TailorKeywordAnalysis as TailorKeywordType } from "@/services/ai.service";

interface TailorKeywordAnalysisProps {
  keywords: TailorKeywordType;
}

export default function TailorKeywordAnalysis({ keywords }: TailorKeywordAnalysisProps) {
  if (!keywords) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Keyword Density & ATS Alignment</h3>
            <p className="text-xs text-gray-500">
              Crucial technical and role-specific keywords analyzed from the job description.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* High Priority */}
        <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
            <Flame className="w-4 h-4 text-purple-600" />
            <span>High-Priority Terms</span>
          </div>
          <p className="text-[11px] text-purple-700/80">
            Core requirements and frequent employer keywords in the posting.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {keywords.highPriority && keywords.highPriority.length > 0 ? (
              keywords.highPriority.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-purple-800 border border-purple-200 shadow-2xs"
                >
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None</span>
            )}
          </div>
        </div>

        {/* Matched */}
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Matched Keywords</span>
          </div>
          <p className="text-[11px] text-emerald-700/80">
            Successfully identified in both the job description and your resume.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {keywords.matched && keywords.matched.length > 0 ? (
              keywords.matched.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-emerald-800 border border-emerald-200 shadow-2xs"
                >
                  ✓ {kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">No matches</span>
            )}
          </div>
        </div>

        {/* Missing */}
        <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Missing Keywords</span>
          </div>
          <p className="text-[11px] text-rose-700/80">
            Present in the job posting but not found in your current resume content.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {keywords.missing && keywords.missing.length > 0 ? (
              keywords.missing.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-rose-800 border border-rose-200 shadow-2xs"
                >
                  - {kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None missing</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
