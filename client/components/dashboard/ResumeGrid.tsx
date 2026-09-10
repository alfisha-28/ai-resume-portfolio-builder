"use client";

import ResumeCard from "./ResumeCard";
import ResumeEmptyState from "./ResumeEmptyState";
import type { Resume } from "@/types/resume";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";

interface ResumeGridProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onCreate: () => void;
}

export default function ResumeGrid({ resumes, onDelete, onDuplicate, onRename, onCreate }: ResumeGridProps) {
  if (resumes.length === 0) return <ResumeEmptyState onCreate={onCreate} />;

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          id={resume.id}
          title={resume.title}
          template={resume.template}
          completion={calculateResumeCompletion(resume).percentage}
          updatedAt={resume.updatedAt}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onRename={onRename}
        />
      ))}
    </div>
  );
}
