"use client";

import ResumeCard from "./ResumeCard";
import ResumeEmptyState from "./ResumeEmptyState";
import type { Resume } from "@/types/resume";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";

interface ResumeGridProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
<<<<<<< HEAD
  onRename: (id: string, newTitle: string) => void;
  onCreate: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
=======
  onCreate: () => void;
>>>>>>> origin/main
}

export default function ResumeGrid({
  resumes,
  onDelete,
  onDuplicate,
<<<<<<< HEAD
  onRename,
  onCreate,
  searchQuery,
  onClearSearch,
}: ResumeGridProps) {
  if (resumes.length === 0) {
    return (
      <ResumeEmptyState
        onCreate={onCreate}
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
      />
    );
=======
  onCreate,
}: ResumeGridProps) {
  if (resumes.length === 0) {
    return <ResumeEmptyState onCreate={onCreate} />;
>>>>>>> origin/main
  }

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
<<<<<<< HEAD
          onRename={onRename}
=======
>>>>>>> origin/main
        />
      ))}
    </div>
  );
}
