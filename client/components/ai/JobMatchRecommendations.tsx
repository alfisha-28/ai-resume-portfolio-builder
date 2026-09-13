"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle, Clock, Zap, Wand2 } from "lucide-react";
import type { MatchRecommendation } from "@/services/ai.service";

interface JobMatchRecommendationsProps {
  recommendations: MatchRecommendation[];
  resumeId: string;
  jobDescription?: string;
}

export default function JobMatchRecommendations({
  recommendations,
  resumeId,
  jobDescription,
}: JobMatchRecommendationsProps) {
  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getActionHref = (type: string) => {
    switch (type) {
      case "summary":
        return `/dashboard/resume/edit/${resumeId}?section=summary`;
      case "experience":
        return `/dashboard/resume/edit/${resumeId}?section=experience`;
      case "skills":
        return `/dashboard/resume/edit/${resumeId}?section=skills`;
      case "projects":
        return `/dashboard/resume/edit/${resumeId}?section=projects`;
      default:
        return `/dashboard/resume/edit/${resumeId}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-gray-900">Actionable Match Improvements</h3>
          </div>
          <span className="text-xs text-gray-400">Step-by-step guidance</span>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                      rec.priority
                    )}`}
                  >
                    {rec.priority} Priority
                  </span>
                  <h4 className="text-xs font-bold text-gray-900">{rec.title}</h4>
                </div>
                <p className="text-xs text-gray-600 max-w-2xl">{rec.description}</p>
              </div>

              {rec.actionLabel && (
                <Link
                  href={getActionHref(rec.type)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 hover:border-purple-300 text-xs font-semibold rounded-lg shadow-2xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>{rec.actionLabel}</span>
                  <ArrowRight className="w-3 h-3 text-purple-500" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Resume Tailoring Active CTA Card */}
      <div className="p-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-blue-50/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Recommended Next Step
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs font-semibold text-indigo-950">AI Resume Tailoring</span>
          </div>
          <h4 className="text-sm font-bold text-gray-900">
            Tailor your resume specifically for this job description
          </h4>
          <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
            Our truth-preserving AI will evaluate every section, strengthen action verbs, align keywords, and prepare an interactive change plan without inventing any false credentials.
          </p>
        </div>

        <Link
          href={`/dashboard/resume/${resumeId}/tailor`}
          onClick={() => {
            if (jobDescription) {
              sessionStorage.setItem("pending_tailor_jd", jobDescription);
            }
          }}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all"
        >
          <Wand2 className="w-4 h-4" />
          <span>Tailor Resume for This Job</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
