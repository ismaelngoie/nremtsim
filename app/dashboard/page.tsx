"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type Level = "EMT" | "Paramedic";

type DomainRow = {
  category: string;
  correct: number;
  total: number;
  accuracy: number; // 0..100
};

type DiagnosticAnswer = {
  id: number;
  category: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  text: string;
  options: string[];
  explanation: string;
};

type DayDot = { day: string; active: boolean };

type PerfMap = Record<
  string,
  {
    attempts: number;
    last: number; // 0..100
    best: number; // 0..100
    avg: number; // 0..100
    updatedAt?: number;
  }
>;

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function safeJSON<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function dayLetter(d: Date) {
  const map = ["S", "M", "T", "W", "T", "F", "S"]; // 0=Sun
  return map[d.getDay()];
}

function getLast7Dates() {
  const today = new Date();
  const out: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(d);
  }
  return out;
}

function daysUntil(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  const diff = d.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function normalizePerf(raw: unknown): PerfMap {
  const out: PerfMap = {};

  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const anyItem = item as any;
      const category = String(anyItem.category || anyItem.name || "").trim();
      if (!category) continue;
      const score = Number(anyItem.score ?? anyItem.accuracy ?? anyItem.last ?? anyItem.value);
      if (!Number.isFinite(score)) continue;
      const s = clamp(Math.round(score));
      const attempts = Number(anyItem.attempts);
      const a = Number.isFinite(attempts) && attempts > 0 ? Math.floor(attempts) : 1;

      out[category] = {
        attempts: a,
        last: s,
        best: clamp(Math.round(anyItem.best ?? s)),
        avg: clamp(Math.round(anyItem.avg ?? s)),
        updatedAt: Number(anyItem.updatedAt) || Date.now(),
      };
    }
    return out;
  }

  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, any>;
    for (const [categoryRaw, val] of Object.entries(obj)) {
      const category = String(categoryRaw || "").trim();
      if (!category) continue;

      if (typeof val === "number") {
        const s = clamp(Math.round(val));
        out[category] = { attempts: 1, last: s, best: s, avg: s, updatedAt: Date.now() };
        continue;
      }

      if (val && typeof val === "object") {
        const last = Number(val.last ?? val.score ?? val.accuracy ?? val.value);
        if (!Number.isFinite(last)) continue;
        const l = clamp(Math.round(last));
        const attempts = Number(val.attempts);
        const a = Number.isFinite(attempts) && attempts > 0 ? Math.floor(attempts) : 1;
        const best = Number(val.best);
        const avg = Number(val.avg);

        out[category] = {
          attempts: a,
          last: l,
          best: Number.isFinite(best) ? clamp(Math.round(best)) : l,
          avg: Number.isFinite(avg) ? clamp(Math.round(avg)) : l,
          updatedAt: Number(val.updatedAt) || Date.now(),
        };
      }
    }
  }

  return out;
}

function readFirstExistingJSON<T>(keys: string[], fallback: T): T {
  for (const k of keys) {
    const raw = typeof window !== "undefined" ? localStorage.getItem(k) : null;
    if (!raw) continue;
    return safeJSON<T>(raw, fallback);
  }
  return fallback;
}

