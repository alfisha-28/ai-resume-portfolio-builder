"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data: LoginFormData) => {
  try {
    setLoading(true);

    const response = await loginUser(data);

    console.log(response);

    localStorage.setItem(
      "token",
      response.data.token
    );

    toast.success(response.message);

    router.push("/dashboard");

  } catch (error: any) {

    toast.error(
      error.response?.data?.message || "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </main>
  );
}