import type { Resume } from "./resume";

export interface PortfolioTheme {
  id: string;
  name: string;
  primaryColor: string;
  font: string;
}

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  { id: "default", name: "Default", primaryColor: "#2563eb", font: "Inter" },
  { id: "dark", name: "Dark", primaryColor: "#7c3aed", font: "Inter" },
  { id: "minimal", name: "Minimal", primaryColor: "#111827", font: "Georgia" },
];

export interface Portfolio {
  id: string;
  userId: string;
  resumeId: string;
  username: string;
  themeId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  // Derived from the linked Resume at render time
  resume?: Resume;
}
