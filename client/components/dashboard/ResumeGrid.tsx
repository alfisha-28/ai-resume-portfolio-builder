"use client";

import ResumeCard from "./ResumeCard";
import ResumeEmptyState from "./ResumeEmptyState";
import type { Resume } from "@/types/resume";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";

interface ResumeGridProps {
  resumes: Resume[];
}

export default function ResumeGrid({
  resumes,
}: ResumeGridProps) {
  if (resumes.length === 0) {
    return (
      <ResumeEmptyState
        onCreate={() => console.log("Create Resume")}
      />
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          id={resume.id}
          title={resume.title}
          template={resume.template}
          completion={calculateResumeCompletion(resume).percentage}
          updatedAt={resume.updatedAt}
        />
      ))}
    </div>
  );
}