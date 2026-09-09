"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: Palette,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          ResumeAI
        </h1>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}