'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { evaluateArithmeticExpression } from '@/lib/calculator';
import { analyzePassword, createPassword, getStrengthColor, PasswordOptions } from '@/lib/passwords';

type TodoItem = { id: string; text: string; done: boolean };
type NoteItem = { id: string; title: string; body: string };
type BookmarkItem = { id: string; label: string; url: string };
type ExpenseItem = { id: string; label: string; amount: number; category: string };
type ContactState = { name: string; email: string; company: string; goal: string };
type CalculationHistoryItem = { id: string; expression: string; result: string };

type WeatherSnapshot = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
};

const locationOptions = [
  { name: 'Atlanta', latitude: 33.749, longitude: -84.388 },
  { name: 'Austin', latitude: 30.2672, longitude: -97.7431 },
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
];

function SectionCard({ title, children, description }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function createClientId(prefix: string) {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ContactFormDemo() {
  const [form, setForm] = useState<ContactState>({ name: '', email: '', company: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <SectionCard title="Consultation request demo" description="This repository does not include a backend or email service. Submitting this form only prepares your message locally.">
        <form onSubmit={onSubmit} className="space-y-4">
          {[
            ['name', 'Name'],
            ['email', 'Email'],
            ['company', 'Company'],
          ].map(([key, label]) => (
            <label key={key} className="block text-sm font-medium text-slate-200">
              {label}
              <input
                required={key !== 'company'}
                type={key === 'email' ? 'email' : 'text'}
                value={form[key as keyof ContactState]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-red-400"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-200">
            Project goal
            <textarea
              required
              value={form.goal}
              onChange={(event) => setForm((current) => ({ ...current, goal: event.target.value }))}
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-400"
            />
          </label>
          <button type="submit" className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500">
            Prepare request summary
          </button>
        </form>
      </SectionCard>
      <SectionCard title="Next step" description="Use the generated summary below or email directly.">
        {submitted ? (
          <div className="space-y-3 text-sm text-slate-300">
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-200">
              Demo only: nothing has been sent from this site.
            </p>
            <p><span className="font-semibold text-white">Name:</span> {form.name}</p>
            <p><span className="font-semibold text-white">Email:</span> {form.email}</p>
            <p><span className="font-semibold text-white">Company:</span> {form.company || 'Not provided'}</p>
            <p><span className="font-semibold text-white">Goal:</span> {form.goal}</p>
            <a
              className="inline-flex rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300"
              href={`mailto:hello@whysoai.com?subject=${encodeURIComponent(`Consultation request from ${form.name}`)}&body=${encodeURIComponent(`${form.goal}\n\nCompany: ${form.company || 'Not provided'}\nReply to: ${form.email}`)}`}
            >
              Open email draft
            </a>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Fill out the form to generate a local summary and a mailto draft.</p>
        )}
      </SectionCard>
    </div>
  );
}

export function TodoDemo() {
  const [items, setItems, hydrated] = useLocalStorageState<TodoItem[]>('todo-items', []);
  const [text, setText] = useState('');

  return (
    <SectionCard title="Todo list" description="Stored in localStorage after hydration. Your tasks stay in this browser.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading locally saved tasks…</p> : null}
      <form
        className="mb-4 flex gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!text.trim()) return;
          setItems((current) => [{ id: createClientId('todo'), text: text.trim(), done: false }, ...current]);
          setText('');
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a task"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none"
        />
        <button type="submit" className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500">Add</button>
      </form>
      <div className="space-y-3">
        {items.length === 0 ? <p className="text-sm text-slate-400">No tasks yet.</p> : null}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <label className="flex items-center gap-3 text-slate-200">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => setItems((current) => current.map((currentItem) => currentItem.id === item.id ? { ...currentItem, done: !currentItem.done } : currentItem))}
                className="h-4 w-4 accent-red-500"
              />
              <span className={item.done ? 'text-slate-500 line-through' : ''}>{item.text}</span>
            </label>
            <button type="button" onClick={() => setItems((current) => current.filter((currentItem) => currentItem.id !== item.id))} className="text-sm text-red-300 hover:text-red-200">
              Remove
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function NotesDemo() {
  const [notes, setNotes, hydrated] = useLocalStorageState<NoteItem[]>('notes-items', []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <SectionCard title="Notes" description="A lightweight local-only notes scratchpad.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading notes…</p> : null}
      <form
        className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim() || !body.trim()) return;
          setNotes((current) => [{ id: createClientId('note'), title: title.trim(), body: body.trim() }, ...current]);
          setTitle('');
          setBody('');
        }}
      >
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Quick note" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <button type="submit" className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500">Save</button>
      </form>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {notes.length === 0 ? <p className="text-sm text-slate-400">No notes stored yet.</p> : null}
        {notes.map((note) => (
          <article key={note.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white">{note.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{note.body}</p>
              </div>
              <button type="button" onClick={() => setNotes((current) => current.filter((currentNote) => currentNote.id !== note.id))} className="text-sm text-red-300 hover:text-red-200">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function normalizeUrl(input: string) {
  const candidate = input.startsWith('http://') || input.startsWith('https://') ? input : `https://${input}`;
  const normalizedUrl = new URL(candidate);

  if (normalizedUrl.protocol !== 'http:' && normalizedUrl.protocol !== 'https:') {
    throw new Error('Only http and https URLs are supported.');
  }

  return normalizedUrl.toString();
}

export function BookmarksDemo() {
  const [bookmarks, setBookmarks, hydrated] = useLocalStorageState<BookmarkItem[]>('bookmark-items', []);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <SectionCard title="Bookmarks" description="URLs are validated before they are saved locally.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading bookmarks…</p> : null}
      <form
        className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          try {
            const normalizedUrl = normalizeUrl(url.trim());
            setBookmarks((current) => [{ id: createClientId('bookmark'), label: label.trim() || normalizedUrl, url: normalizedUrl }, ...current]);
            setLabel('');
            setUrl('');
            setError(null);
          } catch {
            setError('Enter a valid URL such as https://example.com.');
          }
        }}
      >
        <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Label" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="example.com" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <button type="submit" className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500">Save</button>
      </form>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      <div className="mt-5 space-y-3">
        {bookmarks.length === 0 ? <p className="text-sm text-slate-400">No bookmarks yet.</p> : null}
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-white">{bookmark.label}</p>
              <a href={bookmark.url} target="_blank" rel="noreferrer" className="text-sm text-red-300 hover:text-red-200">{bookmark.url}</a>
            </div>
            <button type="button" onClick={() => setBookmarks((current) => current.filter((currentBookmark) => currentBookmark.id !== bookmark.id))} className="text-sm text-red-300 hover:text-red-200">Remove</button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function PomodoroDemo() {
  const [timerState, setTimerState] = useState<{ mode: 'Focus' | 'Break'; secondsLeft: number }>({ mode: 'Focus', secondsLeft: 25 * 60 });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setTimerState((current) => {
        if (current.secondsLeft <= 1) {
          const nextMode = current.mode === 'Focus' ? 'Break' : 'Focus';
          return { mode: nextMode, secondsLeft: nextMode === 'Focus' ? 25 * 60 : 5 * 60 };
        }

        return { ...current, secondsLeft: current.secondsLeft - 1 };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const minutes = String(Math.floor(timerState.secondsLeft / 60)).padStart(2, '0');
  const seconds = String(timerState.secondsLeft % 60).padStart(2, '0');

  return (
    <SectionCard title="Pomodoro timer" description="A simple client-side focus timer. Closing the tab resets the countdown.">
      <div className="space-y-6 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">{timerState.mode}</p>
          <p className="mt-3 text-6xl font-bold text-white">{minutes}:{seconds}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setRunning((current) => !current)} className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500">{running ? 'Pause' : 'Start'}</button>
          <button type="button" onClick={() => { setRunning(false); setTimerState({ mode: 'Focus', secondsLeft: 25 * 60 }); }} className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300">Reset</button>
        </div>
      </div>
    </SectionCard>
  );
}

export function ExpenseTrackerDemo() {
  const [expenses, setExpenses, hydrated] = useLocalStorageState<ExpenseItem[]>('expense-items', []);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Operations');

  const totals = useMemo(() => {
    return expenses.reduce<Record<string, number>>((result, item) => {
      result[item.category] = (result[item.category] || 0) + item.amount;
      return result;
    }, {});
  }, [expenses]);

  return (
    <SectionCard title="Expense tracker" description="Local demo data only. No accounting export or backend sync is configured.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading expense history…</p> : null}
      <form
        className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const numericAmount = Number(amount);
          if (!label.trim() || Number.isNaN(numericAmount) || numericAmount <= 0) return;
          setExpenses((current) => [{ id: createClientId('expense'), label: label.trim(), amount: numericAmount, category }, ...current]);
          setLabel('');
          setAmount('');
        }}
      >
        <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Expense label" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" inputMode="decimal" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none">
          <option>Operations</option>
          <option>Marketing</option>
          <option>Software</option>
          <option>Travel</option>
        </select>
        <button type="submit" className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500">Add</button>
      </form>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          {expenses.length === 0 ? <p className="text-sm text-slate-400">No expenses yet.</p> : null}
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
              <div>
                <p className="font-semibold text-white">{expense.label}</p>
                <p className="text-slate-400">{expense.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <span>${expense.amount.toFixed(2)}</span>
                <button type="button" onClick={() => setExpenses((current) => current.filter((currentExpense) => currentExpense.id !== expense.id))} className="text-red-300 hover:text-red-200">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h3 className="font-semibold text-white">Category totals</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {Object.entries(totals).length === 0 ? <p className="text-slate-400">No totals yet.</p> : null}
            {Object.entries(totals).map(([expenseCategory, total]) => (
              <div key={expenseCategory} className="flex items-center justify-between">
                <span>{expenseCategory}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export function WeatherDemo() {
  const [location, setLocation] = useState(locationOptions[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);

  const loadWeather = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,weather_code`,
        { signal: controller.signal },
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const payload = await response.json() as {
        current?: {
          temperature_2m?: number;
          wind_speed_10m?: number;
          weather_code?: number;
          time?: string;
        };
      };
      if (!payload.current || payload.current.temperature_2m === undefined || payload.current.wind_speed_10m === undefined) {
        throw new Error('Unexpected weather payload.');
      }
      setWeather({
        temperature: payload.current.temperature_2m,
        windspeed: payload.current.wind_speed_10m,
        weathercode: payload.current.weather_code ?? 0,
        time: payload.current.time ?? 'Unknown',
      });
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        setError('The weather request timed out. Please try again.');
      } else {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load weather right now.');
      }
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Weather snapshot" description="Public API demo. Results depend on browser network access and the Open-Meteo service.">
      <div className="flex flex-wrap gap-3">
        <select
          value={location.name}
          onChange={(event) => {
            const nextLocation = locationOptions.find((option) => option.name === event.target.value);
            if (nextLocation) setLocation(nextLocation);
          }}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none"
        >
          {locationOptions.map((option) => (
            <option key={option.name}>{option.name}</option>
          ))}
        </select>
        <button type="button" onClick={() => void loadWeather()} disabled={loading} className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Loading…' : 'Fetch weather'}
        </button>
      </div>
      {error ? <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
      {weather ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Temperature</p>
            <p className="mt-2 text-3xl font-semibold text-white">{weather.temperature}°C</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Wind speed</p>
            <p className="mt-2 text-3xl font-semibold text-white">{weather.windspeed} km/h</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Observed at</p>
            <p className="mt-2 text-sm font-semibold text-white">{weather.time}</p>
            <p className="mt-2 text-xs text-slate-500">Code: {weather.weathercode}</p>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}

export function CalculatorDemo() {
  const [history, setHistory, hydrated] = useLocalStorageState<CalculationHistoryItem[]>('calculator-history', []);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string>('');

  const evaluateExpression = () => {
    const nextExpression = expression.trim();

    if (!nextExpression) {
      setResult('Enter an expression.');
      return;
    }

    if (!/^[0-9+\-*/().\s]+$/.test(nextExpression)) {
      setResult('Only simple arithmetic characters are allowed.');
      return;
    }

    try {
      const value = String(evaluateArithmeticExpression(nextExpression));
      setResult(value);
      setHistory((current) => [
        { id: createClientId('calculation'), expression: nextExpression, result: value },
        ...current.filter((item) => item.expression !== nextExpression || item.result !== value),
      ].slice(0, 6));
    } catch {
      setResult('Invalid expression.');
    }
  };

  const appendToken = (token: string) => {
    setExpression((current) => `${current}${token}`);
  };

  const keypadRows = [
    ['(', ')', '⌫', 'C'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '+', '='],
  ];

  return (
    <SectionCard title="Calculator" description="Run quick arithmetic with an on-page keypad and recent local history.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading saved calculations…</p> : null}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <input value={expression} onChange={(event) => setExpression(event.target.value)} placeholder="(12 + 4) / 2" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-red-400 focus:outline-none" />
          <div className="grid grid-cols-4 gap-3">
            {keypadRows.flat().map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => {
                  if (token === '=') {
                    evaluateExpression();
                    return;
                  }

                  if (token === 'C') {
                    setExpression('');
                    setResult('');
                    return;
                  }

                  if (token === '⌫') {
                    setExpression((current) => current.slice(0, -1));
                    return;
                  }

                  appendToken(token);
                }}
                className={token === '=' ? 'rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500' : 'rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300'}
              >
                {token}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={evaluateExpression} className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500">Evaluate</button>
            <button type="button" onClick={() => { setExpression(''); setResult(''); }} className="rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300">Clear</button>
            <button type="button" onClick={() => setExpression('(12 + 4) / 2')} className="rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300">Try example</button>
          </div>
          <p className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-slate-200">{result || 'Result will appear here.'}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-white">Recent calculations</h3>
            <button
              type="button"
              onClick={() => setHistory([])}
              disabled={history.length === 0}
              className="text-sm text-red-300 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear history
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? <p className="text-sm text-slate-400">Evaluate expressions to build a local history.</p> : null}
            {history.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setExpression(item.expression);
                  setResult(item.result);
                }}
                className="block w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-left hover:border-red-400/50"
              >
                <p className="text-sm text-slate-300">{item.expression}</p>
                <p className="mt-1 font-semibold text-white">= {item.result}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export function JokeDemo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);

  const fetchJoke = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke', { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const payload = await response.json() as { setup?: string; punchline?: string };
      if (!payload.setup || !payload.punchline) {
        throw new Error('Unexpected joke payload.');
      }
      setJoke({ setup: payload.setup, punchline: payload.punchline });
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        setError('The joke request timed out. Please try again.');
      } else {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load a joke right now.');
      }
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Joke generator" description="Public API demo. If the service is unreachable, the page surfaces the network error instead of pretending to succeed.">
      <button type="button" onClick={() => void fetchJoke()} disabled={loading} className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? 'Loading…' : 'Fetch joke'}
      </button>
      {error ? <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
      {joke ? (
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-lg font-semibold text-white">{joke.setup}</p>
          <p className="mt-3 text-slate-300">{joke.punchline}</p>
        </div>
      ) : null}
    </SectionCard>
  );
}

export function PasswordGeneratorDemo() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<PasswordOptions>({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [history, setHistory, hydrated] = useLocalStorageState<string[]>('password-history', []);
  const [error, setError] = useState<string | null>(null);

  const analysis = password ? analyzePassword(password) : null;

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setError('Copied to clipboard.');
    } catch {
      setError('Clipboard access is unavailable in this browser context.');
    }
  };

  return (
    <SectionCard title="Password generator" description="Generated locally in the browser. Previous passwords are only stored in localStorage after hydration.">
      {!hydrated ? <p className="text-sm text-slate-400">Loading saved passwords…</p> : null}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="break-all font-mono text-lg text-white">{password || 'Generate a password to preview it here.'}</p>
          </div>
          <label className="block text-sm font-medium text-slate-200">
            Length: <span className="text-red-300">{length}</span>
            <input type="range" min={8} max={32} value={length} onChange={(event) => setLength(Number(event.target.value))} className="mt-3 w-full accent-red-500" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                <input type="checkbox" checked={value} onChange={(event) => setOptions((current) => ({ ...current, [key]: event.target.checked }))} className="h-4 w-4 accent-red-500" />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                try {
                  const nextPassword = createPassword(length, options);
                  setPassword(nextPassword);
                  setHistory((current) => [nextPassword, ...current].slice(0, 10));
                  setError(null);
                } catch (creationError) {
                  setError(creationError instanceof Error ? creationError.message : 'Unable to generate password.');
                }
              }}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"
            >
              Generate password
            </button>
            <button type="button" onClick={() => void copyToClipboard()} className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300">
              Copy
            </button>
          </div>
          {error ? <p className={`text-sm ${error === 'Copied to clipboard.' ? 'text-emerald-300' : 'text-red-300'}`}>{error}</p> : null}
        </div>
        <div className="space-y-5">
          {analysis ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">Strength</h3>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getStrengthColor(analysis.strength)}`}>{analysis.strength}</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-slate-800">
                <div className={`h-3 rounded-full ${getStrengthColor(analysis.strength)}`} style={{ width: `${analysis.score}%` }} />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {analysis.feedback.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h3 className="font-semibold text-white">Recent passwords</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {history.length === 0 ? <p className="text-slate-400">No locally stored passwords yet.</p> : null}
              {history.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 px-3 py-2">
                  <span className="truncate font-mono">{item}</span>
                  <button type="button" onClick={() => setHistory((current) => current.filter((_, currentIndex) => currentIndex !== index))} className="text-red-300 hover:text-red-200">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export function DemoDisclosure() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
      <p>
        This repository currently provides a polished frontend demo. Browser-only tools persist locally when noted, but no authentication, payments,
        or backend submission pipeline is configured here.
      </p>
      <p className="mt-3">
        Need a production rollout plan? Visit <Link href="/contact" className="text-red-300 hover:text-red-200">Contact</Link> to prepare a consultation request.
      </p>
    </div>
  );
}
