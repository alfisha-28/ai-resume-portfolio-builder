"use client";

import { useResume } from "@/context/ResumeContext";
<<<<<<< HEAD
import SectionTitle from "../resume/SectionTitle";
=======
import PreviewSummary from "../resume/PreviewSummary";
import PreviewEducation from "../resume/PreviewEducation";
import PreviewExperience from "../resume/PreviewExperience";
import PreviewProjects from "../resume/PreviewProjects";
import PreviewSkills from "../resume/PreviewSkills";
import PreviewCertifications from "../resume/PreviewCertifications";
import PreviewLanguages from "../resume/PreviewLanguages";
import PreviewAchievements from "../resume/PreviewAchievements";
import PreviewInterests from "../resume/PreviewInterests";
>>>>>>> origin/main

export default function ProfessionalTemplate() {
  const { resumeData } = useResume();

  return (
<<<<<<< HEAD
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
        {resumeData.skills.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.map((s) => (
                <span key={s.id} className="px-2 py-0.5 bg-slate-700 text-slate-200 text-xs rounded">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resumeData.languages.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Languages</p>
            <div className="space-y-1">
              {resumeData.languages.map((l) => (
                <div key={l.id} className="flex justify-between text-xs text-slate-300">
                  <span>{l.name}</span>
                  <span className="text-slate-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Certifications</p>
            <div className="space-y-2">
              {resumeData.certifications.map((c) => (
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

        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Experience" />
            <div className="space-y-5">
              {resumeData.experience.map((exp) => (
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

        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Education" />
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
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

        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <SectionTitle title="Projects" />
            <div className="space-y-4">
              {resumeData.projects.map((p) => (
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

        {resumeData.achievements.length > 0 && (
          <div>
            <SectionTitle title="Achievements" />
            <div className="space-y-2">
              {resumeData.achievements.map((a) => (
                <div key={a.id}>
                  <p className="font-semibold text-sm text-gray-900">{a.title}</p>
                  {a.description && <p className="text-xs text-gray-600">{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
=======
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl">
      <div className="bg-slate-800 text-white px-10 py-8">
        <h1 className="text-3xl font-bold">{resumeData.fullName || "Your Name"}</h1>
        <p className="text-slate-300 mt-1">{resumeData.jobTitle || "Professional Title"}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
          {resumeData.email && <span>{resumeData.email}</span>}
          {resumeData.phone && <span>{resumeData.phone}</span>}
          {resumeData.location && <span>{resumeData.location}</span>}
          {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
          {resumeData.github && <span>{resumeData.github}</span>}
          {resumeData.portfolio && <span>{resumeData.portfolio}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <aside className="col-span-1 bg-slate-50 px-6 py-8 border-r border-slate-200">
          <PreviewSkills />
          <PreviewLanguages />
          <PreviewCertifications />
          <PreviewInterests />
        </aside>
        <main className="col-span-2 px-8 py-8">
          <PreviewSummary />
          <PreviewExperience />
          <PreviewProjects />
          <PreviewEducation />
          <PreviewAchievements />
        </main>
      </div>
>>>>>>> origin/main
    </div>
  );
}
