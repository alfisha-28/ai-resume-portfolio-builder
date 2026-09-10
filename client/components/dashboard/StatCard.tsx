"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xs hover:shadow-md border border-gray-200/80 p-5 sm:p-6 flex items-center justify-between transition-all duration-200 group">
      <div className="space-y-1">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {value}
        </h2>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${color}`}
      >
        {icon}
      </div>
    </div>
  );
}