"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "../resume/SectionTitle";

export default function ProfessionalTemplate() {
  const { resumeData } = useResume();

  const validSkills = resumeData.skills.filter((s) => s.name?.trim());
  const validLanguages = resumeData.languages.filter((l) => l.name?.trim());
  const validCertifications = resumeData.certifications.filter(
    (c) => c.name?.trim() || c.organization?.trim()
  );
  const validExperience = resumeData.experience.filter(
    (e) => e.jobTitle?.trim() || e.company?.trim()
  );
  const validEducation = resumeData.education.filter(
    (e) => e.degree?.trim() || e.institution?.trim()
  );
  const validProjects = resumeData.projects.filter((p) => p.title?.trim());
  const validAchievements = resumeData.achievements.filter(
    (a) => a.title?.trim() || a.description?.trim()
  );

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl flex">
      {/* Left sidebar */}
      <aside className="w-[72mm] bg-slate-800 text-white p-6 flex flex-col gap-6">
        {/* Name & Title */}
        <div className="border-b border-slate-600 pb-5">
          <h1 className="text-xl font-bold leading-tight">
            {resumeData.fullName || "Your Name"}
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            {resumeData.jobTitle || "Professional Title"}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Contact</p>
          <div className="space-y-1.5 text-xs text-slate-300">
            {resumeData.email && <p>{resumeData.email}</p>}
            {resumeData.phone && <p>{resumeData.phone}</p>}
            {resumeData.location && <p>{resumeData.location}</p>}
            {resumeData.linkedin && <p className="break-all">{resumeData.linkedin}</p>}
            {resumeData.github && <p className="break-all">{resumeData.github}</p>}
            {resumeData.portfolio && <p className="break-all">{resumeData.portfolio}</p>}
          </div>
        </div>

        {/* Skills */}
        {validSkills.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {validSkills.map((s) => (
                <span key={s.id} className="px-2 py-0.5 bg-slate-700 text-slate-200 text-xs rounded">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {validLanguages.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Languages</p>
            <div className="space-y-1">
              {validLanguages.map((l) => (
                <div key={l.id} className="flex justify-between text-xs text-slate-300">
                  <span>{l.name}</span>
                  <span className="text-slate-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {validCertifications.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Certifications</p>
            <div className="space-y-2">
              {validCertifications.map((c) => (
                <div key={c.id} className="text-xs text-slate-300">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-slate-400">{c.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {resumeData.summary && (
          <div className="mb-6">
            <SectionTitle title="Summary" />
            <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {validExperience.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Experience" />
            <div className="space-y-5">
              {validExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{exp.jobTitle}</p>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="mt-2 space-y-1">
                      {exp.description.split("\n").filter(Boolean).map((line, i) => (
                        <p key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="shrink-0">{line.startsWith("•") ? "" : "•"}</span>
                          <span>{line.startsWith("•") ? line.slice(1).trim() : line}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {validEducation.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Education" />
            <div className="space-y-4">
              {validEducation.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    {edu.cgpa && <p className="text-xs text-gray-400">CGPA: {edu.cgpa}</p>}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {edu.startYear} – {edu.endYear}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {validProjects.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Projects" />
            <div className="space-y-4">
              {validProjects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-sm text-gray-900">{p.title}</p>
                  {p.technologies && (
                    <p className="text-xs text-gray-400 mt-0.5">{p.technologies}</p>
                  )}
                  {p.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {validAchievements.length > 0 && (
          <div>
            <SectionTitle title="Achievements" />
            <div className="space-y-2">
              {validAchievements.map((a) => (
                <div key={a.id}>
                  <p className="font-semibold text-sm text-gray-900">{a.title}</p>
                  {a.description && <p className="text-xs text-gray-600">{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
