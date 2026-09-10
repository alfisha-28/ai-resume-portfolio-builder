"use client";

interface ResumeLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export default function ResumeLayout({ children, preview }: ResumeLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* Form — scrollable */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 overflow-y-auto max-h-[calc(100vh-180px)]">
        {children}
      </div>

      {/* Preview — sticky */}
      <div className="sticky top-20 bg-gray-100 rounded-xl border border-gray-200 shadow-sm overflow-auto max-h-[calc(100vh-180px)]">
        {preview}
      </div>
    </div>
  );
}
