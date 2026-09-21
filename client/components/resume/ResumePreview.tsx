"use client";

import { forwardRef } from "react";
import TemplateRenderer from "../templates/TemplateRenderer";
import { useResume } from "@/context/ResumeContext";

interface Props {
  printRef?: React.RefObject<HTMLDivElement | null>;
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ printRef }, ref) => {
  const { resumeData } = useResume();

  return (
    <div className="bg-gray-100 min-h-full py-6 px-4 w-fit min-w-full flex justify-center">
      <div
        className="w-fit"
        ref={(node) => {
          if (printRef) {
            (printRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
      >
        <TemplateRenderer template={resumeData.template} />
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
