"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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