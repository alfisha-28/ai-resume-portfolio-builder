"use client";

import Link from "next/link";
import { CalendarDays, FileText, LayoutTemplate } from "lucide-react";
import ResumeActions from "./ResumeActions";

interface ResumeCardProps {
  id: string;
  title: string;
  template: string;
  completion: number;
  updatedAt: string;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ResumeCard({
  id,
  title,
  template,
  completion,
  updatedAt,
  onDelete,
  onDuplicate,
}: ResumeCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
        hover:shadow-md
        transition
        p-6
        flex
        flex-col
        justify-between
      "
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-lg leading-tight">
                {title || "Untitled Resume"}
              </h2>

              <div className="mt-1 flex items-center gap-2 text-gray-500 text-sm capitalize">
                <LayoutTemplate size={15} />
                {template}
              </div>
            </div>
          </div>

          <ResumeActions
            resumeId={id}
            onDelete={() => onDelete(id)}
            onDuplicate={() => onDuplicate(id)}
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Completion</span>
            <span className="font-medium">{completion}%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <CalendarDays size={15} />
          {formatDate(updatedAt)}
        </div>

        <Link
          href={`/dashboard/resume/edit/${id}`}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Edit →
        </Link>
      </div>
    </div>
  );
}