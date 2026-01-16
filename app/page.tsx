"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showLevelSelect, setShowLevelSelect] = useState(false);

  const handleStart = () => {
    setShowLevelSelect(true);
  };

  const selectLevel = (level: "EMT" | "Paramedic") => {
    // Save their choice so the whole app adapts
    localStorage.setItem("userLevel", level);
    
    // Go to the simulator
    router.push('/sim');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] overflow-hidden relative p-4">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-lg w-full">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-blue-400">
            NREMT SIMULATION PROTOCOL
          </span>
        </motion.div>

        {/* Title */}
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
          >
            WILL THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
              COMPUTER STOP?
            </span>
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-sm md:text-base font-mono"
        >
          The adaptive algorithm determines competency. Choose your certification level to begin the diagnostic.
        </motion.p>

        {/* INTERACTIVE AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full"
        >
          {!showLevelSelect ? (
            <button 
              onClick={handleStart}
              className="w-full group relative px-8 py-5 bg-white text-[#0F172A] font-black text-lg rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-white to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                START SIMULATION <span>→</span>
              </span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {/* EMT BUTTON */}
              <button 
                onClick={() => selectLevel("EMT")}
                className="group relative p-6 bg-blue-600/10 border border-blue-500/50 hover:bg-blue-600 hover:border-blue-500 rounded-xl transition-all duration-200"
              >
                <div className="text-3xl mb-2">🚑</div>
                <div className="text-white font-black text-xl">EMT</div>
                <div className="text-blue-200 text-xs font-bold tracking-widest mt-1 group-hover:text-white">BLS (EMT/EMR)</div>
              </button>

              {/* PARAMEDIC BUTTON */}
              <button 
                onClick={() => selectLevel("Paramedic")}
                className="group relative p-6 bg-red-600/10 border border-red-500/50 hover:bg-red-600 hover:border-red-500 rounded-xl transition-all duration-200"
              >
                <div className="text-3xl mb-2">⚡️</div>
                <div className="text-white font-black text-xl">PARAMEDIC</div>
                <div className="text-red-200 text-xs font-bold tracking-widest mt-1 group-hover:text-white">ALS (Paramedic/AEMT)</div>
              </button>
            </div>
          )}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/20 text-[10px] uppercase tracking-widest mt-8"
        >
          No Account Required • 60 Seconds
        </motion.p>

      </div>
    </main>
  );
}
