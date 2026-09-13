import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-850">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand + Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logos/logo.png"
                alt="ResuMind Logo"
                className="w-8 h-8 object-contain shrink-0"
              />
              <img
                src="/logos/wordmark.png"
                alt="ResuMind"
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-slate-500 font-medium">
              Build Smarter. Get Hired.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#ats" className="hover:text-white transition-colors">
              ATS Optimization
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Portfolio Builder
            </a>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} ResuMind. All rights reserved.</p>
          <p className="text-slate-500">
            Engineered for modern career excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
