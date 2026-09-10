"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function SectionCard({ title, children, defaultOpen = false }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section className="border border-gray-200/90 rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={sectionId}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-slate-50/80 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          )}
        </div>
      </button>
      {open && (
        <div id={sectionId} className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </section>
  );
}
