"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import CreateResumeButton from "./CreateResumeButton";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Resumes
        </h1>

        <p className="text-gray-500 mt-2">
          Create, edit and manage all of your resumes.
        </p>
      </div>

      <CreateResumeButton
    onClick={() => {
        console.log("Create Resume");
    }}
/>

    </div>
  );
}