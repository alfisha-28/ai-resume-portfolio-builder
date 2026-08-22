"use client";

import useResumeCompletion from "@/hooks/useResumeCompletion";

export default function CompletionProgress() {
  const { percentage, completed, total } =
    useResumeCompletion();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-5">
        Resume Completion
      </h2>

      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-4 text-sm text-gray-600">
        {completed} of {total} sections completed
      </p>

      <p className="text-3xl font-bold mt-2">
        {percentage}%
      </p>

    </div>
  );
}