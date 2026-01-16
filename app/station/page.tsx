"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { questions } from "@/lib/questions";

export default function StationPage() {
  // --- STATE MANAGEMENT ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  
  // Shift Logic: 10 Questions, 15 Minutes (900 seconds)
  const SHIFT_LENGTH = 10;
  const [timeLeft, setTimeLeft] = useState(900); 
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Load current question safely
  const question = questions[currentIndex % questions.length];

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true); // Time's up!
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // --- KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
      
      if (submitted) {
        if (e.key === "Enter") handleNext();
        return;
      }
      
      if (e.key === "1") handleOptionSelect(0);
      if (e.key === "2") handleOptionSelect(1);
      if (e.key === "3") handleOptionSelect(2);
      if (e.key === "4") handleOptionSelect(3);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, submitted, isFinished]);

  // --- HANDLERS ---
  const handleOptionSelect = (idx: number) => {
      if (submitted) return;
      setSelected(idx);
      handleSubmit(idx); // Auto-submit on selection for immediate feedback
  };

  const handleSubmit = (idx: number) => {
    setSubmitted(true);
    if (idx === question.correctIndex) {
      setStreak((s) => s + 1);
      setScore((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    // Check if Shift is done
    if (currentIndex + 1 >= SHIFT_LENGTH) {
      setIsFinished(true);
    } else {
      setSubmitted(false);
      setSelected(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Helper: Format Seconds to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- VIEW: SHIFT REPORT (END SCREEN) ---
  if (isFinished) {
    const percentage = Math.round((score / SHIFT_LENGTH) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
          <div className="mb-6 flex justify-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${passed ? "bg-green-500/20" : "bg-red-500/20"}`}>
              <span className={`text-4xl ${passed ? "text-green-500" : "text-red-500"}`}>
                {passed ? "✓" : "✕"}
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-white mb-2">SHIFT COMPLETE</h1>
          <p className="text-gray-400 text-sm mb-8">
            {passed ? "Excellent work. Competency maintained." : "Review protocols and try again."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-gray-500 text-xs font-bold uppercase">Accuracy</p>
              <p className={`text-2xl font-bold ${passed ? "text-green-400" : "text-red-400"}`}>
                {percentage}%
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-gray-500 text-xs font-bold uppercase">Time Left</p>
              <p className="text-2xl font-bold text-white">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <Link href="/dashboard" className="block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
            RETURN TO STATION
          </Link>
        </div>
      </div>
    );
  }

  // --- VIEW: ACTIVE STATION MODE ---
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col">
      
      {/* HUD HEADER */}
      <header className="px-6 py-4 border-b border-white/5 bg-[#0F172A] flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            ✕
          </Link>
          <div>
            <h1 className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              ACTIVE SHIFT • {currentIndex + 1}/{SHIFT_LENGTH}
            </h1>
            <div className="h-1 w-24 bg-gray-800 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${((currentIndex + 1) / SHIFT_LENGTH) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-xl font-mono font-bold ${timeLeft < 60 ? "text-red-500 animate-pulse" : "text-white"}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </header>

      {/* QUESTION STAGE */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Category Tag */}
            <span className="inline-block px-3 py-1 rounded bg-slate-800 text-gray-300 text-xs font-bold tracking-widest mb-6 border border-white/10">
              {question.category.toUpperCase()}
            </span>

            {/* The Question */}
            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-10 text-slate-100">
              {question.text}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, idx) => {
                let borderColor = "border-white/10";
                let bgColor = "bg-white/5";
                let textColor = "text-gray-300";

                if (submitted) {
                  if (idx === question.correctIndex) {
                    borderColor = "border-green-500";
                    bgColor = "bg-green-500/20";
                    textColor = "text-green-400";
                  } else if (idx === selected) {
                    borderColor = "border-red-500";
                    bgColor = "bg-red-500/20";
                    textColor = "text-red-400";
                  } else {
                    bgColor = "opacity-20"; // Dim others
                  }
                } else if (selected === idx) {
                  borderColor = "border-blue-500";
                  bgColor = "bg-blue-500/20";
                  textColor = "text-white";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200 group ${borderColor} ${bgColor}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`hidden md:flex w-6 h-6 rounded border items-center justify-center text-[10px] font-mono mt-0.5 ${submitted ? "opacity-0" : "border-white/20 text-gray-500"}`}>
                        {idx + 1}
                      </div>
                      <span className={`text-lg font-medium ${textColor}`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* IMMEDIATE FEEDBACK DRAWER (Popup) */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selected === question.correctIndex ? "bg-green-500" : "bg-red-500"}`}>
                    {selected === question.correctIndex ? (
                       <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    ) : (
                       <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                  <h3 className={`font-bold text-lg ${selected === question.correctIndex ? "text-green-400" : "text-red-400"}`}>
                    {selected === question.correctIndex ? "Correct!" : "Incorrect"}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {question.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                {currentIndex + 1 >= SHIFT_LENGTH ? "FINISH SHIFT" : "NEXT"} <span className="text-xs bg-black/10 px-1.5 py-0.5 rounded ml-1 hidden md:inline">ENTER</span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
