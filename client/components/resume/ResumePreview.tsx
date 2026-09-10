"use client";

<<<<<<< HEAD
import TemplateRenderer from "../templates/TemplateRenderer";
import { useResume } from "@/context/ResumeContext";

interface Props {
  printRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreview({ printRef }: Props) {
  const { resumeData } = useResume();

  return (
    <div className="bg-gray-100 min-h-full py-6 px-4">
      <div ref={printRef}>
=======
import { forwardRef } from "react";
import TemplateRenderer from "../templates/TemplateRenderer";
import { useResume } from "@/context/ResumeContext";

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { resumeData } = useResume();

  return (
    <div className="bg-gray-100 min-h-screen py-8 overflow-auto">
      <div ref={ref}>
>>>>>>> origin/main
        <TemplateRenderer template={resumeData.template} />
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
>>>>>>> origin/main
