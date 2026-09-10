import api from "@/lib/axios";
<<<<<<< HEAD
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
=======

export interface AIGenerateSummaryParams {
  fullName: string;
  jobTitle: string;
  experience: { jobTitle: string; company: string; description: string }[];
  skills: { name: string }[];
}

export interface AIImproveTextParams {
  text: string;
  context?: string;
}

export interface AIReviewResult {
  score: number;
  suggestions: string[];
}

// ─── Summary ──────────────────────────────────────────────────────────────
export async function generateSummary(params: AIGenerateSummaryParams): Promise<string> {
  const response = await api.post<{ success: boolean; data: { text: string } }>(
    "/ai/summary",
    params
  );
  return response.data.data.text;
}

// ─── Experience ───────────────────────────────────────────────────────────
export async function improveExperience(params: AIImproveTextParams): Promise<string> {
  const response = await api.post<{ success: boolean; data: { text: string } }>(
    "/ai/improve-experience",
    params
  );
  return response.data.data.text;
}

// ─── Project description ──────────────────────────────────────────────────
export async function improveProject(params: AIImproveTextParams): Promise<string> {
  const response = await api.post<{ success: boolean; data: { text: string } }>(
    "/ai/improve-project",
    params
  );
  return response.data.data.text;
}

// ─── Resume review ────────────────────────────────────────────────────────
export async function reviewResume(resumeId: string): Promise<AIReviewResult> {
  const response = await api.post<{ success: boolean; data: AIReviewResult }>(
    `/ai/review/${resumeId}`
  );
  return response.data.data;
}

// ─── ATS score ────────────────────────────────────────────────────────────
export async function calculateATSScore(resumeId: string): Promise<number> {
  const response = await api.post<{ success: boolean; data: { score: number } }>(
    `/ai/ats-score/${resumeId}`
  );
  return response.data.data.score;
}
>>>>>>> origin/main
