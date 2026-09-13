"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LayoutTemplate,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: LayoutTemplate,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    if (onCloseMobile) {
      onCloseMobile();
    }

    router.push("/login");
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* =====================================================
          BRAND HEADER
      ====================================================== */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            onClick={() => onCloseMobile?.()}
            className="inline-flex items-center gap-2.5"
            aria-label="ResuMind Dashboard"
          >
            {/* ResuMind Logo */}
            <img
              src="/logos/logo.png"
              alt="ResuMind Logo"
              className="w-15 h-15 object-contain shrink-0"
            />

            {/* ResuMind Wordmark */}
            <img
              src="/logos/wordmark.png"
              alt="ResuMind"
              className="h-10 w-auto max-w-[145px] object-contain"
            />
          </Link>

          {/* Brand Tagline */}
          <p className="text-slate-400 text-[11px] font-medium mt-1.5 ml-0.5">
            Build Smarter. Get Hired.
          </p>
        </div>

        {/* =================================================
            MOBILE CLOSE BUTTON
        ================================================== */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <span className="block px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
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
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-150 text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={
                  isActive ? "text-white" : "text-slate-400"
                }
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* =====================================================
          FOOTER / LOGOUT
      ====================================================== */}
      <div className="border-t border-slate-800/80 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col min-h-screen shrink-0 border-r border-slate-800">
        {navContent}
      </aside>

      {/* =====================================================
          MOBILE OFF-CANVAS DRAWER
      ====================================================== */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside className="relative w-72 max-w-[80vw] bg-slate-900 text-white flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}