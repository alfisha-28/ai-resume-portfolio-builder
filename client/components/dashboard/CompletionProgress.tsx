"use client";

import useResumeCompletion from "@/hooks/useResumeCompletion";

export default function CompletionProgress() {
  const { percentage, completed, total } = useResumeCompletion();

  const color =
    percentage >= 80
      ? "bg-green-500"
      : percentage >= 50
      ? "bg-blue-500"
      : percentage >= 25
      ? "bg-yellow-500"
      : "bg-red-400";

  const label =
    percentage >= 80
      ? "Looking great!"
      : percentage >= 50
      ? "Good progress"
      : percentage >= 25
      ? "Keep going"
      : "Just getting started";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Resume Completion</h2>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
        <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
      </div>

      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-400">
        {completed} of {total} sections filled
      </p>
    </div>
  );
}
