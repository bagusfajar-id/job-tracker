"use client";

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

const columns = [
  { id: "applied", label: "Applied", color: "bg-blue-500" },
  { id: "interview", label: "Interview", color: "bg-yellow-500" },
  { id: "offer", label: "Offer 🎉", color: "bg-green-500" },
  { id: "rejected", label: "Rejected", color: "bg-red-500" },
];

export default function KanbanBoard({
  applications,
  onUpdate,
}: {
  applications: Application[];
  onUpdate: (apps: Application[]) => void;
}) {
  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    onUpdate(applications.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {columns.map((col) => {
        const cards = applications.filter((a) => a.status === col.id);
        return (
          <div key={col.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="font-medium text-sm">{col.label}</span>
              <span className="ml-auto bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-full">
                {cards.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {cards.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-6">No applications</p>
              )}
              {cards.map((app) => (
                <div
                  key={app.id}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-colors"
                >
                  <p className="font-medium text-sm">{app.position}</p>
                  <p className="text-zinc-400 text-xs mt-1">{app.company}</p>
                  {app.notes && (
                    <p className="text-zinc-500 text-xs mt-2 line-clamp-2">{app.notes}</p>
                  )}
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {columns
                      .filter((c) => c.id !== app.status)
                      .map((c) => (
                        <button
                          key={c.id}
                          onClick={() => updateStatus(app.id, c.id)}
                          className="text-xs text-zinc-400 hover:text-white bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded-lg transition-colors"
                        >
                          → {c.label}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}