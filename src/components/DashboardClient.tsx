"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Plus, LogOut, Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import AddJobModal from "./AddJobModal";
import KanbanBoard from "./KanbanBoard";
import Link from "next/link";
import { Sparkles } from "lucide-react";

type Application = {
  id: string;
  company: string;
  position: string;
  status: string;
  jobUrl: string | null;
  jobDesc: string | null;
  notes: string | null;
  appliedAt: Date;
};

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function DashboardClient({
  applications,
  user,
}: {
  applications: Application[];
  user: User;
}) {
  const [apps, setApps] = useState(applications);
  const [showModal, setShowModal] = useState(false);

  const stats = {
    total: apps.length,
    applied: apps.filter((a) => a.status === "applied").length,
    interview: apps.filter((a) => a.status === "interview").length,
    offer: apps.filter((a) => a.status === "offer").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-violet-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">JT</span>
          </div>
          <span className="font-semibold text-lg">JobTracker</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={user.image || ""}
            alt={user.name || ""}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-zinc-400 text-sm">{user.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
         <div>
           <h1 className="text-2xl font-bold">Dashboard</h1>
           <p className="text-zinc-400 mt-1">Track and manage your applications</p>
         </div>
         <div className="flex items-center gap-3">
           <Link
             href="/dashboard/ai"
             className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm"
           >
             <Sparkles size={18} className="text-violet-400" />
             AI Tools
           </Link>
           <button
             onClick={() => setShowModal(true)}
             className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-colors font-medium"
           >
             <Plus size={18} />
             Add Application
           </button>
         </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, icon: Briefcase, color: "text-blue-400" },
            { label: "Applied", value: stats.applied, icon: Clock, color: "text-yellow-400" },
            { label: "Interview", value: stats.interview, icon: CheckCircle, color: "text-green-400" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-zinc-400 text-sm">{stat.label}</span>
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        <KanbanBoard applications={apps} onUpdate={setApps} />
      </div>

      {/* Modal */}
      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onAdd={(newApp) => setApps([newApp, ...apps])}
        />
      )}
    </div>
  );
}