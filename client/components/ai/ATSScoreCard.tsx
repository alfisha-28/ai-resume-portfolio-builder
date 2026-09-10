"use client";

import { ShieldCheck, Info } from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  status: string;
  summary: string;
}

export default function ATSScoreCard({ score, status, summary }: ATSScoreCardProps) {
  const getScoreTheme = (val: number) => {
    if (val >= 90) return { ring: "stroke-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800" };
    if (val >= 80) return { ring: "stroke-blue-500", text: "text-blue-700", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800" };
    if (val >= 70) return { ring: "stroke-cyan-500", text: "text-cyan-700", bg: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-800" };
    if (val >= 60) return { ring: "stroke-amber-500", text: "text-amber-700", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-800" };
    return { ring: "stroke-rose-500", text: "text-rose-700", bg: "bg-rose-50", badge: "bg-rose-100 text-rose-800" };
  };

  const theme = getScoreTheme(score);
  const circumference = 2 * Math.PI * 44; // r = 44
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 flex flex-col md:flex-row items-center gap-6">
      {/* Gauge Circle */}
      <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-gray-100 fill-none"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            className={`${theme.ring} fill-none transition-all duration-1000 ease-out`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold tracking-tight text-gray-900">{score}</span>
          <span className="text-[11px] font-medium text-gray-400 -mt-0.5">out of 100</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-2 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <h2 className="text-lg font-bold text-gray-900">Estimated ATS Compatibility</h2>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${theme.badge}`}>
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
          {summary}
        </p>

        {/* Disclaimer Alert */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-1">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>
            Application-generated heuristic score based on standard ATS screening criteria. Actual ATS systems differ by company.
          </span>
        </div>
      </div>

      {/* Readiness Badge Box */}
      <div className={`p-4 rounded-xl border border-gray-100 ${theme.bg} shrink-0 text-center w-full md:w-auto`}>
        <div className="flex items-center justify-center gap-1.5 mb-1 text-xs font-semibold text-gray-700">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>Screening Quality</span>
        </div>
        <p className="text-xs text-gray-500">
          {score >= 80 ? "Passes high filter thresholds" : "Follow recommendations below"}
        </p>
      </div>
    </div>
  );
}
