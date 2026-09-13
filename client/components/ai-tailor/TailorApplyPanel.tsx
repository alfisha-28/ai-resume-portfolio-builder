"use client";

import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  Eye,
  RotateCcw,
  Copy,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";

interface TailorApplyPanelProps {
  acceptedCount: number;
  sectionsAffectedCount: number;
  hasAppliedDraft: boolean;
  isSaving: boolean;
  onPreview: () => void;
  onApplyDraft: () => void;
  onSave: (asDuplicate: boolean) => void;
  onDiscard: () => void;
}

export default function TailorApplyPanel({
  acceptedCount,
  sectionsAffectedCount,
  hasAppliedDraft,
  isSaving,
  onPreview,
  onApplyDraft,
  onSave,
  onDiscard,
}: TailorApplyPanelProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveAsDuplicate, setSaveAsDuplicate] = useState(true);

  return (
    <>
      <div className="sticky bottom-4 z-30 max-w-5xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-indigo-200 shadow-xl p-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Summary Label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-gray-900">
                  {acceptedCount} {acceptedCount === 1 ? "change" : "changes"} selected
                </h4>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-indigo-700">
                  {sectionsAffectedCount} {sectionsAffectedCount === 1 ? "section" : "sections"} affected
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                {hasAppliedDraft
                  ? "Changes staged into local draft. Choose how you'd like to save."
                  : "Accept or reject suggestions above, then apply them to your working draft."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Preview Button */}
            <button
              type="button"
              onClick={onPreview}
              disabled={acceptedCount === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Eye className="w-4 h-4 text-gray-500" />
              <span>Preview</span>
            </button>

            {/* Discard Button */}
            <button
              type="button"
              onClick={onDiscard}
              disabled={acceptedCount === 0 && !hasAppliedDraft}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>

            {/* Apply to Draft Button */}
            {!hasAppliedDraft ? (
              <button
                type="button"
                onClick={onApplyDraft}
                disabled={acceptedCount === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs hover:shadow transition disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Selected Changes</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSaveModal(true)}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs hover:shadow transition cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Tailored Resume</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-base font-bold text-gray-900">Save Tailored Resume</h3>
              <p className="text-xs text-gray-500 mt-1">
                Choose how you want to save your tailored modifications.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: Duplicate (Recommended) */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  saveAsDuplicate
                    ? "bg-indigo-50/50 border-indigo-400 ring-1 ring-indigo-300"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="save_option"
                  checked={saveAsDuplicate}
                  onChange={() => setSaveAsDuplicate(true)}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-900">
                      Create Duplicate (Recommended)
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                      Safe
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Preserves your original master resume intact and creates a dedicated tailored copy for this job.
                  </p>
                </div>
              </label>

              {/* Option 2: Overwrite Current */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  !saveAsDuplicate
                    ? "bg-amber-50/50 border-amber-400 ring-1 ring-amber-300"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="save_option"
                  checked={!saveAsDuplicate}
                  onChange={() => setSaveAsDuplicate(false)}
                  className="mt-1 text-amber-600 focus:ring-amber-500"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-gray-900">
                      Update Current Resume Directly
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Applies the accepted rewrites directly to this resume. Original phrasing will be replaced.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveModal(false);
                  onSave(saveAsDuplicate);
                }}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm & Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
