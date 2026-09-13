"use client";

import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Wand2, ShieldCheck } from "lucide-react";

interface TailorLoadingStateProps {
  currentStage?: number;
}

const STAGES = [
  "Reading job description & target requirements",
  "Comparing your resume against role expectations",
  "Identifying alignment opportunities & keyword overlaps",
  "Generating safe, grounded improvements (anti-fabrication)",
  "Preparing suggestions & section breakdowns",
];

export default function TailorLoadingState({ currentStage: propStage }: TailorLoadingStateProps) {
  const [stage, setStage] = useState(propStage ?? 0);

  useEffect(() => {
    if (propStage !== undefined) {
      setStage(propStage);
      return;
    }

    const interval = setInterval(() => {
      setStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, [propStage]);

  return (
    <div className="p-12 md:p-16 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
          <Wand2 className="w-8 h-8 animate-pulse text-indigo-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-50 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-bold text-gray-900">
          Tailoring Resume for Target Role...
        </h3>
        <p className="text-xs text-gray-500">
          Our AI engine is evaluating your background against the job description with strict ethical anti-fabrication rules.
        </p>
      </div>

      {/* 5-Step Staged Progress Indicator */}
      <div className="w-full max-w-md space-y-2.5 text-left bg-gray-50/80 p-5 rounded-2xl border border-gray-200/80">
        {STAGES.map((label, idx) => {
          const isDone = stage > idx;
          const isCurrent = stage === idx;
          return (
            <div key={idx} className="flex items-center gap-3 text-xs transition-colors">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0 bg-white" />
              )}
              <span
                className={`transition-colors ${
                  isDone
                    ? "text-gray-700 font-medium line-through opacity-70"
                    : isCurrent
                    ? "text-indigo-900 font-bold"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Guarantee: Only existing facts and experiences are refined.</span>
      </div>
    </div>
  );
}
