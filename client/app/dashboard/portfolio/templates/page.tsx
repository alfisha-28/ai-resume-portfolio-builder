"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Sparkles, LayoutTemplate, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getUserPortfolio, updatePortfolio } from "@/services/portfolio.service";
import type { Portfolio, PortfolioTemplate } from "@/types/portfolio";
import { PORTFOLIO_TEMPLATES } from "@/types/portfolio";

export default function PortfolioTemplatesPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const port = await getUserPortfolio();
        setPortfolio(port);
      } catch {
        toast.error("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleSelectTemplate = async (templateId: PortfolioTemplate) => {
    if (!portfolio) {
      toast.error("Please create a portfolio first.");
      router.push("/dashboard/portfolio");
      return;
    }

    if (portfolio.template === templateId) {
      toast.success(`${templateId} is already your active template.`);
      return;
    }

    try {
      setSavingId(templateId);
      const updated = await updatePortfolio(portfolio.id, {
        template: templateId,
      });
      setPortfolio(updated);
      toast.success(`Active template updated to ${templateId.toUpperCase()}!`);
    } catch {
      toast.error("Failed to update template.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading templates...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/dashboard/portfolio" className="hover:text-slate-900 transition flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portfolio Dashboard</span>
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Templates</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Portfolio Templates
            </h1>
            <p className="text-xs text-slate-500">
              Choose an aesthetic that reflects your personality. Switching templates preserves all your content.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/portfolio/edit"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <span>Open Live Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_TEMPLATES.map((tpl) => {
            const isSelected = portfolio?.template === tpl.id;
            const isSaving = savingId === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`bg-white rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isSelected
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Visual Thumbnail Preview Box */}
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center min-h-[160px] relative">
                  {isSelected && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </div>
                  )}

                  <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-3 rounded bg-slate-800" />
                      <div className="flex gap-1">
                        <div className="w-8 h-2 rounded bg-slate-200" />
                        <div className="w-8 h-2 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="w-36 h-2 rounded bg-slate-400" />
                    <div className="w-full h-1.5 rounded bg-slate-100" />
                    <div className="w-4/5 h-1.5 rounded bg-slate-100" />
                  </div>
                </div>

                {/* Template Description & Features */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">{tpl.name}</h3>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tpl.features.map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate(tpl.id)}
                      disabled={isSaving || isSelected}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-slate-100 text-slate-500 cursor-default"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow"
                      }`}
                    >
                      {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      {isSelected ? "Currently Selected" : `Select ${tpl.name}`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
