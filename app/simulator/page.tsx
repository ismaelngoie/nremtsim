"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { questions } from "@/lib/questions";

// --- Types ---
type Level = "EMT" | "Paramedic";
type ExamState = "briefing" | "active" | "results";

type ExamSession = {
  level: Level;
  endAt: number; // epoch ms
  questionIds: number[];
  answers: Record<number, number>; // keyed by question index in this session
  flags: number[]; // flagged question indices
  currentIdx: number;
  startedAt: number; // epoch ms
};

type PerCategory = Record<string, { correct: number; total: number; pct: number }>;

type ExamResult = {
  mode: "exam";
  level: Level;
  at: number; // epoch ms
  score: number;
  total: number;
  pct: number;
  passed: boolean;
  answeredCount: number;
  flaggedCount: number;
  durationSec: number;
  perCategory: PerCategory;
};

type CategoryPerfStore = Record<
  string,
  {
    attempts: number;
    correct: number;
    total: number;
    lastPct: number;
    lastAt: number;
    lastMode: "exam" | "shift" | "study";
  }
>;

// --- Config ---
const EXAM_Q_COUNT = 70;
const EXAM_DURATION_SEC = 7200; // 2 hours

const LS_ACTIVE_SESSION = "active-exam-session";
const LS_LAST_EXAM_RESULT = "last-exam-result";
const LS_CATEGORY_PERF = "category-performance";
const LS_WEAKEST_DOMAIN = "weakestDomain";
const LS_MASTERED_IDS = "mastered-ids";
const LS_USER_LEVEL = "userLevel";

