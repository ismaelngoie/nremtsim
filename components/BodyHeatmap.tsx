"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// Map NREMT domains to body visual zones
const ZONE_MAP: Record<string, "head" | "chest" | "abdomen" | "limbs"> = {
  "Airway": "head",
  "Respiration": "chest",
  "Ventilation": "chest",
  "Cardiology": "chest",
  "Trauma": "limbs",
  "Medical": "abdomen",
  "OBGYN": "abdomen",
  "EMS Operations": "head",
};

export default function BodyHeatmap() {
  const [weakDomain, setWeakDomain] = useState<string>("General");
  const [weakPct, setWeakPct] = useState(0);
  const [activeZone, setActiveZone] = useState<"head" | "chest" | "abdomen" | "limbs" | null>(null);

  useEffect(() => {
    // 1. Read real user data
    const wd = localStorage.getItem("weakestDomain") || "Trauma";
    const wp = Number(localStorage.getItem("weakestDomainPct")) || 0;
    
    setWeakDomain(wd);
    setWeakPct(wp);

    // 2. Determine which body part lights up
    // Simple fuzzy match for the domain string
    let zone: "head" | "chest" | "abdomen" | "limbs" = "chest"; // Default
    
    for (const [key, value] of Object.entries(ZONE_MAP)) {
      if (wd.includes(key)) zone = value;
    }
    setActiveZone(zone);
  }, []);

  // Visual configuration for the "Weak" zone
  const pulseColor = weakPct < 60 ? "#EF4444" : "#F59E0B"; // Red if critical, Orange if borderline
  const pulseShadow = weakPct < 60 ? "rgba(239, 68, 68, 0.6)" : "rgba(245, 158, 11, 0.6)";

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* 1. Holographic Grid Background (The "Sim" feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

      {/* 2. The Active Scanner Line (Moving up/down) */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20 pointer-events-none"
      />

      {/* 3. The Interactive Body (Segmented Tech Armor) */}
      <svg width="240" height="420" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.15)]">
        
        {/* HEAD ZONE (Neuro / Ops / Airway) */}
        <Link href={`/station?category=${encodeURIComponent(weakDomain)}`}>
            <motion.path 
            d="M50 12 L 65 20 L 62 45 L 50 55 L 38 45 L 35 20 Z" 
            stroke={activeZone === "head" ? pulseColor : "rgba(255,255,255,0.2)"}
            strokeWidth={activeZone === "head" ? 1.5 : 0.5}
            fill={activeZone === "head" ? pulseShadow : "rgba(255,255,255,0.02)"}
            animate={activeZone === "head" ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:fill-blue-500/20 transition-colors"
            />
        </Link>

        {/* CHEST ZONE (Cardio / Respiratory) */}
        <Link href={`/station?category=${encodeURIComponent(weakDomain)}`}>
            {/* Left Pec */}
            <motion.path 
            d="M52 58 L 85 62 L 75 95 L 52 90 Z" 
            stroke={activeZone === "chest" ? pulseColor : "rgba(255,255,255,0.2)"}
            strokeWidth={activeZone === "chest" ? 1.5 : 0.5}
            fill={activeZone === "chest" ? pulseShadow : "rgba(255,255,255,0.02)"}
            animate={activeZone === "chest" ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:fill-blue-500/20"
            />
            {/* Right Pec */}
            <motion.path 
            d="M48 58 L 15 62 L 25 95 L 48 90 Z" 
            stroke={activeZone === "chest" ? pulseColor : "rgba(255,255,255,0.2)"}
            strokeWidth={activeZone === "chest" ? 1.5 : 0.5}
            fill={activeZone === "chest" ? pulseShadow : "rgba(255,255,255,0.02)"}
            animate={activeZone === "chest" ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:fill-blue-500/20"
            />
            {/* Center Core (Sternum) */}
            <path d="M50 58 L 48 90 L 50 110 L 52 90 Z" fill="rgba(255,255,255,0.1)" />
        </Link>

        {/* ABDOMEN ZONE (Medical / GI / OBGYN) */}
        <Link href={`/station?category=${encodeURIComponent(weakDomain)}`}>
            <motion.path 
            d="M30 100 L 70 100 L 65 135 L 35 135 Z" 
            stroke={activeZone === "abdomen" ? pulseColor : "rgba(255,255,255,0.2)"}
            strokeWidth={activeZone === "abdomen" ? 1.5 : 0.5}
            fill={activeZone === "abdomen" ? pulseShadow : "rgba(255,255,255,0.02)"}
            animate={activeZone === "abdomen" ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:fill-blue-500/20"
            />
        </Link>

        {/* LIMBS ZONE (Trauma) */}
        <Link href={`/station?category=${encodeURIComponent(weakDomain)}`}>
            {/* Shoulders */}
            <motion.path d="M15 62 L 5 80 L 12 85 L 25 70 Z" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.02)" />
            <motion.path d="M85 62 L 95 80 L 88 85 L 75 70 Z" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.02)" />
            
            {/* Thighs - Highlighted if Trauma */}
            <motion.path 
            d="M35 135 L 65 135 L 60 180 L 40 180 Z" 
            stroke={activeZone === "limbs" ? pulseColor : "rgba(255,255,255,0.2)"}
            strokeWidth={activeZone === "limbs" ? 1.5 : 0.5}
            fill={activeZone === "limbs" ? pulseShadow : "rgba(255,255,255,0.02)"}
            animate={activeZone === "limbs" ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:fill-blue-500/20"
            />
        </Link>

      </svg>

      {/* 4. Floating HUD Labels (Contextual) */}
      
      {/* Label 1: The Weakness */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="absolute top-24 right-2 md:right-16 text-right"
      >
        <div className="flex items-center justify-end gap-2">
          <span className="text-[10px] font-black font-mono tracking-widest text-slate-300">DIAGNOSTIC</span>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: pulseColor }} />
        </div>
        <div className="bg-slate-900/80 border border-white/10 backdrop-blur-md px-3 py-2 rounded-lg mt-1 border-r-2" style={{ borderRightColor: pulseColor }}>
           <div className="text-[9px] text-slate-400 font-mono mb-0.5">PRIORITY FOCUS</div>
           <div className="text-xs font-black text-white">{weakDomain.toUpperCase()}</div>
           <div className="text-xs font-mono" style={{ color: pulseColor }}>{weakPct}% ACCURACY</div>
        </div>
        <Link href={`/station?category=${encodeURIComponent(weakDomain)}`} className="text-[9px] underline text-slate-500 hover:text-white mt-1 block">
           Tap body to fix &rarr;
        </Link>
      </motion.div>

      {/* Label 2: The Strength (Static for now, or randomize) */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}
        className="absolute bottom-20 left-2 md:left-16"
      >
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           <span className="text-[10px] font-black font-mono tracking-widest text-emerald-500">SYSTEM STABLE</span>
        </div>
        <div className="h-[1px] w-12 bg-emerald-500/30 my-1" />
        <div className="text-[9px] text-slate-500 font-mono">
           AIRWAY: 98%<br/>
           OPS: 92%
        </div>
      </motion.div>

    </div>
  );
}
