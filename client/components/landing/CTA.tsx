"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Build Your Resume?
        </h2>
        <p className="text-blue-100 text-lg mb-10">
          Join thousands of job seekers who landed their dream jobs using ResumeAI.
        </p>
        <button
          onClick={() => router.push("/register")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
