import api from "@/lib/axios";
import type { Resume } from "@/types/resume";

export const getDashboardResumes = async (): Promise<Resume[]> => {
  const response = await api.get("/resumes");

  return response.data.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(`/resumes/${id}`);

  return response.data;
};

export const createResume = async () => {
  const response = await api.post("/resumes", {
    title: "Untitled Resume",
  });

  return response.data.data;
};