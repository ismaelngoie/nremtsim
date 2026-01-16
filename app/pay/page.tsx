"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<"lifetime" | "monthly">("lifetime");

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mb-8 mt-4"
      >
        <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold tracking-widest mb-4">
          REPORT LOCKED
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
          Unlock Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Readiness Score
          </span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          You are trending borderline. Access the full clinical breakdown to identify critical weaknesses.
        </p>
      </motion.div>

      {/* The Blurred Tease */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-sm h-32 bg-slate-800/50 rounded-2xl border border-slate-700 mb-8 overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 backdrop-blur-md z-10 flex items-center justify-center bg-black/20">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        {/* Fake Graph Line */}
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 30 C 20 40, 40 10, 60 20 S 100 5, 100 5" stroke="#3B82F6" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Plan Selection */}
      <div className="w-full max-w-sm space-y-4 z-10 mb-8">
        
        {/* LIFETIME CARD */}
        <button
          onClick={() => setSelectedPlan("lifetime")}
          className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
            selectedPlan === "lifetime" 
              ? "bg-blue-600/10 border-blue-500 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]" 
              : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
          }`}
        >
          {selectedPlan === "lifetime" && (
            <div className="absolute -top-3 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-lg">
              Best Value
            </div>
          )}
          <div className="flex justify-between items-center mb-1">
            <h3 className={`font-bold text-lg ${selectedPlan === "lifetime" ? "text-white" : "text-slate-300"}`}>
              Lifetime Access
            </h3>
            <div className="text-right">
              <span className="text-sm text-slate-400 line-through mr-2">$149</span>
              <span className="text-xl font-bold text-white">$69</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">One-time payment. Own it forever.</p>
        </button>

        {/* MONTHLY CARD */}
        <button
          onClick={() => setSelectedPlan("monthly")}
          className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
            selectedPlan === "monthly" 
              ? "bg-blue-600/10 border-blue-500" 
              : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className={`font-bold text-lg ${selectedPlan === "monthly" ? "text-white" : "text-slate-300"}`}>
              Monthly
            </h3>
            <span className="text-xl font-bold text-white">$19<span className="text-sm font-normal text-slate-400">/mo</span></span>
          </div>
          <p className="text-xs text-slate-400">Cancel anytime.</p>
        </button>
      </div>

      {/* CTA Button */}
      <Link href="/dashboard" className="w-full max-w-sm z-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          UNLOCK FULL ACCESS
        </motion.button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-8 flex items-center gap-4 text-slate-500 text-xs font-medium">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
          Money-Back Guarantee
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
          Secure SSL Payment
        </span>
      </div>

    </div>
  );
}
