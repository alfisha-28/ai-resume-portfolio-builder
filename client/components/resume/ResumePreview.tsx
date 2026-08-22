"use client";

import { useRef } from "react";
import TemplateRenderer from "../templates/TemplateRenderer";
import { useResume } from "@/context/ResumeContext";

export default function ResumePreview() {
  const { resumeData } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div ref={printRef}>
  <TemplateRenderer
    template={resumeData.template}
  />
</div>
    </div>
  );
}