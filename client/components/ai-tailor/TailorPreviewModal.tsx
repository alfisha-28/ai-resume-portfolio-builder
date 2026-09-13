"use client";

import React from "react";
import { X, Eye, Sparkles, Check, ArrowRight } from "lucide-react";
import type { ResumeData } from "@/types/resume";

interface TailorPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalResume: ResumeData;
  draftResume: ResumeData;
}

export default function TailorPreviewModal({
  isOpen,
  onClose,
  originalResume,
  draftResume,
}: TailorPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Before & After Tailored Preview</h3>
              <p className="text-[11px] text-gray-500">
                Compare your original content with your staged draft rewrites.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Professional Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Original
                </span>
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {originalResume.summary || <span className="italic text-gray-400">No summary</span>}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Tailored Draft
                </span>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed whitespace-pre-wrap">
                  {draftResume.summary || <span className="italic text-gray-400">No summary</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Experience Section
            </h4>
            <div className="space-y-3">
              {(draftResume.experience || []).map((exp, idx) => {
                const orig = (originalResume.experience || [])[idx];
                return (
                  <div key={exp.id || idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-800">
                      <span>{exp.jobTitle || "Role"} at {exp.company || "Company"}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Original Bullets
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {orig?.description || "None"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                          Tailored Draft Bullets
                        </span>
                        <p className="text-xs text-indigo-950 font-medium leading-relaxed whitespace-pre-wrap">
                          {exp.description || "None"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Projects Section
            </h4>
            <div className="space-y-3">
              {(draftResume.projects || []).map((proj, idx) => {
                const orig = (originalResume.projects || [])[idx];
                return (
                  <div key={proj.id || idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-800">
                      <span>{proj.title || "Project"}</span>
                      <span className="text-[11px] font-normal text-gray-500">{proj.technologies}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Original Description
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {orig?.description || "None"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                          Tailored Draft Description
                        </span>
                        <p className="text-xs text-indigo-950 font-medium leading-relaxed whitespace-pre-wrap">
                          {proj.description || "None"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-end bg-gray-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
