"use client";

import { useState, useEffect, Suspense, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { questions } from "@/lib/questions";

type Level = "EMT" | "Paramedic";

type PerfMap = Record<
  string,
  {
    attempts: number;
    last: number; // 0..100
    best: number; // 0..100
    avg: number; // 0..100
    updatedAt?: number;
  }
>;

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function safeJSON<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function upsertPerf(category: string, scorePct: number) {
  const key = "category-performance";
  const existing = safeJSON<PerfMap>(localStorage.getItem(key), {});
  const prev = existing[category];

  const score = clamp(Math.round(scorePct));

  if (!prev) {
    existing[category] = {
      attempts: 1,
      last: score,
      best: score,
      avg: score,
      updatedAt: Date.now(),
    };
  } else {
    const attempts = (prev.attempts || 0) + 1;
    const best = Math.max(prev.best ?? prev.last ?? 0, score);
    const prevAvg = Number.isFinite(prev.avg) ? prev.avg : (prev.last ?? score);
    const prevAttempts = Math.max(1, prev.attempts || 1);
    const avg = clamp(Math.round((prevAvg * prevAttempts + score) / attempts));

    existing[category] = {
      attempts,
      last: score,
      best,
      avg,
      updatedAt: Date.now(),
    };
  }

  localStorage.setItem(key, JSON.stringify(existing));
}

function markShiftCompleteToday() {
  const todayStr = new Date().toDateString();
  const existing = safeJSON<string[]>(localStorage.getItem("shift-history"), []);
  const set = new Set(existing);
  set.add(todayStr);
  localStorage.setItem("shift-history", JSON.stringify(Array.from(set)));
  localStorage.setItem("last-shift-date", todayStr);
}

export default function StationPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <StationPage />
    </Suspense>
  );
}

