"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Level = "EMT" | "Paramedic";

export default function Home() {
  const router = useRouter();
  const [level, setLevel] = useState<Level>("EMT");

  useEffect(() => {
    // 1. Check if Pro (Paid) -> Dashboard
    const isPro = localStorage.getItem("pro") === "true";
    if (isPro) {
      router.replace("/dashboard");
      return;
    }

    // 2. Check Level preference
    const saved = localStorage.getItem("userLevel") as Level | null;
    if (saved === "EMT" || saved === "Paramedic") setLevel(saved);
  }, [router]);

  const accent = useMemo(() => {
    return level === "Paramedic"
      ? {
          glow: "bg-red-600/12",
          chip: "text-red-300 border-red-500/30 bg-red-500/10",
          grad: "from-red-400 to-rose-500",
          btn: "from-red-600 to-rose-500",
        }
      : {
          glow: "bg-blue-600/14",
          chip: "text-blue-300 border-blue-500/30 bg-blue-500/10",
          grad: "from-blue-400 to-cyan-400",
          btn: "from-blue-600 to-cyan-500",
        };
  }, [level]);

  const start = () => {
    localStorage.setItem("userLevel", level);
    router.push("/sim");
  };

  return (
    <main className="min-h-screen bg-[#0F172A] overflow-hidden relative px-4 py-10 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-cyan-500/10 blur-[140px] rounded-full" />
        <div className="absolute -left-32 top-[25%] w-[520px] h-[520px] bg-blue-600/10 blur-[140px] rounded-full" />
        <div className="absolute -right-32 bottom-[-10%] w-[520px] h-[520px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Top proof + app feel */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-[11px] font-black tracking-[0.22em] text-slate-200 uppercase">
              Adaptive Diagnostic
            </span>
            <span className="text-[11px] font-mono text-slate-400">5 questions • ~60 sec</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tighter leading-[1.0] text-white">
            NREMT PRACTICE TEST 2026: <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accent.grad}`}>
              4,000+ Real Exam Questions
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm md:text-base max-w-md leading-relaxed">
            Join 12,000+ students who passed. Includes full simulator, detailed answers, and a 100% Pass Guarantee.
          </p>
        </motion.div>

        {/* Level selector + CTA (no extra click) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-8"
        >
          <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-5 backdrop-blur-sm relative overflow-hidden">
            {/* subtle glow based on level */}
            <div className={`absolute inset-0 -z-10 blur-[120px] rounded-2xl ${accent.glow}`} />

            <div className="flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-widest text-slate-300">
                  Select Exam Level
                </div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  Calibrates difficulty & questions
                </div>
              </div>

              {/* Social Proof */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="text-yellow-300 text-sm">★★★★★</span>
                <span className="text-[11px] text-slate-300 font-black">4.8</span>
                <span className="text-[11px] text-slate-400 font-semibold">/ 5.0</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => setLevel("EMT")}
                className={[
                  "relative rounded-xl p-4 border transition-all text-left",
                  level === "EMT"
                    ? "bg-blue-600/15 border-blue-400/60 shadow-[0_0_35px_-16px_rgba(59,130,246,0.55)]"
                    : "bg-white/5 border-white/10 hover:border-white/20",
                ].join(" ")}
              >
                <div className="text-3xl">🚑</div>
                <div className="mt-2 text-white font-black">EMT</div>
                <div className="text-[10px] font-bold tracking-widest text-blue-200/90 uppercase mt-1">
                  BLS Mode
                </div>
              </button>

              <button
                onClick={() => setLevel("Paramedic")}
                className={[
                  "relative rounded-xl p-4 border transition-all text-left",
                  level === "Paramedic"
                    ? "bg-red-600/15 border-red-400/60 shadow-[0_0_35px_-16px_rgba(239,68,68,0.5)]"
                    : "bg-white/5 border-white/10 hover:border-white/20",
                ].join(" ")}
              >
                <div className="text-3xl">⚡️</div>
                <div className="mt-2 text-white font-black">PARAMEDIC</div>
                <div className="text-[10px] font-bold tracking-widest text-red-200/90 uppercase mt-1">
                  ALS Mode
                </div>
              </button>
            </div>

            {/* Value bullets (tight, not cluttered) */}
            <div className="mt-4 grid gap-2">
              <MiniRow text="Same format as the real test" />
              <MiniRow text="Unlimited practice tests" />
              <MiniRow text="Pass Guarantee" />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={start}
              className={`mt-5 w-full py-5 rounded-xl font-black text-lg text-white border border-white/10
                          bg-gradient-to-r ${accent.btn} shadow-lg hover:shadow-cyan-500/20 transition-all uppercase tracking-widest`}
            >
              Start Diagnostic Now →
            </motion.button>

            {/* Trust chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-90">
              <Chip className={accent.chip} text={`${level} Questions`} />
              <Chip className="text-slate-300 border-white/10 bg-white/5" text="Trusted by 12,000+" />
            </div>
          </div>

          <p className="mt-6 text-center text-white/25 text-[10px] uppercase tracking-widest">
            Trusted by 10,000+ Medics • Fast & Secure
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function MiniRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/25">
        <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="text-sm text-slate-200">{text}</span>
    </div>
  );
}

function Chip({ text, className }: { text: string; className: string }) {
  return (
    <div className={`inline-flex items-center px-2.5 py-1.5 rounded-full border ${className}`}>
      <span className="text-[10px] font-black tracking-wide uppercase">{text}</span>
    </div>
  );
}
