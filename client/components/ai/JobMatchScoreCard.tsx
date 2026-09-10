"use client";

import { Target, Info, CheckCircle, AlertCircle } from "lucide-react";

interface JobMatchScoreCardProps {
  score: number;
  tier: string;
  jobTitle: string;
  summary: string;
}

export default function JobMatchScoreCard({
  score,
  tier,
  jobTitle,
  summary,
}: JobMatchScoreCardProps) {
  // Color styling based on match score
  const getTheme = (val: number) => {
    if (val >= 90) {
      return {
        stroke: "#10b981", // emerald-500
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    }
    if (val >= 80) {
      return {
        stroke: "#3b82f6", // blue-500
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-800 border-blue-300",
      };
    }
    if (val >= 70) {
      return {
        stroke: "#6366f1", // indigo-500
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-700",
        badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      };
    }
    if (val >= 60) {
      return {
        stroke: "#f59e0b", // amber-500
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-800 border-amber-300",
      };
    }
    return {
      stroke: "#ef4444", // red-500
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-800 border-red-300",
    };
  };

  const theme = getTheme(score);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className={`p-6 rounded-2xl border ${theme.border} ${theme.bg} shadow-xs transition-all`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Score Gauge */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-gray-200"
                strokeWidth="9"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
                {score}
              </span>
              <span className="text-[11px] font-medium text-gray-500 mt-0.5">/ 100</span>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Estimated Match
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${theme.badge}`}
              >
                {tier}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Target Role: <span className={theme.text}>{jobTitle}</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-xl line-clamp-2">
              {summary}
            </p>
          </div>
        </div>

        {/* Right: Heuristic Disclaimer Pill */}
        <div className="flex items-start gap-2 max-w-xs p-3 bg-white/80 rounded-xl border border-gray-200/80 text-[11px] text-gray-500 shadow-2xs">
          <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-gray-700">Resume-to-Job Match:</strong> Application-generated
            compatibility estimate based on deterministic overlap and AI analysis. Not an official employer hiring score.
          </p>
        </div>
      </div>
    </div>
  );
}
