"use client";

import React, { useRef, useState } from "react";
import PortfolioRenderer from "./PortfolioRenderer";
import PortfolioShareModal, { sharePortfolioUrl } from "./PortfolioShareModal";
import PortfolioResumeDownload, { PortfolioResumeDownloadRef } from "./PortfolioResumeDownload";
import type { Portfolio } from "@/types/portfolio";

interface PublicPortfolioClientProps {
  portfolio: Portfolio;
}

export default function PublicPortfolioClient({ portfolio }: PublicPortfolioClientProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const printRef = useRef<PortfolioResumeDownloadRef>(null);

  const handleDownload = () => {
    if (printRef.current) {
      printRef.current.print();
    }
  };

  const handleShare = () => {
    sharePortfolioUrl(portfolio.username);
  };

  return (
    <>
      <PortfolioRenderer
        portfolio={portfolio}
        template={portfolio.template}
        accentColor={portfolio.accentColor}
        sections={portfolio.sections}
        customData={portfolio.customData}
        onDownloadResume={portfolio.resume ? handleDownload : undefined}
        onShare={handleShare}
        isPreview={false}
      />

      {/* Hidden printable resume */}
      {portfolio.resume && (
        <PortfolioResumeDownload ref={printRef} resume={portfolio.resume} />
      )}

      {/* Share Modal */}
      <PortfolioShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        username={portfolio.username}
      />
    </>
  );
}
