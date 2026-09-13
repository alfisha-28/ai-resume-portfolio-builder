"use client";

import React from "react";
import Link from "next/link";
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
  Sparkles,
  ArrowRight,
  Code2,
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

export default function ModernPortfolio({
  portfolio,
  accentColor,
  sections,
  customData,
  onDownloadResume,
  onShare,
  isPreview = false,
}: TemplateProps) {
  const resume = portfolio.resume;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue;

  if (!resume) {
    return <div className="p-8 text-center text-gray-500">No resume data available.</div>;
  }

  const enabledSections = sections.filter((s) => s.enabled);
  const headline = customData.headline || resume.jobTitle || "Software Professional";
  const bio = customData.bio || resume.summary || "Passionate about building thoughtful digital experiences.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            {resume.fullName || "Portfolio"}
          </span>

          <div className="flex items-center gap-3">
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white rounded-lg shadow-2xs hover:shadow transition ${accent.bgClass}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Sections in configured order */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {enabledSections.map((sec) => {
          switch (sec.id) {
            case "hero":
              return (
                <section key="hero" className="py-12 md:py-16 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                    <Sparkles className={`w-3.5 h-3.5 ${accent.textClass}`} />
                    <span>Available for Opportunities</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
                    {resume.fullName || "Your Name"}
                  </h1>

                  <p className={`text-lg sm:text-xl font-bold ${accent.textClass} max-w-2xl mx-auto`}>
                    {headline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    {bio}
                  </p>

                  {/* Actions & Social Links */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href="#projects"
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-xs hover:shadow transition ${accent.bgClass}`}
                    >
                      <span>View Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    {onDownloadResume && (
                      <button
                        type="button"
                        onClick={onDownloadResume}
                        className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Resume</span>
                      </button>
                    )}

                    <a
                      href="#contact"
                      className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition"
                    >
                      Contact Me
                    </a>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center justify-center gap-4 pt-4 text-slate-500">
                    {resume.github && (
                      <a
                        href={resume.github.startsWith("http") ? resume.github : `https://${resume.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {resume.linkedin && (
                      <a
                        href={resume.linkedin.startsWith("http") ? resume.linkedin : `https://${resume.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {resume.email && (
                      <a
                        href={`mailto:${resume.email}`}
                        className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition"
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </section>
              );

            case "about":
              return (
                <section key="about" id="about" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">About Me</h2>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 md:p-8">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {customData.customAbout || resume.summary || bio}
                    </p>
                  </div>
                </section>
              );

            case "projects":
              if (!resume.projects || resume.projects.length === 0) return null;
              return (
                <section key="projects" id="projects" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                      <h2 className="text-xl font-bold text-slate-900">Featured Projects</h2>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {resume.projects.length} {resume.projects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resume.projects.map((p, idx) => {
                      const techTags = (p.technologies || "").split(/[,/]+/).map((t) => t.trim()).filter(Boolean);
                      return (
                        <div
                          key={p.id || idx}
                          className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                              <div className="flex items-center gap-2 shrink-0">
                                {p.githubUrl && (
                                  <a
                                    href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 text-slate-400 hover:text-slate-900 transition"
                                    title="View Source Code"
                                  >
                                    <Github className="w-4 h-4" />
                                  </a>
                                )}
                                {p.liveUrl && (
                                  <a
                                    href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 ${accent.textClass} hover:opacity-80 transition`}
                                    title="Open Live Application"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                              {p.description}
                            </p>
                          </div>

                          {techTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                              {techTags.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );

            case "experience":
              if (!resume.experience || resume.experience.length === 0) return null;
              return (
                <section key="experience" id="experience" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Work Experience</h2>
                  </div>

                  <div className="relative border-l-2 border-slate-200 ml-3 md:ml-4 space-y-8 pl-6">
                    {resume.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="relative space-y-2">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${accent.bgClass} shadow-2xs`}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h3>
                          <span className="text-xs text-slate-500 font-medium">
                            {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                          </span>
                        </div>

                        <p className={`text-xs font-semibold ${accent.textClass}`}>
                          {exp.company} {exp.location ? `• ${exp.location}` : ""}
                        </p>

                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "skills":
              if (!resume.skills || resume.skills.length === 0) return null;
              return (
                <section key="skills" id="skills" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Skills & Competencies</h2>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-wrap gap-2">
                    {resume.skills.map((s, idx) => (
                      <span
                        key={s.id || idx}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-800 transition"
                      >
                        {typeof s === "string" ? s : s.name}
                      </span>
                    ))}
                  </div>
                </section>
              );

            case "education":
              if (!resume.education || resume.education.length === 0) return null;
              return (
                <section key="education" id="education" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Education</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resume.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-1.5">
                        <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                        <p className="text-[11px] text-slate-400">
                          {edu.startYear} — {edu.endYear} {edu.cgpa ? `• GPA: ${edu.cgpa}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "certifications":
              if (!resume.certifications || resume.certifications.length === 0) return null;
              return (
                <section key="certifications" id="certifications" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Certifications</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resume.certifications.map((c, idx) => (
                      <div key={c.id || idx} className="bg-white rounded-2xl border border-slate-200/90 p-4 flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                          <p className="text-[11px] text-slate-500">{c.organization} {c.issueDate ? `• ${c.issueDate}` : ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "achievements":
              if (!resume.achievements || resume.achievements.length === 0) return null;
              return (
                <section key="achievements" id="achievements" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Achievements</h2>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3">
                    {resume.achievements.map((a, idx) => (
                      <div key={a.id || idx} className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">{a.title}</h4>
                        <p className="text-xs text-slate-600">{a.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "contact":
              return (
                <section key="contact" id="contact" className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accent.bgClass}`} />
                    <h2 className="text-xl font-bold text-slate-900">Get In Touch</h2>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8 space-y-4">
                    <p className="text-xs text-slate-600 max-w-lg">
                      Interested in discussing opportunities, collaboration, or have any inquiries? Feel free to reach out directly.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                      {resume.email && (
                        <a
                          href={`mailto:${resume.email}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 font-medium transition"
                        >
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span>{resume.email}</span>
                        </a>
                      )}
                      {resume.phone && (
                        <a
                          href={`tel:${resume.phone}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 font-medium transition"
                        >
                          <Phone className="w-4 h-4 text-slate-500" />
                          <span>{resume.phone}</span>
                        </a>
                      )}
                      {resume.location && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{resume.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 mt-20 text-center text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-800">
          Built with <span className={accent.textClass}>ResuMind</span> • Build Smarter. Get Hired.
        </p>
        <p className="text-slate-400 text-[11px]">
          © {new Date().getFullYear()} {resume.fullName || "Portfolio"}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
