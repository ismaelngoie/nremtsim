"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/questions";
import { useRouter } from "next/navigation";

type Level = "EMT" | "Paramedic";
type Q = (typeof questions)[number];

// --- Helpers ---
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const r = Math.random();
    const j = Math.floor(r * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 7 Questions Max before paywall
const MAX_DEMO_QUESTIONS = 7;

export default function SimulatorPage() {
  const router = useRouter();
  
  // --- State ---
  const [userLevel, setUserLevel] = useState<Level>("EMT");
  const [activeQuestions, setActiveQuestions] = useState<Q[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Interaction State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]); // Track correct/wrong for final score
  const [xp, setXp] = useState(0);

  // Init
  useEffect(() => {
    // 1. Check if already Pro
    const isPro = localStorage.getItem("pro") === "true";
    if (isPro) {
      router.replace("/dashboard");
      return;
    }

    // 2. Load Level & Questions
    const lvl = (localStorage.getItem("userLevel") as Level) || "EMT";
    const normalized: Level = lvl === "Paramedic" ? "Paramedic" : "EMT";
    setUserLevel(normalized);

    const pool = questions.filter((q) => q.level === normalized);
    // Shuffle and take enough for the demo + buffer
    const picked = shuffle(pool.length ? pool : questions).slice(0, 15);
    setActiveQuestions(picked);
  }, [router]);

  const question = activeQuestions[currentIndex];

  // --- Theme Engine ---
  const theme = useMemo(() => {
    const isP = userLevel === "Paramedic";
    return {
      isP,
      bg: "#0F172A", // Slate 950
      accent: isP ? "text-rose-400" : "text-cyan-400",
      accentBg: isP ? "bg-rose-500" : "bg-cyan-500",
      softAccentBg: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
      border: isP ? "border-rose-500/20" : "border-cyan-500/20",
      highlight: isP ? "shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]" : "shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]",
      btnGrad: isP ? "from-rose-600 to-red-600" : "from-cyan-600 to-blue-600",
      icon: isP ? "⚡️" : "🚑"
    };
  }, [userLevel]);

  // --- Actions ---

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    
    // XP Mechanic (Immediate gratification)
    if (question && idx === question.correctIndex) {
      setXp(prev => prev + 50);
    }
  };

  const handleNext = () => {
    if (!question) return;

    // Record result
    const isCorrect = selectedOption === question.correctIndex;
    const newHistory = [...history, isCorrect];
    setHistory(newHistory);

    // CHECK FOR PAYWALL TRIGGER
    // If we just finished the 7th question (index 6), stop.
    if (currentIndex >= MAX_DEMO_QUESTIONS - 1) {
      triggerPaywall(newHistory);
      return;
    }

    // Otherwise, advance
    setIsSubmitted(false);
    setSelectedOption(null);
    setCurrentIndex(prev => prev + 1);
  };

  const triggerPaywall = (finalHistory: boolean[]) => {
    // 1. Calculate Fake "Readiness" based on their short performance
    const correctCount = finalHistory.filter(Boolean).length;
    const total = finalHistory.length;
    
    // Math to make them feel "Borderline" (creates urgency)
    // If they got 7/7, give them 78% (So close to 80%).
    // If they got 0/7, give them 42% (Danger).
    let score = 42;
    if (total > 0) {
      const rawPct = (correctCount / total);
      score = Math.round(40 + (rawPct * 45)); // Scale between 40 and 85
    }

    // 2. Identify a "Weak Domain" (Randomly pick one from the ones they missed, or default)
    // In a real app we'd map this, but for the demo, we create the "Gap".
    const weakDomain = question?.category || "Cardiology"; 

    // 3. Save to storage for the Paywall to read
    localStorage.setItem("readinessScore", score.toString());
    localStorage.setItem("weakestDomain", weakDomain);
    localStorage.setItem("weakestDomainPct", Math.round(score * 0.8).toString()); // Arbitrary lower score
    localStorage.setItem("daysToExam", "14"); // Fixed urgency
    localStorage.setItem("diagnosticCompletedAt", Date.now().toString()); // Marks them as "Done"
    
    // 4. Redirect
    router.replace("/pay");
  };

  // --- Render ---
  if (!question) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-[20%] -left-[10%] w-[600px] h-[600px] ${theme.isP ? "bg-rose-600/5" : "bg-cyan-600/5"} blur-[120px] rounded-full`} />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* HEADER */}
      <header className="px-6 py-4 flex justify-between items-center relative z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${theme.accentBg} animate-pulse shadow-[0_0_10px_currentColor]`} />
          <div>
            <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              LIVE SESSION • {userLevel}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Adaptive Difficulty
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className={`text-xl font-black font-mono leading-none ${theme.accent}`}>
              {xp} <span className="text-[10px] text-slate-500">XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-6 flex flex-col justify-center relative z-10 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Question Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${theme.border} ${theme.softAccentBg} ${theme.accent}`}>
                {question.category}
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                ID: #{question.id + 2040}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-slate-100 mb-8 drop-shadow-lg">
              {question.text}
            </h2>

            {/* Options */}
            <div className="grid gap-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctIndex;
                
                // Determine styling based on state
                let styleClass = "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"; // Default
                
                if (isSubmitted) {
                  if (isCorrect) {
                    // It's the right answer (whether picked or not, show it)
                    styleClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                  } else if (isSelected && !isCorrect) {
                    // You picked wrong
                    styleClass = "border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    // Irrelevant options
                    styleClass = "border-transparent bg-transparent text-slate-600 opacity-50";
                  }
                } else if (isSelected) {
                   // Active state before submit (won't happen with instant submit, but good for safety)
                   styleClass = `${theme.border} ${theme.softAccentBg} text-white`;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isSubmitted}
                    className={`relative w-full p-4 md:p-5 rounded-xl border text-left transition-all duration-200 group ${styleClass}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Letter Box */}
                      <div className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 transition-colors
                        ${isSubmitted && isCorrect ? "border-emerald-500 bg-emerald-500 text-black" : 
                          isSubmitted && isSelected && !isCorrect ? "border-red-500 bg-red-500 text-black" :
                          "border-white/20 text-slate-500"}
                      `}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      
                      {/* Text */}
                      <span className="text-sm md:text-base font-medium leading-snug">
                        {opt}
                      </span>

                      {/* Status Icon */}
                      {isSubmitted && isCorrect && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* RATIONALE DRAWER (The "Million Dollar" Value) */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-50"
          >
            {/* Glassmorphism Container */}
            <div className="bg-[#0B1121]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.8)] pb-8 pt-2 px-4 md:px-0">
              
              {/* Drag Handle (Visual only) */}
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mt-2 mb-4" />

              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col gap-4">
                  
                  {/* Verdict Banner */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      selectedOption === question.correctIndex 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                      <span className="text-lg">
                        {selectedOption === question.correctIndex ? "✓" : "✕"}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest">
                        {selectedOption === question.correctIndex ? "Excellent" : "Incorrect"}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      Explanation
                    </div>
                  </div>

                  {/* Rationale Content */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                    <p className="text-slate-200 text-sm leading-relaxed">
                      <span className="text-white font-bold">Why: </span>
                      {question.explanation}
                    </p>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg bg-gradient-to-r ${theme.btnGrad} hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2`}
                  >
                    <span>Continue</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
