"use client";

import { motion } from "framer-motion";

export default function BodyHeatmap() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      
      {/* 1. The Glow Behind */}
      <div className="absolute w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />

      {/* 2. The Interactive Body (Abstract Representation) */}
      <svg width="200" height="400" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        
        {/* HEAD (Neuro) */}
        <motion.path 
          d="M50 10 C 65 10, 75 25, 75 40 C 75 55, 65 65, 50 65 C 35 65, 25 55, 25 40 C 25 25, 35 10, 50 10 Z" 
          stroke="white" strokeWidth="0.5" fill="rgba(255,255,255,0.05)"
          whileHover={{ fill: "rgba(255,255,255,0.2)", cursor: "pointer" }}
        />
        
        {/* LUNGS (Airway - GREEN/MASTERED) */}
        <motion.path 
          d="M30 75 Q 20 100 45 110 L 48 80 Z" 
          fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="1"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.path 
          d="M70 75 Q 80 100 55 110 L 52 80 Z" 
          fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="1"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />

        {/* HEART (Cardiology - RED/CRITICAL) */}
        <motion.circle 
          cx="55" cy="90" r="6" 
          fill="rgba(239, 68, 68, 0.8)" stroke="#EF4444" strokeWidth="1"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          whileHover={{ scale: 1.5, cursor: "pointer" }}
        />

        {/* TORSO (Trauma) */}
        <path d="M28 70 L 25 130 L 50 140 L 75 130 L 72 70 Z" stroke="white" strokeWidth="0.2" fill="none" opacity="0.3" />
        
      </svg>

      {/* 3. Floating Data Tags */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="absolute top-20 left-4 md:left-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-green-400 font-mono tracking-widest">AIRWAY: 98%</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}
        className="absolute top-24 right-4 md:right-20 text-right"
      >
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-red-500 font-mono tracking-widest animate-pulse">CARDIAC: 42%</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </div>
        <p className="text-[9px] text-gray-500 mt-1">RECOMMEND: PROTOCOL 4.2</p>
      </motion.div>

    </div>
  );
}
