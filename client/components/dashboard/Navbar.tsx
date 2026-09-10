"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { data } = useAuth();
  const name = data?.data?.name ?? "";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{name || "User"}</p>
          <p className="text-xs text-gray-400">Welcome back!</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
          {initials || "U"}
        </div>
      </div>
    </header>
  );
}
