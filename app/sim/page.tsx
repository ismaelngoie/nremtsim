"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/questions";
import { useRouter } from "next/navigation";

type Level = "EMT" | "Paramedic";
type Stage = "quiz" | "analyzing" | "preview";

type Q = (typeof questions)[number];

type AnswerRecord = {
  id: number;
  category: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;

  // Snapshot for premium preview
  text: string;
  options: string[];
  explanation: string;
};

type DomainRow = {
  category: string;
  correct: number;
  total: number;
  accuracy: number; // 0..100
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const r = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    const j = Math.floor(r * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick 5 questions with category diversity if possible.
 * This makes the “weakest domain” feel real and premium.
 */
function pickDiagnosticQuestions(pool: Q[], count = 5) {
  const byCat = new Map<string, Q[]>();
  for (const q of pool) {
    const list = byCat.get(q.category) || [];
    list.push(q);
    byCat.set(q.category, list);
  }

  const categories = shuffle(Array.from(byCat.keys()));

  // Pick 1 from each category first
  const picked: Q[] = [];
  for (const cat of categories) {
    const list = byCat.get(cat)!;
    const one = shuffle(list)[0];
    if (one) picked.push(one);
    if (picked.length >= count) break;
  }

  if (picked.length >= count) return picked.slice(0, count);

  // Fill remaining with randoms not already picked
  const pickedIds = new Set(picked.map((q) => q.id));
  const remaining = shuffle(pool.filter((q) => !pickedIds.has(q.id)));
  return [...picked, ...remaining.slice(0, count - picked.length)];
}

/**
 * Wilson score interval (approx CI for a proportion).
 * Great for premium-feeling “confidence interval”.
 */
function wilsonCI(correct: number, n: number, z = 1.96) {
  if (n <= 0) return { low: 0, high: 100 };
  const p = correct / n;
  const denom = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denom;
  const margin =
    (z *
      Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) /
    denom;

  return {
    low: Math.round(clamp((center - margin) * 100, 0, 100)),
    high: Math.round(clamp((center + margin) * 100, 0, 100)),
  };
}

/**
 * Converts small-sample diagnostic to a “readiness” score
 * that feels stable (not whiplash).
 */
function readinessScore(correct: number, n: number) {
  // Posterior mean of Beta(correct+1, wrong+1)
  const passProb = (correct + 1) / (n + 2); // 0..1
  // Map to readiness range with a strong floor/ceiling:
  // 0% -> ~35, 100% -> ~95
  const score = Math.round(35 + passProb * 60);
  return clamp(score, 35, 95);
}

function computeDomainBreakdown(ans: AnswerRecord[]): DomainRow[] {
  const by = new Map<string, { correct: number; total: number }>();
  for (const a of ans) {
    const cur = by.get(a.category) || { correct: 0, total: 0 };
    cur.total += 1;
    if (a.isCorrect) cur.correct += 1;
    by.set(a.category, cur);
  }

  const rows: DomainRow[] = Array.from(by.entries()).map(([category, v]) => ({
    category,
    correct: v.correct,
    total: v.total,
    accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  // Sort worst to best (more “insight”)
  rows.sort((a, b) => a.accuracy - b.accuracy);
  return rows;
}

function statusFromReadiness(readiness: number) {
  if (readiness >= 80) return { label: "ON TRACK", tone: "text-emerald-300" };
  if (readiness >= 65) return { label: "BORDERLINE", tone: "text-yellow-300" };
  return { label: "AT RISK", tone: "text-red-300" };
}

export default function SimulatorPage() {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("quiz");
  const [userLevel, setUserLevel] = useState<Level>("EMT");

  const [activeQuestions, setActiveQuestions] = useState<Q[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [analysisText, setAnalysisText] = useState("INITIATING STOP PROTOCOL...");
  const [analysisPct, setAnalysisPct] = useState(0);

  // Premium-feeling diagnostic timer (shorter than “real exam”, still pressure)
  const [timeLeft, setTimeLeft] = useState(420);

  const question = activeQuestions[currentQIndex];

  const theme = useMemo(() => {
    const isP = userLevel === "Paramedic";
    return {
      isP,
      accent: isP ? "text-rose-300" : "text-cyan-300",
      accentSoft: isP ? "text-rose-200" : "text-cyan-200",
      border: isP ? "border-rose-400/35" : "border-cyan-400/35",
      btn: isP
        ? "bg-gradient-to-r from-rose-600 to-red-500"
        : "bg-gradient-to-r from-blue-600 to-cyan-500",
      selectRing: isP ? "border-rose-500 bg-rose-500/10" : "border-blue-500 bg-blue-500/10",
      radioFill: isP ? "bg-rose-500" : "bg-blue-500",
      bar: isP ? "bg-rose-500" : "bg-blue-600",
      barGlow: isP ? "shadow-[0_0_10px_#f43f5e]" : "shadow-[0_0_10px_#2563EB]",
      scan:
        isP
          ? "bg-[linear-gradient(transparent_50%,rgba(244,63,94,0.28)_50%)]"
          : "bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.22)_50%)]",
      spinner: isP ? "border-rose-500" : "border-cyan-500",
      chip: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      progress: isP ? "bg-rose-500" : "bg-cyan-400",
    };
  }, [userLevel]);

  // INIT: level + pick 5 diverse questions for that level
  useEffect(() => {
    const lvl = (localStorage.getItem("userLevel") as Level) || "EMT";
    const normalized: Level = lvl === "Paramedic" ? "Paramedic" : "EMT";
    setUserLevel(normalized);

    const pool = questions.filter((q) => q.level === normalized);
    const picked = pickDiagnosticQuestions(pool.length ? pool : questions, 5);
    setActiveQuestions(picked);
  }, []);

  // TIMER (only during quiz)
  useEffect(() => {
    if (stage !== "quiz") return;
    const t = setInterval(() => setTimeLeft((p) => clamp(p - 1, 0, 999999)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  // Timeout → analyze with what we have
  useEffect(() => {
    if (stage !== "quiz") return;
    if (timeLeft <= 0) {
      runAnalysis(answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, stage]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPct = useMemo(() => {
    const total = 5;
    return Math.round(((currentQIndex + 1) / total) * 100);
  }, [currentQIndex]);

  const analysisRunningRef = useRef(false);

  const commitAndAdvance = () => {
    if (!question || selectedOption === null) return;

    const rec: AnswerRecord = {
      id: question.id,
      category: question.category,
      selectedIndex: selectedOption,
      correctIndex: question.correctIndex,
      isCorrect: selectedOption === question.correctIndex,

      text: question.text,
      options: question.options,
      explanation: question.explanation,
    };

    const nextAnswers = [...answers, rec];
    setAnswers(nextAnswers);

    if (currentQIndex >= 4) {
      runAnalysis(nextAnswers);
      return;
    }

    setCurrentQIndex((p) => p + 1);
    setSelectedOption(null);
  };

  const runAnalysis = (finalAnswers: AnswerRecord[]) => {
    if (analysisRunningRef.current) return;
    analysisRunningRef.current = true;

    setStage("analyzing");
    setAnalysisPct(0);

    const steps: Array<{ t: number; pct: number; text: string }> = [
      { t: 650, pct: 14, text: "ACQUIRING RESPONSE MATRIX..." },
      { t: 1400, pct: 30, text: "CALIBRATING ITEM DIFFICULTY..." },
      { t: 2200, pct: 46, text: "SCORING CLINICAL DECISIONS..." },
      { t: 3000, pct: 62, text: "MAPPING DOMAIN WEAKNESSES..." },
      { t: 3850, pct: 78, text: "GENERATING READINESS REPORT..." },
      { t: 4700, pct: 92, text: "COMPILING FIX PLAN..." },
      { t: 5450, pct: 100, text: "REPORT READY • LOCK APPLIED" },
    ];

    steps.forEach((s) => {
      setTimeout(() => {
        setAnalysisPct(s.pct);
        setAnalysisText(s.text);
      }, s.t);
    });

    setTimeout(() => {
      const total = finalAnswers.length || 1;
      const correct = finalAnswers.filter((a) => a.isCorrect).length;

      const readiness = readinessScore(correct, total);
      const status = statusFromReadiness(readiness);

      const domains = computeDomainBreakdown(finalAnswers);
      const weakest = domains[0] || { category: "General", accuracy: 50, correct: 0, total: 0 };

      // Confidence interval + pass probability
      const passProb = Math.round(((correct + 1) / (total + 2)) * 100);
      const ci = wilsonCI(correct, total);

      // Persist for paywall personalization
      localStorage.setItem("readinessScore", String(readiness));
      localStorage.setItem("weakestDomain", weakest.category);
      localStorage.setItem("weakestDomainPct", String(weakest.accuracy));
      localStorage.setItem("daysToExam", String(14));
      localStorage.setItem("diagnosticCompletedAt", String(Date.now()));

      // Persist richer data for future upgrades
      localStorage.setItem("diagnosticAnswers", JSON.stringify(finalAnswers));
      localStorage.setItem("domainBreakdown", JSON.stringify(domains));
      localStorage.setItem("passProbability", String(passProb));
      localStorage.setItem("confidenceLow", String(ci.low));
      localStorage.setItem("confidenceHigh", String(ci.high));
      localStorage.setItem("statusLabel", status.label);

      setStage("preview");
    }, 5700);
  };

  // PREVIEW computed from answers (live)
  const preview = useMemo(() => {
    const total = answers.length || 1;
    const correct = answers.filter((a) => a.isCorrect).length;

    const readiness = readinessScore(correct, total);
    const status = statusFromReadiness(readiness);
    const domains = computeDomainBreakdown(answers);
    const weakest = domains[0] || { category: "General", accuracy: 50, correct: 0, total: 0 };

    const passProb = Math.round(((correct + 1) / (total + 2)) * 100);
    const ci = wilsonCI(correct, total);

    const missed = answers.find((a) => !a.isCorrect) || null;

    return { readiness, ...status, domains, weakest, passProb, ci, missed, correct, total };
  }, [answers]);

  const retake = () => {
    analysisRunningRef.current = false;
    setAnswers([]);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setTimeLeft(420);

    const pool = questions.filter((q) => q.level === userLevel);
    setActiveQuestions(pickDiagnosticQuestions(pool.length ? pool : questions, 5));
    setStage("quiz");
  };

  /* -------------------- ANALYZING -------------------- */
  if (stage === "analyzing") {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center font-mono relative overflow-hidden">
        <div className={`absolute inset-0 pointer-events-none opacity-20 ${theme.scan} bg-[length:100%_4px]`} />

        <motion.div
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`absolute left-0 right-0 h-1 ${theme.isP ? "bg-rose-500/50" : "bg-cyan-400/50"} blur-sm z-0`}
        />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="z-10 w-full max-w-sm">
          <div className={`w-24 h-24 border-4 ${theme.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.12)]`} />

          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tighter drop-shadow-lg">
            EXAM STOPPED
          </h1>

          <div className={`bg-black/35 border ${theme.border} p-5 rounded-2xl backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`text-xs font-black tracking-widest uppercase ${theme.accent}`}>
                STOP PROTOCOL
              </div>
              <div className="text-xs text-slate-400 font-bold">{analysisPct}%</div>
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisPct}%` }}
                transition={{ duration: 0.35 }}
                className={`h-full ${theme.progress}`}
              />
            </div>

            <p className="mt-4 text-slate-200 font-bold text-sm md:text-base tracking-wide">
              &gt; <span className={theme.accentSoft}>{analysisText}</span>
            </p>

            <div className="mt-3 text-[11px] text-slate-400 font-semibold">
              Readiness score • weakest domain • fix plan
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* -------------------- PREVIEW (LOCKED REPORT + MISSED QUESTION BLUR) -------------------- */
  if (stage === "preview") {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="text-[11px] font-black tracking-widest uppercase text-slate-300">REPORT GENERATED</span>
              <span className={`text-[11px] font-mono ${theme.accent}`}>{userLevel} calibrated</span>
            </div>

            {/* Score Card */}
            <div className="mt-4 rounded-2xl bg-slate-900/45 border border-white/10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black tracking-widest uppercase text-slate-300">Readiness</div>
                  <div className="mt-1 text-4xl font-black tracking-tight">
                    <span className={theme.accent}>{preview.readiness}%</span>{" "}
                    <span className={`text-sm font-black ${preview.tone}`}>({preview.label})</span>
                  </div>
                </div>

                <div className={`px-3 py-2 rounded-xl border ${theme.chip}`}>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${theme.chipText}`}>
                    Pass Probability
                  </div>
                  <div className="text-xl font-black text-white">{preview.passProb}%</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence</div>
                  <div className="mt-1 text-sm font-extrabold text-white">
                    {preview.ci.low}%–{preview.ci.high}%
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 font-semibold">interval estimate</div>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accuracy</div>
                  <div className="mt-1 text-sm font-extrabold text-white">
                    {preview.correct}/{preview.total}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 font-semibold">diagnostic items</div>
                </div>
              </div>
            </div>

            {/* Locked Domain Breakdown */}
            <div className="mt-4 rounded-2xl bg-slate-900/45 border border-white/10 p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-black tracking-widest uppercase text-slate-300">
                  Weakness Breakdown
                </div>
                <div className={`text-[11px] font-mono ${theme.accent}`}>
                  weakest: {preview.weakest.category}
                </div>
              </div>

              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${theme.isP ? "bg-rose-500" : "bg-cyan-400"}`}
                  style={{ width: `${preview.weakest.accuracy}%` }}
                />
              </div>

              <div className="mt-2 text-[11px] text-slate-300 font-semibold">
                Domain accuracy: <span className="text-white font-black">{preview.weakest.accuracy}%</span> • Fix plan generated
              </div>

              {/* Premium blurred list */}
              <div className="mt-4 space-y-2 relative">
                <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-black tracking-widest uppercase">
                    🔒 Full breakdown locked
                  </div>
                </div>

                <div className="relative opacity-40">
                  {preview.domains.slice(0, 5).map((d) => (
                    <div key={d.category} className="rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-extrabold text-slate-100">{d.category}</div>
                        <div className="text-sm font-black text-white">{d.accuracy}%</div>
                      </div>
                      <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${theme.isP ? "bg-rose-500" : "bg-cyan-400"}`}
                          style={{ width: `${d.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Billion-dollar conversion block: Missed question blurred */}
            <div className="mt-4 rounded-2xl bg-slate-900/45 border border-white/10 p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-black tracking-widest uppercase text-slate-300">Missed Question Example</div>
                <div className="text-[11px] text-slate-400 font-mono">rationale inside</div>
              </div>

              {preview.missed ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-black tracking-widest uppercase">
                      🔒 Unlock to reveal the rationale
                    </div>
                  </div>

                  <div className="relative opacity-40">
                    <div className="text-sm font-extrabold text-white leading-relaxed">
                      {preview.missed.text}
                    </div>

                    <div className="mt-3 space-y-2">
                      {preview.missed.options.map((opt, i) => {
                        const isCorrect = i === preview.missed!.correctIndex;
                        const isPicked = i === preview.missed!.selectedIndex;
                        return (
                          <div
                            key={i}
                            className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-slate-200 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-mono">{String.fromCharCode(65 + i)}.</span>
                              <span className="font-semibold">{opt}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                              {isPicked && <span className="text-yellow-300">your pick</span>}
                              {isCorrect && <span className="text-emerald-300">correct</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rationale</div>
                      <div className="mt-1 text-sm text-slate-200 leading-relaxed">
                        {preview.missed.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-300">
                  You didn’t miss a question in this diagnostic. Unlock to see the full plan anyway.
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("/pay")}
              className={`mt-5 w-full py-4 rounded-xl font-black text-lg text-white border border-white/10 ${theme.btn} shadow-lg`}
            >
              UNLOCK FULL REPORT →
            </motion.button>

            <div className="mt-2 text-center text-[11px] text-slate-400 font-semibold">
              Unlock the fix plan + unlimited full sims + full rationales
            </div>

            <div className="mt-4 text-center text-[10px] uppercase tracking-widest text-white/25">
              Instant unlock • Designed to convert pressure into passing
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* -------------------- QUIZ -------------------- */
  if (!question) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col">
      <header className="px-6 py-4 border-b border-white/5 bg-[#0F172A] flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className={`text-xs font-black tracking-widest uppercase ${theme.accent}`}>
            {userLevel} DIAGNOSTIC • ADAPTIVE SIM
          </h1>
          <p className="text-[10px] text-gray-500 font-mono mt-1">5 questions • report at stop</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-mono font-bold text-white">{formatTime(timeLeft)}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Time Remaining</p>
        </div>
      </header>

      <div className="w-full bg-slate-900 h-1">
        <div className={`${theme.bar} h-full transition-all duration-500 ${theme.barGlow}`} style={{ width: `${progressPct}%` }} />
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
        <motion.div key={currentQIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-slate-800 text-gray-300 text-xs font-bold px-3 py-1 rounded border border-white/10">
              Q{currentQIndex + 1}/5
            </span>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">{question.category}</span>
            <span className={`ml-auto text-[10px] font-mono ${theme.accent}`}>
              {theme.isP ? "ALS calibrated" : "BLS calibrated"}
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold leading-relaxed mb-10 text-slate-100">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={[
                  "relative p-5 rounded-xl border-2 text-left transition-all duration-200",
                  selectedOption === idx
                    ? `${theme.selectRing} shadow-[0_0_20px_rgba(255,255,255,0.06)]`
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors",
                      selectedOption === idx
                        ? theme.isP
                          ? "border-rose-500"
                          : "border-blue-500"
                        : "border-gray-600",
                    ].join(" ")}
                  >
                    {selectedOption === idx && <div className={`w-3 h-3 rounded-full ${theme.radioFill}`} />}
                  </div>
                  <span className={`text-lg font-medium ${selectedOption === idx ? "text-white" : "text-gray-300"}`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      <div className="p-6 border-t border-white/5 flex justify-end max-w-3xl mx-auto w-full">
        <button
          onClick={commitAndAdvance}
          disabled={selectedOption === null}
          className={[
            "px-8 py-4 rounded-xl font-black text-white transition-all flex items-center gap-2",
            selectedOption === null
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : `${theme.isP ? "bg-rose-600 hover:bg-rose-500" : "bg-blue-600 hover:bg-blue-500"} shadow-lg`,
          ].join(" ")}
        >
          {currentQIndex === 4 ? "COMPLETE DIAGNOSTIC" : "NEXT QUESTION"} <span>→</span>
        </button>
      </div>
    </div>
  );
}
