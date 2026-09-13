"use client";

import React from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  Download,
  Share2,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
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

export default function CreativePortfolio({
  portfolio,
  accentColor,
  sections,
  customData,
  onDownloadResume,
  onShare,
}: TemplateProps) {
  const resume = portfolio.resume;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;

  if (!resume) {
    return <div className="p-8 text-center text-gray-500">No resume data available.</div>;
  }

  const enabledSections = sections.filter((s) => s.enabled);
  const headline = customData.headline || resume.jobTitle || "Creative Builder & Engineer";
  const bio = customData.customAbout || customData.bio || resume.summary || "";

  return (
    <div className="min-h-screen bg-amber-50/20 text-stone-900 font-sans selection:bg-orange-200">
      {/* Dynamic Header */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="font-black text-sm tracking-tight">{resume.fullName}</span>
          </div>

          <div className="flex items-center gap-3">
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
                title="Share portfolio"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white bg-stone-900 hover:bg-black rounded-xl shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Flow */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {enabledSections.map((sec) => {
          switch (sec.id) {
            case "hero":
              return (
                <section key="hero" className="py-8 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-orange-900 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
                    <span>Product & Creative Engineering</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-tight">
                    {headline}
                  </h1>

                  {bio && (
                    <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed whitespace-pre-wrap">
                      {bio}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href="#projects"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition"
                    >
                      <span>Explore Work</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <div className="flex items-center gap-2 pl-2">
                      {resume.github && (
                        <a
                          href={resume.github.startsWith("http") ? resume.github : `https://${resume.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {resume.linkedin && (
                        <a
                          href={resume.linkedin.startsWith("http") ? resume.linkedin : `https://${resume.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {resume.email && (
                        <a
                          href={`mailto:${resume.email}`}
                          className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              );

            case "projects":
              if (!resume.projects || resume.projects.length === 0) return null;
              return (
                <section key="projects" id="projects" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-600" />
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Featured Projects</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resume.projects.map((p, idx) => (
                      <div
                        key={p.id || idx}
                        className="bg-white rounded-3xl border-2 border-stone-200 hover:border-orange-500 p-6 md:p-8 flex flex-col justify-between space-y-4 shadow-2xs transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-stone-900">{p.title}</h3>
                            <div className="flex items-center gap-2">
                              {p.githubUrl && (
                                <a
                                  href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 transition"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                              {p.liveUrl && (
                                <a
                                  href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-600 transition"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">
                            {p.description}
                          </p>
                        </div>

                        {p.technologies && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100">
                            {p.technologies.split(/[,/]+/).map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800"
                              >
                                {t.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "experience":
              if (!resume.experience || resume.experience.length === 0) return null;
              return (
                <section key="experience" id="experience" className="space-y-6">
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">Experience & Journey</h2>
                  <div className="space-y-6">
                    {resume.experience.map((e, idx) => (
                      <div key={e.id || idx} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                          <h3 className="text-base font-bold text-stone-900">{e.jobTitle}</h3>
                          <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                            {e.startDate} — {e.currentlyWorking ? "Present" : e.endDate}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-stone-500">{e.company}</p>
                        <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap pt-1">
                          {e.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "skills":
              if (!resume.skills || resume.skills.length === 0) return null;
              return (
                <section key="skills" className="space-y-4">
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">Skills & Tools</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((s, idx) => (
                      <span
                        key={s.id || idx}
                        className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-800 shadow-2xs hover:border-orange-400 transition"
                      >
                        {typeof s === "string" ? s : s.name}
                      </span>
                    ))}
                  </div>
                </section>
              );

            case "contact":
              return (
                <section key="contact" id="contact" className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 space-y-4">
                  <h2 className="text-2xl font-black">Let's build something remarkable.</h2>
                  <p className="text-xs text-stone-300 max-w-md">
                    Open for interesting discussions, engineering consulting, and innovative roles.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                    {resume.email && (
                      <a
                        href={`mailto:${resume.email}`}
                        className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition"
                      >
                        {resume.email}
                      </a>
                    )}
                    {resume.phone && (
                      <a href={`tel:${resume.phone}`} className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white transition">
                        {resume.phone}
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
      <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-400">
        Crafted with ResuMind • Build Smarter. Get Hired.
      </footer>
    </div>
  );
}
