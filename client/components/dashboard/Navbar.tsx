"use client";

interface NavbarProps {
  name: string;
}

export default function Navbar({ name = "" }: NavbarProps) {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

      <div className="flex items-center gap-4">
  <div className="text-right">
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-500">Welcome back!</p>
  </div>

  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
    {name.charAt(0).toUpperCase()}
  </div>
</div>

    </header>
  );
}