export default function Dashboard() {
  const [plan, setPlan] = useState<string | null>(null);

  const [level, setLevel] = useState<Level>("EMT");
  const [userName, setUserName] = useState("FUTURE MEDIC");

  const [readiness, setReadiness] = useState<number>(42);
  const [statusLabel, setStatusLabel] = useState<string>("ON DUTY");
  const [weakDomain, setWeakDomain] = useState<string>("General");
  const [weakPct, setWeakPct] = useState<number>(0);

  const [passProb, setPassProb] = useState<number | null>(null);
  const [ciLow, setCiLow] = useState<number | null>(null);
  const [ciHigh, setCiHigh] = useState<number | null>(null);

  const [domainBreakdown, setDomainBreakdown] = useState<DomainRow[]>([]);
  const [missed, setMissed] = useState<DiagnosticAnswer | null>(null);

  const [daysToExam, setDaysToExam] = useState<number>(14);
  const [examDate, setExamDate] = useState<string>("");
  const [showExamSetter, setShowExamSetter] = useState(false);

  const [streakDays, setStreakDays] = useState<DayDot[]>([]);
  const [shiftComplete, setShiftComplete] = useState(false);

  const [perf, setPerf] = useState<PerfMap>({});

  const isP = level === "Paramedic";

  const theme = useMemo(() => {
    return {
      bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      accent: isP ? "text-rose-300" : "text-cyan-300",
      accentStrong: isP ? "text-rose-200" : "text-cyan-200",
      bar: isP ? "bg-rose-500" : "bg-cyan-400",
      btn: isP ? "from-rose-600 to-red-500" : "from-blue-600 to-cyan-500",
      chip: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      glowA: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
      glowB: isP ? "bg-red-600/10" : "bg-blue-600/10",
      grid: isP
        ? "bg-[linear-gradient(transparent_50%,rgba(244,63,94,0.05)_50%)]"
        : "bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)]",
      icon: isP ? "⚡️" : "🚑",
    };
  }, [isP]);

  const statusTone = useMemo(() => {
    if (readiness >= 80) return "text-emerald-300";
    if (readiness >= 65) return "text-yellow-300";
    return "text-red-300";
  }, [readiness]);

  const nextAction = useMemo(() => {
    if (readiness < 65) return { title: "Fix your weakest domain", sub: `Start ${weakDomain} drills now.` };
    if (readiness < 80) return { title: "Stabilize + retest", sub: `Do a drill then run a full sim.` };
    return { title: "Maintain peak readiness", sub: `Full sim + review misses.` };
  }, [readiness, weakDomain]);

  const ROUTES = useMemo(
    () => ({
      drill: `/station?category=${encodeURIComponent(weakDomain)}`,
      simulator: "/simulator", // you requested this path
      paywall: "/pay",
      review: `/station?mode=review&category=${encodeURIComponent(weakDomain)}`,
    }),
    [weakDomain]
  );

  const computeStreakDots = useCallback(() => {
    const todayStr = new Date().toDateString();
    const shiftHistory = new Set(safeJSON<string[]>(localStorage.getItem("shift-history"), []));
    const lastShiftDate = localStorage.getItem("last-shift-date"); // legacy
    const todayDone = shiftHistory.has(todayStr) || lastShiftDate === todayStr;

    setShiftComplete(todayDone);

    const last7 = getLast7Dates();
    const dots: DayDot[] = last7.map((d) => {
      const active = shiftHistory.has(d.toDateString());
      const legacyOnly = shiftHistory.size === 0 && !!lastShiftDate;
      return {
        day: dayLetter(d),
        active: legacyOnly ? d.toDateString() === todayStr && todayDone : active,
      };
    });
    setStreakDays(dots);
  }, []);

  const markShiftToday = useCallback(() => {
    const todayStr = new Date().toDateString();
    const existing = safeJSON<string[]>(localStorage.getItem("shift-history"), []);
    const set = new Set(existing);
    set.add(todayStr);
    localStorage.setItem("shift-history", JSON.stringify(Array.from(set)));
    localStorage.setItem("last-shift-date", todayStr);

    setShiftComplete(true);

    const last7 = getLast7Dates();
    const dots: DayDot[] = last7.map((d) => ({
      day: dayLetter(d),
      active: set.has(d.toDateString()),
    }));
    setStreakDays(dots);
  }, []);

  const saveExamDate = useCallback(() => {
    if (!examDate) return;
    localStorage.setItem("exam-date", examDate);
    const d = daysUntil(examDate);
    if (Number.isFinite(d)) setDaysToExam(d);
    setShowExamSetter(false);
  }, [examDate]);

  const refreshFromStorage = useCallback(() => {
    // Level + name
    const lvl = (localStorage.getItem("userLevel") as Level) || "EMT";
    const normalized: Level = lvl === "Paramedic" ? "Paramedic" : "EMT";
    setLevel(normalized);
    setUserName(localStorage.getItem("userName") || "FUTURE MEDIC");

    // Readiness fields
    const rs = Number(localStorage.getItem("readinessScore"));
    const wd = localStorage.getItem("weakestDomain");
    const wp = Number(localStorage.getItem("weakestDomainPct"));
    const sl = localStorage.getItem("statusLabel");

    if (Number.isFinite(rs)) setReadiness(clamp(Math.round(rs)));
    if (wd) setWeakDomain(wd);
    if (Number.isFinite(wp)) setWeakPct(clamp(Math.round(wp)));
    if (sl) setStatusLabel(sl);

    // Diagnostic extras
    const pp = Number(localStorage.getItem("passProbability"));
    const cl = Number(localStorage.getItem("confidenceLow"));
    const ch = Number(localStorage.getItem("confidenceHigh"));
    setPassProb(Number.isFinite(pp) ? clamp(Math.round(pp)) : null);
    setCiLow(Number.isFinite(cl) ? clamp(Math.round(cl)) : null);
    setCiHigh(Number.isFinite(ch) ? clamp(Math.round(ch)) : null);

    // Domain breakdown
    const db = safeJSON<DomainRow[]>(localStorage.getItem("domainBreakdown"), []);
    if (Array.isArray(db) && db.length) {
      const sorted = [...db].sort((a, b) => a.accuracy - b.accuracy);
      setDomainBreakdown(sorted.slice(0, 6));
      if (!wd && sorted[0]?.category) setWeakDomain(sorted[0].category);
      if (!Number.isFinite(wp) && typeof sorted[0]?.accuracy === "number") setWeakPct(sorted[0].accuracy);
    } else {
      setDomainBreakdown([]);
    }

    // Missed question
    const da = safeJSON<DiagnosticAnswer[]>(localStorage.getItem("diagnosticAnswers"), []);
    if (Array.isArray(da) && da.length) {
      setMissed(da.find((a) => a && a.isCorrect === false) || null);
    } else {
      setMissed(null);
    }

    // Exam date
    const storedExam = localStorage.getItem("exam-date");
    if (storedExam) {
      setExamDate(storedExam);
      const d = daysUntil(storedExam);
      if (Number.isFinite(d)) setDaysToExam(d);
    } else {
      const dte = Number(localStorage.getItem("daysToExam"));
      if (Number.isFinite(dte) && dte >= 0 && dte <= 365) setDaysToExam(Math.round(dte));
    }

    // Performance
    const perfKeys = [
      "category-performance",
      "categoryPerformance",
      "shift-performance",
      "shiftPerformance",
      "performanceByCategory",
      "domainPerformance",
      "stationPerformance",
    ];
    const rawPerf = readFirstExistingJSON<unknown>(perfKeys, {});
    let perfMap = normalizePerf(rawPerf);

    // Merge last result if present
    const lastResultKeys = ["last-shift-result", "lastShiftResult", "lastDrillResult", "stationLastResult", "last-session-result"];
    const lastRes = readFirstExistingJSON<any>(lastResultKeys, null);

    if (lastRes && typeof lastRes === "object") {
      const cat = String(lastRes.category || lastRes.domain || "").trim();
      const scoreNum = Number(lastRes.score ?? lastRes.accuracy ?? lastRes.value);
      if (cat && Number.isFinite(scoreNum)) {
        const score = clamp(Math.round(scoreNum));
        const existing = perfMap[cat];

        if (!existing || existing.last !== score) {
          const attempts = existing ? existing.attempts + 1 : 1;
          const best = existing ? Math.max(existing.best, score) : score;
          const avg = existing ? clamp(Math.round((existing.avg * existing.attempts + score) / attempts)) : score;
          perfMap[cat] = { attempts, last: score, best, avg, updatedAt: Date.now() };

          localStorage.setItem("category-performance", JSON.stringify(perfMap));
        }
      }
    }

    setPerf(perfMap);

    // Streak
    computeStreakDots();
  }, [computeStreakDots]);

  // PLAN: read ?plan= from URL on client (no useSearchParams -> no prerender crash)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sp = new URLSearchParams(window.location.search);
    const p = sp.get("plan");

    if (p) {
      setPlan(p);
      localStorage.setItem("userPlan", p);
    } else {
      setPlan(localStorage.getItem("userPlan"));
    }
  }, []);

  // Load + refresh on focus/visibility so returning from /station updates dots/perf
  useEffect(() => {
    if (typeof window === "undefined") return;

    refreshFromStorage();

    const onFocus = () => refreshFromStorage();
    window.addEventListener("focus", onFocus);

    const onVis = () => {
      if (document.visibilityState === "visible") refreshFromStorage();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [refreshFromStorage]);

  const perfRows = useMemo(() => {
    const entries = Object.entries(perf).map(([category, v]) => ({ category, ...v }));

    if (entries.length === 0 && domainBreakdown.length > 0) {
      return domainBreakdown.slice(0, 6).map((d) => ({
        category: d.category,
        attempts: Math.max(1, d.total || 1),
        last: clamp(Math.round(d.accuracy)),
        best: clamp(Math.round(d.accuracy)),
        avg: clamp(Math.round(d.accuracy)),
        updatedAt: Date.now(),
      }));
    }

    return entries.sort((a, b) => a.last - b.last).slice(0, 6);
  }, [perf, domainBreakdown]);

  return (
    <div className={`min-h-screen ${theme.bg} text-white pb-32 relative overflow-hidden`}>
      {/* Background */}
      <div className={`fixed inset-0 pointer-events-none ${theme.grid} bg-[length:100%_4px] opacity-20`} />
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-28 left-1/2 -translate-x-1/2 w-[720px] h-[720px] ${theme.glowA} blur-[140px] rounded-full`} />
        <div className={`absolute -left-40 top-[30%] w-[560px] h-[560px] ${theme.glowB} blur-[140px] rounded-full`} />
        <div className="absolute -right-40 bottom-[-15%] w-[560px] h-[560px] bg-white/5 blur-[160px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-40 p-6 flex justify-between items-end border-b border-white/5 bg-black/10 backdrop-blur-md sticky top-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-slate-200">NREMTS</span>
              <span className={`text-[11px] font-mono ${theme.accent}`}>{level} MODE</span>
            </div>

            {plan && (
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.chip}`}>
                <span className={`text-[10px] font-black tracking-widest uppercase ${theme.chipText}`}>plan</span>
                <span className="text-[11px] font-mono text-white">{plan.toUpperCase()}</span>
              </div>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-black text-white tracking-tight leading-none">
            {statusLabel} <span className="text-white/40">•</span> <span className="text-white/70">{userName}</span>
          </h1>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>T-{daysToExam} days</span>
            <span className="text-white/15">|</span>
            <button onClick={() => setShowExamSetter((v) => !v)} className="text-slate-300 hover:text-white">
              {examDate ? "edit exam date" : "set exam date"}
            </button>
          </div>

          {showExamSetter && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none"
              />
              <button
                onClick={saveExamDate}
                className={`px-4 py-2 rounded-xl font-black text-sm border border-white/10 bg-gradient-to-r ${theme.btn}`}
              >
                SAVE
              </button>
              <button
                onClick={() => setShowExamSetter(false)}
                className="px-4 py-2 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10"
              >
                CANCEL
              </button>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="flex items-end justify-end gap-2">
            <span className={`text-4xl font-black ${theme.accent}`}>{readiness}</span>
            <span className="text-sm font-bold text-gray-500 mb-1">%</span>
          </div>

          <div className={`text-[11px] font-black ${statusTone} uppercase tracking-widest`}>
            {readiness >= 80 ? "ON TRACK" : readiness >= 65 ? "BORDERLINE" : "AT RISK"}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            {passProb !== null && (
              <div className={`px-3 py-1.5 rounded-full border ${theme.chip}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${theme.chipText}`}>pass</span>{" "}
                <span className="text-[11px] font-mono text-white">{passProb}%</span>
              </div>
            )}

            {ciLow !== null && ciHigh !== null && (
              <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">ci</span>{" "}
                <span className="text-[11px] font-mono text-white">
                  {ciLow}–{ciHigh}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 p-4 space-y-4 max-w-lg mx-auto">
        {/* Anatomy */}
        <section className="relative h-[340px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full flex justify-between px-4 z-20">
            <div className="text-[10px] text-gray-600 font-mono leading-tight">
              OPERATOR: {theme.icon}
              <br />
              REGION: US-NREMT
            </div>
            <div className="text-[10px] text-gray-600 font-mono text-right leading-tight">
              FOCUS: {weakDomain.toUpperCase()}
              <br />
              RISK: <span className="text-red-300">{weakPct}%</span>
            </div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-t ${theme.glowA} to-transparent rounded-full opacity-50 blur-3xl`} />
            <BodyHeatmap />
          </div>
        </section>

        {/* Daily Mission */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-slate-900/55 to-black/25 border border-white/10 p-5 rounded-2xl relative overflow-hidden"
        >
          <div className={`absolute inset-0 -z-10 blur-[140px] ${theme.glowA}`} />

          <div className="flex justify-between items-start gap-3 mb-3">
            <div>
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Daily Mission</h3>

              {/* requested: red for Paramedic / cyan for EMT when not complete */}
              <h2 className={`text-xl font-black leading-tight ${shiftComplete ? "text-white" : theme.accentStrong}`}>
                {shiftComplete ? "Shift Complete" : "Start Your Shift"}
              </h2>

              <p className="mt-1 text-[11px] text-slate-400 font-semibold">
                {nextAction.title} • <span className="text-white/70">{nextAction.sub}</span>
              </p>
            </div>

            {/* Real dots */}
            <div className="flex gap-2">
              {streakDays.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${
                      item.active ? `${theme.bar} text-black` : "bg-white/10 text-gray-500"
                    }`}
                  >
                    {item.active ? "✓" : ""}
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {/* requested: clicking drill fills today immediately */}
            <Link
              href={ROUTES.drill}
              onClick={() => markShiftToday()}
              className={`col-span-2 w-full py-3 rounded-xl font-black text-sm text-white border border-white/10 bg-gradient-to-r ${theme.btn} shadow-lg hover:shadow-white/10 transition-all flex items-center justify-center gap-2`}
            >
              <span className={`w-2 h-2 rounded-full ${shiftComplete ? theme.bar : "bg-white animate-pulse"}`} />
              {shiftComplete ? "REVIEW DRILL" : "BEGIN 15-MIN DRILL"}
            </Link>

            <Link
              href={ROUTES.simulator}
              className="w-full py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
            >
              FULL SIM
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 justify-center opacity-95">
            <div className={`px-3 py-1.5 rounded-full border ${theme.chip}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.chipText}`}>focus</span>{" "}
              <span className="text-[11px] font-mono text-white">{weakDomain}</span>
            </div>
            <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">target</span>{" "}
              <span className="text-[11px] font-mono text-white">+6 readiness today</span>
            </div>
          </div>
        </motion.section>

        {/* Performance */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.06 }}
          className="rounded-2xl bg-slate-900/45 border border-white/10 p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Performance</h3>
            <span className={`text-[11px] font-mono ${theme.accent}`}>
              {Object.keys(perf).length > 0 ? "from your drills" : domainBreakdown.length > 0 ? "from your diagnostic" : "—"}
            </span>
          </div>

          {perfRows.length === 0 ? (
            <div className="mt-3 text-sm text-slate-400">No performance data yet. Start a drill or run a full simulator.</div>
          ) : (
            <div className="mt-4 space-y-2">
              {perfRows.map((r) => (
                <div key={r.category} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-slate-100 truncate">{r.category}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        last {r.last}% • best {r.best}% • avg {r.avg}% • {r.attempts}x
                      </div>
                    </div>
                    <div
                      className={`text-sm font-black ${
                        r.last >= 80 ? "text-emerald-300" : r.last >= 65 ? "text-yellow-300" : "text-red-300"
                      }`}
                    >
                      {r.last}%
                    </div>
                  </div>

                  <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bar}`} style={{ width: `${clamp(r.last)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Domain Breakdown */}
        {domainBreakdown.length > 0 && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.09 }}
            className="rounded-2xl bg-slate-900/45 border border-white/10 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Domain Breakdown</h3>
              <span className={`text-[11px] font-mono ${theme.accent}`}>from your diagnostic</span>
            </div>

            <div className="mt-4 space-y-2">
              {domainBreakdown.slice(0, 5).map((d) => (
                <div key={d.category} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold text-slate-100">{d.category}</div>
                    <div className="text-sm font-black text-white">{clamp(Math.round(d.accuracy))}%</div>
                  </div>
                  <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bar}`} style={{ width: `${clamp(d.accuracy)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={ROUTES.drill}
                onClick={() => markShiftToday()}
                className={`py-3 rounded-xl font-black text-sm text-white border border-white/10 bg-gradient-to-r ${theme.btn} flex items-center justify-center`}
              >
                START FIX PLAN →
              </Link>
              <Link
                href={ROUTES.review}
                className="py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
              >
                REVIEW MISSES
              </Link>
            </div>
          </motion.section>
        )}

        {/* Last Missed */}
        {missed && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="rounded-2xl bg-slate-900/45 border border-white/10 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Last Missed</h3>
              <span className={`text-[11px] font-mono ${theme.accent}`}>{missed.category}</span>
            </div>

            <div className="mt-3 text-sm font-extrabold text-white leading-relaxed">{missed.text}</div>

            <div className="mt-3 text-[11px] text-slate-400 font-semibold">
              Tap “Review Misses” to see rationales and lock it in.
            </div>

            <div className="mt-4">
              <Link
                href={ROUTES.review}
                className="w-full py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
              >
                REVIEW MISSES →
              </Link>
            </div>
          </motion.section>
        )}

        {/* Pro upgrade */}
        {!plan && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.14 }}
            className="rounded-2xl bg-black/25 border border-white/10 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-300">Unlock the full machine</div>
                <div className="mt-1 text-sm text-slate-300 leading-relaxed">
                  Full sims + rationales + auto fix plan every day until you pass.
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full border ${theme.chip}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${theme.chipText}`}>pro</span>{" "}
                <span className="text-[11px] font-mono text-white">LOCKED</span>
              </div>
            </div>

            <Link
              href={ROUTES.paywall}
              className={`mt-4 w-full py-3 rounded-xl font-black text-sm text-white border border-white/10 bg-gradient-to-r ${theme.btn} flex items-center justify-center`}
            >
              UNLOCK MY PLAN →
            </Link>
          </motion.section>
        )}
      </main>

      <Dock />
    </div>
  );
}
