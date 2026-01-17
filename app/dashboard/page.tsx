"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { questions } from "@/lib/questions";

// --- Types ---
type Level = "EMT" | "Paramedic";

type DomainRow = {
  category: string;
  correct: number;
  total: number;
  accuracy: number;
};

type DiagnosticAnswer = {
  id: number;
  category: string;
  isCorrect: boolean;
  text: string;
};

type DayDot = { day: string; active: boolean; date: string };

// --- Helpers ---
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

function daysUntil(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  const diff = d.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getLast7Days() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates: DayDot[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push({
      day: days[d.getDay()],
      active: false, // will be filled by logic
      date: d.toDateString(),
    });
  }
  return dates;
}

// --- Main Content Component (Logic lives here) ---
function DashboardContent() {
  const searchParams = useSearchParams();
  
  // --- State ---
  // User Identity
  const [level, setLevel] = useState<Level>("EMT");
  const [userName, setUserName] = useState("OPERATOR");
  const [plan, setPlan] = useState<string | null>(null);

  // Core Metrics
  const [readiness, setReadiness] = useState<number>(0);
  const [weakDomain, setWeakDomain] = useState<string>("General");
  const [weakPct, setWeakPct] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Exam Date Logic
  const [daysToExam, setDaysToExam] = useState<number>(14);
  const [examDate, setExamDate] = useState<string>(""); // YYYY-MM-DD
  const [showExamSetter, setShowExamSetter] = useState(false);

  // Shift & Streak Logic
  const [shiftComplete, setShiftComplete] = useState(false);
  const [streakDays, setStreakDays] = useState<DayDot[]>([]);
  
  // Data for Lists
  const [domainBreakdown, setDomainBreakdown] = useState<DomainRow[]>([]);
  const [missed, setMissed] = useState<DiagnosticAnswer | null>(null);

  // --- Theme Engine ---
  const isP = level === "Paramedic";
  const theme = useMemo(() => ({
    bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
    accent: isP ? "text-rose-400" : "text-cyan-400",
    accentDark: isP ? "text-rose-600" : "text-cyan-600",
    border: isP ? "border-rose-500/20" : "border-cyan-500/20",
    btn: isP ? "bg-gradient-to-r from-rose-600 to-red-500" : "bg-gradient-to-r from-blue-600 to-cyan-500",
    softBg: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
    bar: isP ? "bg-rose-500" : "bg-cyan-400",
    barGlow: isP ? "shadow-[0_0_12px_#f43f5e]" : "shadow-[0_0_12px_#22d3ee]",
    grid: isP 
      ? "bg-[linear-gradient(transparent_50%,rgba(244,63,94,0.05)_50%)]" 
      : "bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)]",
    chip: isP ? "bg-rose-500/10 border-rose-500/20 text-rose-200" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-200",
  }), [isP]);

  // --- Hydration & Logic ---
  useEffect(() => {
    // 1. Identity
    const storedLevel = (localStorage.getItem("userLevel") as Level) || "EMT";
    setLevel(storedLevel === "Paramedic" ? "Paramedic" : "EMT");
    setUserName(localStorage.getItem("userName") || "OPERATOR");
    
    // 2. Plan Detection
    const urlPlan = searchParams.get("plan");
    if (urlPlan) {
      setPlan(urlPlan);
      localStorage.setItem("userPlan", urlPlan);
    } else {
      setPlan(localStorage.getItem("userPlan"));
    }

    // 3. Exam Date
    const storedExam = localStorage.getItem("exam-date");
    if (storedExam) {
      setExamDate(storedExam);
      const d = daysUntil(storedExam);
      if (Number.isFinite(d)) setDaysToExam(d);
    } else {
      const dte = Number(localStorage.getItem("daysToExam"));
      if (Number.isFinite(dte)) setDaysToExam(dte);
    }

    // 4. Readiness & Weakness (From Diagnostic or Sim)
    const rs = Number(localStorage.getItem("readinessScore"));
    const wd = localStorage.getItem("weakestDomain");
    const wp = Number(localStorage.getItem("weakestDomainPct"));
    
    // Calculate progress based on mastered questions
    const mastered = safeJSON<number[]>(localStorage.getItem("mastered-ids"), []);
    setQuestionsAnswered(mastered.length);
    const progressBoost = Math.min(15, Math.floor(mastered.length / 5)); // Reward for grinding
    
    if (Number.isFinite(rs)) setReadiness(clamp(Math.round(rs) + progressBoost));
    if (wd) setWeakDomain(wd);
    if (Number.isFinite(wp)) setWeakPct(clamp(Math.round(wp)));

    // 5. Shift History (Real Date Logic)
    const todayStr = new Date().toDateString();
    const shiftHistory = new Set(safeJSON<string[]>(localStorage.getItem("shift-history"), []));
    const lastShiftLegacy = localStorage.getItem("last-shift-date");
    
    // Merge legacy + new system
    if (lastShiftLegacy) shiftHistory.add(lastShiftLegacy);
    
    setShiftComplete(shiftHistory.has(todayStr));

    const dots = getLast7Days().map(d => ({
      ...d,
      active: shiftHistory.has(d.date)
    }));
    setStreakDays(dots);

    // 6. Breakdown & Missed
    const db = safeJSON<DomainRow[]>(localStorage.getItem("domainBreakdown"), []);
    if (db.length) {
        setDomainBreakdown(db.sort((a, b) => a.accuracy - b.accuracy));
        // Fallback weakness if not set
        if (!wd && db[0]) {
            setWeakDomain(db[0].category);
            setWeakPct(db[0].accuracy);
        }
    }
    
    const da = safeJSON<DiagnosticAnswer[]>(localStorage.getItem("diagnosticAnswers"), []);
    if (da.length) {
        setMissed(da.find(a => !a.isCorrect) || null);
    }

  }, [searchParams]);

  // --- Handlers ---
  const handleExamDateSave = () => {
    if (!examDate) return;
    localStorage.setItem("exam-date", examDate);
    const d = daysUntil(examDate);
    setDaysToExam(d);
    setShowExamSetter(false);
  };

  const ROUTES = {
    drill: `/station?category=${encodeURIComponent(weakDomain)}`,
    sim: "/sim",
    review: `/station?mode=review&category=${encodeURIComponent(weakDomain)}`,
  };

  return (
    <div className={`min-h-screen ${theme.bg} text-white pb-32 font-sans relative overflow-x-hidden`}>
      
      {/* BACKGROUND FX */}
      <div className={`fixed inset-0 pointer-events-none ${theme.grid} bg-[length:100%_4px] opacity-20`} />
      <div className={`fixed -top-40 -right-40 w-96 h-96 ${isP ? "bg-rose-600/10" : "bg-cyan-500/10"} blur-[100px] rounded-full`} />
      <div className="fixed top-1/2 -left-40 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full" />

      {/* --- 1. HEADER (HUD) --- */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-end bg-gradient-to-b from-[#0F172A] to-transparent sticky top-0 z-40 backdrop-blur-md border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${isP ? "bg-rose-500 animate-pulse" : "bg-cyan-500 animate-pulse"}`} />
            <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">
              System Active
            </p>
          </div>
          <h1 className="text-xl font-black text-white leading-none">
            {plan ? (plan === "lifetime" ? "ELITE OPERATOR" : "PRO OPERATOR") : "CANDIDATE"}
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <p className={`text-[10px] font-mono ${theme.accent} opacity-80`}>
                ID: 8492-{isP ? "ALS" : "BLS"} • {level.toUpperCase()}
             </p>
             <span className="text-slate-600 text-[10px]">•</span>
             <button 
                onClick={() => setShowExamSetter(true)}
                className="text-[10px] font-mono text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-2"
             >
                T-{daysToExam} DAYS
             </button>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-end justify-end gap-1">
            <span className={`text-4xl font-black tracking-tighter ${readiness > 75 ? "text-emerald-400" : readiness > 50 ? "text-yellow-400" : "text-red-400"}`}>
              {readiness}
            </span>
            <span className="text-sm font-bold text-gray-500 mb-1.5">%</span>
          </div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Readiness Score</p>
        </div>
      </header>

      {/* --- EXAM DATE MODAL --- */}
      <AnimatePresence>
        {showExamSetter && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl w-full max-w-xs shadow-2xl">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Set Exam Date</h3>
                    <input 
                        type="date" 
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 mb-4"
                    />
                    <div className="flex gap-2">
                        <button onClick={() => setShowExamSetter(false)} className="flex-1 py-3 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10">CANCEL</button>
                        <button onClick={handleExamDateSave} className={`flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${theme.btn}`}>SAVE</button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. MAIN FEED --- */}
      <main className="px-4 space-y-5 max-w-lg mx-auto relative z-10 mt-2">
        
        {/* A. Heatmap Section */}
        <section className="relative h-[340px] flex items-center justify-center -mt-4">
          <div className="absolute top-4 left-0 w-full flex justify-between px-2 z-20">
            <div className="text-[9px] text-slate-500 font-mono leading-tight">
              TARGET: NREMT-{isP ? "P" : "B"}<br/>
              REGION: TAMPA, FL
            </div>
            <div className="text-[9px] text-slate-500 font-mono text-right leading-tight">
              EXAM: {examDate || "PENDING"}<br/>
              SOLVED: {questionsAnswered}
            </div>
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center">
             <div className={`absolute inset-0 bg-gradient-to-t ${isP ? "from-rose-500/5" : "from-cyan-500/5"} to-transparent rounded-full opacity-50 blur-3xl`} />
             <BodyHeatmap />
          </div>

          {/* Floating Weakness Widget */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 right-2 backdrop-blur-md bg-slate-900/80 border border-white/10 p-3 rounded-xl shadow-2xl max-w-[140px]"
          >
            <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Focus Domain</div>
            <div className={`text-sm font-black leading-tight ${theme.accent}`}>
              {weakDomain.toUpperCase()}
            </div>
            <div className="w-full bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
               <div className={`h-full ${theme.bar}`} style={{ width: `${weakPct}%` }} />
            </div>
          </motion.div>
        </section>

        {/* B. The Shift (Retention Engine) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className={`bg-slate-900/40 backdrop-blur-md border ${theme.border} p-5 rounded-3xl relative overflow-hidden group`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${theme.softBg} blur-[60px] rounded-full -z-10`} />

          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Protocol</span>
                {shiftComplete && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 rounded font-bold">COMPLETED</span>}
              </div>
              <h2 className="text-xl font-black text-white">
                {shiftComplete ? "Shift Complete" : "Start Your Shift"}
              </h2>
            </div>
            
            {/* Real 7-Day Streak */}
            <div className="flex gap-1.5 bg-black/20 p-1.5 rounded-lg border border-white/5">
              {streakDays.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold transition-all ${
                    item.active 
                      ? "bg-emerald-500 text-black shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                      : "bg-white/5 text-gray-600 border border-white/5"
                  }`}>
                    {item.active ? "✓" : item.day}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Link href={ROUTES.drill} className={`w-full py-4 rounded-xl text-sm font-black tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg ${
            shiftComplete 
              ? "bg-emerald-500/10 border border-emerald-500/50 text-emerald-400" 
              : `${theme.btn} text-white hover:scale-[1.02] shadow-lg shadow-black/20`
          }`}>
            {shiftComplete ? (
              <>
                 <span>REVIEW SESSION</span>
                 <span className="text-lg">🛡️</span>
              </>
            ) : (
              <>
                <span className="animate-pulse">▶</span>
                BEGIN 15-MIN DRILL
              </>
            )}
          </Link>
          
          {!shiftComplete && (
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
              Objective: 10 rapid-fire questions on <span className="text-white">{weakDomain}</span>
            </p>
          )}
        </motion.div>

        {/* C. Critical Action Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.sim}>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className={`h-full bg-slate-800/40 border ${theme.border} p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden`}
            >
              <div className={`absolute -right-4 -top-4 w-20 h-20 ${theme.softBg} blur-2xl rounded-full`} />
              <div className="mb-4">
                <div className={`w-8 h-8 rounded-lg ${theme.softBg} flex items-center justify-center border ${theme.border} mb-3`}>
                  <span className="text-lg">⚡️</span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">Full<br/>Simulator</h3>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                CAT-Style<br/>70-120 Qs
              </div>
            </motion.div>
          </Link>

          <Link href={ROUTES.drill}>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="h-full bg-slate-800/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-3">
                  <span className="text-lg">📚</span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">Focus<br/>Library</h3>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Fix {weakDomain.slice(0, 8)}...
              </div>
            </motion.div>
          </Link>
        </div>

        {/* D. Domain Breakdown (If data exists) */}
        {domainBreakdown.length > 0 && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Performance Data</h3>
                    <span className={`text-[10px] font-mono ${theme.accent}`}>LIVE UPDATES</span>
                </div>
                <div className="space-y-3">
                    {domainBreakdown.slice(0, 4).map((d) => (
                        <div key={d.category}>
                            <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-300 font-bold">{d.category}</span>
                                <span className={d.accuracy > 70 ? "text-emerald-400" : "text-white"}>{d.accuracy}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${d.accuracy < 60 ? "bg-red-500" : theme.bar}`} 
                                    style={{ width: `${d.accuracy}%` }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}

        {/* E. Subscription Status */}
        {plan && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-center gap-2 opacity-50 pb-4"
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              Active Plan: {plan.toUpperCase()}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
          </motion.div>
        )}

      </main>

      {/* 3. The Floating Dock */}
      <Dock />

    </div>
  );
}

// --- Wrapper for Suspense (FIXES BUILD ERROR) ---
export default function Dashboard() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                <div className="text-xs font-mono text-cyan-500 tracking-widest uppercase">Initializing Operator Profile...</div>
            </div>
        </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
