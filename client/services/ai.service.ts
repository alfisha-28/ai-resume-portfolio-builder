import api from "@/lib/axios";
import type { ResumeData } from "@/types/resume";

export type SummaryMode =
  | "generate"
  | "improve"
  | "concise"
  | "professional"
  | "ats";

export type ExperienceMode =
  | "improve"
  | "generate"
  | "action_verbs"
  | "achievement_oriented"
  | "concise";

export type ProjectMode =
  | "generate"
  | "improve"
  | "bullets"
  | "concise"
  | "ats";

export interface GenerateSummaryPayload {
  fullName?: string;
  jobTitle?: string;
  skills?: { id: string; name: string }[] | string[];
  experience?: { jobTitle?: string; company?: string }[];
  currentSummary?: string;
  mode?: SummaryMode;
}

export interface EnhanceExperiencePayload {
  jobTitle?: string;
  company?: string;
  description?: string;
  mode?: ExperienceMode;
}

export interface EnhanceProjectPayload {
  title?: string;
  technologies?: string;
  description?: string;
  mode?: ProjectMode;
}

export interface SuggestSkillsPayload {
  jobTitle?: string;
  existingSkills?: { id: string; name: string }[] | string[];
  experience?: { jobTitle?: string; description?: string }[];
  projects?: { title?: string; technologies?: string }[];
}

export interface SectionAnalysis {
  score: number;
  status: "Excellent" | "Strong" | "Good" | "Needs Improvement" | "Needs Significant Improvement";
  issues: string[];
  suggestions: string[];
}

export interface ATSAnalysisResult {
  overallScore: number;
  atsReadiness: {
    score: number;
    status: "Excellent" | "Strong" | "Good" | "Needs Improvement" | "Needs Significant Improvement";
    summary: string;
  };
  sections: {
    personalInfo: SectionAnalysis;
    summary: SectionAnalysis;
    experience: SectionAnalysis;
    education: SectionAnalysis;
    projects: SectionAnalysis;
    skills: SectionAnalysis;
  };
  keywords: {
    found: string[];
    recommended: string[];
    missing: string[];
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  actionItems: {
    priority: "high" | "medium" | "low";
    section: "summary" | "experience" | "projects" | "skills" | "general";
    text: string;
  }[];
}

export const aiGenerateSummary = async (data: GenerateSummaryPayload): Promise<string> => {
  const res = await api.post("/ai/summary", data);
  return res.data.data.summary as string;
};

export const aiEnhanceExperience = async (data: EnhanceExperiencePayload): Promise<string> => {
  const res = await api.post("/ai/experience", data);
  return res.data.data.description as string;
};

export const aiGenerateProjectDescription = async (data: EnhanceProjectPayload): Promise<string> => {
  const res = await api.post("/ai/project", data);
  return res.data.data.description as string;
};

export const aiSuggestSkills = async (data: SuggestSkillsPayload): Promise<string[]> => {
  const res = await api.post("/ai/skills", data);
  return (res.data.data.skills as string[]) ?? [];
};

export const aiAnalyzeResume = async (data: {
  resumeId?: string;
  resume?: Partial<ResumeData>;
}): Promise<ATSAnalysisResult> => {
  const res = await api.post("/ai/analyze", data);
  return res.data.data as ATSAnalysisResult;
};

export interface MatchRecommendation {
  priority: "high" | "medium" | "low";
  type: "summary" | "experience" | "skills" | "projects" | "keyword" | "general";
  title: string;
  description: string;
  actionLabel?: string;
}

export interface SectionMatchDetail {
  score: number;
  strengths: string[];
  gaps: string[];
}

export interface JobMatchResult {
  matchScore: number;
  matchTier: "Excellent Match" | "Strong Match" | "Good Match" | "Moderate Match" | "Low Match";
  jobTitle: string;
  summary: string;
  matchingSkills: string[];
  missingSkills: string[];
  matchingKeywords: string[];
  missingKeywords: string[];
  experienceMatch: SectionMatchDetail;
  projectMatch: SectionMatchDetail;
  skillsMatch: SectionMatchDetail;
  educationMatch: {
    score: number;
    compatibility: string;
  };
  strengths: string[];
  gaps: string[];
  recommendations: MatchRecommendation[];
}

export const aiMatchResumeToJob = async (data: {
  resumeId?: string;
  resume?: Partial<ResumeData>;
  jobDescription: string;
}): Promise<JobMatchResult> => {
  const res = await api.post("/ai/match", data);
  return res.data.data as JobMatchResult;
};

// ==========================================
// Phase 4 — AI Resume Tailoring
// ==========================================

export interface TailorSummary {
  suggestion: string;
  before: string;
  after: string;
  reason: string;
}

export interface TailorExperienceSuggestion {
  experienceId: string;
  bulletIndex: number;
  before: string;
  after: string;
  reason: string;
  matchedKeywords: string[];
  type: "rewrite";
}

export interface TailorProjectSuggestion {
  projectId: string;
  field: "description";
  before: string;
  after: string;
  reason: string;
  matchedKeywords: string[];
}

export interface TailorSkillsSuggestion {
  keep: string[];
  emphasize: string[];
  missing: string[];
  reason: string;
}

export interface TailorKeywordAnalysis {
  matched: string[];
  missing: string[];
  highPriority: string[];
}

export interface TailorRecommendation {
  priority: "high" | "medium" | "low";
  section: string;
  title: string;
  description: string;
  action: string;
}

export interface ResumeTailorResult {
  scoreBefore: number;
  estimatedScoreAfter: number;
  summary: TailorSummary;
  experience: TailorExperienceSuggestion[];
  projects: TailorProjectSuggestion[];
  skills: TailorSkillsSuggestion;
  keywords: TailorKeywordAnalysis;
  recommendations: TailorRecommendation[];
}

export const aiTailorResumeToJob = async (data: {
  resumeId?: string;
  resume?: Partial<ResumeData>;
  jobDescription: string;
}): Promise<ResumeTailorResult> => {
  const res = await api.post("/ai/tailor", data);
  return res.data.data as ResumeTailorResult;
};

// ==========================================
// Phase 5 — AI Portfolio About Improvement
// ==========================================

export interface ImprovePortfolioAboutPayload {
  fullName?: string;
  jobTitle?: string;
  currentAbout: string;
  skills?: string[] | { id: string; name: string }[];
  experience?: { jobTitle?: string; company?: string }[];
  mode?: "professional" | "concise" | "story" | "technical";
}

export const aiImprovePortfolioAbout = async (
  data: ImprovePortfolioAboutPayload
): Promise<string> => {
  const res = await api.post("/ai/improve-about", data);
  return (res.data.data.about || res.data.data.text) as string;
};
