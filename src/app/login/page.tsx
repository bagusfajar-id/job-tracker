"use client";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JT</span>
            </div>
            <span className="text-white font-semibold text-xl">JobTracker</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-400">Track your job applications with AI</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
          >
            <Github size={20} />
            Continue with GitHub
          </button>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Free forever • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}