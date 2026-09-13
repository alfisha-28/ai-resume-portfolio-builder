"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ResumeProvider } from "@/context/ResumeContext";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import type { Resume } from "@/types/resume";

export interface PortfolioResumeDownloadRef {
  print: () => void;
}

interface PortfolioResumeDownloadProps {
  resume: Resume;
}

const PortfolioResumeDownload = forwardRef<PortfolioResumeDownloadRef, PortfolioResumeDownloadProps>(
  ({ resume }, ref) => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      contentRef: printRef,
      documentTitle: `${resume.fullName || "Resume"} - ResuMind`,
    });

    useImperativeHandle(ref, () => ({
      print: () => {
        handlePrint();
      },
    }));

    return (
      <div className="hidden">
        <div ref={printRef}>
          <ResumeProvider initialData={resume}>
            <TemplateRenderer template={resume.template || "classic"} />
          </ResumeProvider>
        </div>
      </div>
    );
  }
);

PortfolioResumeDownload.displayName = "PortfolioResumeDownload";

export default PortfolioResumeDownload;
