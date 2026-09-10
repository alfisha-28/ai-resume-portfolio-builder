"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, Check, RefreshCw, X, ArrowRight } from "lucide-react";

export interface AIModeOption<T extends string = string> {
  id: T;
  label: string;
  description?: string;
}

interface AIPreviewModalProps<T extends string> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  modes: AIModeOption<T>[];
  activeMode: T;
  onModeChange: (mode: T) => void;
  originalText?: string;
  generatedText: string;
  isLoading: boolean;
  error?: string | null;
  onRegenerate: () => void;
  onApply: (finalText: string) => void;
}

export default function AIPreviewModal<T extends string>({
  isOpen,
  onClose,
  title,
  subtitle,
  modes,
  activeMode,
  onModeChange,
  originalText = "",
  generatedText,
  isLoading,
  error,
  onRegenerate,
  onApply,
}: AIPreviewModalProps<T>) {
  const [editedText, setEditedText] = useState("");

  // Sync edited text when new text is generated
  useEffect(() => {
    setEditedText(generatedText);
  }, [generatedText]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Tone & Strategy Mode Pills */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Select Tone / Strategy
            </label>
            <div className="flex flex-wrap gap-2">
              {modes.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => onModeChange(mode.id)}
                    disabled={isLoading}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={onRegenerate}
                className="underline font-semibold hover:text-red-700 ml-2"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Comparison / Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original / Current */}
            {originalText ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Current Text</span>
                  <span className="text-[11px] text-gray-400">{originalText.length} chars</span>
                </div>
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 min-h-[140px] max-h-[220px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {originalText}
                </div>
              </div>
            ) : null}

            {/* AI Proposed */}
            <div className={`space-y-1.5 ${originalText ? "" : "md:col-span-2"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Proposed (Editable)
                </span>
                {editedText && (
                  <span className="text-[11px] text-gray-400">{editedText.length} chars</span>
                )}
              </div>

              {isLoading ? (
                <div className="p-6 bg-purple-50/50 border border-purple-100 rounded-xl flex flex-col items-center justify-center gap-2 min-h-[140px]">
                  <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                  <p className="text-xs font-medium text-purple-700">Writing with Gemini...</p>
                  <p className="text-[11px] text-gray-400">Strictly grounded in your background</p>
                </div>
              ) : (
                <textarea
                  rows={originalText ? 7 : 8}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Generated result will appear here..."
                  className="w-full p-3.5 bg-white border border-purple-200 rounded-xl text-xs text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none leading-relaxed shadow-xs"
                />
              )}
            </div>
          </div>

          <div className="text-[11px] text-gray-400 flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg">
            <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span>AI never fabricates metrics, companies, or degrees. You can edit the text before applying.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Regenerate
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onApply(editedText)}
              disabled={isLoading || !editedText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg transition shadow-xs"
            >
              Apply to Resume <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
