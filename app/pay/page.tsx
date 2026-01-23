"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// --- Types ---
type PlanKey = "monthly" | "lifetime";

type PricingTier = {
  price: number;
  cadence: string;
  strike: number | null;
  badge?: string;
  subtitle: string;
  title: string;
};

// --- Config ---
const PRICING: Record<PlanKey, PricingTier> = {
  monthly: {
    price: 6.95,
    cadence: "/mo",
    strike: 19.95,
    subtitle: "Cancel anytime",
    title: "Start Monthly Access",
  },
  lifetime: {
    price: 24.95,
    cadence: " once",
    strike: 69.00,
    badge: "Best Value",
    subtitle: "One-time payment. Own it forever",
    title: "Get Lifetime Access",
  },
};

const fmt = (n: number) => `$${n}`;

type DiagnosticAnswer = {
  id: number;
  category: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  text: string;
  options: string[];
  explanation: string;
};

// --- Stripe Helper ---
declare global {
  interface Window {
    Stripe?: any;
  }
}

function loadStripeJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (window.Stripe) return resolve();
    const existing = document.querySelector('script[src="https://js.stripe.com/v3/"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/v3/";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Stripe"));
    document.head.appendChild(s);
  });
}

async function createCheckoutClientSecret(plan: PlanKey, email?: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, email }),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || "Checkout failed");
  return data.clientSecret;
}

function PaywallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paid = searchParams.get("success") === "true";

  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("monthly");

  // Restore
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null);
  const [showRestore, setShowRestore] = useState(false);

  // Personalization
  const [userLevel, setUserLevel] = useState("EMT");
  const [userName, setUserName] = useState("FUTURE MEDIC");
  const [readiness, setReadiness] = useState(68);
  const [weakDomain, setWeakDomain] = useState("Cardiology");
  const [weakPct, setWeakPct] = useState(42);
  const [daysToExam, setDaysToExam] = useState(14);

  // Diagnostic patches
  const [passProb, setPassProb] = useState<number | null>(null);
  const [ciLow, setCiLow] = useState<number | null>(null);
  const [ciHigh, setCiHigh] = useState<number | null>(null);
  const [missedList, setMissedList] = useState<DiagnosticAnswer[]>([]);
  const [isPerfectScore, setIsPerfectScore] = useState(false);

  // Embedded Checkout
  const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const embeddedRef = useRef<any>(null);

  useEffect(() => {
    // Level + name
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
    setUserName(localStorage.getItem("userName") || "FUTURE MEDIC");

    const rs = Number(localStorage.getItem("readinessScore"));
    const wd = localStorage.getItem("weakestDomain");
    const wp = Number(localStorage.getItem("weakestDomainPct"));
    const dte = Number(localStorage.getItem("daysToExam"));

    if (Number.isFinite(rs)) setReadiness(Math.round(rs));
    if (wd) setWeakDomain(wd);
    if (Number.isFinite(wp)) setWeakPct(Math.round(wp));
    if (Number.isFinite(dte)) setDaysToExam(Math.round(dte));

    const pp = Number(localStorage.getItem("passProbability"));
    const cl = Number(localStorage.getItem("confidenceLow"));
    const ch = Number(localStorage.getItem("confidenceHigh"));

    if (Number.isFinite(pp)) setPassProb(Math.round(pp));
    if (Number.isFinite(cl)) setCiLow(Math.round(cl));
    if (Number.isFinite(ch)) setCiHigh(Math.round(ch));

    // Missed question (Load all wrong answers OR fallback to sample)
    try {
      const raw = localStorage.getItem("diagnosticAnswers");
      if (raw) {
        const parsed = JSON.parse(raw) as DiagnosticAnswer[];
        if (Array.isArray(parsed) && parsed.length) {
          // 1. Try to find wrong answers
          let list = parsed.filter((a) => !a.isCorrect);
          
          // 2. Fallback: If 100% score (no wrong answers), pick first 3 as samples
          if (list.length === 0) {
             setIsPerfectScore(true);
             list = parsed.slice(0, 3);
          } else {
             setIsPerfectScore(false);
          }
          
          setMissedList(list.slice(0, 3));
        }
      }
    } catch {}
  }, []);

  const isP = userLevel === "Paramedic";

  const theme = useMemo(() => {
    return {
      accentText: isP ? "text-rose-300" : "text-cyan-300",
      ring: isP ? "border-rose-400/60" : "border-cyan-400/70",
      glow: isP
        ? "shadow-[0_0_35px_-14px_rgba(244,63,94,0.45)]"
        : "shadow-[0_0_35px_-14px_rgba(34,211,238,0.55)]",
      chipBg: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      ctaGrad: isP ? "from-rose-600 to-red-500" : "from-blue-600 to-cyan-500",
      subtleBg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      bar: isP ? "bg-rose-500" : "bg-cyan-400",
      badgeGrad: isP ? "from-rose-500 to-red-500" : "from-cyan-400 to-blue-500",
      icon: isP ? "⚡️" : "🚑",
    };
  }, [isP]);

  const status = useMemo(() => {
    if (readiness >= 80) return { label: "ON TRACK", tone: "text-emerald-300" };
    if (readiness >= 65) return { label: "BORDERLINE", tone: "text-yellow-300" };
    return { label: "AT RISK", tone: "text-red-300" };
  }, [readiness]);

  const dateString = useMemo(() => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() + 2);
    return validDate.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
  }, []);

  const bottomSafePadding = "pb-[340px]";

  // --- Embedded Checkout Logic ---
  const startCheckout = async () => {
    if (!stripePk) {
      alert("Missing Stripe Key");
      return;
    }
    setCheckoutBusy(true);
    setCheckoutOpen(true);

    try {
      await loadStripeJs();
      const stripe = window.Stripe?.(stripePk);
      if (!stripe) throw new Error("Stripe failed to load");

      // Attempt to capture email if entered in restore box (or empty)
      const e = restoreEmail.includes("@") ? restoreEmail : undefined;
      const clientSecret = await createCheckoutClientSecret(selectedPlan, e);

      // Clean up old
      if (embeddedRef.current) {
        embeddedRef.current.destroy();
      }

      const embedded = await stripe.initEmbeddedCheckout({ clientSecret });
      embedded.mount("#embedded-checkout");
      embeddedRef.current = embedded;
      setCheckoutBusy(false);
    } catch (e: any) {
      alert(e.message || "Could not start checkout");
      setCheckoutBusy(false);
      setCheckoutOpen(false);
    }
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    if (embeddedRef.current) {
      embeddedRef.current.destroy();
      embeddedRef.current = null;
    }
  };

  async function handleRestore() {
    const email = restoreEmail.trim().toLowerCase();
    if (!email.includes("@")) {
      setRestoreMsg("Type the same email you paid with in the box.");
      return;
    }
    setRestoreLoading(true);
    setRestoreMsg(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok && data.access !== "none") {
        localStorage.setItem("pro", "true");
        localStorage.setItem("proEmail", email);
        localStorage.setItem("proAccess", data.access);
        setRestoreMsg("✅ Restored. Sending you to Dashboard...");
        router.push("/dashboard");
        return;
      }
      setRestoreMsg("❌ Not found. Use the exact email you paid with.");
    } catch (e: any) {
      setRestoreMsg(`❌ Error: ${e?.message || "Failed"}`);
    } finally {
      setRestoreLoading(false);
    }
  }

  // --- MISSED QUESTION CARD ---
  const MissedCard = ({ item }: { item: DiagnosticAnswer }) => {
    const correctLetter = String.fromCharCode(65 + item.correctIndex);
    const userLetter = item.selectedIndex >= 0 ? String.fromCharCode(65 + item.selectedIndex) : "-";
    const isCorrect = item.isCorrect;

    return (
      <div className="bg-[#0B1022] border border-white/10 rounded-2xl p-5 mb-4 shadow-xl">
        {/* Dynamic Header: "ANALYSIS LOCKED" if perfect, "YOU MISSED THIS" if wrong */}
        <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isCorrect ? "text-emerald-400" : theme.accentText}`}>
          {isCorrect ? `ANALYSIS LOCKED • ${item.category.toUpperCase()}` : `YOU MISSED THIS • ${item.category.toUpperCase()}`}
        </div>
        
        <div className="text-sm font-bold text-white leading-relaxed mb-4">
          {item.text}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-3">
            <div className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">CORRECT</div>
            <div className="text-2xl font-black text-emerald-300">{correctLetter}</div>
          </div>
          {/* Dynamic User Box: Green if correct, Red if wrong */}
          <div className={`${isCorrect ? "bg-emerald-900/20 border-emerald-500/20" : "bg-red-900/20 border-red-500/20"} border rounded-xl p-3`}>
            <div className={`text-[9px] font-black uppercase tracking-widest ${isCorrect ? "text-emerald-400" : "text-red-400"} mb-1`}>YOU PICKED</div>
            <div className={`text-2xl font-black ${isCorrect ? "text-emerald-300" : "text-red-300"}`}>{userLetter}</div>
          </div>
        </div>

        {/* LOCKED ANSWER BUTTON WITH TRANSPARENT TEXT EFFECT */}
        <button 
          onClick={startCheckout}
          className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0 text-left transition-all hover:border-white/20 group"
        >
           {/* Faint text in background to simulate "showing the answer" */}
           <div className="absolute inset-0 p-4 text-[10px] text-slate-500 opacity-60 blur-[2px] select-none leading-relaxed">
              The correct answer is {correctLetter} because {item.explanation.slice(0, 100)}... this is the hidden rationale content that you are paying to see...
           </div>

           {/* The foreground content */}
           <div className="relative z-10 flex h-14 items-center justify-center gap-3 bg-black/30 backdrop-blur-[1px]">
              <span className="text-lg">🔒</span>
              <div className="text-left">
                 <div className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                    SEE FULL ANSWERS + WHY
                 </div>
                 <div className="text-[9px] text-slate-300 font-medium">
                    Get unlimited NREMT practice tests
                 </div>
              </div>
           </div>
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme.subtleBg} text-white font-sans flex flex-col items-center px-4 md:px-6 relative overflow-y-auto`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] ${isP ? "bg-rose-500/10" : "bg-cyan-500/10"} blur-[130px] rounded-full`} />
        <div className={`absolute top-[30%] -left-40 w-[520px] h-[520px] ${isP ? "bg-red-600/10" : "bg-blue-600/10"} blur-[130px] rounded-full`} />
        <div className="absolute bottom-[-18%] right-[-18%] w-[620px] h-[620px] bg-white/5 blur-[160px] rounded-full" />
      </div>

      <div className={`w-full max-w-sm z-10 pt-5 ${bottomSafePadding}`}>
        {/* Paid Banner */}
        {paid && (
          <div className="mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
            <div className="text-sm font-black text-emerald-200">✅ Payment Complete</div>
            <div className="mt-1 text-sm text-slate-200">
              Type the <b>same email</b> you paid with in the box.
            </div>
          </div>
        )}

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[11px] font-black tracking-widest text-slate-300 uppercase">REPORT LOCKED</span>
            <span className="text-[11px] font-mono text-slate-400">T-{daysToExam} days</span>
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight leading-[1.05]">
            Unlock 4,000+ Questions, Practice Tests & <span className={theme.accentText}>Full Simulator</span>
          </h1>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Your readiness is <span className="font-black text-white">{readiness}%</span>{" "}
            <span className={`font-black ${status.tone}`}>({status.label})</span>. Biggest risk:
            <span className="font-black text-white"> {weakDomain}</span>{" "}
            <span className="font-black text-red-300">({weakPct}%)</span>.
          </p>
          {(passProb !== null || (ciLow !== null && ciHigh !== null)) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {passProb !== null && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.chipBg}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme.chipText}`}>Pass probability</span>
                  <span className="text-sm font-black text-white">{passProb}%</span>
                </div>
              )}
              {ciLow !== null && ciHigh !== null && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Confidence</span>
                  <span className="text-sm font-black text-white">{ciLow}%–{ciHigh}%</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Social Proof */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5">
          <div className="rounded-2xl bg-slate-900/40 border border-white/10 px-4 py-3 flex items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Stars />
              <div className="leading-tight">
                <div className="text-sm font-extrabold">4.8/5</div>
                <div className="text-[11px] text-slate-400 font-semibold">Avg. candidate rating</div>
              </div>
            </div>
            <div className="h-9 w-px bg-white/10" />
            <div className="leading-tight text-right">
              <div className="text-sm font-extrabold">12,000+</div>
              <div className="text-[11px] text-slate-400 font-semibold">Simulations this month</div>
            </div>
          </div>
        </motion.div>

        {/* ID Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className={`bg-white rounded-2xl p-6 shadow-2xl shadow-blue-900/50 relative overflow-hidden text-black transform rotate-1 border-t-4 ${isP ? "border-rose-500" : "border-cyan-500"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/35 to-transparent opacity-60 pointer-events-none" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Operator Credential</p>
                <div className="h-1 w-12 bg-blue-600 mt-1" />
              </div>
              <span className="text-xl font-black text-gray-200">2026</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 text-3xl ${isP ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
                {theme.icon}
              </div>
              <div>
                <p className={`text-xs font-black uppercase mb-0.5 ${isP ? "text-rose-600" : "text-blue-600"}`}>{userLevel} MODE</p>
                <h2 className="text-2xl font-black tracking-tight leading-none">{userName}</h2>
                <p className="text-[10px] font-mono text-gray-500 mt-1">VALID THROUGH: {dateString}</p>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">FULL SIMS</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">FIX PLAN</div>
              </div>
              <div
                className="h-6 w-24 bg-black opacity-80"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 90%, 20% 90%, 25% 100%, 30% 100%, 35% 80%, 40% 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ✅ WHAT YOU MISSED SECTION (FIXED: Visible for 100% scores too) */}
        {missedList.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="text-xs font-black uppercase tracking-widest text-white">
                {isPerfectScore ? "FULL EXAM ANALYSIS" : "What You Missed"}
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TAP TO UNLOCK</div>
            </div>
            
            {missedList.map((missed) => (
              <MissedCard key={missed.id} item={missed} />
            ))}

            <button 
              onClick={startCheckout}
              className="w-full py-4 rounded-xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              SEE FULL ANSWERS + EXPLANATIONS <span className="text-lg">→</span>
            </button>
            <div className="mt-3 text-center text-[9px] font-black uppercase tracking-widest text-slate-500">
              Unlimited NREMT Practice Tests • All Categories • Works Offline • 12,000+ NREMTs Passed
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Pro Medical Suite Includes</h3>
            <span className="text-[11px] font-mono text-slate-400">Instant unlock</span>
          </div>
          <div className="mt-4 space-y-3">
            <FeatureRow icon="🧪" text="CAT-style full simulations (70–120Q) + timers" />
            <FeatureRow icon="📚" text="4,000+ question bank + rapid drills" />
            <FeatureRow icon="🧠" text="Rationales that explain *why* (not just the answer)" />
            <FeatureRow icon="🎯" text="Personalized weakness fix plan (auto-generated)" />
            <FeatureRow icon={isP ? "⚡️" : "🚑"} text="EMT + Paramedic modes (switch anytime)" />
            <FeatureRow icon="🛡️" text="Pass Guarantee (refund if you complete plan + don’t pass)" highlight />
          </div>
        </div>

        {/* Plans */}
        <div className="mb-5 space-y-3">
          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title={PRICING.monthly.title}
            subtitle="Cancel anytime."
            rightTop={PRICING.monthly.strike ? fmt(PRICING.monthly.strike) : null}
            rightMain={`${fmt(PRICING.monthly.price)}${PRICING.monthly.cadence}`}
            accent={isP ? "rose" : "blue"}
            badgeGrad={theme.badgeGrad}
          />
          <PlanCard
            selected={selectedPlan === "lifetime"}
            onClick={() => setSelectedPlan("lifetime")}
            title={PRICING.lifetime.title}
            subtitle="One-time payment. Own it forever."
            rightTop={PRICING.lifetime.strike ? fmt(PRICING.lifetime.strike) : null}
            rightMain={`${fmt(PRICING.lifetime.price)}${PRICING.lifetime.cadence}`}
            badge={PRICING.lifetime.badge}
            accent="red"
            badgeGrad={theme.badgeGrad}
          />
        </div>

        {/* Testimonials */}
        <div className="mb-6 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Recent wins</h3>
          <div className="mt-4 space-y-3">
            <Testimonial quote="The readiness score told me exactly what to fix. I hammered cardio for a week and passed." meta="EMT Candidate • 9 days ago" />
            <Testimonial quote="Feels like a real exam session. The pacing and review mode finally made it click." meta="Paramedic Candidate • 2 weeks ago" />
            <Testimonial quote="I stopped guessing. The rationales were the difference." meta="EMR → EMT • First attempt pass" />
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-6 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Questions</h3>
          <div className="mt-3 space-y-2">
            <FAQItem q="Is this updated for 2026?" a="Yes. We strictly follow the latest NREMT & AHA guidelines." />
            <FAQItem q="What if I fail?" a="If you complete the plan and don't pass, email us for a 100% refund." />
            <FAQItem q="Can I use it on my phone?" a="Yes. It works perfectly on iPhone, Android, and tablets." />
          </div>
        </div>

        {/* ✅ Simple Restore Link */}
        <div className="mt-6 mb-8 text-left pl-2">
          <button
            onClick={() => setShowRestore(true)}
            className="text-xs font-bold text-slate-500 hover:text-slate-300 underline underline-offset-4 transition-colors"
          >
            Already paid? Restore access
          </button>
        </div>
      </div>

      {/* STICKY BOTTOM CHECKOUT */}
      {!checkoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <div className="mx-auto w-full max-w-sm px-4 pb-4">
            <div className="rounded-2xl bg-black/35 backdrop-blur-xl border border-white/10 p-3 shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between px-1 pb-2">
                <div className="text-xs text-slate-300 font-semibold">
                  Selected:{" "}
                  <span className="font-black text-white">
                    {PRICING[selectedPlan].title}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {selectedPlan === "monthly" && <>Cancel anytime</>}
                  {selectedPlan === "lifetime" && <>Pay once</>}
                </div>
              </div>
              <motion.button
                onClick={startCheckout}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-xl font-black text-lg text-white border border-white/10 bg-gradient-to-r ${theme.ctaGrad} shadow-lg hover:shadow-white/10 transition-all uppercase`}
              >
                {PRICING[selectedPlan].title.toUpperCase()}
              </motion.button>
              {/* ✅ Single Line Trust Badge */}
              <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono uppercase tracking-widest whitespace-nowrap">
                <span>🔒 Secure checkout</span>
                <span className="text-white/20">•</span>
                <span>12,000+ NREMTs Passed</span>
              </div>
              <div className="h-[env(safe-area-inset-bottom)]" />
            </div>
          </div>
        </div>
      )}

      {/* EMBEDDED CHECKOUT MODAL OVERLAY */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <span className="text-sm font-black text-white uppercase tracking-widest">
                {PRICING[selectedPlan].title}
              </span>
              <button onClick={closeCheckout} className="text-sm text-slate-400 hover:text-white font-bold px-3 py-1 rounded-lg hover:bg-white/10">
                CLOSE
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-1 bg-white">
              {checkoutBusy && <div className="p-10 text-center text-black font-mono">Loading payment...</div>}
              <div id="embedded-checkout" className="min-h-[400px]"></div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ RESTORE POPUP MODAL */}
      <AnimatePresence>
        {showRestore && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setShowRestore(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowRestore(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>

              <div className="text-sm font-black text-white uppercase tracking-widest">Restore Access</div>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Enter the exact email you used during checkout.
              </p>

              <div className="mt-4 flex gap-2">
                <input
                  value={restoreEmail}
                  onChange={(e) => setRestoreEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-white/30"
                />
                <button
                  onClick={handleRestore}
                  disabled={restoreLoading}
                  className="px-4 py-3 rounded-xl font-black text-xs bg-white/10 border border-white/10 hover:bg-white/15 disabled:opacity-50 text-white"
                >
                  {restoreLoading ? "..." : "GO"}
                </button>
              </div>

              {restoreMsg && (
                <div className="mt-3 text-xs text-center text-amber-300 font-semibold">
                  {restoreMsg}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PaywallPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F172A]" />}>
      <PaywallContent />
    </Suspense>
  );
}

// --- Icons & UI ---
function FeatureRow({ icon, text, highlight = false }: { icon: string; text: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <span className={`text-sm leading-relaxed ${highlight ? "text-yellow-300 font-black" : "text-slate-200"}`}>
        {text}
      </span>
    </div>
  );
}

type PlanCardProps = {
  selected: boolean;
  onClick: () => void;
  badge?: string;
  title: string;
  subtitle: string;
  rightTop: string | null;
  rightMain: string;
  accent: "cyan" | "blue" | "red" | "rose";
  badgeGrad: string;
};

function PlanCard({ selected, onClick, badge, title, subtitle, rightTop, rightMain, accent, badgeGrad }: PlanCardProps) {
  const accentStyles =
    accent === "cyan"
      ? { ring: "border-cyan-400/70", bg: "bg-cyan-500/10", glow: "shadow-[0_0_35px_-14px_rgba(34,211,238,0.55)]" }
      : accent === "rose"
        ? { ring: "border-rose-400/70", bg: "bg-rose-500/10", glow: "shadow-[0_0_35px_-14px_rgba(244,63,94,0.45)]" }
        : accent === "red"
          ? { ring: "border-red-400/60", bg: "bg-red-500/10", glow: "shadow-[0_0_35px_-14px_rgba(239,68,68,0.40)]" }
          : { ring: "border-blue-400/60", bg: "bg-blue-500/10", glow: "shadow-[0_0_35px_-14px_rgba(59,130,246,0.45)]" };

  return (
    <button
      onClick={onClick}
      className={[
        "relative w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left",
        selected
          ? `${accentStyles.bg} ${accentStyles.ring} ${accentStyles.glow}`
          : "bg-slate-800/30 border-white/10 opacity-90 hover:opacity-100 hover:border-white/15",
      ].join(" ")}
    >
      {selected && badge && (
        <div className={`absolute -top-3 right-4 bg-gradient-to-r ${badgeGrad} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg`}>
          {badge}
        </div>
      )}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h3 className="font-black text-white">{title}</h3>
          <p className="text-xs text-slate-300/90 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right whitespace-nowrap">
          {rightTop ? <span className="text-xs text-slate-400 line-through block">{rightTop}</span> : <span className="block h-[16px]" />}
          <span className="text-xl font-black text-white">{rightMain}</span>
        </div>
      </div>
    </button>
  );
}

function Testimonial({ quote, meta }: { quote: string; meta: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-xl">💬</div>
        <div>
          <div className="text-sm text-slate-200 leading-relaxed">“{quote}”</div>
          <div className="mt-2 text-[11px] text-slate-400 font-semibold">{meta}</div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="text-sm font-extrabold text-white">{q}</span>
        <span className="text-slate-300">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}>
            <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrustChip({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10">
      <span className="text-slate-200">{icon}</span>
      <span className="text-[10px] font-black tracking-wide text-slate-300 uppercase">{text}</span>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-yellow-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.382 2.456a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.539 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.783.57-.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81H6.81a1 1 0 00.95-.69l1.289-3.975z" />
        </svg>
      ))}
    </div>
  );
}

function ShieldIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l7 4v6c0 5-3 7-7 8-4-1-7-3-7-8V6l7-4z" /></svg>; }
function BoltIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 1L3 11h6l-1 8 9-12h-6l0-6z" /></svg>; }
function CheckIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>; }
function PayIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7H3a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H3V9h18v6z" /><path d="M6 13h5v2H6z" /></svg>; }
