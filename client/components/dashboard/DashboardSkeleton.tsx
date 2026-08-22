"use client";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-xl bg-gray-200"
        />
      ))}
    </div>
  );
}