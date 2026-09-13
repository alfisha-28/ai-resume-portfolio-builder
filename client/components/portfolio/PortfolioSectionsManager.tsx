"use client";

import React from "react";
import { ChevronUp, ChevronDown, Eye, EyeOff, GripVertical } from "lucide-react";
import type { PortfolioSectionConfig } from "@/types/portfolio";

interface PortfolioSectionsManagerProps {
  sections: PortfolioSectionConfig[];
  onChange: (sections: PortfolioSectionConfig[]) => void;
}

export default function PortfolioSectionsManager({
  sections,
  onChange,
}: PortfolioSectionsManagerProps) {
  const toggleSection = (id: string) => {
    const updated = sections.map((sec) =>
      sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
    );
    onChange(updated);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= sections.length) return;

    const copy = [...sections];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIdx, 0, moved);
    onChange(copy);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Sections & Layout</h3>
          <p className="text-xs text-slate-500">Enable, disable, or re-order portfolio sections</p>
        </div>
        <span className="text-xs text-indigo-600 font-semibold">
          {sections.filter((s) => s.enabled).length}/{sections.length} active
        </span>
      </div>

      <div className="space-y-2">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`flex items-center justify-between p-3 rounded-xl border transition ${
              sec.enabled
                ? "bg-white border-slate-200 text-slate-800"
                : "bg-slate-50 border-slate-200/60 text-slate-400 opacity-60"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="text-xs font-semibold truncate">{sec.label}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Move Up */}
              <button
                type="button"
                onClick={() => moveSection(idx, "up")}
                disabled={idx === 0}
                className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Move Down */}
              <button
                type="button"
                onClick={() => moveSection(idx, "down")}
                disabled={idx === sections.length - 1}
                className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Toggle visibility */}
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  sec.enabled
                    ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
                title={sec.enabled ? "Disable section" : "Enable section"}
              >
                {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
