"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function SectionCard({ title, children, defaultOpen = false }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        }
      </button>
      {open && <div className="px-5 pb-5 pt-1">{children}</div>}
    </section>
  );
}
