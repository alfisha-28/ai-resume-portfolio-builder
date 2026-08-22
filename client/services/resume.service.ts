import api from "@/lib/axios";
import { ResumeData } from "@/types/resume";
import { Resume } from "@/types/resume";

export const getResumes = async () => {
  const response = await api.get("/resumes");
  return response.data;
};

export const getResumeById = async (
  id: string
): Promise<{ data: Resume }> => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (data: unknown) => {
  const response = await api.post("/resumes", data);
  return response.data;
};

export const updateResume = async (
  id: string,
  data: ResumeData
) => {
  const response = await api.patch(
    `/resumes/${id}`,
    data
  );

  return response.data.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(`/resumes/${id}`);
  return response.data;
};

// Auto Save Helper
export const saveResume = async (id: string, data: ResumeData) => {
  return updateResume(id, data);
};

export const createEmptyResume = async () => {
  return createResume({
    title: "Untitled Resume",
  });
};

