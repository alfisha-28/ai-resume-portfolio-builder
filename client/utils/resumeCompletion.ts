import { ResumeData } from "@/types/resume";

export function calculateResumeCompletion(resume: ResumeData) {
  const checks = [
  !!resume.fullName,
  !!resume.jobTitle,
  !!resume.email,
  !!resume.phone,
  !!resume.summary,

  (resume.education?.length ?? 0) > 0,
  (resume.experience?.length ?? 0) > 0,
  (resume.projects?.length ?? 0) > 0,
  (resume.skills?.length ?? 0) > 0,
  (resume.certifications?.length ?? 0) > 0,
  (resume.languages?.length ?? 0) > 0,
  (resume.achievements?.length ?? 0) > 0,
  (resume.interests?.length ?? 0) > 0,
];

  const completed = checks.filter(Boolean).length;

  return {
    completed,
    total: checks.length,
    percentage: Math.round((completed / checks.length) * 100),
  };
}