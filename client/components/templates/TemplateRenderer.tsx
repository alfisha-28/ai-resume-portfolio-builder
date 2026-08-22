"use client";

import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

interface Props {
  template: string;
}

export default function TemplateRenderer({
  template,
}: Props) {
  switch (template) {
    case "modern":
      return <ModernTemplate />;

    case "classic":
    default:
      return <ClassicTemplate />;
  }
}