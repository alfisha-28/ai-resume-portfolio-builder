import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft, Globe } from "lucide-react";
import PublicPortfolioClient from "@/components/portfolio/PublicPortfolioClient";
import type { Portfolio } from "@/types/portfolio";

interface Props {
  params: Promise<{ username: string }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api/v1";

async function fetchPublicPortfolio(username: string): Promise<Portfolio | null> {
  try {
    const clean = encodeURIComponent(username.trim().toLowerCase());
    const res = await fetch(`${API_BASE}/portfolio/public/${clean}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data as Portfolio;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await fetchPublicPortfolio(username);

  if (!portfolio || !portfolio.published) {
    return {
      title: "Portfolio Not Found | ResuMind",
      description: "The requested professional portfolio is private or does not exist.",
    };
  }

  const name = portfolio.resume?.fullName || portfolio.username;
  const title = portfolio.customData?.headline || portfolio.resume?.jobTitle || "Professional";
  const desc =
    portfolio.customData?.customAbout ||
    portfolio.customData?.bio ||
    portfolio.resume?.summary ||
    `Professional online portfolio of ${name} showcasing experience, projects, skills, and accomplishments.`;

  return {
    title: `${name} — ${title} | ResuMind Portfolio`,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${name} — ${title}`,
      description: desc.slice(0, 160),
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params;
  const portfolio = await fetchPublicPortfolio(username);

  // If portfolio is non-existent or unpublished
  if (!portfolio || !portfolio.published) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900">Portfolio Not Available</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              The portfolio for <strong className="text-slate-800">@{username}</strong> is currently private, unpublished, or does not exist.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to ResuMind</span>
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            Powered by ResuMind • Build Smarter. Get Hired.
          </p>
        </div>
      </main>
    );
  }

  return <PublicPortfolioClient portfolio={portfolio} />;
}
