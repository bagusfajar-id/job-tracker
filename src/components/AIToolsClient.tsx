"use client";
import { useState } from "react";
import { Sparkles, FileText, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name?: string | null;
  image?: string | null;
};

export default function AIToolsClient({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"analyze" | "cover">("analyze");
  const [jobDesc, setJobDesc] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDesc || !position) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDesc, position }),
    });
    const data = await res.json();
    setResult(data.analysis);
    setLoading(false);
  };

  const handleCoverLetter = async () => {
    if (!jobDesc || !position || !company) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai/cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDesc,
        position,
        company,
        userName: user.name,
      }),
    });
    const data = await res.json();
    setResult(data.coverLetter);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-violet-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">JT</span>
          </div>
          <span className="font-semibold text-lg">AI Tools</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={24} className="text-violet-400" />
            AI Career Tools
          </h1>
          <p className="text-zinc-400 mt-1">Powered by Google Gemini</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "analyze", label: "Job Analyzer", icon: Sparkles },
            { id: "cover", label: "Cover Letter", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setResult(""); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Position *</label>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {activeTab === "cover" && (
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Company *</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Job Description *</label>
              <textarea
                placeholder="Paste the full job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={10}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 resize-none transition-colors"
              />
            </div>

            <button
              onClick={activeTab === "analyze" ? handleAnalyze : handleCoverLetter}
              disabled={loading || !jobDesc || !position || (activeTab === "cover" && !company)}
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white py-3 rounded-xl transition-colors font-medium"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {activeTab === "analyze" ? "Analyze Job" : "Generate Cover Letter"}
                </>
              )}
            </button>
          </div>

          {/* Result Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm text-zinc-400">Result</h3>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                <Sparkles size={32} className="mb-3" />
                <p className="text-sm">Result will appear here</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-3" />
                <p className="text-sm">AI is thinking...</p>
              </div>
            )}

            {result && (
              <div className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-96">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}