function StationPage() {
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";
  const mode = (searchParams.get("mode") || "").toLowerCase();

  // Modes:
  // - default: SHIFT (15-min timed drill) even if category exists
  // - mode=study: untimed, all questions
  // - mode=review: untimed, all questions
  const isStudyMode = mode === "study";
  const isReviewMode = mode === "review";
  const isShiftMode = !isStudyMode && !isReviewMode;

  // --- STATE ---
  const [level, setLevel] = useState<Level>("EMT");
  const [activeQuestions, setActiveQuestions] = useState<typeof questions>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(isShiftMode ? 900 : 0);
  const [isFinished, setIsFinished] = useState(false);
  const [scoreCorrect, setScoreCorrect] = useState(0);

  const persistedRef = useRef(false);

  // --- THEME ---
  const isP = level === "Paramedic";
  const theme = useMemo(
    () => ({
      bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      accent: isP ? "text-rose-400" : "text-cyan-400",
      accentBg: isP ? "bg-rose-500" : "bg-cyan-500",
      border: isP ? "border-rose-500/30" : "border-cyan-500/30",
      btn: isP ? "bg-gradient-to-r from-rose-600 to-red-600" : "bg-gradient-to-r from-blue-600 to-cyan-500",
      optionSelected: isP ? "border-rose-500 bg-rose-500/10" : "border-cyan-400 bg-cyan-500/10",
    }),
    [isP]
  );

  // --- INIT / RESET ON MODE OR CATEGORY ---
  useEffect(() => {
    // Load level
    const storedLevel = (localStorage.getItem("userLevel") as Level) || "EMT";
    const normalized: Level = storedLevel === "Paramedic" ? "Paramedic" : "EMT";
    setLevel(normalized);

    // Filter by level + (optional) category
    let filtered = questions.filter((q) => q.level === normalized);
    if (categoryFilter) filtered = filtered.filter((q) => q.category === categoryFilter);

    // Shuffle (copy first to avoid mutating original)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    // Shift mode: 10 Q, timed. Study/Review: all.
    const finalSet = isShiftMode ? shuffled.slice(0, 10) : shuffled;

    setActiveQuestions(finalSet.length ? finalSet : questions.slice(0, 10));

    // Reset run state
    setCurrentIndex(0);
    setSelected(null);
    setSubmitted(false);
    setIsFinished(false);
    setScoreCorrect(0);
    setTimeLeft(isShiftMode ? 900 : 0);

    persistedRef.current = false;
  }, [categoryFilter, isShiftMode]);

  const question = activeQuestions[currentIndex];
  const totalQs = activeQuestions.length;

  // --- TIMER (SHIFT ONLY) ---
  useEffect(() => {
    if (!isShiftMode || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, isShiftMode]);

  // --- Persist results exactly once when finished ---
  useEffect(() => {
    if (!isFinished) return;
    if (persistedRef.current) return;
    persistedRef.current = true;

    const pct = totalQs > 0 ? Math.round((scoreCorrect / totalQs) * 100) : 0;

    // Category used for dashboard performance bars
    const sessionCategory = categoryFilter || "General";

    // 1) Last shift result (dashboard reads this)
    localStorage.setItem("last-shift-result", JSON.stringify({ category: sessionCategory, score: pct }));

    // 2) Category performance map (dashboard performance section)
    upsertPerf(sessionCategory, pct);

    // 3) Mark streak complete
    markShiftCompleteToday();
  }, [isFinished, scoreCorrect, totalQs, categoryFilter]);

  // --- LOGIC ---
  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= totalQs) {
      setIsFinished(true);
      return;
    }
    setSubmitted(false);
    setSelected(null);
    setCurrentIndex((p) => p + 1);
  }, [currentIndex, totalQs]);

  const handleOptionSelect = useCallback(
    (idx: number) => {
      if (submitted || isFinished || !question) return;

      setSelected(idx);
      setSubmitted(true);

      const correct = idx === question.correctIndex;
      if (correct) {
        setScoreCorrect((s) => s + 1);

        // Save mastery
        const mastered = safeJSON<number[]>(localStorage.getItem("mastered-ids"), []);
        if (!mastered.includes(question.id)) {
          mastered.push(question.id);
          localStorage.setItem("mastered-ids", JSON.stringify(mastered));
        }
      }
    },
    [submitted, isFinished, question]
  );

  // --- KEYBOARD SHORTCUTS (no stale closures) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (submitted) {
        if (e.key === "Enter") handleNext();
        return;
      }

      if (["1", "a", "A"].includes(e.key)) handleOptionSelect(0);
      if (["2", "b", "B"].includes(e.key)) handleOptionSelect(1);
      if (["3", "c", "C"].includes(e.key)) handleOptionSelect(2);
      if (["4", "d", "D"].includes(e.key)) handleOptionSelect(3);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submitted, isFinished, handleNext, handleOptionSelect]);

  // --- LOADING ---
  if (!question) return <div className={`min-h-screen ${theme.bg}`} />;

  // --- END SCREEN ---
  if (isFinished) {
    const percentage = totalQs > 0 ? Math.round((scoreCorrect / totalQs) * 100) : 0;
    const passed = percentage >= 70;

    return (
      <div className={`min-h-screen ${theme.bg} text-white font-sans flex items-center justify-center p-4 relative overflow-hidden`}>
        <div className={`absolute top-[-20%] left-[-20%] w-[600px] h-[600px] ${isP ? "bg-rose-600/10" : "bg-cyan-500/10"} blur-[120px] rounded-full pointer-events-none`} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-sm font-black tracking-[0.3em] text-slate-400 uppercase mb-2">After Action Report</h1>
            <div className="text-4xl font-black">
              {isShiftMode ? "SHIFT ENDED" : "SESSION COMPLETE"}
            </div>
            {categoryFilter && (
              <div className={`mt-2 text-[11px] font-mono ${theme.accent} opacity-90`}>
                CATEGORY: {categoryFilter.toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex justify-center mb-10 relative">
            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 ${passed ? "bg-emerald-500" : "bg-red-500"}`} />
            <div className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center bg-slate-950 ${passed ? "border-emerald-500 text-emerald-400" : "border-red-500 text-red-500"}`}>
              <div className="text-center">
                <div className="text-3xl font-black">{percentage}%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest">{passed ? "PASSED" : "FAILED"}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Correct</div>
              <div className="text-2xl font-black text-white">
                {scoreCorrect}/{totalQs}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">XP Earned</div>
              <div className={`text-2xl font-black ${theme.accent}`}>+{scoreCorrect * 15}</div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className={`block w-full py-4 rounded-xl font-black text-center text-white shadow-lg transition-transform active:scale-95 ${theme.btn}`}
          >
            RETURN TO BASE
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- ACTIVE SESSION VIEW ---
  return (
    <div className={`min-h-screen ${theme.bg} text-white font-sans flex flex-col relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,#fff_50%)] bg-[length:100%_4px]" />

      {/* HEADER */}
      <header className="px-4 py-4 md:px-6 md:py-5 border-b border-white/5 bg-slate-950/50 backdrop-blur-md flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${theme.accent}`}>
                {categoryFilter ? categoryFilter : "GENERAL"}
              </span>

              {isShiftMode && (
                <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px] font-bold border border-red-500/30 animate-pulse">
                  LIVE
                </span>
              )}

              {(isStudyMode || isReviewMode) && (
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 text-[9px] font-bold border border-white/10">
                  {isReviewMode ? "REVIEW" : "STUDY"}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 mt-1.5">
              <div className="h-1.5 w-24 md:w-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${theme.accentBg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / Math.max(1, totalQs)) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Q{currentIndex + 1} OF {totalQs}
              </span>
            </div>
          </div>
        </div>

        {/* Timer / XP */}
        {isShiftMode ? (
          <div className="text-right">
            <div className={`text-xl font-mono font-bold tracking-tight ${timeLeft < 60 ? "text-red-500 animate-pulse" : "text-white"}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Time Left</div>
          </div>
        ) : (
          <div className="text-right">
            <div className={`text-xl font-mono font-bold tracking-tight ${theme.accent}`}>
              +{scoreCorrect * 15}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">XP Gained</div>
          </div>
        )}
      </header>

      {/* QUESTION */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded bg-slate-800 border border-white/10 text-[10px] font-bold tracking-widest text-slate-300 uppercase shadow-lg">
                {question.category}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <h2 className="text-xl md:text-3xl font-bold leading-relaxed mb-8 text-slate-100 drop-shadow-md">
              {question.text}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, idx) => {
                const isActive = selected === idx;
                const isCorrect = idx === question.correctIndex;

                let borderColor = "border-white/10";
                let bgColor = "bg-slate-800/40";
                let textColor = "text-slate-300";
                let shadow = "";

                if (submitted) {
                  if (isCorrect) {
                    borderColor = "border-emerald-500";
                    bgColor = "bg-emerald-500/10";
                    textColor = "text-emerald-400";
                    shadow = "shadow-[0_0_30px_rgba(16,185,129,0.1)]";
                  } else if (isActive) {
                    borderColor = "border-red-500";
                    bgColor = "bg-red-500/10";
                    textColor = "text-red-400";
                  } else {
                    bgColor = "opacity-40 grayscale";
                  }
                } else if (isActive) {
                  const [b, bg] = theme.optionSelected.split(" ");
                  borderColor = b;
                  bgColor = bg;
                  textColor = "text-white";
                  shadow = isP
                    ? "shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                    : "shadow-[0_0_20px_rgba(34,211,238,0.15)]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={submitted}
                    className={`relative p-5 rounded-xl border transition-all duration-200 group text-left ${borderColor} ${bgColor} ${shadow} hover:border-white/20`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`hidden md:flex w-6 h-6 rounded border items-center justify-center text-[10px] font-mono mt-0.5 transition-colors ${
                          submitted
                            ? isCorrect
                              ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                              : "border-white/10 text-slate-600"
                            : "border-white/15 text-slate-500 group-hover:border-white/30 group-hover:text-slate-300"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>

                      <span className={`text-base md:text-lg font-medium leading-snug ${textColor}`}>{option}</span>

                      {submitted && (isCorrect || isActive) && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {isCorrect ? (
                            <div className="text-emerald-500 bg-emerald-500/20 rounded-full p-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          ) : (
                            <div className="text-red-500 bg-red-500/20 rounded-full p-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* RATIONALE DRAWER */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full bg-[#020617] border-t border-white/10 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.7)]"
          >
            <div className={`h-1 w-full ${selected === question.correctIndex ? "bg-emerald-500" : "bg-red-500"}`} />

            <div className="max-w-4xl mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`text-xs font-black uppercase tracking-widest px-2 py-1 rounded ${
                      selected === question.correctIndex ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {selected === question.correctIndex ? "Target Hit" : "Target Missed"}
                  </div>
                </div>
                <div className="text-slate-300 text-sm md:text-base leading-relaxed opacity-90">
                  <span className="text-white font-bold">Rationale: </span>
                  {question.explanation}
                </div>
              </div>

              <button
                onClick={handleNext}
                className={`w-full md:w-auto px-10 py-4 rounded-xl font-black text-sm tracking-widest uppercase text-white shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 ${
                  selected === question.correctIndex ? "bg-emerald-600" : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {currentIndex + 1 >= totalQs ? "FINISH SHIFT" : "NEXT TARGET"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
