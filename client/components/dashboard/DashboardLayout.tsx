"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  name: string;
}

export default function DashboardLayout({
  children,
  name,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar name={name} />

        <main className="p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}