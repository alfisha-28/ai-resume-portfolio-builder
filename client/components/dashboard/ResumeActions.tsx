"use client";

import Link from "next/link";
import { Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ResumeActionsProps {
  resumeId: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export default function ResumeActions({
  resumeId,
  onDelete,
  onDuplicate,
}: ResumeActionsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 hover:bg-gray-100 transition"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-48
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-lg
            z-20
            overflow-hidden
          "
        >
          <Link
            href={`/dashboard/resume/edit/${resumeId}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
          >
            <Edit size={16} />
            Edit Resume
          </Link>

          <button
            onClick={onDuplicate}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
          >
            <Copy size={16} />
            Duplicate
          </button>

          <button
            onClick={onDelete}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}