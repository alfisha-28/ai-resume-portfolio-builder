"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ResumeLayout from "@/components/resume/ResumeLayout";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import CompletionProgress from "@/components/dashboard/CompletionProgress";

import { ResumeProvider } from "@/context/ResumeContext";
import { useAuth } from "@/hooks/useAuth";

export default function NewResumePage() {
  const router = useRouter();
  const { data, isLoading, isError } = useAuth();

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) return null;

  return (
    <ResumeProvider>
      <DashboardLayout name={data.data.name}>
            <CompletionProgress />

        <div className="flex justify-between items-center mb-8">
          
          <div>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:underline"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mt-2">
              Create Resume
            </h1>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Save Resume
          </button>

        </div>

        <ResumeLayout preview={<ResumePreview />}>
          <ResumeForm />
        </ResumeLayout>

      </DashboardLayout>
    </ResumeProvider>
  );
}