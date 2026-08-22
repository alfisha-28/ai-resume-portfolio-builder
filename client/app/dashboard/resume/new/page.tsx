"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/services/resume.service";

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    const create = async () => {
      try {
        const response = await createResume({
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
          `/dashboard/resume/edit/${response.data.id}`
        );
      } catch (err) {
        console.error(err);
      }
    };

    create();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Creating Resume...
    </div>
  );
}