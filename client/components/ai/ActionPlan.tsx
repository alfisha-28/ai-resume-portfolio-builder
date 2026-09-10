"use client";

import { CheckCircle2, AlertOctagon, ListOrdered, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ActionItem {
  priority: "high" | "medium" | "low";
  section: "summary" | "experience" | "projects" | "skills" | "general";
  text: string;
}

interface ActionPlanProps {
  strengths: string[];
  weaknesses: string[];
  actionItems: ActionItem[];
  resumeId: string;
}

export default function ActionPlan({
  strengths,
  weaknesses,
  actionItems,
  resumeId,
}: ActionPlanProps) {
  const getPriorityBadge = (p: ActionItem["priority"]) => {
    switch (p) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Plan */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-gray-900 text-sm">Prioritized Action Plan</h3>
          </div>
          <Link
            href={`/dashboard/resume/edit/${resumeId}`}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Go to Editor <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {actionItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-gray-100 rounded-xl flex items-start justify-between gap-3 text-xs text-gray-800"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-purple-600 shrink-0 mt-0.5">{idx + 1}.</span>
                <span className="leading-relaxed">{item.text}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 border ${getPriorityBadge(
                  item.priority
                )}`}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs border-b border-gray-100 pb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs border-b border-gray-100 pb-2.5">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Areas to Improve</span>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="text-rose-500 font-bold">⚠</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
