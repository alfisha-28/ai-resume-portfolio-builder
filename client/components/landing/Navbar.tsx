"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <FileText className="w-6 h-6 text-blue-600" />
          ResumeAI
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
