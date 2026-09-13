import type { Resume } from "./resume";

export type PortfolioTemplate = "modern" | "minimal" | "professional" | "creative";

export type PortfolioAccent = "blue" | "purple" | "green" | "orange" | "monochrome";

export type PortfolioSectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "achievements"
  | "contact";

export interface PortfolioSectionConfig {
  id: PortfolioSectionId;
  label: string;
  enabled: boolean;
}

export interface PortfolioCustomData {
  headline?: string;
  bio?: string;
  customAbout?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  showLocation?: boolean;
  featuredProjectIds?: string[];
  customLinks?: { label: string; url: string }[];
}

export interface Portfolio {
  id: string;
  userId: string;
  resumeId: string;
  username: string;
  themeId: string;
  template: PortfolioTemplate;
  accentColor: PortfolioAccent;
  sections: PortfolioSectionConfig[];
  customData: PortfolioCustomData;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  resume?: Resume;
}

export interface PortfolioTemplateInfo {
  id: PortfolioTemplate;
  name: string;
  description: string;
  category: string;
  accentPreset: PortfolioAccent;
  features: string[];
}

export const PORTFOLIO_TEMPLATES: PortfolioTemplateInfo[] = [
  {
    id: "modern",
    name: "Modern Tech",
    description: "Sleek developer portfolio with modern card architecture, gradient badges, and interactive project showcases.",
    category: "Full Stack & Frontend",
    accentPreset: "blue",
    features: ["Interactive project cards", "Skill category chips", "Experience timeline", "Responsive hero"],
  },
  {
    id: "minimal",
    name: "Minimalist Developer",
    description: "High-whitespace, typography-forward design inspired by clean open-source documentation and developer personal sites.",
    category: "Software Engineers",
    accentPreset: "monochrome",
    features: ["Distraction-free typography", "Fast lightweight layout", "Subtle border styling", "Clean social links"],
  },
  {
    id: "professional",
    name: "Executive & Corporate",
    description: "Structured, high-contrast executive presentation tailored for senior engineers, tech leads, and technical managers.",
    category: "Leadership & Senior Roles",
    accentPreset: "purple",
    features: ["Dual-column layout", "Structured credential badges", "Metric-highlighted experience", "Formal contact card"],
  },
  {
    id: "creative",
    name: "Creative & Product",
    description: "Expressive, dynamic portfolio with bold typography and prominent visual cards for product builders and UI specialists.",
    category: "Product & Design Engineers",
    accentPreset: "orange",
    features: ["Bold hero banner", "Visual tag badges", "Accent borders", "High-energy CTA buttons"],
  },
];

export const ACCENT_COLORS: Record<PortfolioAccent, { name: string; hex: string; bgClass: string; textClass: string; borderClass: string }> = {
  blue: {
    name: "Tech Blue",
    hex: "#2563eb",
    bgClass: "bg-blue-600",
    textClass: "text-blue-600",
    borderClass: "border-blue-600",
  },
  purple: {
    name: "Royal Purple",
    hex: "#7c3aed",
    bgClass: "bg-purple-600",
    textClass: "text-purple-600",
    borderClass: "border-purple-600",
  },
  green: {
    name: "Emerald Green",
    hex: "#059669",
    bgClass: "bg-emerald-600",
    textClass: "text-emerald-600",
    borderClass: "border-emerald-600",
  },
  orange: {
    name: "Amber Sunset",
    hex: "#ea580c",
    bgClass: "bg-orange-600",
    textClass: "text-orange-600",
    borderClass: "border-orange-600",
  },
  monochrome: {
    name: "Monochrome Slate",
    hex: "#0f172a",
    bgClass: "bg-slate-900",
    textClass: "text-slate-900",
    borderClass: "border-slate-900",
  },
};

export const DEFAULT_PORTFOLIO_SECTIONS: PortfolioSectionConfig[] = [
  { id: "hero", label: "Hero Banner", enabled: true },
  { id: "about", label: "About Me", enabled: true },
  { id: "experience", label: "Work Experience", enabled: true },
  { id: "projects", label: "Featured Projects", enabled: true },
  { id: "skills", label: "Technical Skills", enabled: true },
  { id: "education", label: "Education", enabled: true },
  { id: "certifications", label: "Certifications", enabled: true },
  { id: "achievements", label: "Achievements", enabled: true },
  { id: "contact", label: "Contact & Socials", enabled: true },
];
