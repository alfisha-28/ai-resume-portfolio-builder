import api from "@/lib/axios";
import type { Portfolio } from "@/types/portfolio";

export const getPortfolio = async (username: string): Promise<Portfolio> => {
  const response = await api.get<{ success: boolean; data: Portfolio }>(
    `/portfolios/${username}`
  );
  return response.data.data;
};

export const createPortfolio = async (data: {
  resumeId: string;
  username: string;
  themeId: string;
}): Promise<Portfolio> => {
  const response = await api.post<{ success: boolean; data: Portfolio }>(
    "/portfolios",
    data
  );
  return response.data.data;
};

export const updatePortfolio = async (
  id: string,
  data: Partial<Pick<Portfolio, "themeId" | "published">>
): Promise<Portfolio> => {
  const response = await api.put<{ success: boolean; data: Portfolio }>(
    `/portfolios/${id}`,
    data
  );
  return response.data.data;
};
