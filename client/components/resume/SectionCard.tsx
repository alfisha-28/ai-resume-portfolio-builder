"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Code2,
  Award,
  Languages as LanguagesIcon,
  Trophy,
  Heart,
  Layers,
} from "lucide-react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function renderSectionIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("personal")) return <User size={15} />;
  if (lower.includes("summary")) return <FileText size={15} />;
  if (lower.includes("education")) return <GraduationCap size={15} />;
  if (lower.includes("experience")) return <Briefcase size={15} />;
  if (lower.includes("project")) return <FolderGit2 size={15} />;
  if (lower.includes("skill")) return <Code2 size={15} />;
  if (lower.includes("certification")) return <Award size={15} />;
  if (lower.includes("language")) return <LanguagesIcon size={15} />;
  if (lower.includes("achievement")) return <Trophy size={15} />;
  if (lower.includes("interest")) return <Heart size={15} />;
  return <Layers size={15} />;
}

export default function SectionCard({
  title,
  children,
  defaultOpen = false,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs hover:border-slate-300 transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={sectionId}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/90 transition-colors text-left focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
            {renderSectionIcon(title)}
          </div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600">
          <span className="text-[11px] font-medium hidden sm:inline text-slate-400">
            {open ? "Collapse" : "Expand"}
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 shrink-0 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0 transition-transform" />
          )}
        </div>
      </button>

      {open && (
        <div
          id={sectionId}
          className="px-5 pb-6 pt-3 border-t border-slate-100 animate-in fade-in duration-150"
        >
          {children}
        </div>
      )}
    </section>
  );
}
