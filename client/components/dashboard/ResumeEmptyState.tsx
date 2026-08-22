"use client";

import { FileText } from "lucide-react";

interface ResumeEmptyStateProps {
  onCreate: () => void;
}

export default function ResumeEmptyState({
  onCreate,
}: ResumeEmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-gray-300
        bg-gray-50
        py-20
        px-6
      "
    >
      <div className="rounded-full bg-blue-100 p-5 text-blue-600">
        <FileText size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        No resumes found
      </h2>

      <p className="mt-2 max-w-md text-center text-gray-500">
        Create your first professional resume and start applying
        for your dream job.
      </p>

      <button
        onClick={onCreate}
        className="
          mt-8
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Create Resume
      </button>
    </div>
  );
}