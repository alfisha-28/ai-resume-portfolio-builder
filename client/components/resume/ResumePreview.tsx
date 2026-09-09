"use client";

import { forwardRef } from "react";
import TemplateRenderer from "../templates/TemplateRenderer";
import { useResume } from "@/context/ResumeContext";

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { resumeData } = useResume();

  return (
    <div className="bg-gray-100 min-h-screen py-8 overflow-auto">
      <div ref={ref}>
        <TemplateRenderer template={resumeData.template} />
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
