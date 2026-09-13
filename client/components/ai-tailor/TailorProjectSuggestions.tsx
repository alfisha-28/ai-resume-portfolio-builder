"use client";

import React from "react";
import { FolderGit2, Check, X, Tag, HelpCircle, RotateCcw } from "lucide-react";
import type { TailorProjectSuggestion } from "@/services/ai.service";
import type { Project } from "@/types/resume";

interface TailorProjectSuggestionsProps {
  suggestions: TailorProjectSuggestion[];
  projects: Project[];
  decisions: Record<string, "accepted" | "rejected" | "pending">;
  onDecision: (key: string, decision: "accepted" | "rejected" | "pending") => void;
}

export default function TailorProjectSuggestions({
  suggestions,
  projects,
  decisions,
  onDecision,
}: TailorProjectSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const getProjectTitle = (projId: string) => {
    const found = projects.find((p) => p.id === projId);
    return found?.title || "Technical Project";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Project Description Rewrites</h3>
            <p className="text-xs text-gray-500">
              Refocus architectural impact and highlight technologies relevant to this opening.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-gray-400">
          {suggestions.length} {suggestions.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="space-y-5">
        {suggestions.map((item, idx) => {
          const itemKey = `proj-${item.projectId}`;
          const status = decisions[itemKey] || "pending";
          const projTitle = getProjectTitle(item.projectId);

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 p-5 space-y-4 ${
                status === "accepted"
                  ? "bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-200"
                  : status === "rejected"
                  ? "bg-gray-50/70 border-gray-200 opacity-60"
                  : "bg-gray-50/40 border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <span className="text-xs font-bold text-gray-800">{projTitle}</span>

                {/* Status / Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {status === "accepted" && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Accepted
                    </span>
                  )}
                  {status === "rejected" && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-gray-200 text-gray-700 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}

                  {status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDecision(itemKey, "rejected")}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 text-xs font-semibold transition"
                      >
                        <X className="w-3.5 h-3.5 text-gray-400" />
                        <span>Reject</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDecision(itemKey, "accepted")}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onDecision(itemKey, "pending")}
                      className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-gray-100 transition"
                      title="Reset decision"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Change</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Before / After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-white border border-gray-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Before
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.before || "No description"}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    After (Tailored)
                  </span>
                  <p className="text-xs text-indigo-950 font-medium leading-relaxed">{item.after}</p>
                </div>
              </div>

              {/* Why & Keywords */}
              <div className="space-y-2 pt-1">
                {item.reason && (
                  <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/70">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Why: </span>
                      <span>{item.reason}</span>
                    </div>
                  </div>
                )}

                {item.matchedKeywords && item.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Keywords:
                    </span>
                    {item.matchedKeywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
