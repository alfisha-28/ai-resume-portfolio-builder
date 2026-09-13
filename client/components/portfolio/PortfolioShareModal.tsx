"use client";

import React from "react";
import { Copy, Check, X, Share2, Globe, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

interface PortfolioShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export function sharePortfolioUrl(username: string) {
  const url = `${window.location.origin}/portfolio/${username}`;

  if (navigator.share) {
    navigator
      .share({
        title: `${username} — Portfolio`,
        text: `Check out my online portfolio on ResuMind!`,
        url,
      })
      .catch(() => {
        // Fallback if dismissed or blocked
      });
  } else {
    navigator.clipboard.writeText(url);
    toast.success("Portfolio link copied to clipboard!");
  }
}

export default function PortfolioShareModal({
  isOpen,
  onClose,
  username,
}: PortfolioShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const url = typeof window !== "undefined" ? `${window.location.origin}/portfolio/${username}` : `/portfolio/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Portfolio link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Share Your Portfolio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Your portfolio is live and viewable by anyone with this link. Share it with recruiters, on LinkedIn, or on your social profiles.
        </p>

        {/* URL Box */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
          <Globe className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
          <input
            type="text"
            readOnly
            value={url}
            className="bg-transparent text-xs text-slate-700 w-full outline-none font-mono"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
              copied ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* View live action */}
        <div className="flex items-center justify-between pt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Open live page</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
