"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { questions } from "@/lib/questions"; // Importing your data!

export default function Home() {
  const [clicked, setClicked] = useState(false);

  // This function simulates the "Glitch" loading
  const handleStart = () => {
    setClicked(true);
    
    // In a later step, we will make this redirect to the actual Quiz Page.
    // For now, we just show that we found the questions.
    console.log(`Loaded ${questions.length} questions from the Brain.`);
    
    setTimeout(() => {
      alert("Simulation Initialized. Loaded " + questions.length + " Protocols.");
      setClicked(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 flex flex-col items-center text-center space-y-8 p-4">
        
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

        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            WILL THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
              COMPUTER STOP?
            </span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 max-w-md text-sm md:text-base font-mono"
        >
          {questions.length} Clinical Scenarios Loaded. The adaptive algorithm determines competency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={handleStart}
            className="group relative px-8 py-4 bg-white text-[#0F172A] font-bold text-lg rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-white to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {clicked ? "LOADING PROTOCOLS..." : "START SIMULATION"}
              {!clicked && <span>→</span>}
            </span>
          </button>
        </motion.div>

      </div>
    </main>
  );
}
