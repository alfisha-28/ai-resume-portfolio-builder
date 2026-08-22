"use client";

interface ResumeSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeSort({
  value,
  onChange,
}: ResumeSortProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
      "
    >
      <option value="updated">Recently Updated</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="alphabetical">A-Z</option>
      <option value="completion">Completion %</option>
    </select>
  );
}