"use client";

import { useReactToPrint } from "react-to-print";

interface Props {
  contentRef: React.RefObject<HTMLDivElement>;
}

export default function DownloadPDFButton({
  contentRef,
}: Props) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Resume",
  });

  return (
    <button
      onClick={handlePrint}
      className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}