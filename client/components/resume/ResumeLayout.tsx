"use client";

interface ResumeLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export default function ResumeLayout({
  children,
  preview,
}: ResumeLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow p-6">
        {children}
      </div>

      <div className="bg-gray-100 rounded-xl shadow p-6 min-h-[900px]">
        {preview}
      </div>
    </div>
  );
}