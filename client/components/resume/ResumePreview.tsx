"use client";

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
        <TemplateRenderer template={resumeData.template} />
      </div>
    </div>
  );
}
