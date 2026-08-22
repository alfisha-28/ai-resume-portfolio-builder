"use client";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}