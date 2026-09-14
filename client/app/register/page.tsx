"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, User } from "lucide-react";

import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { registerUser } from "@/services/auth.service";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // Auto-login after registration
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Account created! Welcome aboard 🎉");
        router.push("/dashboard");
      } else {
        toast.success("Account created! Please log in.");
        router.push("/login");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Branding Showcase Panel */}
      <AuthBrandPanel />

      {/* Right Authentication Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen overflow-y-auto">
        {/* Top bar with Back Link */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to ResuMind</span>
          </Link>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Free forever tier included
          </span>
        </div>

        {/* Centered Auth Column */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {/* Mobile Branding Header (visible on < lg screens) */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-hidden"
              aria-label="ResuMind Home"
            >
              <img
                src="/logos/logo.png"
                alt="ResuMind Logo"
                className="w-10 h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <picture className="inline-flex items-center">
                <source srcSet="/logos/wordmarkDark.png" />
                <img
                  src="/logos/wordmark.png"
                  alt="ResuMind"
                  className="h-7 w-auto object-contain"
                />
              </picture>
            </Link>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-2">
              Build Smarter. Get Hired.
            </p>
          </div>

          {/* Page Heading */}
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1.5">
              Get Started
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Start building AI-tailored resumes and your personal portfolio.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                  }`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-hidden"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                  }`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-hidden"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm shadow-blue-500/20 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom subtle terms info */}
        <div className="w-full max-w-md mx-auto mt-6 text-center text-xs text-slate-400">
          By continuing, you agree to ResuMind&apos;s Terms of Service and Privacy Policy.
        </div>
      </div>
    </main>
  );
}