function safeJSON<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(sec: number) {
  const s = Math.max(0, sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}

export default function SimulatorPage() {
  // --- STATE ---
  const [level, setLevel] = useState<Level>("EMT");
  const [state, setState] = useState<ExamState>("briefing");

  const [activeQuestions, setActiveQuestions] = useState<typeof questions>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flags, setFlags] = useState<Set<number>>(new Set());

  // Timer managed by endAt (prevents drift + supports refresh)
  const [endAt, setEndAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEC);

  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  // --- THEME ENGINE ---
  const isP = level === "Paramedic";
  const theme = useMemo(
    () => ({
      bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      accent: isP ? "text-rose-400" : "text-cyan-400",
      border: isP ? "border-rose-500/20" : "border-cyan-500/20",
      btn: isP ? "bg-rose-600 hover:bg-rose-500" : "bg-blue-600 hover:bg-blue-500",
      glow: isP ? "shadow-rose-500/20" : "shadow-cyan-500/20",
      selection: isP ? "border-rose-500 bg-rose-500/10" : "border-cyan-400 bg-cyan-500/10",
      bar: isP ? "bg-rose-500" : "bg-cyan-500",
    }),
    [isP]
  );

  const buildNewExam = useCallback((lvl: Level) => {
    const pool = questions.filter((q) => q.level === lvl);
    const examPool = pool.length ? pool : questions; // fallback

    const examSet = shuffle(examPool).slice(0, EXAM_Q_COUNT);
    setActiveQuestions(examSet);
    setAnswers({});
    setFlags(new Set());
    setCurrentIdx(0);
    setResult(null);

    // fresh timer (not started until user presses start)
    setEndAt(null);
    setTimeLeft(EXAM_DURATION_SEC);

    setResumeAvailable(false);
    localStorage.removeItem(LS_ACTIVE_SESSION);
  }, []);

  const loadSessionIfAny = useCallback((lvl: Level) => {
    const session = safeJSON<ExamSession | null>(localStorage.getItem(LS_ACTIVE_SESSION), null);
    if (!session) return false;

    // validate
    if (session.level !== lvl) return false;
    if (!session.questionIds?.length) return false;

    // expired session -> clear
    if (Date.now() >= session.endAt) {
      localStorage.removeItem(LS_ACTIVE_SESSION);
      return false;
    }

    // rebuild question set by IDs
    const idToQ = new Map(questions.map((q) => [q.id, q]));
    const rebuilt = session.questionIds.map((id) => idToQ.get(id)).filter(Boolean) as typeof questions;
    if (!rebuilt.length) return false;

    setActiveQuestions(rebuilt);
    setAnswers(session.answers || {});
    setFlags(new Set(session.flags || []));
    setCurrentIdx(Number.isFinite(session.currentIdx) ? session.currentIdx : 0);
    setEndAt(session.endAt);

    const remaining = Math.ceil((session.endAt - Date.now()) / 1000);
    setTimeLeft(Math.max(0, remaining));

    setResumeAvailable(true);
    return true;
  }, []);

  // --- INIT ---
  useEffect(() => {
    const storedLevel = (localStorage.getItem(LS_USER_LEVEL) as Level) || "EMT";
    const normalized: Level = storedLevel === "Paramedic" ? "Paramedic" : "EMT";
    setLevel(normalized);

    // Try resume session first, else build fresh exam
    const resumed = loadSessionIfAny(normalized);
    if (!resumed) buildNewExam(normalized);
  }, [buildNewExam, loadSessionIfAny]);

  // --- Persist session (ONLY when active) ---
  useEffect(() => {
    if (state !== "active") return;
    if (!endAt) return;
    if (!activeQuestions.length) return;

    const payload: ExamSession = {
      level,
      startedAt: Date.now() - (EXAM_DURATION_SEC - timeLeft) * 1000,
      endAt,
      questionIds: activeQuestions.map((q) => q.id),
      answers,
      flags: Array.from(flags),
      currentIdx,
    };

    localStorage.setItem(LS_ACTIVE_SESSION, JSON.stringify(payload));
  }, [state, endAt, activeQuestions, level, answers, flags, currentIdx, timeLeft]);

  // --- Timer (active only) ---
  useEffect(() => {
    if (state !== "active") return;
    if (!endAt) return;

    const tick = () => {
      const remaining = Math.ceil((endAt - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        finishExam("timeout");
        return;
      }
      setTimeLeft(remaining);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [state, endAt]);

  // --- Warn before leaving mid-exam ---
  useEffect(() => {
    if (state !== "active") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state]);

  // --- ACTIONS ---
  const handleSelect = useCallback((optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }));
  }, [currentIdx]);

  const handleNext = useCallback(() => {
    setCurrentIdx((p) => (p + 1 < activeQuestions.length ? p + 1 : p));
  }, [activeQuestions.length]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((p) => (p > 0 ? p - 1 : p));
  }, []);

  const toggleFlag = useCallback(() => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(currentIdx)) next.delete(currentIdx);
      else next.add(currentIdx);
      return next;
    });
  }, [currentIdx]);

  const startExam = useCallback(() => {
    const newEndAt = Date.now() + EXAM_DURATION_SEC * 1000;
    setEndAt(newEndAt);
    setTimeLeft(EXAM_DURATION_SEC);
    setState("active");
    setResumeAvailable(false);
  }, []);

  const resumeExam = useCallback(() => {
    // endAt already loaded; just go active
    setState("active");
  }, []);

  const startNewExam = useCallback(() => {
    buildNewExam(level);
    setState("briefing");
  }, [buildNewExam, level]);

  const handleSubmit = useCallback(() => {
    if (confirm("End exam and submit results?")) finishExam("submit");
  }, []);

  const finishExam = useCallback((reason: "submit" | "timeout") => {
    // compute score + per-category
    const perCat: Record<string, { correct: number; total: number }> = {};
    let correct = 0;

    activeQuestions.forEach((q, i) => {
      const cat = q.category || "General";
      if (!perCat[cat]) perCat[cat] = { correct: 0, total: 0 };
      perCat[cat].total += 1;

      if (answers[i] === q.correctIndex) {
        correct += 1;
        perCat[cat].correct += 1;
      }
    });

    const total = activeQuestions.length || 1;
    const pct = clamp(Math.round((correct / total) * 100));
    const passed = pct >= 70;

    const perCategory: PerCategory = {};
    Object.entries(perCat).forEach(([cat, v]) => {
      const cpct = v.total ? clamp(Math.round((v.correct / v.total) * 100)) : 0;
      perCategory[cat] = { correct: v.correct, total: v.total, pct: cpct };
    });

    const answeredCount = Object.keys(answers).length;
    const flaggedCount = flags.size;

    const res: ExamResult = {
      mode: "exam",
      level,
      at: Date.now(),
      score: correct,
      total,
      pct,
      passed,
      answeredCount,
      flaggedCount,
      durationSec: EXAM_DURATION_SEC,
      perCategory,
    };

    // Save last result
    localStorage.setItem(LS_LAST_EXAM_RESULT, JSON.stringify(res));

    // Update category-performance store
    const store = safeJSON<CategoryPerfStore>(localStorage.getItem(LS_CATEGORY_PERF), {});
    Object.entries(perCategory).forEach(([cat, v]) => {
      const prev = store[cat] || { attempts: 0, correct: 0, total: 0, lastPct: 0, lastAt: 0, lastMode: "exam" as const };
      store[cat] = {
        attempts: prev.attempts + 1,
        correct: prev.correct + v.correct,
        total: prev.total + v.total,
        lastPct: v.pct,
        lastAt: Date.now(),
        lastMode: "exam",
      };
    });
    localStorage.setItem(LS_CATEGORY_PERF, JSON.stringify(store));

    // Update weakestDomain (lowest pct among meaningful categories)
    const candidates = Object.entries(perCategory)
      .filter(([, v]) => v.total >= 3) // avoid noise categories with 1-2 Qs
      .sort((a, b) => a[1].pct - b[1].pct);
    if (candidates.length) {
      localStorage.setItem(LS_WEAKEST_DOMAIN, candidates[0][0]);
    }

    // Optionally add mastered IDs for correct answers (helps Study Hub progress)
    const mastered = safeJSON<number[]>(localStorage.getItem(LS_MASTERED_IDS), []);
    const masteredSet = new Set(mastered);
    activeQuestions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) masteredSet.add(q.id);
    });
    localStorage.setItem(LS_MASTERED_IDS, JSON.stringify(Array.from(masteredSet)));

    // clear session
    localStorage.removeItem(LS_ACTIVE_SESSION);

    setResult(res);
    setState("results");

    // if timeout, make sure timer shows 0
    if (reason === "timeout") setTimeLeft(0);
  }, [activeQuestions, answers, flags, level]);

  // --- KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state !== "active") return;

      if (["1", "a", "A"].includes(e.key)) handleSelect(0);
      if (["2", "b", "B"].includes(e.key)) handleSelect(1);
      if (["3", "c", "C"].includes(e.key)) handleSelect(2);
      if (["4", "d", "D"].includes(e.key)) handleSelect(3);

      if (e.key === "Enter" || e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "f" || e.key === "F") toggleFlag();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state, handleSelect, handleNext, handlePrev, toggleFlag]);

  const currentQ = activeQuestions[currentIdx];
  const progressPct = activeQuestions.length ? ((currentIdx + 1) / activeQuestions.length) * 100 : 0;
  const answeredCount = Object.keys(answers).length;

  // --- RENDER: BRIEFING ---
  if (state === "briefing") {
    return (
      <div className={`min-h-screen ${theme.bg} text-white flex items-center justify-center p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl"
        >
          <div className={`absolute top-0 left-0 w-full h-1 ${theme.bar}`} />

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black tracking-tight">OPERATIONAL BRIEFING</h1>
            <span className={`px-3 py-1 rounded-full border ${theme.border} text-[10px] font-bold uppercase tracking-widest ${theme.accent}`}>
              {level} Protocol
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <BriefingRow icon="⏱" title="120 Minutes" sub="Hard stop. Timer persists even if you refresh." />
            <BriefingRow icon="📝" title={`${EXAM_Q_COUNT} Questions`} sub="Full-domain coverage. Flag and revisit." />
            <BriefingRow icon="🛡" title="No Assists" sub="Rationales hidden until submission." />
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Controls</h3>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
              <div>[1-4] Select</div>
              <div>[Enter] Next</div>
              <div>[F] Flag</div>
              <div>[←] Previous</div>
            </div>
          </div>

          {resumeAvailable ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={resumeExam}
                className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${theme.btn}`}
              >
                RESUME EXAM
              </button>
              <button
                onClick={startNewExam}
                className="w-full py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-white/10 hover:bg-white/15 border border-white/10"
              >
                START NEW
              </button>
            </div>
          ) : (
            <button
              onClick={startExam}
              className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${theme.btn}`}
            >
              INITIATE EXAM SEQUENCE
            </button>
          )}

          <Link href="/dashboard" className="block text-center mt-4 text-xs text-slate-500 hover:text-white transition-colors">
            Abort Mission
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: RESULTS ---
  if (state === "results" && result) {
    const { score, total, pct, passed, flaggedCount, answeredCount } = result;

    return (
      <div className={`min-h-screen ${theme.bg} text-white flex items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-slate-900 border border-white/10 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className={`absolute -top-20 -left-20 w-60 h-60 blur-[100px] rounded-full opacity-40 ${passed ? "bg-emerald-500" : "bg-red-500"}`} />

          <div className={`relative w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-4 ${passed ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-red-500 bg-red-500/10 text-red-400"}`}>
            <span className="text-5xl font-black">{passed ? "✓" : "✕"}</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">{passed ? "CERTIFIED" : "NOT YET"}</h2>
          <p className="text-slate-400 text-sm mb-6">
            {passed ? "Performance meets target standards." : "Review weak domains and run another full simulation."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Score</div>
              <div className="text-2xl font-black text-white">{score}/{total}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Accuracy</div>
              <div className={`text-2xl font-black ${passed ? "text-emerald-400" : "text-red-400"}`}>{pct}%</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Answered</div>
              <div className="text-2xl font-black text-white">{answeredCount}/{total}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Flagged</div>
              <div className="text-2xl font-black text-white">{flaggedCount}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={startNewExam}
              className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${theme.btn}`}
            >
              RUN ANOTHER SIMULATION
            </button>

            <Link href="/dashboard" className="block w-full py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-200 transition-colors">
              RETURN TO HQ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: ACTIVE EXAM ---
  if (!currentQ) return <div className={`min-h-screen ${theme.bg}`} />;

  return (
    <div className={`min-h-screen ${theme.bg} text-white font-sans flex flex-col`}>
      {/* HUD Header */}
      <header className="px-6 py-4 bg-slate-950 border-b border-white/5 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Time Remaining</span>
            <span className={`text-xl font-mono font-bold ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-white"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="hidden md:block h-8 w-px bg-white/10" />

          <div className="hidden md:flex flex-col w-56">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono">
              <span>PROGRESS</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div className={`h-full ${theme.bar}`} animate={{ width: `${progressPct}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
              Answered: {answeredCount}/{activeQuestions.length}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleFlag}
            className={`px-3 py-1.5 rounded border text-xs font-bold transition-all flex items-center gap-2 ${
              flags.has(currentIdx)
                ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                : "border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill={flags.has(currentIdx) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="3">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            FLAG
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20 hover:bg-red-500/20"
          >
            SUBMIT EXAM
          </button>
        </div>
      </header>

      {/* Main Question Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="px-3 py-1 rounded bg-slate-800/50 border border-white/10 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Question {currentIdx + 1} of {activeQuestions.length}
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                ID: {currentQ.id ?? "GEN-001"}
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-slate-100">
              {currentQ.text}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-150 flex items-center gap-4 group ${
                      isSelected
                        ? `${theme.selection} ${theme.glow} shadow-lg`
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold border transition-colors ${
                        isSelected
                          ? (isP ? "border-rose-500 bg-rose-500 text-white" : "border-cyan-400 bg-cyan-400 text-black")
                          : "border-slate-600 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-base md:text-lg ${isSelected ? "text-white font-medium" : "text-slate-300"}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Nav */}
      <footer className="p-4 md:p-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm flex justify-between items-center sticky bottom-0 z-30">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
            currentIdx === 0 ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          ← Previous
        </button>

        {/* Question Map (Desktop Only) */}
        <div className="hidden md:flex gap-1 overflow-x-auto max-w-md px-4 no-scrollbar">
          {activeQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-1.5 h-6 rounded-full transition-all ${
                i === currentIdx
                  ? "bg-white scale-125"
                  : flags.has(i)
                    ? "bg-yellow-500"
                    : answers[i] !== undefined
                      ? (isP ? "bg-rose-500/50" : "bg-cyan-500/50")
                      : "bg-slate-800"
              }`}
              aria-label={`Jump to question ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={currentIdx + 1 === activeQuestions.length ? handleSubmit : handleNext}
          disabled={answers[currentIdx] === undefined}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg transition-all ${
            answers[currentIdx] === undefined
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : `${theme.btn} text-white`
          }`}
        >
          {currentIdx + 1 === activeQuestions.length ? "Finish Exam" : "Next"} →
        </button>
      </footer>
    </div>
  );
}

function BriefingRow({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">{icon}</div>
      <div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}
