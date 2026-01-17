"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<"lifetime" | "monthly">("lifetime");
  const [userLevel, setUserLevel] = useState("EMT");
  const [userName, setUserName] = useState("CANDIDATE");

  useEffect(() => {
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
    setUserName("FUTURE MEDIC");
  }, []);

  // Future Date for ID Card
  const validDate = new Date();
  validDate.setFullYear(validDate.getFullYear() + 2);
  const dateString = validDate.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col items-center p-4 md:p-6 relative overflow-y-auto">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 1. THE ID CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-sm mt-4 mb-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-blue-900/50 relative overflow-hidden text-black transform rotate-1 border-t-4 border-red-600">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-50 pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">National Registry</p>
              <div className="h-1 w-12 bg-blue-600 mt-1" />
            </div>
            <span className="text-xl font-black text-gray-200">2026</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 text-3xl ${userLevel === "Paramedic" ? "bg-red-50 border-red-100 text-red-600" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
              {userLevel === "Paramedic" ? "⚡️" : "🚑"}
            </div>
            <div>
              <p className={`text-xs font-bold uppercase mb-0.5 ${userLevel === "Paramedic" ? "text-red-600" : "text-blue-600"}`}>{userLevel} CERTIFICATION</p>
              <h2 className="text-2xl font-black tracking-tight leading-none">{userName}</h2>
              <p className="text-[10px] font-mono text-gray-500 mt-1">VALID THROUGH: {dateString}</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
             <div className="flex gap-2">
               <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-bold text-gray-600">NREMT-P</div>
               <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-bold text-gray-600">BLS</div>
             </div>
             <div className="h-6 w-24 bg-black opacity-80" style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 90%, 20% 90%, 25% 100%, 30% 100%, 35% 80%, 40% 100%)"}}></div>
          </div>
        </div>
      </motion.div>

      {/* 2. THE VALUE STACK (Compelling List) */}
      <div className="w-full max-w-sm mb-8 z-10 bg-slate-900/50 p-5 rounded-2xl border border-white/5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pro Medical Suite Includes:</h3>
        <div className="space-y-3">
          <FeatureRow icon="🏥" text="Full NREMT Simulator (70-120Q)" />
          <FeatureRow icon="📚" text="3,000+ Question Bank" />
          <FeatureRow icon="🧠" text="Clinical Rationales & Weakness Plan" />
          <FeatureRow icon="📈" text="Readiness Score & Progress Report" />
          <FeatureRow icon="⚡️" text="EMT + Paramedic Modes" />
          <FeatureRow icon="🛡️" text="100% Pass Guarantee or Money Back" highlight />
        </div>
      </div>

      {/* 3. PRICING TIERS */}
      <div className="w-full max-w-sm space-y-3 z-10 mb-8">
        {/* LIFETIME */}
        <button onClick={() => setSelectedPlan("lifetime")} className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedPlan === "lifetime" ? "bg-blue-600/20 border-blue-500 shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)]" : "bg-slate-800/50 border-slate-700 opacity-80 hover:opacity-100"}`}>
          {selectedPlan === "lifetime" && (
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">Best Value</div>
          )}
          <div className="flex justify-between items-center">
            <div><h3 className="font-bold text-white">Lifetime Access</h3><p className="text-xs text-slate-400">One-time payment. Own it forever.</p></div>
            <div className="text-right"><span className="text-xs text-slate-500 line-through block">$149</span><span className="text-xl font-black text-white">$69</span></div>
          </div>
        </button>

        {/* MONTHLY */}
        <button onClick={() => setSelectedPlan("monthly")} className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedPlan === "monthly" ? "bg-blue-600/20 border-blue-500" : "bg-slate-800/50 border-slate-700 opacity-80 hover:opacity-100"}`}>
          <div className="flex justify-between items-center">
            <div><h3 className="font-bold text-white">Monthly Pro</h3><p className="text-xs text-slate-400">Cancel anytime.</p></div>
            <span className="text-xl font-bold text-white">$19<span className="text-sm font-normal text-slate-400">/mo</span></span>
          </div>
        </button>
      </div>

      {/* CTA Button */}
      <Link href="/dashboard" className="w-full max-w-sm z-10 sticky bottom-6">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-black text-lg shadow-lg hover:shadow-cyan-500/25 transition-all text-white border border-white/10">
          UNLOCK CERTIFICATION
        </motion.button>
        
        {/* OFFICIAL FOOTER */}
        <div className="flex justify-center items-center gap-4 mt-4 opacity-60">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            OFFICIAL VERIFIED NREMT PREP
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            SECURE PAYMENT
          </div>
        </div>
      </Link>
    </div>
  );
}

function FeatureRow({icon, text, highlight = false}: {icon: string, text: string, highlight?: boolean}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <span className={`text-sm ${highlight ? "text-yellow-400 font-bold" : "text-gray-300"}`}>{text}</span>
    </div>
  );
}
