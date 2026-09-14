"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  subtext?: string;
  badge?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  subtext,
  badge,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 p-5 flex flex-col justify-between transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            {title}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </h2>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${color}`}
        >
          {icon}
        </div>
      </div>

      {(subtext || badge) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtext && <span className="text-slate-400 text-[11px]">{subtext}</span>}
          {badge && (
            <span className="font-semibold text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}