import api from "@/lib/axios";
import type { Resume, ResumeData } from "@/types/resume";

function parseArrayField<T>(field: unknown): T[] {
  if (Array.isArray(field)) return field as T[];
  if (typeof field === "string" && field.trim()) {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed as T[];
    } catch {
      return [];
    }
  }
  return [];
}

// ─── Normalizer ────────────────────────────────────────────────────────────
// Converts null DB values to safe defaults so controlled inputs never receive null
export function normalizeResume(raw: Record<string, unknown>): Resume {
  return {
    id: (raw.id as string) ?? "",
    title: (raw.title as string) ?? "",
    fullName: (raw.fullName as string) ?? "",
    jobTitle: (raw.jobTitle as string) ?? "",
    email: (raw.email as string) ?? "",
    phone: (raw.phone as string) ?? "",
    location: (raw.location as string) ?? "",
    linkedin: (raw.linkedin as string) ?? "",
    github: (raw.github as string) ?? "",
    portfolio: (raw.portfolio as string) ?? "",
    summary: (raw.summary as string) ?? "",
    template: ((raw.template as string) ?? "classic") as Resume["template"],
    education: parseArrayField(raw.education),
    experience: parseArrayField(raw.experience),
    projects: parseArrayField(raw.projects),
    skills: parseArrayField(raw.skills),
    certifications: parseArrayField(raw.certifications),
    languages: parseArrayField(raw.languages),
    achievements: parseArrayField(raw.achievements),
    interests: parseArrayField(raw.interests),
    createdAt: (raw.createdAt as string) ?? "",
    updatedAt: (raw.updatedAt as string) ?? "",
  };
}

// ─── API calls ─────────────────────────────────────────────────────────────

export const getResumes = async (): Promise<Resume[]> => {
  const response = await api.get("/resumes");
  const raw: Record<string, unknown>[] = response.data.data ?? [];
  return raw.map(normalizeResume);
};

export const getResumeById = async (id: string): Promise<Resume> => {
  const response = await api.get(`/resumes/${id}`);
  return normalizeResume(response.data.data);
};

export const createResume = async (data: Partial<ResumeData>): Promise<Resume> => {
  const response = await api.post("/resumes", data);
  return normalizeResume(response.data.data);
};

export const updateResume = async (
  id: string,
  data: Partial<ResumeData>
): Promise<Resume> => {
  const response = await api.put(`/resumes/${id}`, data);
  return normalizeResume(response.data.data);
};

export const deleteResume = async (id: string): Promise<void> => {
  await api.delete(`/resumes/${id}`);
};

export const duplicateResume = async (id: string): Promise<Resume> => {
  const response = await api.post(`/resumes/${id}/duplicate`);
  return normalizeResume(response.data.data);
};

// Auto-save alias
export const saveResume = (id: string, data: Partial<ResumeData>) =>
  updateResume(id, data);

// Create empty resume with safe defaults
export const createEmptyResume = (): Promise<Resume> =>
  createResume({ title: "Untitled Resume" });
