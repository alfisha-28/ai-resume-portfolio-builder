"use client";

import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { SectionAnalysis } from "@/services/ai.service";

interface AnalysisSectionCardProps {
  sectionKey: string;
  name: string;
  analysis: SectionAnalysis;
  resumeId: string;
}

export default function AnalysisSectionCard({
  name,
  analysis,
  resumeId,
}: AnalysisSectionCardProps) {
  const [expanded, setExpanded] = useState(analysis.score < 80);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Strong":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Good":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Needs Improvement":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-cyan-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden transition hover:border-gray-300">
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-4.5 flex items-center justify-between cursor-pointer select-none bg-white hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0">
            {analysis.score}
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">{name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[11px] font-semibold px-2 py-0.2 rounded-full border ${getStatusColor(analysis.status)}`}>
                {analysis.status}
              </span>
              <span className="text-[11px] text-gray-400">
                {analysis.issues.length} {analysis.issues.length === 1 ? "issue" : "issues"} detected
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/resume/edit/${resumeId}`}
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50"
          >
            <span>Edit</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 w-full overflow-hidden">
        <div
          className={`h-full ${getScoreBarColor(analysis.score)} transition-all duration-700`}
          style={{ width: `${analysis.score}%` }}
        />
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="p-4.5 pt-3 bg-slate-50/50 border-t border-gray-100 space-y-3">
          {/* Issues */}
          {analysis.issues.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Issues Detected
              </span>
              <ul className="space-y-1 pl-1">
                {analysis.issues.map((issue, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recommended Improvements
              </span>
              <ul className="space-y-1 pl-1">
                {analysis.suggestions.map((sug, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.issues.length === 0 && analysis.suggestions.length === 0 && (
            <p className="text-xs text-emerald-700 flex items-center gap-1.5 py-1 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Section meets all standard ATS structure and clarity requirements.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
