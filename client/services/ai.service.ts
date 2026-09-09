import api from "@/lib/axios";

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
