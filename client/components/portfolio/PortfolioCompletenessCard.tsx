"use client";

import React from "react";
import { CheckCircle2, Circle, Sparkles, TrendingUp } from "lucide-react";
import type { Portfolio } from "@/types/portfolio";

interface PortfolioCompletenessCardProps {
  portfolio: Portfolio;
}

export function calculatePortfolioCompleteness(portfolio: Portfolio): {
  percentage: number;
  checks: { label: string; done: boolean; weight: number }[];
} {
  const resume = portfolio.resume;
  if (!resume) {
    return { percentage: 0, checks: [] };
  }

  const custom = portfolio.customData || {};
  const hasHero = Boolean(resume.fullName?.trim() && (custom.headline || resume.jobTitle)?.trim());
  const hasAbout = Boolean((custom.customAbout || custom.bio || resume.summary)?.trim());
  const hasExperience = Boolean(resume.experience && resume.experience.length > 0);
  const hasProjects = Boolean(resume.projects && resume.projects.length > 0);
  const hasSkills = Boolean(resume.skills && resume.skills.length > 0);
  const hasContact = Boolean(resume.email?.trim() || resume.linkedin?.trim() || resume.github?.trim());

  const checks = [
    { label: "Hero Profile (Name & Headline)", done: hasHero, weight: 20 },
    { label: "About Summary / Bio", done: hasAbout, weight: 20 },
    { label: "Work Experience", done: hasExperience, weight: 20 },
    { label: "Featured Projects", done: hasProjects, weight: 20 },
    { label: "Skills & Tools", done: hasSkills, weight: 10 },
    { label: "Contact Information & Socials", done: hasContact, weight: 10 },
  ];

  const totalScore = checks.reduce((acc, c) => acc + (c.done ? c.weight : 0), 0);

  return {
    percentage: Math.min(100, Math.max(0, totalScore)),
    checks,
  };
}

export default function PortfolioCompletenessCard({ portfolio }: PortfolioCompletenessCardProps) {
  const { percentage, checks } = calculatePortfolioCompleteness(portfolio);

  const getProgressColor = (pct: number) => {
    if (pct >= 85) return "text-emerald-600 bg-emerald-500";
    if (pct >= 65) return "text-indigo-600 bg-indigo-500";
    return "text-amber-600 bg-amber-500";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Portfolio Completeness</h3>
        </div>
        <span className="text-base font-black text-slate-900">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${getProgressColor(percentage).split(" ")[1]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {checks.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            {item.done ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
            <span className={item.done ? "text-slate-700 font-medium" : "text-slate-400"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
