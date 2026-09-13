"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Share2,
  ArrowUpRight,
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

export default function MinimalPortfolio({
  portfolio,
  accentColor,
  sections,
  customData,
  onDownloadResume,
  onShare,
}: TemplateProps) {
  const resume = portfolio.resume;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.monochrome;

  if (!resume) {
    return <div className="p-8 text-center text-gray-500">No resume data available.</div>;
  }

  const enabledSections = sections.filter((s) => s.enabled);
  const headline = customData.headline || resume.jobTitle || "Developer";
  const bio = customData.customAbout || customData.bio || resume.summary || "";

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-mono selection:bg-zinc-200">
      {/* Top minimal bar */}
      <header className="border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between text-xs">
          <span className="font-bold tracking-tight uppercase">{resume.fullName || "Portfolio"}</span>

          <div className="flex items-center gap-4">
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="hover:underline flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>share</span>
              </button>
            )}
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="hover:underline flex items-center gap-1 font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>[resume.pdf]</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main minimal stream */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {enabledSections.map((sec) => {
          switch (sec.id) {
            case "hero":
              return (
                <section key="hero" className="space-y-4 pb-4">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                    {resume.fullName}
                  </h1>
                  <p className="text-sm text-zinc-600 font-semibold uppercase tracking-wider">
                    {headline} {resume.location ? `// ${resume.location}` : ""}
                  </p>
                  {bio && (
                    <p className="text-xs text-zinc-700 font-sans leading-relaxed max-w-2xl whitespace-pre-wrap">
                      {bio}
                    </p>
                  )}

                  {/* Social links */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                    {resume.github && (
                      <a
                        href={resume.github.startsWith("http") ? resume.github : `https://${resume.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1 text-zinc-800"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>github</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {resume.linkedin && (
                      <a
                        href={resume.linkedin.startsWith("http") ? resume.linkedin : `https://${resume.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1 text-zinc-800"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>linkedin</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {resume.email && (
                      <a
                        href={`mailto:${resume.email}`}
                        className="hover:underline flex items-center gap-1 text-zinc-800"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>email</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </section>
              );

            case "about":
              if (!bio) return null;
              return (
                <section key="about" className="space-y-2 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">01 // About</h2>
                  <p className="text-xs text-zinc-800 font-sans leading-relaxed whitespace-pre-wrap">
                    {bio}
                  </p>
                </section>
              );

            case "projects":
              if (!resume.projects || resume.projects.length === 0) return null;
              return (
                <section key="projects" id="projects" className="space-y-6 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">02 // Selected Work</h2>
                  <div className="space-y-6">
                    {resume.projects.map((p, idx) => (
                      <div key={p.id || idx} className="space-y-1.5 border-b border-zinc-100 pb-5">
                        <div className="flex items-center justify-between text-xs">
                          <h3 className="font-bold text-zinc-900">{p.title}</h3>
                          <div className="flex items-center gap-3 text-zinc-500">
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-0.5"
                              >
                                <span>code</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-0.5 font-bold text-zinc-900"
                              >
                                <span>live</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                          {p.description}
                        </p>

                        {p.technologies && (
                          <p className="text-[11px] text-zinc-400">
                            tech: {p.technologies}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "experience":
              if (!resume.experience || resume.experience.length === 0) return null;
              return (
                <section key="experience" id="experience" className="space-y-6 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">03 // Experience</h2>
                  <div className="space-y-6">
                    {resume.experience.map((e, idx) => (
                      <div key={e.id || idx} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                          <h3 className="font-bold text-zinc-900">
                            {e.jobTitle} @ {e.company}
                          </h3>
                          <span className="text-zinc-400">
                            {e.startDate} — {e.currentlyWorking ? "Present" : e.endDate}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 font-sans leading-relaxed whitespace-pre-wrap">
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
                <section key="skills" className="space-y-3 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">04 // Skills</h2>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {resume.skills.map((s, idx) => (
                      <span key={s.id || idx} className="px-2 py-0.5 bg-zinc-100 rounded text-zinc-800">
                        {typeof s === "string" ? s : s.name}
                      </span>
                    ))}
                  </div>
                </section>
              );

            case "education":
              if (!resume.education || resume.education.length === 0) return null;
              return (
                <section key="education" className="space-y-4 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">05 // Education</h2>
                  <div className="space-y-3">
                    {resume.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="text-xs space-y-0.5">
                        <div className="font-bold text-zinc-900">{edu.degree}</div>
                        <div className="text-zinc-600">{edu.institution} ({edu.startYear} — {edu.endYear})</div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "contact":
              return (
                <section key="contact" id="contact" className="space-y-3 border-t border-zinc-200 pt-8">
                  <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">06 // Contact</h2>
                  <div className="text-xs space-y-1 text-zinc-700">
                    {resume.email && (
                      <div>
                        email: <a href={`mailto:${resume.email}`} className="underline">{resume.email}</a>
                      </div>
                    )}
                    {resume.phone && (
                      <div>
                        phone: <a href={`tel:${resume.phone}`} className="underline">{resume.phone}</a>
                      </div>
                    )}
                    {resume.location && <div>location: {resume.location}</div>}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-[11px] text-zinc-400">
        built with ResuMind // {new Date().getFullYear()}
      </footer>
    </div>
  );
}
