"use client";

import Dock from "@/components/Dock";
import BodyHeatmap from "@/components/BodyHeatmap";
import { motion } from "framer-motion";

export default function Dashboard() {
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
            <span className="text-4xl font-black text-blue-400">68</span>
            <span className="text-sm font-bold text-gray-500 mb-1">%</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Readiness Score</p>
        </div>
      </header>

      {/* 2. THE MAIN FEED */}
      <main className="p-4 space-y-6 max-w-lg mx-auto">
        
        {/* A. The Anatomy Centerpiece */}
        <section className="relative">
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

        {/* B. "The Shift" Widget (Gamification) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 p-5 rounded-2xl relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Task</h3>
          <h2 className="text-xl font-bold text-white mb-4">Start Your Shift</h2>
          
          <div className="flex gap-1 mb-4">
            {[1,1,1,0,0,0,0].map((done, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${done ? "bg-green-500" : "bg-gray-700"}`} />
            ))}
          </div>
          
          <Link href="/station" className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            BEGIN 15-MIN DRILL
          </Link>
        </motion.div>

        {/* C. Critical Weakness Alert */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
            !
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Critical Flag: Cardiology</h3>
            <p className="text-gray-400 text-xs">You missed 3 questions on ACS protocols.</p>
          </div>
          <Link href="/station" className="ml-auto text-xs bg-red-500 text-white px-3 py-1.5 rounded font-bold">
            FIX
          </Link>
        </motion.div>

      </main>

      {/* 3. The Floating Dock */}
      <Dock />

    </div>
  );
}
