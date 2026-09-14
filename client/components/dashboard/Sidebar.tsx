"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LayoutTemplate,
  Settings,
  LogOut,
  X,
  Globe,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Portfolio Builder",
    href: "/dashboard/portfolio",
    icon: Globe,
    badge: "Live",
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: LayoutTemplate,
    badge: null,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useAuth();

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    if (onCloseMobile) {
      onCloseMobile();
    }

    toast.success("Signed out successfully. See you soon!");
    router.push("/login");
  };

  const navContent = (
    <div className="flex flex-col h-full select-none">
      {/* =====================================================
          BRAND HEADER
      ====================================================== */}
      <div className="p-6 border-b border-slate-850 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            onClick={() => onCloseMobile?.()}
            className="inline-flex items-center gap-2.5 group focus:outline-hidden"
            aria-label="ResuMind Dashboard"
          >
            {/* ResuMind Logo */}
            <img
              src="/logos/logo.png"
              alt="ResuMind Logo"
              className="w-10 h-10 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
            />

            {/* ResuMind Wordmark */}
            <img
              src="/logos/wordmark.png"
              alt="ResuMind"
              className="h-7 w-auto max-w-[145px] object-contain"
            />
          </Link>

          {/* Brand Tagline */}
          <p className="text-slate-400 text-[11px] font-medium mt-1.5 ml-0.5">
            Build Smarter. Get Hired.
          </p>
        </div>

        {/* MOBILE CLOSE BUTTON */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* =====================================================
          NAVIGATION MENU
      ====================================================== */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <span className="block px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Navigation
        </span>

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onCloseMobile?.()}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-slate-400"}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* AI Assistant Quick Card */}
        <div className="pt-6">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Career Engine</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Match job descriptions and score ATS readiness with real-time feedback.
            </p>
          </div>
        </div>
      </nav>

      {/* =====================================================
          FOOTER / USER PROFILE & LOGOUT
      ====================================================== */}
      <div className="border-t border-slate-850 p-4 space-y-3">
        {/* User preview */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate leading-tight">
              {name || "Professional"}
            </p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {email || "Pro Account"}
            </p>
          </div>
        </div>

        {/* Prominent Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border hover:border-red-500/20 transition-all text-sm font-medium cursor-pointer"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-slate-950 text-white flex-col min-h-screen shrink-0 border-r border-slate-850">
        {navContent}
      </aside>

      {/* MOBILE OFF-CANVAS DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] bg-slate-950 text-white flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200 border-r border-slate-800">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}