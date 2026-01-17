"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  // JS getDay: 0=Sun
  const map = ["S", "M", "T", "W", "T", "F", "S"];
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

export default function Dashboard() {
  const params = useSearchParams();
  const plan = params.get("plan"); // "annual" | "monthly" | "lifetime" | null

  const [level, setLevel] = useState<Level>("EMT");
  const [userName, setUserName] = useState("FUTURE MEDIC");

  // Core report fields (from your sim)
  const [readiness, setReadiness] = useState<number>(0);
  const [statusLabel, setStatusLabel] = useState<string>("ON DUTY");
  const [weakDomain, setWeakDomain] = useState<string>("General");
  const [weakPct, setWeakPct] = useState<number>(0);

  // Diagnostic extras
  const [passProb, setPassProb] = useState<number | null>(null);
  const [ciLow, setCiLow] = useState<number | null>(null);
  const [ciHigh, setCiHigh] = useState<number | null>(null);
  const [domainBreakdown, setDomainBreakdown] = useState<DomainRow[]>([]);
  const [missed, setMissed] = useState<DiagnosticAnswer | null>(null);

  // Exam date
  const [daysToExam, setDaysToExam] = useState<number>(14);
  const [examDate, setExamDate] = useState<string>("");
  const [showExamSetter, setShowExamSetter] = useState(false);

  // Shift streak
  const [streakDays, setStreakDays] = useState<DayDot[]>([]);
  const [shiftComplete, setShiftComplete] = useState(false);

  useEffect(() => {
    // Level + name
    const lvl = (localStorage.getItem("userLevel") as Level) || "EMT";
    const normalized: Level = lvl === "Paramedic" ? "Paramedic" : "EMT";
    setLevel(normalized);
    setUserName(localStorage.getItem("userName") || "FUTURE MEDIC");

    // Readiness fields (set by Simulator)
    const rs = Number(localStorage.getItem("readinessScore"));
    const wd = localStorage.getItem("weakestDomain");
    const wp = Number(localStorage.getItem("weakestDomainPct"));
    const sl = localStorage.getItem("statusLabel");

    if (Number.isFinite(rs)) setReadiness(clamp(Math.round(rs)));
    if (wd) setWeakDomain(wd);
    if (Number.isFinite(wp)) setWeakPct(clamp(Math.round(wp)));
    if (sl) setStatusLabel(sl);

    // Diagnostic patches
    const pp = Number(localStorage.getItem("passProbability"));
    const cl = Number(localStorage.getItem("confidenceLow"));
    const ch = Number(localStorage.getItem("confidenceHigh"));
    if (Number.isFinite(pp)) setPassProb(clamp(Math.round(pp)));
    if (Number.isFinite(cl)) setCiLow(clamp(Math.round(cl)));
    if (Number.isFinite(ch)) setCiHigh(clamp(Math.round(ch)));

    // Domain breakdown
    const db = safeJSON<DomainRow[]>(localStorage.getItem("domainBreakdown"), []);
    if (Array.isArray(db) && db.length) {
      const sorted = [...db].sort((a, b) => a.accuracy - b.accuracy);
      setDomainBreakdown(sorted.slice(0, 6));
      // ensure weakest is aligned if missing
      if (!wd && sorted[0]?.category) setWeakDomain(sorted[0].category);
      if (!Number.isFinite(wp) && typeof sorted[0]?.accuracy === "number") setWeakPct(sorted[0].accuracy);
    }

    // Missed question (first miss)
    const da = safeJSON<DiagnosticAnswer[]>(localStorage.getItem("diagnosticAnswers"), []);
    if (Array.isArray(da) && da.length) {
      const firstMiss = da.find((a) => a && a.isCorrect === false) || null;
      setMissed(firstMiss);
    }

    // Exam date: prefer explicit date, fallback to daysToExam
    const storedExam = localStorage.getItem("exam-date"); // "YYYY-MM-DD"
    if (storedExam) {
      setExamDate(storedExam);
      const d = daysUntil(storedExam);
      if (Number.isFinite(d)) setDaysToExam(d);
    } else {
      const dte = Number(localStorage.getItem("daysToExam"));
      if (Number.isFinite(dte) && dte >= 0 && dte <= 365) setDaysToExam(Math.round(dte));
    }

    // Shift history (supports BOTH your old key and new streak key)
    const todayStr = new Date().toDateString();
    const shiftHistory = new Set(safeJSON<string[]>(localStorage.getItem("shift-history"), []));
    const lastShiftDate = localStorage.getItem("last-shift-date"); // legacy
    const todayDone = shiftHistory.has(todayStr) || lastShiftDate === todayStr;

    setShiftComplete(todayDone);

    const last7 = getLast7Dates();
    const dots: DayDot[] = last7.map((d) => {
      const active = shiftHistory.has(d.toDateString());
      // if legacy only, just show today as done (no fake fill)
      const legacyOnly = shiftHistory.size === 0 && lastShiftDate;
      return {
        day: dayLetter(d),
        active: legacyOnly ? d.toDateString() === todayStr && todayDone : active,
      };
    });
    setStreakDays(dots);
  }, []);

  const isP = level === "Paramedic";

  const theme = useMemo(() => {
    return {
      isP,
      accent: isP ? "text-rose-300" : "text-cyan-300",
      accentStrong: isP ? "text-rose-200" : "text-cyan-200",
      ring: isP ? "border-rose-400/35" : "border-cyan-400/35",
      bar: isP ? "bg-rose-500" : "bg-cyan-400",
      barGlow: isP ? "shadow-[0_0_12px_#f43f5e]" : "shadow-[0_0_12px_#22d3ee]",
      btn: isP ? "from-rose-600 to-red-500" : "from-blue-600 to-cyan-500",
      chip: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      glowA: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
      glowB: isP ? "bg-red-600/10" : "bg-blue-600/10",
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

  const saveExamDate = () => {
    if (!examDate) return;
    localStorage.setItem("exam-date", examDate);
    const d = daysUntil(examDate);
    if (Number.isFinite(d)) setDaysToExam(d);
    setShowExamSetter(false);
  };

  // EDIT THESE ROUTES IF YOUR APP USES DIFFERENT PATHS
  const ROUTES = {
    drill: `/station?category=${encodeURIComponent(weakDomain)}`,
    diagnostic: "/sim",
    paywall: "/pay",
    review: `/station?mode=review&category=${encodeURIComponent(weakDomain)}`,
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-28 left-1/2 -translate-x-1/2 w-[720px] h-[720px] ${theme.glowA} blur-[140px] rounded-full`} />
        <div className={`absolute -left-40 top-[30%] w-[560px] h-[560px] ${theme.glowB} blur-[140px] rounded-full`} />
        <div className="absolute -right-40 bottom-[-15%] w-[560px] h-[560px] bg-white/5 blur-[160px] rounded-full" />
      </div>

      {/* Sticky Header */}
      <header className="relative z-40 p-6 flex justify-between items-end border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-md sticky top-0">
        <div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5`}>
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
        {/* Anatomy Centerpiece */}
        <section className="relative h-[320px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full flex justify-between px-4 z-20">
            <div className="text-[10px] text-gray-600 font-mono">
              OPERATOR: {theme.icon}
              <br />
              REGION: US-NREMT
            </div>
            <div className="text-[10px] text-gray-600 font-mono text-right">
              FOCUS: {weakDomain.toUpperCase()}
              <br />
              RISK: <span className="text-red-300">{weakPct}%</span>
            </div>
          </div>
          <BodyHeatmap />
        </section>

        {/* The Shift (high retention) */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-slate-900/55 to-black/25 border border-white/10 p-5 rounded-2xl relative overflow-hidden"
        >
          <div className={`absolute inset-0 -z-10 blur-[140px] ${theme.glowA}`} />

          <div className="flex justify-between items-start gap-3 mb-3">
            <div>
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Daily Mission</h3>
              <h2 className="text-xl font-black text-white leading-tight">
                {shiftComplete ? "Shift Complete" : "Start Your Shift"}
              </h2>
              <p className="mt-1 text-[11px] text-slate-400 font-semibold">
                {nextAction.title} • <span className="text-white/70">{nextAction.sub}</span>
              </p>
            </div>

            {/* Real 7-day dots */}
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
            <Link
              href={ROUTES.drill}
              className={`col-span-2 w-full py-3 rounded-xl font-black text-sm text-white border border-white/10 bg-gradient-to-r ${theme.btn} shadow-lg hover:shadow-white/10 transition-all flex items-center justify-center gap-2`}
            >
              <span className={`w-2 h-2 rounded-full ${shiftComplete ? theme.bar : "bg-white animate-pulse"}`} />
              {shiftComplete ? "REVIEW DRILL" : "BEGIN 15-MIN DRILL"}
            </Link>

            <Link
              href={ROUTES.diagnostic}
              className="w-full py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
            >
              RETEST
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

        {/* Critical Flag */}
        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-red-900/10 border border-red-500/30 p-5 rounded-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 animate-pulse font-black">
            !
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-black text-sm truncate">Critical Flag: {weakDomain}</h3>
            <p className="text-red-300/80 text-xs font-semibold">
              Your current risk area is at <span className="text-white font-black">{weakPct}%</span>. Fix plan is ready.
            </p>
          </div>
          <Link
            href={ROUTES.drill}
            className="ml-auto text-xs bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-black transition-colors"
          >
            FIX
          </Link>
        </motion.section>

        {/* Domain Breakdown (real from diagnostic) */}
        {domainBreakdown.length > 0 && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 }}
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
                    <div className="text-sm font-black text-white">{d.accuracy}%</div>
                  </div>
                  <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bar} ${theme.barGlow}`} style={{ width: `${d.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={ROUTES.drill}
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

        {/* Missed question (conversion + motivation) */}
        {missed && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
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

        {/* Pro upgrade nudge (only shows if they came without a plan param) */}
        {!plan && (
          <motion.section
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
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
