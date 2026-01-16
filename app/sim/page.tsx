"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { questions, Level } from "@/lib/questions";

export default function SimulatorPage() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 Hours
  
  // State for filtered questions
  const [activeQuestions, setActiveQuestions] = useState<typeof questions>([]);
  const [userLevel, setUserLevel] = useState<string>("EMT");

  // Load User Level and Filter Questions on Mount
  useEffect(() => {
    const level = localStorage.getItem("userLevel") || "EMT";
    setUserLevel(level);
    
    // Filter questions matching the level
    const filtered = questions.filter(q => q.level === level);
    // If we don't have enough, just use all (fallback)
    setActiveQuestions(filtered.length > 0 ? filtered : questions);
  }, []);

  const question = activeQuestions[currentQIndex % activeQuestions.length];

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // TRIGGER GLITCH AT Q5 (Index 4)
    if (currentQIndex === 4) {
      setIsGlitching(true);
      setTimeout(() => setShowGate(true), 3000);
    } else {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  // --- GATE (Paywall Tease) ---
  if (showGate) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center font-mono">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#0F172A] border border-blue-500/30 p-8 rounded-2xl shadow-2xl"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </div>
          
          <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">EXAM STOPPED</h1>
          <p className="text-blue-400 text-sm font-bold tracking-widest mb-6">CONFIDENCE INTERVAL: 94%</p>
          
          <div className="bg-black/50 p-4 rounded-lg border border-white/5 mb-6 text-left">
            <p className="text-gray-400 text-xs mb-1">Candidate Level:</p>
            <p className="text-white font-mono text-sm font-bold mb-3">{userLevel.toUpperCase()}</p>
            <p className="text-gray-400 text-xs mb-1">Performance:</p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-yellow-500 blur-[1px]" />
              </div>
              <span className="text-yellow-500 text-xs font-bold">BORDERLINE</span>
            </div>
          </div>

          <a href="/pay" className="block w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
            UNLOCK FULL REPORT
          </a>
        </motion.div>
      </div>
    );
  }

  // --- GLITCH ANIMATION ---
  if (isGlitching) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.h1 
          animate={{ x: [-5, 5, -5, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="text-6xl md:text-9xl font-black text-white tracking-tighter"
          style={{ textShadow: "2px 0 red, -2px 0 blue" }}
        >
          SYSTEM<br />FAILURE
        </motion.h1>
        <p className="mt-8 font-mono text-red-500 text-xl">&gt; THETA_LIMIT_REACHED</p>
      </div>
    );
  }

  // --- EXAM INTERFACE (Pearson VUE Decoy) ---
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans flex flex-col">
      <header className="bg-[#2C3E50] text-white p-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-sm font-bold tracking-wide opacity-80">NREMT COGNITIVE EXAM</h1>
          <p className="text-xs opacity-60">Level: {userLevel}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono font-bold">{formatTime(timeLeft)}</p>
          <p className="text-[10px] uppercase opacity-60">Time Remaining</p>
        </div>
      </header>

      <div className="w-full bg-gray-300 h-2">
        <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${(currentQIndex / 70) * 100}%` }} />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 flex flex-col">
        <div className="flex-1">
          <div className="mb-8">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">
              Question {currentQIndex + 1} of 70
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed mb-10">
            {question ? question.text : "Loading scenarios..."}
          </h2>

          <div className="space-y-3">
            {question?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === idx ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === idx ? "border-blue-600" : "border-gray-300"}`}>
                  {selectedOption === idx && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
                <span className="font-medium text-gray-700">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-end border-t border-gray-300 pt-6">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded font-bold text-white transition-all ${
              selectedOption === null ? "bg-gray-400 cursor-not-allowed" : "bg-[#2C3E50] hover:bg-[#34495E] shadow-lg"
            }`}
          >
            NEXT QUESTION →
          </button>
        </div>
      </main>
    </div>
  );
}
