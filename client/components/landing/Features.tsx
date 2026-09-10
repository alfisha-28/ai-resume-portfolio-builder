"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Layout, Download, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ATS-Friendly Templates",
    description: "Professional resume templates optimized to pass Applicant Tracking Systems.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description: "Generate compelling summaries, descriptions, and bullet points with AI.",
  },
  {
    icon: Layout,
    title: "Portfolio Builder",
    description: "Turn your resume into a beautiful personal portfolio website instantly.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your resume as a pixel-perfect PDF ready to send to employers.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared. You own your information.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Build and update your resume in minutes, not hours.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Land the Job
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Powerful tools to help you create, customize, and share your professional story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
