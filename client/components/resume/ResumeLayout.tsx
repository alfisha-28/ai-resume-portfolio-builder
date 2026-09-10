"use client";

import { useState } from "react";
import { Edit3, Eye } from "lucide-react";

interface ResumeLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export default function ResumeLayout({ children, preview }: ResumeLayoutProps) {
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-4">
      {/* Mobile / Tablet Segmented Tab Switcher (< lg) */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-gray-200/80 rounded-xl max-w-xs mx-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            mobileTab === "edit"
              ? "bg-white text-gray-900 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Edit3 size={14} />
          <span>Edit Form</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            mobileTab === "preview"
              ? "bg-white text-gray-900 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
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
          className={`bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-190px)] ${
            mobileTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {children}
        </div>

        {/* Live Preview Container */}
        <div
          className={`sticky top-20 bg-slate-100/80 rounded-2xl border border-gray-200/80 shadow-xs overflow-auto max-h-[calc(100vh-190px)] p-2 sm:p-4 ${
            mobileTab === "edit" ? "hidden lg:block" : "block"
          }`}
        >
          {preview}
        </div>
      </div>
    </div>
  );
}
