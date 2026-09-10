import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <FileText className="w-5 h-5 text-blue-400" />
          ResumeAI
        </Link>

        <p className="text-sm">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          <Link href="/register" className="hover:text-white transition-colors">Register</Link>
        </div>
      </div>
    </footer>
  );
}
