"use client";

import CreateResumeButton from "./CreateResumeButton";

interface DashboardHeaderProps {
  onCreate: () => void;
  creating?: boolean;
}

export default function DashboardHeader({
  onCreate,
  creating = false,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Resumes
        </h1>

        <p className="text-gray-500 mt-2">
          Create, edit and manage all of your resumes.
        </p>
      </div>

      <CreateResumeButton
        onClick={onCreate}
        loading={creating}
      />

    </div>
  );
}