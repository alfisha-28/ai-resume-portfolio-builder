"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardError from "@/components/dashboard/DashboardError";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { useDashboard } from "@/hooks/useDashboard";
import {
  createEmptyResume,
  deleteResume,
  duplicateResume,
  updateResume,
} from "@/services/resume.service";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";
import type { Resume } from "@/types/resume";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "drafts">("all");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data: resumes = [] as Resume[],
    isLoading,
    isError,
    refetch,
  } = useDashboard();

  // ─── Create ────────────────────────────────────────────────────────────────
  const handleCreate = useCallback(async () => {
    try {
      setCreating(true);
      const resume = await createEmptyResume();
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("New resume draft created!");
      router.push(`/dashboard/resume/edit/${resume.id}`);
    } catch {
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setCreating(false);
    }
  }, [router, queryClient]);

  // ─── Delete ────────────────────────────────────────────────────────────────
  const requestDelete = useCallback((id: string) => {
    setDeletingId(id);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingId) return;
    try {
      await deleteResume(deletingId);
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted.");
    } catch {
      toast.error("Failed to delete resume. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }, [deletingId, queryClient]);

  // ─── Duplicate ─────────────────────────────────────────────────────────────
  const handleDuplicate = useCallback(
    async (id: string) => {
      try {
        await duplicateResume(id);
        await queryClient.invalidateQueries({ queryKey: ["resumes"] });
        toast.success("Resume duplicated.");
      } catch {
        toast.error("Failed to duplicate resume. Please try again.");
      }
    },
    [queryClient]
  );

  // ─── Rename ─────────────────────────────────────────────────────────────────
  const handleRename = useCallback(
    async (id: string, newTitle: string) => {
      try {
        await updateResume(id, { title: newTitle });
        await queryClient.invalidateQueries({ queryKey: ["resumes"] });
        toast.success("Resume renamed.");
      } catch {
        toast.error("Failed to rename resume.");
      }
    },
    [queryClient]
  );

  // ─── Filter & Sort ─────────────────────────────────────────────────────────
  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    // Status filter
    if (statusFilter === "completed") {
      data = data.filter((r) => calculateResumeCompletion(r).percentage >= 80);
    } else if (statusFilter === "drafts") {
      data = data.filter((r) => calculateResumeCompletion(r).percentage < 80);
    }

    // Search query
    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (resume) =>
          (resume.title ?? "").toLowerCase().includes(query) ||
          (resume.template ?? "").toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sort) {
      case "alphabetical":
        data.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
        break;

      case "completion":
        data.sort(
          (a, b) =>
            calculateResumeCompletion(b).percentage -
            calculateResumeCompletion(a).percentage
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    return data;
  }, [resumes, search, sort, statusFilter]);

  const totalCount = resumes.length;
  const completedCount = resumes.filter(
    (r) => calculateResumeCompletion(r).percentage >= 80
  ).length;
  const draftsCount = totalCount - completedCount;

  return (
    <DashboardLayout onCreateResume={handleCreate}>
      <div className="space-y-7 pb-12">
        {/* Top Personalized Header */}
        <DashboardHeader
          onCreate={handleCreate}
          creating={creating}
          totalResumes={totalCount}
        />

        {/* Dynamic Metric Stat Cards */}
        <DashboardStats resumes={resumes} />

        {/* ResuMind Portfolio Builder Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800/90 p-6 md:p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>ResuMind Portfolio Builder</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                Turn your resume into a live, interactive web portfolio.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Choose from 4 designer themes (Modern, Minimal, Professional, Creative), customize your sections with real-time preview, and publish to your personalized public URL.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Auto-sync with resume
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Custom domain ready
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Shareable public link
                </span>
              </div>
            </div>

            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition-all shadow-lg hover:shadow-xl shrink-0 self-start md:self-auto group active:scale-98 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Launch Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Ambient Glow Orbs */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Filter Tabs & Search Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 w-fit">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Resumes ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("completed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "completed"
                    ? "bg-white text-emerald-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ATS Ready ({completedCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("drafts")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "drafts"
                    ? "bg-white text-amber-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                In Progress ({draftsCount})
              </button>
            </div>

            {/* Quick Count Info */}
            <div className="text-xs text-slate-500 hidden md:block">
              Showing {filteredResumes.length} of {totalCount} total resumes
            </div>
          </div>

          <DashboardToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* Resumes Grid / Loading / Error State */}
        {isLoading && <DashboardSkeleton />}

        {isError && <DashboardError onRetry={refetch} />}

        {!isLoading && !isError && (
          <ResumeGrid
            resumes={filteredResumes}
            onDelete={requestDelete}
            onDuplicate={handleDuplicate}
            onRename={handleRename}
            onCreate={handleCreate}
            searchQuery={search}
            onClearSearch={() => setSearch("")}
          />
        )}

        {/* Destructive Resume Deletion Confirmation */}
        <ConfirmModal
          isOpen={Boolean(deletingId)}
          onClose={() => setDeletingId(null)}
          onConfirm={confirmDelete}
          title="Delete Resume"
          message="Are you sure you want to delete this resume? All written sections, ATS score history, and customizations will be permanently removed. This action cannot be undone."
          confirmText="Delete Resume"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  );
}