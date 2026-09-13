"use client";

import React from "react";
import type { Portfolio, PortfolioTemplate, PortfolioAccent, PortfolioSectionConfig, PortfolioCustomData } from "@/types/portfolio";
import ModernPortfolio from "./templates/ModernPortfolio";
import MinimalPortfolio from "./templates/MinimalPortfolio";
import ProfessionalPortfolio from "./templates/ProfessionalPortfolio";
import CreativePortfolio from "./templates/CreativePortfolio";

interface PortfolioRendererProps {
  portfolio: Portfolio;
  template?: PortfolioTemplate;
  accentColor?: PortfolioAccent;
  sections?: PortfolioSectionConfig[];
  customData?: PortfolioCustomData;
  onDownloadResume?: () => void;
  onShare?: () => void;
  isPreview?: boolean;
}

export default function PortfolioRenderer({
  portfolio,
  template: propTemplate,
  accentColor: propAccent,
  sections: propSections,
  customData: propCustom,
  onDownloadResume,
  onShare,
  isPreview = false,
}: PortfolioRendererProps) {
  const activeTemplate = propTemplate || portfolio.template || "modern";
  const activeAccent = propAccent || portfolio.accentColor || "blue";
  const activeSections = propSections || portfolio.sections || [];
  const activeCustom = propCustom || portfolio.customData || {};

  switch (activeTemplate) {
    case "minimal":
      return (
        <MinimalPortfolio
          portfolio={portfolio}
          accentColor={activeAccent}
          sections={activeSections}
          customData={activeCustom}
          onDownloadResume={onDownloadResume}
          onShare={onShare}
          isPreview={isPreview}
        />
      );

    case "professional":
      return (
        <ProfessionalPortfolio
          portfolio={portfolio}
          accentColor={activeAccent}
          sections={activeSections}
          customData={activeCustom}
          onDownloadResume={onDownloadResume}
          onShare={onShare}
          isPreview={isPreview}
        />
      );

    case "creative":
      return (
        <CreativePortfolio
          portfolio={portfolio}
          accentColor={activeAccent}
          sections={activeSections}
          customData={activeCustom}
          onDownloadResume={onDownloadResume}
          onShare={onShare}
          isPreview={isPreview}
        />
      );

    case "modern":
    default:
      return (
        <ModernPortfolio
          portfolio={portfolio}
          accentColor={activeAccent}
          sections={activeSections}
          customData={activeCustom}
          onDownloadResume={onDownloadResume}
          onShare={onShare}
          isPreview={isPreview}
        />
      );
  }
}
