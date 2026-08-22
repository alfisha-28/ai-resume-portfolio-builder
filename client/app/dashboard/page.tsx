"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardError from "@/components/dashboard/DashboardError";

import { useDashboard } from "@/hooks/useDashboard";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";
import type { Resume } from "@/types/resume";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated");

  const {
    data: resumes = [] as Resume[],
    isLoading,
    isError,
    refetch,
  } = useDashboard();

  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter(
        (resume) =>
          resume.title.toLowerCase().includes(query) ||
          resume.template.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "alphabetical":
        data.sort((a, b) => a.title.localeCompare(b.title));
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
            new Date(a.updatedAt).getTime() -
            new Date(b.updatedAt).getTime()
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        );
    }

    return data;
  }, [resumes, search, sort]);

  return (
    <DashboardLayout name="Dashboard">
      <div className="space-y-8">
        <DashboardHeader />

        <DashboardStats resumes={filteredResumes} />
        <DashboardToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        {isLoading && <DashboardSkeleton />}

        {isError && (
          <DashboardError
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && (
          <ResumeGrid resumes={filteredResumes} />
        )}
      </div>
    </DashboardLayout>
  );
}