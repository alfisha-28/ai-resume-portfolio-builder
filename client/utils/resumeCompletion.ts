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

export function getResumeSectionChecklist(resume: ResumeData) {
  return [
    { id: "personal", name: "Personal Info", filled: !!(resume.fullName && resume.email), required: true },
    { id: "summary", name: "Professional Summary", filled: !!resume.summary?.trim(), required: true },
    { id: "experience", name: "Work Experience", filled: (resume.experience?.length ?? 0) > 0, required: true },
    { id: "projects", name: "Projects", filled: (resume.projects?.length ?? 0) > 0, required: true },
    { id: "skills", name: "Skills", filled: (resume.skills?.length ?? 0) > 0, required: true },
    { id: "education", name: "Education", filled: (resume.education?.length ?? 0) > 0, required: true },
    { id: "certifications", name: "Certifications", filled: (resume.certifications?.length ?? 0) > 0, required: false },
    { id: "languages", name: "Languages", filled: (resume.languages?.length ?? 0) > 0, required: false },
    { id: "achievements", name: "Achievements", filled: (resume.achievements?.length ?? 0) > 0, required: false },
    { id: "interests", name: "Interests", filled: (resume.interests?.length ?? 0) > 0, required: false },
  ];
}