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
    <div
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-gray-200
        p-6
        flex
        items-center
        justify-between
      "
    >
      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          ${color}
        `}
      >
        {icon}
      </div>

    </div>
  );
}