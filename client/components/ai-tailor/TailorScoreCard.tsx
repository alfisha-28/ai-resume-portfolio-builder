"use client";

import React from "react";
import { ArrowRight, TrendingUp, Info, ShieldCheck } from "lucide-react";

interface TailorScoreCardProps {
  scoreBefore: number;
  estimatedScoreAfter: number;
}

export default function TailorScoreCard({
  scoreBefore,
  estimatedScoreAfter,
}: TailorScoreCardProps) {
  const lift = Math.max(0, estimatedScoreAfter - scoreBefore);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 70) return "text-indigo-600 bg-indigo-50 border-indigo-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">Estimated ATS Compatibility</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +{lift} Pts Estimated Lift
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Simulated alignment based on keyword distribution, role terminology, and section phrasing.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200/80">
          <Info className="w-3.5 h-3.5 shrink-0 text-gray-400" />
          <span>Estimated indicator, not an official ATS guarantee</span>
        </div>
      </div>

      {/* Score Comparison Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-2">
        {/* Current Score */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/90 text-center space-y-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
            Current Score
          </span>
          <div className="text-3xl sm:text-4xl font-black text-gray-800">
            {scoreBefore}
            <span className="text-xs font-semibold text-gray-400">/100</span>
          </div>
          <p className="text-[11px] text-gray-500">Pre-tailoring baseline</p>
        </div>

        {/* Arrow Divider */}
        <div className="flex flex-col items-center justify-center gap-1 text-center py-2 sm:py-0">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
            <ArrowRight className="w-5 h-5 hidden sm:block" />
            <TrendingUp className="w-5 h-5 sm:hidden" />
          </div>
          <span className="text-[11px] font-bold text-indigo-600 mt-1">
            Accept rewrites to unlock
          </span>
        </div>

        {/* Estimated Tailored Score */}
        <div className={`p-5 rounded-2xl border text-center space-y-1 ${getScoreColor(estimatedScoreAfter)}`}>
          <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
            Estimated Tailored Score
          </span>
          <div className="text-3xl sm:text-4xl font-black">
            {estimatedScoreAfter}
            <span className="text-xs font-semibold opacity-70">/100</span>
          </div>
          <p className="text-[11px] opacity-80">After applying accepted suggestions</p>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
        <span className="leading-relaxed">
          <strong>100% Truth-Preserving:</strong> This score gain is achieved solely through keyword alignment, strong active verbs, and eliminating ambiguities—never through inventing credentials.
        </span>
      </div>
    </div>
  );
}
