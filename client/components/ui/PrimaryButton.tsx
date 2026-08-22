"use client";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}