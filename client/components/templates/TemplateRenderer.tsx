"use client";

import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";

interface Props {
  template: string;
}

export default function TemplateRenderer({ template }: Props) {
  switch (template) {
    case "modern":
      return <ModernTemplate />;
    case "minimal":
      return <MinimalTemplate />;
    case "professional":
      return <ProfessionalTemplate />;
    case "classic":
    default:
      return <ClassicTemplate />;
  }
}
