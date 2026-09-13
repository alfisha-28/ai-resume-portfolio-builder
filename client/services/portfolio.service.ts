import api from "@/lib/axios";
import type {
  Portfolio,
  PortfolioTemplate,
  PortfolioAccent,
  PortfolioSectionConfig,
  PortfolioCustomData,
} from "@/types/portfolio";

export interface CreatePortfolioPayload {
  resumeId: string;
  username: string;
  template?: PortfolioTemplate;
  accentColor?: PortfolioAccent;
  sections?: PortfolioSectionConfig[];
  customData?: PortfolioCustomData;
}

export interface UpdatePortfolioPayload {
  resumeId?: string;
  username?: string;
  template?: PortfolioTemplate;
  accentColor?: PortfolioAccent;
  sections?: PortfolioSectionConfig[];
  customData?: PortfolioCustomData;
  published?: boolean;
}

// Fetch authenticated user's active portfolio
export const getUserPortfolio = async (): Promise<Portfolio | null> => {
  const response = await api.get<{ success: boolean; data: Portfolio | null }>(
    "/portfolio"
  );
  return response.data.data;
};

// Fetch public portfolio for /portfolio/[username] (no auth required)
export const getPublicPortfolio = async (username: string): Promise<Portfolio> => {
  const clean = encodeURIComponent(username.trim().toLowerCase());
  const response = await api.get<{ success: boolean; data: Portfolio }>(
    `/portfolio/public/${clean}`
  );
  return response.data.data;
};

// Create a new portfolio linked to a resume
export const createPortfolio = async (
  data: CreatePortfolioPayload
): Promise<Portfolio> => {
  const response = await api.post<{ success: boolean; data: Portfolio }>(
    "/portfolio",
    data
  );
  return response.data.data;
};

// Update an existing portfolio
export const updatePortfolio = async (
  id: string,
  data: UpdatePortfolioPayload
): Promise<Portfolio> => {
  const response = await api.patch<{ success: boolean; data: Portfolio }>(
    `/portfolio/${id}`,
    data
  );
  return response.data.data;
};

// Publish portfolio
export const publishPortfolio = async (id: string): Promise<Portfolio> => {
  const response = await api.post<{ success: boolean; data: Portfolio }>(
    `/portfolio/${id}/publish`
  );
  return response.data.data;
};

// Unpublish portfolio
export const unpublishPortfolio = async (id: string): Promise<Portfolio> => {
  const response = await api.post<{ success: boolean; data: Portfolio }>(
    `/portfolio/${id}/unpublish`
  );
  return response.data.data;
};

// Delete portfolio
export const deletePortfolio = async (id: string): Promise<void> => {
  await api.delete(`/portfolio/${id}`);
};
