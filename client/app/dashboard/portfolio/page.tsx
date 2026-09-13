"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Briefcase,
  Globe,
  ExternalLink,
  Edit,
  LayoutTemplate,
  CheckCircle2,
  AlertCircle,
  Share2,
  Copy,
  Trash2,
  Plus,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PortfolioCompletenessCard from "@/components/portfolio/PortfolioCompletenessCard";
import PortfolioShareModal from "@/components/portfolio/PortfolioShareModal";
import ConfirmModal from "@/components/ui/ConfirmModal";

import {
  getUserPortfolio,
  createPortfolio,
  updatePortfolio,
  publishPortfolio,
  unpublishPortfolio,
  deletePortfolio,
} from "@/services/portfolio.service";
import { getResumes } from "@/services/resume.service";
import type { Portfolio, PortfolioTemplate } from "@/types/portfolio";
import { PORTFOLIO_TEMPLATES } from "@/types/portfolio";
import type { Resume } from "@/types/resume";

function PortfolioDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramResumeId = searchParams.get("resumeId");

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Creation State
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [username, setUsername] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate>("modern");
  const [creating, setCreating] = useState(false);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [userPort, userResumes] = await Promise.all([
        getUserPortfolio(),
        getResumes(),
      ]);
      setPortfolio(userPort);
      setResumes(userResumes);

      if (userResumes.length > 0) {
        const targetResume = (paramResumeId && userResumes.find((r) => r.id === paramResumeId)) || userResumes[0];
        setSelectedResumeId(targetResume.id);
        const namePart = (targetResume.fullName || "dev")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .slice(0, 20);
        setUsername(namePart || "my-portfolio");
      }
    } catch {
      toast.error("Failed to load portfolio details.");
    } finally {
      setLoading(false);
    }
  }, [paramResumeId]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handle Portfolio Creation
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResumeId) {
      toast.error("Please select a resume to build your portfolio.");
      return;
    }
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (cleanUsername.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }

    try {
      setCreating(true);
      const created = await createPortfolio({
        resumeId: selectedResumeId,
        username: cleanUsername,
        template: selectedTemplate,
      });
      setPortfolio(created);
      toast.success("Portfolio created successfully!");
      router.push("/dashboard/portfolio/edit");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to create portfolio. Please check if username is available.";
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };

  // Toggle Publish / Unpublish
  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      setActionLoading(true);
      if (portfolio.published) {
        const updated = await unpublishPortfolio(portfolio.id);
        setPortfolio(updated);
        toast("Portfolio unpublished. Public link is now private.", { icon: "🔒" });
      } else {
        const updated = await publishPortfolio(portfolio.id);
        setPortfolio(updated);
        toast.success("Portfolio published! Your public site is live.");
      }
    } catch {
      toast.error("Failed to change portfolio status.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Portfolio
  const handleDelete = async () => {
    if (!portfolio) return;
    try {
      setActionLoading(true);
      await deletePortfolio(portfolio.id);
      setPortfolio(null);
      toast.success("Portfolio deleted.");
      setShowDeleteModal(false);
    } catch {
      toast.error("Failed to delete portfolio.");
    } finally {
      setActionLoading(false);
    }
  };

  // Switch Source Resume
  const handleSwitchResume = async (newResumeId: string) => {
    if (!portfolio) return;
    try {
      setActionLoading(true);
      const updated = await updatePortfolio(portfolio.id, { resumeId: newResumeId });
      setPortfolio(updated);
      toast.success("Portfolio source resume updated!");
    } catch {
      toast.error("Failed to switch source resume.");
    } finally {
      setActionLoading(false);
    }
  };

  const copyPublicUrl = () => {
    if (!portfolio) return;
    const url = `${window.location.origin}/portfolio/${portfolio.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Public link copied to clipboard!");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading portfolio...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Portfolio</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create and manage your professional online presence.
            </p>
          </div>

          {portfolio && (
            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard/portfolio/edit"
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Portfolio</span>
              </Link>
            </div>
          )}
        </div>

        {/* State A: Portfolio does NOT exist -> Onboarding & Create */}
        {!portfolio ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-8">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Portfolio from Resume</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Turn your resume into an impressive live website in seconds.
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select one of your existing resumes to automatically populate your projects, experience, skills, and summary. You retain full control over layout, sections, and privacy.
              </p>
            </div>

            {resumes.length === 0 ? (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>No Resumes Found</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  You need at least one resume to generate a portfolio. Please create a resume first.
                </p>
                <Link
                  href="/dashboard/resume/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Your First Resume</span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-6 max-w-2xl">
                {/* 1. Select Resume */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">
                    1. Select Source Resume <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedResumeId}
                    onChange={(e) => {
                      setSelectedResumeId(e.target.value);
                      const match = resumes.find((r) => r.id === e.target.value);
                      if (match?.fullName) {
                        setUsername(
                          match.fullName
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-")
                            .slice(0, 20)
                        );
                      }
                    }}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                  >
                    {resumes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title || "Untitled Resume"} — {r.jobTitle || "Professional"} (Updated {new Date(r.updatedAt).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Choose Username */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">
                    2. Choose Public Portfolio URL <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 transition">
                    <span className="px-3.5 py-3 bg-slate-50 text-xs font-mono text-slate-500 border-r border-slate-200">
                      /portfolio/
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-_]/g, "")
                            .slice(0, 30)
                        )
                      }
                      placeholder="your-name"
                      required
                      className="w-full p-3 bg-white text-xs text-slate-800 font-mono outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Letters, numbers, and hyphens only (min 3 chars). Example: /portfolio/{username || "alfisha"}
                  </p>
                </div>

                {/* 3. Starting Template */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">
                    3. Select Starting Template
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PORTFOLIO_TEMPLATES.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between space-y-2 ${
                          selectedTemplate === tpl.id
                            ? "border-indigo-600 bg-indigo-50/50 shadow-2xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{tpl.name}</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {tpl.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{tpl.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={creating || !selectedResumeId || username.trim().length < 3}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs hover:shadow transition"
                >
                  {creating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>Create Live Portfolio</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* State B: Portfolio EXISTS -> Management Dashboard */
          <div className="space-y-8">
            {paramResumeId && portfolio.resumeId !== paramResumeId && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-700 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-950">Switch Portfolio Source Resume?</p>
                    <p className="text-xs text-indigo-700">
                      You clicked Build Portfolio for &quot;{resumes.find((r) => r.id === paramResumeId)?.title || "selected resume"}&quot;. Would you like to switch your portfolio to use this resume?
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSwitchResume(paramResumeId)}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 transition flex items-center gap-2"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Switch to this Resume</span>
                </button>
              </div>
            )}

            {/* Top Status Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      portfolio.published
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        portfolio.published ? "bg-emerald-600 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span>{portfolio.published ? "Published (Live)" : "Draft (Private)"}</span>
                  </span>

                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Template: {portfolio.template}
                  </span>
                </div>

                {/* Public URL Box */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-slate-500">Public URL:</span>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-700">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>/portfolio/{portfolio.username}</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyPublicUrl}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <Link
                  href="/dashboard/portfolio/edit"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </Link>

                <Link
                  href="/dashboard/portfolio/templates"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                >
                  <LayoutTemplate className="w-3.5 h-3.5" />
                  <span>Templates</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                {portfolio.published ? (
                  <button
                    type="button"
                    onClick={handleTogglePublish}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Unpublish</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleTogglePublish}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Publish Portfolio</span>
                  </button>
                )}

                <a
                  href={`/portfolio/${portfolio.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition shadow-xs"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Completeness & Sections Overview (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <PortfolioCompletenessCard portfolio={portfolio} />

                {/* Section Overview Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Configured Sections</h3>
                    <Link
                      href="/dashboard/portfolio/edit"
                      className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <span>Manage Sections</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(portfolio.sections || []).map((sec) => (
                      <div
                        key={sec.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                          sec.enabled
                            ? "bg-slate-50 border-slate-200 text-slate-800"
                            : "bg-slate-50/50 border-slate-200/50 text-slate-400 opacity-60"
                        }`}
                      >
                        <span className="font-semibold">{sec.label}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            sec.enabled ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Source Resume & Settings (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Source Resume
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">
                        {portfolio.resume?.title || "Linked Resume"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Role: {portfolio.resume?.jobTitle || "Not specified"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Last synchronized: {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/dashboard/resume/edit/${portfolio.resumeId}`}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      Edit Master Resume
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Portfolio</span>
                    </button>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>ResuMind Truth Guarantee</span>
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Changes made to your portfolio layout, about narrative, or visibility will never overwrite or destroy your master resume facts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {portfolio && (
          <PortfolioShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            username={portfolio.username}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Portfolio"
          message="Are you sure you want to delete this online portfolio? Your public link will stop working immediately. The underlying master resume will NOT be deleted."
          confirmText="Delete Portfolio"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  );
}

export default function PortfolioDashboardPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex h-96 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading portfolio...</p>
            </div>
          </div>
        </DashboardLayout>
      }
    >
      <PortfolioDashboardContent />
    </Suspense>
  );
}
