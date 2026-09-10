"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Builder
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Build a Resume That{" "}
            <span className="text-blue-600">Gets You Hired</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Create ATS-friendly resumes and stunning portfolio websites in minutes
            using AI. Stand out from the crowd with professional templates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/register")}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors text-lg"
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            No credit card required · Free forever plan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
