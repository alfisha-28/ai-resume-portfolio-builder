"use client";

import React from "react";
import { Lightbulb, ArrowRight, Zap, CheckCircle } from "lucide-react";
import type { TailorRecommendation } from "@/services/ai.service";

interface TailorRecommendationListProps {
  recommendations: TailorRecommendation[];
}

export default function TailorRecommendationList({
  recommendations,
}: TailorRecommendationListProps) {
  if (!recommendations || recommendations.length === 0) return null;

  const getPriorityStyle = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Manual Enhancement Recommendations</h3>
            <p className="text-xs text-gray-500">
              Guidance for details you can manually verify or emphasize to increase job relevance.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-gray-50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getPriorityStyle(
                    rec.priority
                  )}`}
                >
                  {rec.priority}
                </span>
                {rec.section && (
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    {rec.section}
                  </span>
                )}
                <h4 className="text-xs font-bold text-gray-900">{rec.title}</h4>
              </div>
              <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">{rec.description}</p>
            </div>

            {rec.action && (
              <span className="shrink-0 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 self-start sm:self-center">
                {rec.action}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
