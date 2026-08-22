"use client";

interface Props {
  onRetry: () => void;
}

export default function DashboardError({ onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-600">
        Unable to load your resumes.
      </p>

      <button
        onClick={onRetry}
        className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}