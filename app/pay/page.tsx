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
    subtitle: "$6.95 / month",
    title: "Unlock Full Access",
  },
  lifetime: {
    price: 24.95,
    cadence: " once",
    strike: 69.00,
    badge: "Best Value",
    subtitle: "One-time payment",
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
  const [userState, setUserState] = useState("National");
  const [readiness, setReadiness] = useState(68);
  const [missedList, setMissedList] = useState<DiagnosticAnswer[]>([]);
  const [isPerfectScore, setIsPerfectScore] = useState(false);

  // Embedded Checkout
  const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const embeddedRef = useRef<any>(null);

  useEffect(() => {
    // Load persisted data
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
    setUserState(localStorage.getItem("userState") || "National");
    
    const savedScore = Number(localStorage.getItem("readinessScore"));
    if (Number.isFinite(savedScore)) setReadiness(Math.round(savedScore));

    // Missed question loader
    try {
      const raw = localStorage.getItem("diagnosticAnswers");
      if (raw) {
        const parsed = JSON.parse(raw) as DiagnosticAnswer[];
        if (Array.isArray(parsed) && parsed.length) {
          let list = parsed.filter((a) => !a.isCorrect);
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
  const PASSING_SCORE = 80;
  const failGap = Math.max(0, PASSING_SCORE - readiness);

  const theme = useMemo(() => {
    return {
      accentText: isP ? "text-rose-300" : "text-cyan-300",
      accentGrad: isP ? "from-rose-400 to-red-500" : "from-cyan-400 to-blue-500",
      ring: isP ? "border-rose-400/60" : "border-cyan-400/70",
      glow: isP
        ? "shadow-[0_0_35px_-14px_rgba(244,63,94,0.45)]"
        : "shadow-[0_0_35px_-14px_rgba(34,211,238,0.55)]",
      chipBg: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      ctaGrad: isP ? "from-rose-600 to-red-500" : "from-blue-600 to-cyan-500",
      badgeGrad: isP ? "from-rose-500 to-red-500" : "from-cyan-400 to-blue-500", // FIXED: Added this missing property
      subtleBg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      dangerBg: "bg-red-500/10 border-red-500/30 text-red-400",
      pulseBg: isP ? "bg-rose-400" : "bg-cyan-400",
      pulseCore: isP ? "bg-rose-500" : "bg-cyan-500",
      icon: isP ? "⚡️" : "🚑",
    };
  }, [isP]);

  const bottomSafePadding = "pb-[220px]";

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

      const e = restoreEmail.includes("@") ? restoreEmail : undefined;
      const clientSecret = await createCheckoutClientSecret(selectedPlan, e);

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
          <div className={`${isCorrect ? "bg-emerald-900/20 border-emerald-500/20" : "bg-red-900/20 border-red-500/20"} border rounded-xl p-3`}>
            <div className={`text-[9px] font-black uppercase tracking-widest ${isCorrect ? "text-emerald-400" : "text-red-400"} mb-1`}>YOU PICKED</div>
            <div className={`text-2xl font-black ${isCorrect ? "text-emerald-300" : "text-red-300"}`}>{userLetter}</div>
          </div>
        </div>

        <button 
          onClick={startCheckout}
          className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0 text-left transition-all hover:border-white/20 group"
        >
           <div className="absolute inset-0 p-4 text-[10px] text-slate-500 opacity-60 blur-[2px] select-none leading-relaxed">
              The correct answer is {correctLetter} because {item.explanation.slice(0, 100)}... this is the hidden rationale content that you are paying to see...
           </div>

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

        {/* HEADER SECTION (Simplified & Centered) */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          
          {/* UPDATED TITLE (CAPS + GRADIENT) */}
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.05] mb-2 text-white uppercase">
            Unlock 4,000+ <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGrad}`}>Real Exam Questions</span>
          </h1>

        </motion.div>
        {/* Pulse Badge (UPDATED: Matches User Level Color) */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme.chipBg} ${theme.chipText} text-[10px] font-mono tracking-widest uppercase mb-4`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.pulseBg}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.pulseCore}`}></span>
            </span>
            Used by 12,000+ Candidates • 2026 Edition
          </div>

        {/* Features (Renamed Header) */}
        <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">What&apos;s Included</h3>
            <span className="text-[11px] font-mono text-slate-400">Instant unlock</span>
          </div>
          <div className="mt-4 space-y-3">
            <FeatureRow icon="🧪" text="NREMT Practice Test CAT-style" />
            <FeatureRow icon="📚" text="4,000+ questions and answers" />
            <FeatureRow icon="🎯" text="Personalized weakness fix plan (auto-generated)" />
            <FeatureRow icon={isP ? "⚡️" : "🚑"} text="EMT + Paramedic modes (switch anytime)" />
            <FeatureRow icon="🛡️" text="Pass Guarantee (refund if you complete plan + don’t pass)" />
          </div>
        </div>

        {/* Plans */}
        <div className="mb-5 space-y-3">
          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title={PRICING.monthly.title}
            subtitle={PRICING.monthly.subtitle}
            rightTop={PRICING.monthly.strike ? fmt(PRICING.monthly.strike) : null}
            rightMain={`${fmt(PRICING.monthly.price)}${PRICING.monthly.cadence}`}
            accent={isP ? "rose" : "blue"}
            badgeGrad={theme.badgeGrad}
          />
          <PlanCard
            selected={selectedPlan === "lifetime"}
            onClick={() => setSelectedPlan("lifetime")}
            title={PRICING.lifetime.title}
            subtitle={PRICING.lifetime.subtitle}
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
            <Testimonial quote="I failed the NREMT twice before this. The simulator is the exact same as the real test. Passed in 70 questions." meta="EMT Candidate • 2 days ago" />
            <Testimonial quote="The rationales are gold. They don't just give the answer, they explain the clinical reasoning. Passed first try." meta="Paramedic Candidate • 1 week ago" />
            <Testimonial quote="Worth every penny. The 100% Pass Guarantee gave me confidence, but I didn't need to use it." meta="NREMT Pass • Verified" />
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

        {/* Restore Link */}
        <div className="mt-6 mb-8 text-left pl-2">
          <button
            onClick={() => setShowRestore(true)}
            className="text-xs font-bold text-slate-500 hover:text-slate-300 underline underline-offset-4 transition-colors"
          >
            Already paid? Restore access
          </button>
        </div>
      </div>

      {/* STICKY BOTTOM CHECKOUT (Simplified) */}
      {!checkoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-auto w-full max-w-sm px-4 pb-4">
            <div className="rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-3 shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.8)]">
              <motion.button
                onClick={startCheckout}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-xl font-black text-lg text-white border border-white/10 bg-gradient-to-r ${theme.ctaGrad} shadow-lg hover:shadow-white/10 transition-all uppercase`}
              >
                {PRICING[selectedPlan].title.toUpperCase()}
              </motion.button>
              {/* Trust Badge */}
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

      {/* RESTORE POPUP MODAL */}
      <AnimatePresence>
        {showRestore && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <span className="text-sm leading-relaxed text-slate-200">
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
