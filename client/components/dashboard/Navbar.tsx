"use client";

import { usePathname } from "next/navigation";
import { Menu, Sparkles, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export default function Navbar({ onToggleMobileMenu }: NavbarProps) {
 const pathname = usePathname();
const { data: user } = useAuth();
const name = user?.name ?? "";
const initials = name
  ? name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  : "U";

  // Compute breadcrumb title based on path
  const getPageTitle = () => {
    if (pathname.includes("/match")) return "Job Description Matcher";
    if (pathname.includes("/analyze")) return "ATS Resume Analyzer";
    if (pathname.includes("/edit")) return "Resume Editor";
    if (pathname.includes("/templates")) return "Templates Gallery";
    if (pathname.includes("/settings")) return "Account Settings";
    return "Dashboard";
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Location / Context Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900 tracking-tight">
            {getPageTitle()}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" title="System Online" />
        </div>
      </div>

      {/* User Profile Pill */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-xs font-bold text-gray-900 leading-none">{name || "Professional"}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Career Dashboard</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs ring-2 ring-blue-50">
          {initials}
        </div>
      </div>
    </header>
  );
}
