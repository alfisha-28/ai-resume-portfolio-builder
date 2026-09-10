"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmptyResume } from "@/services/resume.service";

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    const create = async () => {
      try {
<<<<<<< HEAD
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

        router.replace(
          `/dashboard/resume/edit/${resume.id}`
        );
      } catch (err) {
        console.error(err);
=======
        const resume = await createEmptyResume();
        router.replace(`/dashboard/resume/edit/${resume.id}`);
      } catch {
        router.replace("/dashboard");
>>>>>>> origin/main
      }
    };
    create();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 text-gray-500">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      Creating resume...
    </div>
  );
}
