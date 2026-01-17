"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { questions } from "@/lib/questions";

export default function Dashboard() {
  const [streakDays, setStreakDays] = useState<{day: string, active: boolean}[]>([]);
  const [readiness, setReadiness] = useState(42); 
  const [shiftComplete, setShiftComplete] = useState(false);

  useEffect(() => {
    // 1. Calculate Readiness
    const mastered = JSON.parse(localStorage.getItem("mastered-ids") || "[]");
    const totalQ = questions.length;
    if (totalQ > 0 && mastered.length > 0) {
      const realPercent = (mastered.length / totalQ) * 100;
      setReadiness(Math.min(100, Math.round(42 + (realPercent * 0.6))));
    }

    // 2. Logic for Weekly Calendar (M T W T F S S)
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon, 6=Sun
    const lastShiftDate = localStorage.getItem("last-shift-date");
    const isTodayDone = lastShiftDate === new Date().toDateString();
    setShiftComplete(isTodayDone);

    const newStreak = days.map((d, i) => ({
      day: d,
      active: i === todayIndex ? isTodayDone : (i < todayIndex) // Past days filled for demo, Future empty
    }));
    setStreakDays(newStreak);

  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-32">
      
      {/* 1. TOP HEADER (Vitals) */}
      <header className="p-6 flex justify-between items-end border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-40">
        <div>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Current Status</p>
          <h1 className="text-2xl font-black text-white">ON DUTY</h1>
        </div>
        <div className="text-right">
          <div className="flex items-end justify-end gap-1">
            <span className={`text-4xl font-black ${readiness > 70 ? "text-green-400" : "text-red-400"}`}>{readiness}</span>
            <span className="text-sm font-bold text-gray-500 mb-1">%</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Readiness Score</p>
        </div>
      </header>

      {/* 2. THE MAIN FEED */}
      <main className="p-4 space-y-4 max-w-lg mx-auto">
        
        {/* A. The Anatomy Centerpiece */}
        <section className="relative h-[320px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full flex justify-between px-4 z-20">
            <div className="text-[10px] text-gray-600 font-mono">
              ID: 8492-A<br/>
              REGION: US-NREMT
            </div>
            <div className="text-[10px] text-gray-600 font-mono text-right">
              EXAM: PENDING<br/>
              T-MINUS: 14 DAYS
            </div>
          </div>
          <BodyHeatmap />
        </section>

        {/* B. "The Shift" Widget (High Priority) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 p-5 rounded-2xl relative overflow-hidden group cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Task</h3>
              <h2 className="text-xl font-bold text-white">{shiftComplete ? "Shift Complete" : "Start Your Shift"}</h2>
            </div>
            
            {/* WEEKLY CALENDAR DOTS */}
            <div className="flex gap-2">
              {streakDays.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${item.active ? "bg-green-500 text-black" : "bg-white/10 text-gray-500"}`}>
                    {item.active ? "✓" : ""}
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Link href="/station" className={`w-full py-3 border rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${shiftComplete ? "bg-green-500/20 border-green-500 text-green-400" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}>
            <span className={`w-2 h-2 rounded-full ${shiftComplete ? "bg-green-500" : "bg-blue-500 animate-pulse"}`} />
            {shiftComplete ? "REVIEW SESSION" : "BEGIN 15-MIN DRILL"}
          </Link>
        </motion.div>

        {/* C. Critical Weakness Alert */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="bg-red-900/10 border border-red-500/30 p-5 rounded-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 animate-pulse">!</div>
          <div>
            <h3 className="text-white font-bold text-sm">Critical Flag: Cardiology</h3>
            <p className="text-red-400/80 text-xs">Recommended: Review ACS Protocols.</p>
          </div>
          <Link href="/station?category=Cardiology" className="ml-auto text-xs bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors">FIX</Link>
        </motion.div>

      </main>

      {/* 3. The Floating Dock */}
      <Dock />

    </div>
  );
}
