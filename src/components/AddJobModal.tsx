"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddJobModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (app: any) => void;
}) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    jobUrl: "",
    jobDesc: "",
    notes: "",
    status: "applied",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.company || !form.position) return;
    setLoading(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onAdd(data);
    onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Add Application</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { key: "company", label: "Company *", placeholder: "e.g. Google" },
            { key: "position", label: "Position *", placeholder: "e.g. Frontend Engineer" },
            { key: "jobUrl", label: "Job URL", placeholder: "https://..." },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm text-zinc-400 mb-1 block">{field.label}</label>
              <input
                type="text"
                placeholder={field.placeholder}
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Job Description (for AI)</label>
            <textarea
              placeholder="Paste job description here..."
              value={form.jobDesc}
              onChange={(e) => setForm({ ...form, jobDesc: e.target.value })}
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Notes</label>
            <textarea
              placeholder="Any notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 resize-none transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !form.company || !form.position}
            className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white py-2.5 rounded-xl transition-colors text-sm font-medium"
          >
            {loading ? "Saving..." : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}