"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Sparkles,
  LogOut,
  Settings,
  Globe,
  LayoutTemplate,
  ChevronDown,
  Plus,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onToggleMobileMenu?: () => void;
  onCreateResume?: () => void;
}

export default function Navbar({ onToggleMobileMenu, onCreateResume }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    toast.success("Signed out successfully. See you soon!");
    router.push("/login");
  };

  // Compute breadcrumb title based on path
  const getPageTitle = () => {
    if (pathname.includes("/match")) return "Job Description Matcher";
    if (pathname.includes("/analyze")) return "ATS Resume Analyzer";
    if (pathname.includes("/tailor")) return "AI Resume Tailor";
    if (pathname.includes("/portfolio/edit")) return "Portfolio Editor";
    if (pathname.includes("/portfolio")) return "Portfolio Builder";
    if (pathname.includes("/resume/edit")) return "Resume Editor";
    if (pathname.includes("/templates")) return "Templates Gallery";
    if (pathname.includes("/settings")) return "Account Settings";
    return "Dashboard";
  };

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3 flex justify-between items-center sticky top-0 z-30 transition-all">
      {/* Left: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Location & System Status Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Engine Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Quick Actions & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick New Resume Button */}
        {onCreateResume && (
          <button
            type="button"
            onClick={onCreateResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            title="Create a new resume"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        )}

        {/* Quick Launch Portfolio Button */}
        <Link
          href="/dashboard/portfolio"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition"
          title="Open Portfolio Builder"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Portfolio</span>
        </Link>

        {/* Quick Standalone Logout Action (Visible on Desktop) */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 text-xs font-medium transition cursor-pointer"
          title="Sign out of your account"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign out</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition focus:outline-hidden cursor-pointer group"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-xs ring-2 ring-blue-100 group-hover:ring-blue-200 transition">
              {initials}
            </div>

            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                {name || "Account"}
              </p>
              <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                {email || "Pro User"}
              </p>
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-slate-700" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User Header Info */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {name || "Professional"}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {email || "User account"}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>ResuMind Pro Plan</span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-1.5">
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Dashboard Overview</span>
                </Link>

                <Link
                  href="/dashboard/portfolio"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                >
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>My Web Portfolio</span>
                </Link>

                <Link
                  href="/dashboard/templates"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                >
                  <LayoutTemplate className="w-4 h-4 text-purple-600" />
                  <span>Resume Templates</span>
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
