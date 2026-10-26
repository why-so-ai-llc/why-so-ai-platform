'use client';

import {
  ArrowRight,
  Check,
  Clock3,
  FileText,
  Globe2,
  ScanLine,
  Upload,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

type Bottleneck = {
  task: string;
  hours: number;
  replacement: string;
  savings: number;
};

const bottleneckOptions = [
  {
    keywords: ['lead', 'contact', 'form'],
    task: 'Lead qualification and data entry',
    replacement: 'AI Sales Qualifier',
  },
  {
    keywords: ['email', 'inbox', 'reply'],
    task: 'Inbox triage and customer replies',
    replacement: 'AI Inbox Agent',
  },
  {
    keywords: ['schedule', 'booking', 'calendar'],
    task: 'Scheduling and appointment follow-ups',
    replacement: 'AI Receptionist',
  },
  {
    keywords: ['report', 'spreadsheet', 'data'],
    task: 'Manual reporting and spreadsheet updates',
    replacement: 'AI Data Operations Agent',
  },
  {
    keywords: ['invoice', 'payment', 'expense'],
    task: 'Invoice processing and payment tracking',
    replacement: 'AI Finance Assistant',
  },
];

const defaultBottlenecks = [
  { task: 'Customer onboarding and support', replacement: 'AI Support Agent' },
  { task: 'Internal handoffs and status updates', replacement: 'AI Workflow Coordinator' },
  { task: 'Document review and information capture', replacement: 'AI Document Assistant' },
  { task: 'Recurring follow-ups and reminders', replacement: 'AI Follow-up Agent' },
  { task: 'Manual research and preparation', replacement: 'AI Research Assistant' },
];

const workflowSteps = [
  { label: 'Current manual process', detail: 'Work starts with a human handoff' },
  { label: 'Bottleneck 1', detail: 'Repetitive work slows the team' },
  { label: 'Bottleneck 2', detail: 'Manual steps create delays' },
  { label: 'AI solution', detail: 'An AI employee handles the routine' },
  { label: 'Automated future', detail: 'Work moves forward automatically' },
];

function createBottlenecks(input: string): Bottleneck[] {
  const normalizedInput = input.toLowerCase();
  const matched = bottleneckOptions
    .filter((option) => option.keywords.some((keyword) => normalizedInput.includes(keyword)))
    .map(({ task, replacement }) => ({ task, replacement }));
  const candidates = [...matched, ...defaultBottlenecks];
  const unique = candidates.filter(
    (candidate, index) => candidates.findIndex((item) => item.task === candidate.task) === index,
  );

  return unique.slice(0, 4).map(({ task, replacement }) => ({
    task,
    replacement,
    hours: Math.floor(Math.random() * 11) + 5,
    savings: Math.floor(Math.random() * 2501) + 500,
  }));
}

export default function OpsXRayPage() {
  const [url, setUrl] = useState('');
  const [pain, setPain] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Bottleneck[] | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    },
    [],
  );

  const handleFileChange = (file?: File) => {
    setError('');
    if (!file) {
      setFileName('');
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'txt', 'docx'].includes(extension)) {
      setFileName('');
      setError('Choose a PDF, TXT, or DOCX file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileName('');
      setError('The file must be 10 MB or smaller.');
      return;
    }

    setFileName(file.name);
  };

  const analyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!url.trim() && !pain.trim() && !fileName) {
      setError('Add a website, describe a time-waster, or upload an SOP to begin.');
      return;
    }
    if (url.trim()) {
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') throw new Error();
      } catch {
        setError('Enter a valid website URL beginning with https:// or http://.');
        return;
      }
    }

    setLoading(true);
    setResults(null);
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress((current) => Math.min(current + 3, 96));
    }, 100);

    await new Promise<void>((resolve) => window.setTimeout(resolve, 2500));
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = null;
    setProgress(100);
    setResults(createBottlenecks(`${url} ${pain} ${fileName}`));
    setLoading(false);
  };

  const totalHours = results?.reduce((total, item) => total + item.hours, 0) ?? 0;
  const totalSavings = results?.reduce((total, item) => total + item.savings, 0) ?? 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-violet-500/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-violet-200">
            <ScanLine aria-hidden="true" size={14} />
            Business automation audit
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            AI Ops X-Ray
            <span className="mt-2 block text-white/55">Instant Business Automation Audit</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            Map the work slowing your team down. Get a practical, client-side estimate of the time and
            cost automation could return to your business.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={analyze}
            className="no-print rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-7"
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl border border-violet-300/15 bg-violet-400/10 p-2.5 text-violet-200">
                <Workflow aria-hidden="true" size={19} />
              </div>
              <div>
                <h2 className="font-semibold">Business inputs</h2>
                <p className="mt-1 text-sm text-white/45">Your information stays in this browser.</p>
              </div>
            </div>

            <div>
              <label htmlFor="business-url" className="text-sm font-medium text-white/75">
                Business Website URL
              </label>
              <div className="relative mt-2">
                <Globe2 aria-hidden="true" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  id="business-url"
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="sop-upload" className="text-sm font-medium text-white/75">
                SOP / Employee Handbook <span className="text-white/35">(optional)</span>
              </label>
              <label
                htmlFor="sop-upload"
                className="mt-2 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-4 transition hover:border-violet-300/40 hover:bg-white/[0.03]"
              >
                <span className="rounded-lg bg-white/[0.06] p-2.5 text-white/60">
                  <Upload aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white/75">
                    {fileName || 'Choose PDF, TXT, or DOCX'}
                  </span>
                  <span className="mt-1 block text-xs text-white/40">Filename only · Maximum 10 MB</span>
                </span>
                {fileName && <Check aria-label="File selected" size={17} className="text-emerald-400" />}
                <input
                  id="sop-upload"
                  type="file"
                  accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="sr-only"
                  onChange={(event) => handleFileChange(event.currentTarget.files?.[0])}
                />
              </label>
            </div>

            <div className="mt-5">
              <label htmlFor="time-waster" className="text-sm font-medium text-white/75">
                What&apos;s your biggest time-waster?
              </label>
              <textarea
                id="time-waster"
                value={pain}
                onChange={(event) => setPain(event.target.value)}
                placeholder="ex: manually copying leads from our contact form into a spreadsheet..."
                rows={4}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15"
              />
            </div>

            {error && (
              <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-rose-300">
                <X aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? 'Running your X-Ray…' : 'Run My X-Ray'}
              {!loading && <ArrowRight aria-hidden="true" size={17} />}
            </button>

            {loading && (
              <div className="relative mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-rose-400 shadow-[0_0_12px_3px_rgba(251,113,133,0.45)]" />
                <div className="flex items-center justify-between text-xs text-white/55">
                  <span>Scanning process patterns</span>
                  <span aria-live="polite">{Math.round(progress)}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label="X-Ray scan progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                >
                  <div
                    className="h-full rounded-full bg-violet-400 transition-[width] duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="h-2 animate-pulse rounded-full bg-white/10" />
                  ))}
                </div>
              </div>
            )}
          </form>

          <section aria-live="polite" aria-label="X-Ray results" className="space-y-4">
            {!results && !loading && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/60">
                  <ScanLine aria-hidden="true" size={21} />
                </div>
                <h2 className="mt-5 text-xl font-semibold">Your audit starts here</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                  Share a website, SOP filename, or the repetitive work your team handles. Your
                  workflow map and estimated ROI will appear here.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: '3–4', label: 'Bottlenecks mapped' },
                    { value: '5–15h', label: 'Potential weekly hours' },
                    { value: '$500+', label: 'Estimated monthly value' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/[0.07] bg-black/20 p-3.5">
                      <div className="font-semibold text-white/85">{item.value}</div>
                      <div className="mt-1 text-xs text-white/40">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-4" aria-label="Loading audit results">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="h-4 w-2/5 rounded bg-white/10" />
                    <div className="mt-4 h-3 w-3/4 rounded bg-white/[0.07]" />
                    <div className="mt-5 h-8 w-1/3 rounded-lg bg-white/[0.07]" />
                  </div>
                ))}
              </div>
            )}

            {results && (
              <>
                <div className="print-document rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.14] to-white/[0.025] p-6 sm:p-7">
                  <div className="print-only hidden text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                    Why So AI · Automation Blueprint
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-violet-200">
                    <Zap aria-hidden="true" size={15} />
                    Your automation opportunity
                  </div>
                  <p className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                    You could save <span className="text-emerald-300">{totalHours} hours</span> /{' '}
                    <span className="text-emerald-300">${totalSavings.toLocaleString()}</span> per month
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    {results.length} opportunities identified · Estimates based on the information provided
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Workflow aria-hidden="true" size={17} className="text-violet-200" />
                    Workflow map
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-5 sm:items-center">
                    {workflowSteps.map((step, index) => (
                      <div key={step.label} className="flex items-center gap-2 sm:flex-col sm:items-stretch">
                        <div
                          className={`min-w-0 flex-1 rounded-xl border p-3 ${
                            index === 2
                              ? 'border-violet-300/20 bg-violet-400/10'
                              : index === 4
                                ? 'border-emerald-300/20 bg-emerald-400/[0.06]'
                                : 'border-white/[0.08] bg-black/20'
                          }`}
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                            {step.label}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-white/40">{step.detail}</div>
                        </div>
                        {index < workflowSteps.length - 1 && (
                          <ArrowRight aria-hidden="true" size={15} className="shrink-0 text-white/30 sm:mx-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {results.map((item) => (
                    <article
                      key={item.task}
                      className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-2.5 text-white/65">
                            <FileText aria-hidden="true" size={17} />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold">{item.task}</h3>
                            <p className="mt-1.5 text-xs text-white/45">
                              AI replacement: <span className="text-violet-200">{item.replacement}</span>
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1 text-xs font-medium text-emerald-200">
                          ${item.savings.toLocaleString()} / month
                        </span>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-rose-300/[0.07] px-2.5 py-1.5 text-xs text-rose-200">
                        <Clock3 aria-hidden="true" size={13} />
                        {item.hours} hours wasted / week
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="no-print inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3.5 text-sm font-semibold transition hover:border-violet-300/40 hover:bg-violet-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
                >
                  <FileText aria-hidden="true" size={17} />
                  Generate My Automation Blueprint PDF
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
