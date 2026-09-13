"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Share2,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Github, Linkedin } from "../SocialIcons";
import type { Portfolio, PortfolioAccent, PortfolioSectionConfig, PortfolioCustomData } from "@/types/portfolio";
import { ACCENT_COLORS } from "@/types/portfolio";

interface TemplateProps {
  portfolio: Portfolio;
  accentColor: PortfolioAccent;
  sections: PortfolioSectionConfig[];
  customData: PortfolioCustomData;
  onDownloadResume?: () => void;
  onShare?: () => void;
  isPreview?: boolean;
}

export default function ProfessionalPortfolio({
  portfolio,
  accentColor,
  sections,
  customData,
  onDownloadResume,
  onShare,
}: TemplateProps) {
  const resume = portfolio.resume;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.purple;

  if (!resume) {
    return <div className="p-8 text-center text-gray-500">No resume data available.</div>;
  }

  const enabledSections = sections.filter((s) => s.enabled);
  const headline = customData.headline || resume.jobTitle || "Executive / Professional";
  const bio = customData.customAbout || customData.bio || resume.summary || "";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* Top Banner Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
              Executive Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {resume.fullName}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-slate-300">
              {headline}
            </p>
            {resume.location && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{resume.location}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            )}
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {enabledSections.map((sec) => {
          switch (sec.id) {
            case "about":
              if (!bio) return null;
              return (
                <section key="about" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-3">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>Executive Summary</span>
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {bio}
                  </p>
                </section>
              );

            case "experience":
              if (!resume.experience || resume.experience.length === 0) return null;
              return (
                <section key="experience" id="experience" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>Career Experience</span>
                  </h2>

                  <div className="space-y-6">
                    {resume.experience.map((e, idx) => (
                      <div key={e.id || idx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0 space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">{e.jobTitle}</h3>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                            {e.startDate} — {e.currentlyWorking ? "Present" : e.endDate}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-indigo-700">{e.company}</p>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap pt-1">
                          {e.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "projects":
              if (!resume.projects || resume.projects.length === 0) return null;
              return (
                <section key="projects" id="projects" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Key Projects & Technical Initiatives</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resume.projects.map((p, idx) => (
                      <div key={p.id || idx} className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                          <div className="flex items-center gap-2">
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Code</span>
                              </a>
                            )}
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {p.description}
                        </p>

                        {p.technologies && (
                          <p className="text-[11px] font-semibold text-slate-500 border-t border-slate-200/60 pt-2">
                            Stack: {p.technologies}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "skills":
              if (!resume.skills || resume.skills.length === 0) return null;
              return (
                <section key="skills" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                    Core Competencies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((s, idx) => (
                      <span key={s.id || idx} className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-800 rounded-lg">
                        {typeof s === "string" ? s : s.name}
                      </span>
                    ))}
                  </div>
                </section>
              );

            case "education":
              if (!resume.education || resume.education.length === 0) return null;
              return (
                <section key="education" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>Education & Academic Credentials</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resume.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="p-4 rounded-xl border border-slate-200 space-y-1">
                        <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-xs text-slate-600">{edu.institution}</p>
                        <p className="text-[11px] text-slate-400">{edu.startYear} — {edu.endYear} {edu.cgpa ? `• GPA ${edu.cgpa}` : ""}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "contact":
              return (
                <section key="contact" id="contact" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                    Direct Contact
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
                    {resume.email && (
                      <a href={`mailto:${resume.email}`} className="hover:underline flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{resume.email}</span>
                      </a>
                    )}
                    {resume.phone && (
                      <a href={`tel:${resume.phone}`} className="hover:underline flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{resume.phone}</span>
                      </a>
                    )}
                    {resume.linkedin && (
                      <a href={resume.linkedin.startsWith("http") ? resume.linkedin : `https://${resume.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                        <Linkedin className="w-4 h-4 text-slate-400" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        Executive Portfolio powered by ResuMind • Build Smarter. Get Hired.
      </footer>
    </div>
  );
}
