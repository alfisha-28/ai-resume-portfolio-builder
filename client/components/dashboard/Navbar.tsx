"use client";

import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  const { data: user } = useAuth();
  const displayName = user?.name ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <p className="font-semibold text-gray-700 text-lg">{name}</p>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold text-sm">{displayName}</p>
          <p className="text-xs text-gray-500">Welcome back!</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {initial}
        </div>
      </div>
    </header>
  );
}
