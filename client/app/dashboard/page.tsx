"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight, Sparkles } from "lucide-react";
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
      } catch {
        toast.error("Failed to rename resume.");
      }
    },
    [queryClient]
  );

  // ─── Filter & Sort ─────────────────────────────────────────────────────────
  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (resume) =>
          (resume.title ?? "").toLowerCase().includes(query) ||
          (resume.template ?? "").toLowerCase().includes(query)
      );
    }

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
  }, [resumes, search, sort]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader onCreate={handleCreate} creating={creating} />

        <DashboardStats resumes={filteredResumes} />

        {/* ResuMind Portfolio Builder Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 md:p-7 text-white shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>ResuMind Portfolio Builder</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Turn your resume into a live, professional web portfolio.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose from 4 designer templates (Modern, Minimal, Professional, Creative), customize your sections with live preview, and publish your personalized public URL.
              </p>
            </div>
            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition shadow-md shrink-0 self-start md:self-auto"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Launch Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        <DashboardToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

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