"use client";

import { Tag, Sparkles, AlertTriangle } from "lucide-react";

interface KeywordAnalysisProps {
  found: string[];
  recommended: string[];
  missing: string[];
}

export default function KeywordAnalysis({ found, recommended }: KeywordAnalysisProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Tag className="w-4 h-4 text-blue-600" />
        <h3 className="font-bold text-gray-900 text-sm">ATS Keyword Intelligence</h3>
      </div>

      {/* Found Keywords */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-700">Found Keywords ({found.length})</span>
          <span className="text-[11px] text-emerald-600 font-medium">Parsed from your resume</span>
        </div>
        {found.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {found.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No strong technical keywords detected yet.</p>
        )}
      </div>

      {/* Recommended Keywords */}
      {recommended.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Recommended Keywords for this Role
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {recommended.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-lg text-xs font-medium"
              >
                + {kw}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-1.5 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 leading-relaxed mt-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical ATS Practice:</strong> Only incorporate recommended skills that you have genuine, hands-on experience with. Never fabricate credentials to bypass filters.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
