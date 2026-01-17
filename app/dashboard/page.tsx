"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { questions } from "@/lib/questions";

export default function Dashboard() {
  const [streak, setStreak] = useState([false, false, false, false, false, false, false]);
  const [readiness, setReadiness] = useState(42); // Default baseline
  const [shiftComplete, setShiftComplete] = useState(false);

  useEffect(() => {
    // 1. Calculate Readiness
    const mastered = JSON.parse(localStorage.getItem("mastered-ids") || "[]");
    const totalQ = questions.length;
    if (totalQ > 0 && mastered.length > 0) {
      // Scale it so it doesn't look sad (min 40%, max 100%)
      const realPercent = (mastered.length / totalQ) * 100;
      setReadiness(Math.min(100, Math.round(40 + (realPercent * 0.6))));
    }

    // 2. Calculate Weekly Streak
    const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)
    // Convert to Mon-Sun (0-6) where 0 is Mon
    const dayIndex = today === 0 ? 6 : today - 1;
    
    // In a real app, we'd store dates. For demo, we just fill up to today if they did a shift
    const lastShiftDate = localStorage.getItem("last-shift-date");
    const isTodayDone = lastShiftDate === new Date().toDateString();
    setShiftComplete(isTodayDone);

    // Fake visual logic: Fill previous days as 'done' for the vibe, current day depends on status
    const newStreak = Array(7).fill(false).map((_, i) => {
      if (i < dayIndex) return true; // Past days
      if (i === dayIndex) return isTodayDone; // Today
      return false; // Future
    });
    setStreak(newStreak);

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
        <section className="relative h-[380px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full flex justify-between px-4 z-20">
            <div className="text-[10px] text-gray-600 font-mono">
              ID: 8492-A<br/>
              LOC: TAMPA, FL
            </div>
            <div className="text-[10px] text-gray-600 font-mono text-right">
              EXAM: NREMT-P<br/>
              T-MINUS: 14 DAYS
            </div>
          </div>
          <BodyHeatmap />
        </section>

        {/* B. "The Shift" Widget (Moved Up) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 p-5 rounded-2xl relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Task</h3>
              <h2 className="text-xl font-bold text-white">{shiftComplete ? "Shift Complete" : "Start Your Shift"}</h2>
            </div>
            <div className="flex gap-1">
              {streak.map((done, i) => (
                <div key={i} className={`w-1.5 h-6 rounded-full ${done ? "bg-green-500" : "bg-gray-700/50"}`} />
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-red-900/10 border border-red-500/30 p-5 rounded-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
            !
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Critical Flag: Cardiology</h3>
            <p className="text-red-400/80 text-xs">Recommended: Review ACS Protocols.</p>
          </div>
          <Link href="/station?category=Cardiology" className="ml-auto text-xs bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors">
            FIX
          </Link>
        </motion.div>

      </main>

      {/* 3. The Floating Dock */}
      <Dock />

    </div>
  );
}
