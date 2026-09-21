"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Palette,
  ShieldCheck,
  User,
  Sliders,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PortfolioRenderer from "@/components/portfolio/PortfolioRenderer";
import PortfolioSectionsManager from "@/components/portfolio/PortfolioSectionsManager";
import AIPreviewModal from "@/components/ai/AIPreviewModal";
import SaveStatus from "@/components/resume/SaveStatus";

import { useAutoSave } from "@/hooks/useAutoSave";
import { getUserPortfolio, updatePortfolio, publishPortfolio } from "@/services/portfolio.service";
import { aiImprovePortfolioAbout } from "@/services/ai.service";
import type {
  Portfolio,
  PortfolioTemplate,
  PortfolioAccent,
  PortfolioSectionConfig,
  PortfolioCustomData,
} from "@/types/portfolio";
import { ACCENT_COLORS, PORTFOLIO_TEMPLATES } from "@/types/portfolio";

export default function PortfolioEditPage() {
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Editable local state
  const [template, setTemplate] = useState<PortfolioTemplate>("modern");
  const [accentColor, setAccentColor] = useState<PortfolioAccent>("blue");
  const [sections, setSections] = useState<PortfolioSectionConfig[]>([]);
  const [customData, setCustomData] = useState<PortfolioCustomData>({});
  const [isDirty, setIsDirty] = useState(false);

  // AI About Modal state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState("");
  const [aiMode, setAiMode] = useState<"professional" | "concise" | "story" | "technical">("professional");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const port = await getUserPortfolio();
        if (!port) {
          toast("Please build a portfolio first.", { icon: "ℹ️" });
          router.push("/dashboard/portfolio");
          return;
        }

        setPortfolio(port);
        setTemplate(port.template);
        setAccentColor(port.accentColor);
        setSections(port.sections || []);
        setCustomData(port.customData || {});
      } catch {
        toast.error("Failed to load portfolio for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [router]);

  // Combined data bundle for autosave
  const currentPayload = React.useMemo(
    () => ({
      template,
      accentColor,
      sections,
      customData,
    }),
    [template, accentColor, sections, customData]
  );

  const handleSave = useCallback(
    async (payload = currentPayload) => {
      if (!portfolio) return;
      await updatePortfolio(portfolio.id, payload);
      setIsDirty(false);
    },
    [portfolio, currentPayload]
  );

  const { isSaving, hasUnsavedChanges, lastSaved, saveError, manualSave } = useAutoSave({
    data: currentPayload,
    onSave: handleSave,
    delay: 2000,
    enabled: !loading && Boolean(portfolio) && isDirty,
  });

  // Helper to mark dirty on field updates
  const updateCustomField = <K extends keyof PortfolioCustomData>(key: K, value: PortfolioCustomData[K]) => {
    setCustomData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  // AI Improve About
  const handleOpenAiAbout = async () => {
    const currentAbout = customData.customAbout || portfolio?.resume?.summary || "";
    setAiGeneratedText("");
    setAiModalOpen(true);
    setAiLoading(true);

    try {
      const improved = await aiImprovePortfolioAbout({
        fullName: portfolio?.resume?.fullName,
        jobTitle: portfolio?.resume?.jobTitle,
        currentAbout,
        skills: portfolio?.resume?.skills,
        experience: portfolio?.resume?.experience,
        mode: aiMode,
      });
      setAiGeneratedText(improved);
    } catch {
      toast.error("AI service error. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleRegenerateAiAbout = async () => {
    const currentAbout = customData.customAbout || portfolio?.resume?.summary || "";
    setAiLoading(true);
    try {
      const improved = await aiImprovePortfolioAbout({
        fullName: portfolio?.resume?.fullName,
        jobTitle: portfolio?.resume?.jobTitle,
        currentAbout,
        skills: portfolio?.resume?.skills,
        experience: portfolio?.resume?.experience,
        mode: aiMode,
      });
      setAiGeneratedText(improved);
    } catch {
      toast.error("Failed to regenerate.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAiAbout = (text: string) => {
    updateCustomField("customAbout", text);
    setAiModalOpen(false);
    toast.success("AI improved about applied!");
  };

  if (loading || !portfolio) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading editor...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Build simulated portfolio for live preview
  const livePortfolio: Portfolio = {
    ...portfolio,
    template,
    accentColor,
    sections,
    customData,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* Top Sticky Toolbar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 -mx-6 -mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/dashboard/portfolio"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <span className="text-slate-300">|</span>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900 truncate">
                Portfolio Editor
              </h1>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                /portfolio/{portfolio.username}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile View Toggle */}
            <div className="lg:hidden flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeTab === "edit" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeTab === "preview" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                }`}
              >
                Preview
              </button>
            </div>

            <SaveStatus
              isSaving={isSaving}
              hasUnsavedChanges={hasUnsavedChanges}
              lastSaved={lastSaved}
              saveError={saveError}
            />

            <button
              type="button"
              onClick={manualSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save</span>
            </button>

            <a
              href={`/portfolio/${portfolio.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Page</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Two-Column Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Customization Controls (5 cols) */}
          <div className={`lg:col-span-5 space-y-6 ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
            {/* 1. Template & Accent Color Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Design & Aesthetics</h3>
                </div>
                <Link
                  href="/dashboard/portfolio/templates"
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Change Template
                </Link>
              </div>

              {/* Template selector tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {PORTFOLIO_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTemplate(t.id);
                        setIsDirty(true);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        template === t.id
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <span>{t.name.split(" ")[0]}</span>
                      {template === t.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent presets */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-700">Accent Palette</label>
                <div className="flex items-center gap-3">
                  {(Object.keys(ACCENT_COLORS) as PortfolioAccent[]).map((key) => {
                    const col = ACCENT_COLORS[key];
                    const isSelected = accentColor === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setAccentColor(key);
                          setIsDirty(true);
                        }}
                        className={`w-7 h-7 rounded-full transition flex items-center justify-center ${col.bgClass} ${
                          isSelected ? "ring-2 ring-offset-2 ring-slate-800 scale-110" : "opacity-80 hover:opacity-100"
                        }`}
                        title={col.name}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Hero Section Customization */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Hero Section</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Professional Headline</label>
                  <input
                    type="text"
                    value={customData.headline || ""}
                    onChange={(e) => updateCustomField("headline", e.target.value)}
                    placeholder={portfolio.resume?.jobTitle || "e.g. Senior Full Stack Engineer"}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Short Bio / Tagline</label>
                  <textarea
                    rows={2}
                    value={customData.bio || ""}
                    onChange={(e) => updateCustomField("bio", e.target.value)}
                    placeholder="Building thoughtful digital experiences and scalable backends."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. About Section with AI Assist */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">About Me</h3>
                <button
                  type="button"
                  onClick={handleOpenAiAbout}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 shadow-2xs transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Improve with AI</span>
                </button>
              </div>

              <div className="space-y-1">
                <textarea
                  rows={6}
                  value={customData.customAbout ?? portfolio.resume?.summary ?? ""}
                  onChange={(e) => updateCustomField("customAbout", e.target.value)}
                  placeholder="Your personal narrative, technical philosophy, and career trajectory..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none font-sans"
                />
                <p className="text-[11px] text-slate-400">
                  Customizing this will NOT overwrite the summary in your original master resume.
                </p>
              </div>
            </div>

            {/* 4. Section Order and Visibility Manager */}
            <PortfolioSectionsManager
              sections={sections}
              onChange={(updated) => {
                setSections(updated);
                setIsDirty(true);
              }}
            />

            {/* 5. Privacy & Contact Toggles */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Contact & Privacy
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span>Show Email Address</span>
                  <input
                    type="checkbox"
                    checked={customData.showEmail !== false}
                    onChange={(e) => updateCustomField("showEmail", e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span>Show Phone Number</span>
                  <input
                    type="checkbox"
                    checked={Boolean(customData.showPhone)}
                    onChange={(e) => updateCustomField("showPhone", e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span>Show Location</span>
                  <input
                    type="checkbox"
                    checked={customData.showLocation !== false}
                    onChange={(e) => updateCustomField("showLocation", e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Live Preview (7 cols) */}
          <div className={`lg:col-span-7 sticky top-20 ${activeTab === "edit" ? "hidden lg:block" : "block"}`}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              {/* Browser mockup header */}
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-500 truncate max-w-xs">
                  https://resumind.alfisha.in/portfolio/{portfolio.username}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Live Preview</div>
              </div>

              {/* Scrollable Live Renderer Container */}
              <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
                <PortfolioRenderer
                  portfolio={livePortfolio}
                  template={template}
                  accentColor={accentColor}
                  sections={sections}
                  customData={customData}
                  isPreview={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Improve About Modal */}
        <AIPreviewModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          title="Improve Portfolio About"
          subtitle="Truth-preserving narrative polish grounded in your actual background."
          modes={[
            { id: "professional", label: "Professional", description: "Polished and authoritative" },
            { id: "concise", label: "Concise", description: "2 high-impact sentences" },
            { id: "story", label: "Story", description: "Narrative journey" },
            { id: "technical", label: "Technical", description: "Emphasize tech depth" },
          ]}
          activeMode={aiMode}
          onModeChange={(m) => setAiMode(m as any)}
          originalText={customData.customAbout || portfolio.resume?.summary || ""}
          generatedText={aiGeneratedText}
          isLoading={aiLoading}
          onRegenerate={handleRegenerateAiAbout}
          onApply={handleApplyAiAbout}
        />
      </div>
    </DashboardLayout>
  );
}
