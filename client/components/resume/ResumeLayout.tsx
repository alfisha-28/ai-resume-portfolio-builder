"use client";

import { useState } from "react";
import { Edit3, Eye, FileText } from "lucide-react";

interface ResumeLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export default function ResumeLayout({ children, preview }: ResumeLayoutProps) {
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-4">
      {/* Mobile / Tablet Segmented Tab Switcher (< lg) */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-slate-200/80 rounded-xl max-w-xs mx-auto text-xs font-bold shadow-2xs">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
            mobileTab === "edit"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Edit3 size={14} />
          <span>Edit Sections</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
            mobileTab === "preview"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Eye size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Grid: Side-by-side on lg, Tab-switched on mobile */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Form Container */}
        <div
          className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-thin ${
            mobileTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Edit3 size={14} className="text-blue-600" />
              <span>Resume Content Sections</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Changes auto-saved
            </span>
          </div>

          {children}
        </div>

        {/* Live Preview Container */}
        <div
          className={`sticky top-6 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-xs overflow-auto max-h-[calc(100vh-210px)] p-2 sm:p-5 ${
            mobileTab === "edit" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 px-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <FileText size={14} className="text-indigo-600" />
              <span>Live Recruiter Preview</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto-rendered
            </span>
          </div>

          <div className="rounded-xl shadow-sm overflow-hidden">
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
}
