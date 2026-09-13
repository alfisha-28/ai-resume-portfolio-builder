"use client";

import React from "react";
import { Check, X, Sparkles, HelpCircle, Tag, RotateCcw } from "lucide-react";
import type { TailorSummary } from "@/services/ai.service";

interface TailorSummarySuggestionProps {
  summary: TailorSummary;
  status: "accepted" | "rejected" | "pending";
  onAccept: () => void;
  onReject: () => void;
  onReset: () => void;
}

export default function TailorSummarySuggestion({
  summary,
  status,
  onAccept,
  onReject,
  onReset,
}: TailorSummarySuggestionProps) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-6 md:p-7 space-y-5 ${
        status === "accepted"
          ? "bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-200"
          : status === "rejected"
          ? "bg-gray-50/70 border-gray-200 opacity-60"
          : "bg-white border-gray-200 shadow-xs hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Professional Summary</h4>
            <p className="text-xs text-gray-500">{summary.suggestion}</p>
          </div>
        </div>

        {/* Status Badge & Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {status === "accepted" && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Accepted
            </span>
          )}
          {status === "rejected" && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-200 text-gray-700 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Rejected
            </span>
          )}

          {status === "pending" ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onReject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 text-xs font-semibold transition"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
                <span>Reject</span>
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-gray-100 transition"
              title="Reset decision"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Change</span>
            </button>
          )}
        </div>
      </div>

      {/* Before / After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/90 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <span>Before (Current)</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary.before || <span className="italic text-gray-400">No current summary provided</span>}
          </p>
        </div>

        {/* AFTER */}
        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-indigo-700">
            <span>After (Tailored)</span>
          </div>
          <p className="text-xs text-indigo-950 font-medium leading-relaxed whitespace-pre-wrap">
            {summary.after}
          </p>
        </div>
      </div>

      {/* Reason / Why */}
      {summary.reason && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Why this change: </span>
            <span>{summary.reason}</span>
          </div>
        </div>
      )}
    </div>
  );
}
