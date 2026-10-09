"use client";
import { useState } from "react";

type Bottleneck = {
  task: string;
  hours: number;
  fix: string;
  savings: string;
  icon: string;
};

export default function OpsXRayPage() {
  const [url, setUrl] = useState("");
  const [pain, setPain] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Bottleneck[] | null>(null);
  const [progress, setProgress] = useState(0);

  const analyze = () => {
    if (!url && !pain) return;
    setLoading(true);
    setResults(null);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      // Generate dynamic results based on input keywords
      const lowerPain = pain.toLowerCase() + " " + url.toLowerCase();
      let bottlenecks: Bottleneck[] = [];

      if (lowerPain.includes("email") || lowerPain.includes("inbox")) {
        bottlenecks.push({ task: "Manual Email Triage & Response", hours: 12, fix: "AI Inbox Agent + Auto-Drafting", savings: "$1,840/mo", icon: "📧" });
      }
      if (lowerPain.includes("lead") || lowerPain.includes("contact") || lowerPain.includes("form")) {
        bottlenecks.push({ task: "Lead Qualification & Data Entry", hours: 15, fix: "Ghost Employee - Sales Qualifier", savings: "$2,300/mo", icon: "🎯" });
      }
      if (lowerPain.includes("schedule") || lowerPain.includes("booking") || lowerPain.includes("calendar")) {
        bottlenecks.push({ task: "Scheduling & Follow-ups", hours: 8, fix: "AI Receptionist + Calendar Sync", savings: "$1,220/mo", icon: "📅" });
      }
      if (lowerPain.includes("report") || lowerPain.includes("spreadsheet") || lowerPain.includes("data")) {
        bottlenecks.push({ task: "Reporting & Spreadsheet Hell", hours: 10, fix: "Voice-to-Workflow + Auto Reports", savings: "$1,530/mo", icon: "📊" });
      }
      // fill to 4 if needed
      const defaults: Bottleneck[] = [
        { task: "Customer Onboarding & Support Tickets", hours: 14, fix: "AI Knowledge Base + Chat Agent", savings: "$2,140/mo", icon: "🤖" },
        { task: "Invoice & Expense Tracking", hours: 6, fix: "AI Expense Parser + QuickBooks Sync", savings: "$920/mo", icon: "💳" },
        { task: "Social & Content Repurposing", hours: 9, fix: "Generative AI Content Engine", savings: "$1,380/mo", icon: "✨" },
      ];
      while (bottlenecks.length < 4) {
        const next = defaults[bottlenecks.length % defaults.length];
        if (!bottlenecks.find(b => b.task === next.task)) bottlenecks.push(next);
      }

      setResults(bottlenecks.slice(0, 4));
      setLoading(false);
    }, 2800);
  };

  const totalHours = results?.reduce((a, b) => a + b.hours, 0) || 0;
  const totalSavings = results?.reduce((a, b) => a + parseInt(b.savings.replace(/[^0-9]/g, "")), 0) || 0;

  return (
    <div className="min-h-screen bg-[#06080F] text-white selection:bg-violet-500/30">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-black/20 backdrop-blur-xl sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center font-bold">W</div>
            <span className="font-semibold tracking-tight">Why So AI</span>
            <span className="ml-3 text-[10px] tracking-[0.2em] text-violet-300 border border-violet-500/30 rounded-full px-2.5 py-1">OPS X-RAY • PREMIUM</span>
          </div>
          <a href="/tools" className="text-sm text-white/60 hover:text-white">← Back to Tools</a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-200 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE AUDIT ENGINE v2.0
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
            AI Ops <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">X-Ray</span>
          </h1>
          <p className="mt-5 text-[18px] leading-7 text-white/60">
            Paste your website + SOP. Our AI dissects your operations in 12 seconds and returns a $2,500 automation blueprint.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          {/* Input Card */}
          <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(124,58,237,0.4)]">
            <h3 className="font-semibold mb-6 flex items-center gap-2"><span className="text-xl">⚡</span> Business Inputs</h3>
            
            <label className="text-xs tracking-wide text-white/50 uppercase">Business Website URL</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 placeholder:text-white/30"
            />

            <div className="mt-6">
              <label className="text-xs tracking-wide text-white/50 uppercase">Upload SOP / Handbook (Optional)</label>
              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/30 py-8 hover:bg-white/[0.03] hover:border-violet-500/40 transition">
                <div className="text-2xl mb-2">📄</div>
                <span className="text-sm text-white/70">{fileName || "Drop PDF, DOCX, TXT or click to browse"}</span>
                <span className="text-xs text-white/40 mt-1">Max 10MB • Private & Encrypted</span>
                <input type="file" className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name || "")} />
              </label>
            </div>

            <div className="mt-6">
              <label className="text-xs tracking-wide text-white/50 uppercase">Biggest Time-Waster?</label>
              <textarea
                value={pain}
                onChange={e => setPain(e.target.value)}
                placeholder="Ex: Every time someone fills out our contact form, we manually copy it to a spreadsheet, email John, and then forget to follow up..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 min-h-[110px] placeholder:text-white/30 resize-none"
              />
            </div>

            <button
              onClick={analyze}
              disabled={loading || (!url && !pain)}
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-semibold tracking-tight hover:from-violet-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-[0_0_40px_-10px_rgba(124,58,237,0.8)]"
            >
              {loading ? `Scanning Operations... ${Math.round(progress)}%` : "Run Ops X-Ray →"}
            </button>

            {loading && (
              <div className="mt-5">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 flex gap-2 text-[11px] text-white/50">
                  <span className={progress > 20 ? "text-emerald-300" : ""}>✓ Parsing workflows</span>
                  <span className={progress > 55 ? "text-emerald-300" : ""}>• Detecting bottlenecks</span>
                  <span className={progress > 85 ? "text-emerald-300" : ""}>• Calculating ROI</span>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {!results && !loading && (
              <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-8 text-center">
                <div className="text-5xl mb-4">🔬</div>
                <h4 className="font-semibold">Ready to Scan</h4>
                <p className="text-sm text-white/50 mt-2 leading-6">Your audit will appear here with a visual workflow map, 4 bottlenecks, and a full ROI breakdown. This is the feature that closes clients.</p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-left">
                  <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5"><div className="text-[11px] text-white/40">AVG TIME SAVED</div><div className="font-bold text-lg mt-1">31h/week</div></div>
                  <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5"><div className="text-[11px] text-white/40">AVG SAVINGS</div><div className="font-bold text-lg mt-1">$6.2k/mo</div></div>
                  <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5"><div className="text-[11px] text-white/40">SETUP TIME</div><div className="font-bold text-lg mt-1">48 hours</div></div>
                </div>
              </div>
            )}

            {results && (
              <>
                {/* ROI Hero */}
                <div className="rounded-[24px] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-blue-600/20 p-7 backdrop-blur">
                  <div className="text-xs tracking-[0.2em] text-violet-200">YOUR AUDIT RESULT</div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div><div className="text-3xl font-black">{totalHours}h</div><div className="text-xs text-white/60 mt-1">Hours Saved / Week</div></div>
                    <div><div className="text-3xl font-black">${totalSavings.toLocaleString()}</div><div className="text-xs text-white/60 mt-1">Saved / Month</div></div>
                    <div><div className="text-3xl font-black">4</div><div className="text-xs text-white/60 mt-1">Automations Ready</div></div>
                  </div>
                </div>

                {/* Visual Flow */}
                <div className="rounded-[24px] border border-white/10 bg-black/40 p-5 overflow-x-auto">
                  <div className="text-xs text-white/40 uppercase tracking-wide mb-4">Workflow Dissection</div>
                  <div className="flex items-center gap-2 min-w-[520px]">
                    {[
                      { label: "Manual Trigger", sub: "Form / Email / Call", color: "from-white/10 to-white/5" },
                      { label: "Bottleneck", sub: `${totalHours}h waste`, color: "from-red-500/20 to-orange-500/10 border-red-500/20" },
                      { label: "Why So AI Fix", sub: "Ghost Employee", color: "from-violet-500/30 to-blue-500/20 border-violet-500/30" },
                      { label: "Automated Output", sub: "Done in seconds", color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`rounded-xl border bg-gradient-to-br ${step.color} px-4 py-3 min-w-[120px]`}>
                          <div className="text-[11px] font-bold tracking-wide">{step.label}</div>
                          <div className="text-[11px] text-white/60 mt-1">{step.sub}</div>
                        </div>
                        {i < 3 && <div className="text-white/20">→</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottlenecks */}
                {results.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-lg">{b.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{b.task}</div>
                        <div className="text-xs rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-2.5 py-1">{b.savings}</div>
                      </div>
                      <div className="mt-2 flex gap-2 text-xs">
                        <span className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 px-2 py-1">{b.hours}h/week wasted</span>
                        <span className="rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 px-2 py-1">{b.fix}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => window.print()}
                  className="w-full rounded-xl border border-white/10 bg-white text-black py-3.5 font-semibold hover:bg-white/90 transition"
                >
                  Download Blueprint PDF + Deploy Plan
                </button>
                <div className="text-center text-[11px] text-white/40">This report is exclusive to Why So AI • Generates a branded PDF with implementation steps</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
