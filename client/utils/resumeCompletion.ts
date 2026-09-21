import { ResumeData } from "@/types/resume";

export function isEducationFilled(resume: ResumeData): boolean {
  return (
    (resume.education?.length ?? 0) > 0 &&
    resume.education.some(
      (edu) => Boolean(edu.degree?.trim() && edu.institution?.trim())
    )
  );
}

export function isExperienceFilled(resume: ResumeData): boolean {
  return (
    (resume.experience?.length ?? 0) > 0 &&
    resume.experience.some(
      (exp) => Boolean(exp.company?.trim() && exp.jobTitle?.trim())
    )
  );
}

export function isProjectsFilled(resume: ResumeData): boolean {
  return (
    (resume.projects?.length ?? 0) > 0 &&
    resume.projects.some((proj) => Boolean(proj.title?.trim()))
  );
}

export function isSkillsFilled(resume: ResumeData): boolean {
  return (
    (resume.skills?.length ?? 0) > 0 &&
    resume.skills.some((s) => Boolean(s.name?.trim()))
  );
}

export function isCertificationsFilled(resume: ResumeData): boolean {
  return (
    (resume.certifications?.length ?? 0) > 0 &&
    resume.certifications.some((c) => Boolean(c.name?.trim()))
  );
}

export function isLanguagesFilled(resume: ResumeData): boolean {
  return (
    (resume.languages?.length ?? 0) > 0 &&
    resume.languages.some((l) => Boolean(l.name?.trim()))
  );
}

export function isAchievementsFilled(resume: ResumeData): boolean {
  return (
    (resume.achievements?.length ?? 0) > 0 &&
    resume.achievements.some(
      (a) => Boolean(a.title?.trim() || a.description?.trim())
    )
  );
}

export function isInterestsFilled(resume: ResumeData): boolean {
  return (
    (resume.interests?.length ?? 0) > 0 &&
    resume.interests.some((i) => Boolean(i.name?.trim()))
  );
}

export function calculateResumeCompletion(resume: ResumeData) {
  const checks = [
    Boolean(resume.fullName?.trim()),
    Boolean(resume.jobTitle?.trim()),
    Boolean(resume.email?.trim()),
    Boolean(resume.phone?.trim()),
    Boolean(resume.summary?.trim()),
    isEducationFilled(resume),
    isExperienceFilled(resume),
    isProjectsFilled(resume),
    isSkillsFilled(resume),
    isCertificationsFilled(resume),
    isLanguagesFilled(resume),
    isAchievementsFilled(resume),
    isInterestsFilled(resume),
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
    {
      id: "personal",
      name: "Personal Info",
      filled: Boolean(resume.fullName?.trim() && resume.email?.trim()),
      required: true,
    },
    {
      id: "summary",
      name: "Professional Summary",
      filled: Boolean(resume.summary?.trim()),
      required: true,
    },
    {
      id: "experience",
      name: "Work Experience",
      filled: isExperienceFilled(resume),
      required: true,
    },
    {
      id: "projects",
      name: "Projects",
      filled: isProjectsFilled(resume),
      required: true,
    },
    {
      id: "skills",
      name: "Skills",
      filled: isSkillsFilled(resume),
      required: true,
    },
    {
      id: "education",
      name: "Education",
      filled: isEducationFilled(resume),
      required: true,
    },
    {
      id: "certifications",
      name: "Certifications",
      filled: isCertificationsFilled(resume),
      required: false,
    },
    {
      id: "languages",
      name: "Languages",
      filled: isLanguagesFilled(resume),
      required: false,
    },
    {
      id: "achievements",
      name: "Achievements",
      filled: isAchievementsFilled(resume),
      required: false,
    },
    {
      id: "interests",
      name: "Interests",
      filled: isInterestsFilled(resume),
      required: false,
    },
  ];
}