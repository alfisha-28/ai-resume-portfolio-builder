"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createResume } from "@/services/resume.service";
import toast from "react-hot-toast";

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    const create = async () => {
      try {
        const resume = await createResume({
          title: "Untitled Resume",
          summary: "",
          education: [],
          experience: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: [],
          template: "classic",
        });

        toast.success("New resume initialized!");
        router.replace(`/dashboard/resume/edit/${resume.id}`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to initialize resume. Redirecting to dashboard...");
        router.replace("/dashboard");
      }
    };

    create();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-slate-900">
          Initializing your resume...
        </p>
        <p className="text-xs text-slate-400">
          Preparing workspace and ATS templates
        </p>
      </div>
    </div>
  );
}