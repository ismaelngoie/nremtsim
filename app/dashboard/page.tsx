"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { questions } from "@/lib/questions";

type Level = "EMT" | "Paramedic";

export default function Dashboard() {
  const searchParams = useSearchParams();
  
  // 1. User State & Personalization
  const [level, setLevel] = useState<Level>("EMT");
  const [name, setName] = useState("OPERATOR");
  const [plan, setPlan] = useState<string | null>(null);
  
  // 2. Metric State
  const [readiness, setReadiness] = useState(42);
  const [weakDomain, setWeakDomain] = useState("General");
  const [streakDays, setStreakDays] = useState<{day: string, active: boolean}[]>([]);
  const [shiftComplete, setShiftComplete] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // 3. Theme Logic (Matches Landing/Paywall)
  const isP = level === "Paramedic";
  const theme = useMemo(() => ({
    bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
    accent: isP ? "text-rose-400" : "text-cyan-400",
    accentGlow: isP ? "shadow-rose-500/20" : "shadow-cyan-500/20",
    border: isP ? "border-rose-500/20" : "border-cyan-500/20",
    btn: isP ? "bg-gradient-to-r from-rose-600 to-red-500" : "bg-gradient-to-r from-blue-600 to-cyan-500",
    softBg: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
    bar: isP ? "bg-rose-500" : "bg-cyan-400",
    grid: isP 
      ? "bg-[linear-gradient(transparent_50%,rgba(244,63,94,0.05)_50%)]" 
      : "bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)]",
  }), [isP]);

  useEffect(() => {
    // Load Persisted Data
    const storedLevel = localStorage.getItem("userLevel") as Level;
    if (storedLevel) setLevel(storedLevel);
    
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);

    const storedWeakness = localStorage.getItem("weakestDomain");
    if (storedWeakness) setWeakDomain(storedWeakness);

    // Check Plan (URL param from checkout or localstorage)
    const urlPlan = searchParams.get("plan");
    if (urlPlan) {
      setPlan(urlPlan);
      localStorage.setItem("userPlan", urlPlan);
    } else {
      setPlan(localStorage.getItem("userPlan"));
    }

    // Calculate Readiness (Real Logic)
    const mastered = JSON.parse(localStorage.getItem("mastered-ids") || "[]");
    setQuestionsAnswered(mastered.length);
    const totalQ = questions.length || 1;
    
    // Base readiness on diagnostic score + progress
    const diagScore = Number(localStorage.getItem("readinessScore")) || 42;
    // Slowly creep readiness up as they master questions
    const progressBoost = Math.min(20, Math.floor(mastered.length / 10)); 
    setReadiness(Math.min(100, diagScore + progressBoost));

    // Weekly Calendar Logic
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const lastShiftDate = localStorage.getItem("last-shift-date");
    const isTodayDone = lastShiftDate === new Date().toDateString();
    setShiftComplete(isTodayDone);

    setStreakDays(days.map((d, i) => ({
      day: d,
      active: i === todayIndex ? isTodayDone : (i < todayIndex) // Mock past days for demo
    })));

  }, [searchParams]);

  return (
    <div className={`min-h-screen ${theme.bg} text-white pb-32 font-sans relative overflow-x-hidden`}>
      
      {/* BACKGROUND FX */}
      <div className={`fixed inset-0 pointer-events-none ${theme.grid} bg-[length:100%_4px] opacity-20`} />
      <div className={`fixed -top-40 -right-40 w-96 h-96 ${isP ? "bg-rose-600/10" : "bg-cyan-500/10"} blur-[100px] rounded-full`} />

      {/* 1. TOP HEADER (HUD Style) */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-end bg-gradient-to-b from-[#0F172A] to-transparent sticky top-0 z-40 backdrop-blur-sm">
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
          <p className={`text-[10px] font-mono mt-1 ${theme.accent} opacity-80`}>
             ID: 8492-{isP ? "ALS" : "BLS"} • {level.toUpperCase()}
          </p>
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

      {/* 2. THE MAIN FEED */}
      <main className="px-4 space-y-5 max-w-lg mx-auto relative z-10">
        
        {/* A. The Anatomy Centerpiece (Data Viz) */}
        <section className="relative h-[340px] flex items-center justify-center -mt-4">
          <div className="absolute top-4 left-0 w-full flex justify-between px-2 z-20">
            <div className="text-[9px] text-slate-500 font-mono leading-tight">
              TARGET: NREMT-{isP ? "P" : "B"}<br/>
              REGION: TAMPA, FL
            </div>
            <div className="text-[9px] text-slate-500 font-mono text-right leading-tight">
              EXAM: PENDING<br/>
              QUESTIONS: {questionsAnswered}
            </div>
          </div>
          
          {/* Heatmap with Glow Container */}
          <div className="relative w-full h-full flex items-center justify-center">
             <div className={`absolute inset-0 bg-gradient-to-t ${isP ? "from-rose-500/5" : "from-cyan-500/5"} to-transparent rounded-full opacity-50 blur-3xl`} />
             <BodyHeatmap />
          </div>

          {/* Floating Weakness Indicator (Dynamic) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 right-2 backdrop-blur-md bg-slate-900/80 border border-white/10 p-3 rounded-xl shadow-2xl max-w-[140px]"
          >
            <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Weakest Domain</div>
            <div className={`text-sm font-black leading-tight ${theme.accent}`}>
              {weakDomain.toUpperCase()}
            </div>
            <div className="w-full bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
               <div className={`h-full ${theme.bar} w-[42%]`} />
            </div>
          </motion.div>
        </section>

        {/* B. "The Shift" Widget (Gamified Retention) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className={`bg-slate-900/40 backdrop-blur-md border ${theme.border} p-5 rounded-3xl relative overflow-hidden group cursor-pointer`}
        >
          {/* Subtle bg glow */}
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
            
            {/* STREAK DOTS */}
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
          
          <Link href="/station" className={`w-full py-4 rounded-xl text-sm font-black tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg ${
            shiftComplete 
              ? "bg-emerald-500/10 border border-emerald-500/50 text-emerald-400" 
              : `${theme.btn} text-white hover:scale-[1.02] shadow-lg shadow-black/20`
          }`}>
            {shiftComplete ? (
              <>
                 <span>SESSION LOGGED</span>
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
              Next up: 10 rapid-fire questions on <span className="text-white">{weakDomain}</span>
            </p>
          )}
        </motion.div>

        {/* C. Critical Action Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* SIMULATOR CARD */}
          <Link href="/sim">
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
                CAT-Style<br/>120 min
              </div>
            </motion.div>
          </Link>

          {/* WEAKNESS/LIBRARY CARD */}
          <Link href={`/station?category=${encodeURIComponent(weakDomain)}`}>
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

        {/* D. Subscription Status (Subtle Flex) */}
        {plan && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-center gap-2 opacity-50"
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              Plan Active: {plan.toUpperCase()}
            </span>
            <div className="w-1 h-1 rounded-full bg-green-500" />
          </motion.div>
        )}

      </main>

      {/* 3. The Floating Dock */}
      <Dock />

    </div>
  );
}
