"use client";

interface TextareaFieldProps {
  label: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function TextareaField({
  label,
  value,
  rows = 4,
  placeholder,
  onChange,
}: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}