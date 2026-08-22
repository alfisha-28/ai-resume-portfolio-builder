import { useReactToPrint } from "react-to-print";

export function usePDFExport(contentRef: React.RefObject<HTMLDivElement>) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Resume",
  });

  return { handlePrint };
}