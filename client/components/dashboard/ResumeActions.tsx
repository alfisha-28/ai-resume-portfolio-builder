"use client";

import Link from "next/link";
import { Copy, Edit, MoreVertical, Pencil, Trash2, Sparkles, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ResumeActionsProps {
  resumeId: string;
  onDelete: () => void;
  onDuplicate: () => void;
  onRename?: () => void;
}

export default function ResumeActions({ resumeId, onDelete, onDuplicate, onRename }: ResumeActionsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const action = (fn?: () => void) => () => {
    setOpen(false);
    if (fn) fn();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="rounded-lg p-2 hover:bg-gray-100 transition"
        aria-label="Resume actions"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
          <Link
            href={`/dashboard/resume/edit/${resumeId}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm"
          >
            <Edit size={15} /> Edit Resume
          </Link>
          <Link
            href={`/dashboard/resume/${resumeId}/match`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-700 text-sm font-medium"
          >
            <Target size={15} className="text-blue-600" /> Match Job
          </Link>
          <Link
            href={`/dashboard/resume/${resumeId}/analyze`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-purple-700 text-sm font-medium"
          >
            <Sparkles size={15} className="text-purple-600" /> Analyze ATS
          </Link>
          {onRename && (
            <button
              onClick={action(onRename)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left text-gray-700 text-sm"
            >
              <Pencil size={15} /> Rename
            </button>
          )}
          <button
            onClick={action(onDuplicate)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left text-gray-700 text-sm"
          >
            <Copy size={15} /> Duplicate
          </button>
          <button
            onClick={action(onDelete)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left text-sm"
          >
            <Trash2 size={15} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
