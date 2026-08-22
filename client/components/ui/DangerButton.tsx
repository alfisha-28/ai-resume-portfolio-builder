"use client";

interface DangerButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function DangerButton({
  children,
  onClick,
}: DangerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      {children}
    </button>
  );
}