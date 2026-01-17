"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PlanKey = "monthly" | "annual" | "lifetime";

type PricingTier = {
  price: number;
  cadence: string;
  strike: number | null;
  badge?: string;
  subtitle: string;
};

const PRICING: Record<PlanKey, PricingTier> = {
  annual: {
    price: 119,
    cadence: "/yr",
    strike: 228,
    badge: "Best Value",
    subtitle: "Cheapest per month + keeps your progress",
  },
  monthly: {
    price: 19,
    cadence: "/mo",
    strike: null,
    subtitle: "Cancel anytime",
  },
  lifetime: {
    price: 249,
    cadence: " once",
    strike: 399,
    subtitle: "One-time payment. Own it forever",
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

type DomainRow = {
  category: string;
  correct: number;
  total: number;
  accuracy: number; // 0..100
};

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("annual");

  // Personalization
  const [userLevel, setUserLevel] = useState("EMT");
  const [userName, setUserName] = useState("FUTURE MEDIC");
  const [readiness, setReadiness] = useState(68);
  const [weakDomain, setWeakDomain] = useState("Cardiology");
  const [weakPct, setWeakPct] = useState(42);
  const [daysToExam, setDaysToExam] = useState(14);

  // New patches from diagnostic
  const [passProb, setPassProb] = useState<number | null>(null);
  const [ciLow, setCiLow] = useState<number | null>(null);
  const [ciHigh, setCiHigh] = useState<number | null>(null);
  const [domainBreakdown, setDomainBreakdown] = useState<DomainRow[] | null>(null);
  const [missed, setMissed] = useState<DiagnosticAnswer | null>(null);

  useEffect(() => {
    // Level + name
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
    setUserName(localStorage.getItem("userName") || "FUTURE MEDIC");

    // Core score fields
    const rs = Number(localStorage.getItem("readinessScore"));
    const wd = localStorage.getItem("weakestDomain");
    const wp = Number(localStorage.getItem("weakestDomainPct"));
    const dte = Number(localStorage.getItem("daysToExam"));

    if (Number.isFinite(rs) && rs >= 0 && rs <= 100) setReadiness(Math.round(rs));
    if (wd) setWeakDomain(wd);
    if (Number.isFinite(wp) && wp >= 0 && wp <= 100) setWeakPct(Math.round(wp));
    if (Number.isFinite(dte) && dte >= 0 && dte <= 365) setDaysToExam(Math.round(dte));

    // New diagnostic patches
    const pp = Number(localStorage.getItem("passProbability"));
    const cl = Number(localStorage.getItem("confidenceLow"));
    const ch = Number(localStorage.getItem("confidenceHigh"));

    if (Number.isFinite(pp) && pp >= 0 && pp <= 100) setPassProb(Math.round(pp));
    if (Number.isFinite(cl) && cl >= 0 && cl <= 100) setCiLow(Math.round(cl));
    if (Number.isFinite(ch) && ch >= 0 && ch <= 100) setCiHigh(Math.round(ch));

    // Domain breakdown preview
    try {
      const raw = localStorage.getItem("domainBreakdown");
      if (raw) {
        const parsed = JSON.parse(raw) as DomainRow[];
        if (Array.isArray(parsed) && parsed.length) {
          setDomainBreakdown(parsed.slice(0, 6));
        }
      }
    } catch {
      // ignore
    }

    // Missed question preview (massive conversion booster)
    try {
      const raw = localStorage.getItem("diagnosticAnswers");
      if (raw) {
        const parsed = JSON.parse(raw) as DiagnosticAnswer[];
        if (Array.isArray(parsed) && parsed.length) {
          const firstMiss = parsed.find((a) => a && a.isCorrect === false) || null;
          setMissed(firstMiss);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const isP = userLevel === "Paramedic";

  const theme = useMemo(() => {
    return {
      accentText: isP ? "text-rose-300" : "text-cyan-300",
      accentTextStrong: isP ? "text-rose-200" : "text-cyan-200",
      ring: isP ? "border-rose-400/60" : "border-cyan-400/70",
      glow: isP
        ? "shadow-[0_0_35px_-14px_rgba(244,63,94,0.45)]"
        : "shadow-[0_0_35px_-14px_rgba(34,211,238,0.55)]",
      chipBg: isP ? "bg-rose-500/10 border-rose-500/20" : "bg-cyan-500/10 border-cyan-500/20",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      ctaGrad: isP ? "from-rose-600 to-red-500" : "from-blue-600 to-cyan-500",
      subtleBg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      bar: isP ? "bg-rose-500" : "bg-cyan-400",
      softBar: isP ? "bg-rose-500/30" : "bg-cyan-400/30",
      badgeGrad: isP ? "from-rose-500 to-red-500" : "from-cyan-400 to-blue-500",
      icon: isP ? "⚡️" : "🚑",
    };
  }, [isP]);

  const status = useMemo(() => {
    if (readiness >= 80) return { label: "ON TRACK", tone: "text-emerald-300" };
    if (readiness >= 65) return { label: "BORDERLINE", tone: "text-yellow-300" };
    return { label: "AT RISK", tone: "text-red-300" };
  }, [readiness]);

  // Future Date for ID Card
  const dateString = useMemo(() => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() + 2);
    return validDate.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
  }, []);

  const annualMonthlyEquivalent = useMemo(() => {
    const perMonth = PRICING.annual.price / 12;
    return Math.round(perMonth * 100) / 100;
  }, []);

  // Carry plan to checkout
  const checkoutHref = useMemo(() => `/dashboard?plan=${selectedPlan}`, [selectedPlan]);

  // Make sure scrolling never hides last content behind sticky checkout
  // (This is the fix for your “Quick answers gets covered” issue)
  const bottomSafePadding = "pb-[260px]";

  return (
    <div className={`min-h-screen ${theme.subtleBg} text-white font-sans flex flex-col items-center px-4 md:px-6 relative overflow-y-auto`}>
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] ${isP ? "bg-rose-500/10" : "bg-cyan-500/10"} blur-[130px] rounded-full`} />
        <div className={`absolute top-[30%] -left-40 w-[520px] h-[520px] ${isP ? "bg-red-600/10" : "bg-blue-600/10"} blur-[130px] rounded-full`} />
        <div className="absolute bottom-[-18%] right-[-18%] w-[620px] h-[620px] bg-white/5 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className={`w-full max-w-sm z-10 pt-5 ${bottomSafePadding}`}>
        {/* Top header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[11px] font-black tracking-widest text-slate-300 uppercase">REPORT LOCKED</span>
            <span className="text-[11px] font-mono text-slate-400">T-{daysToExam} days</span>
          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight leading-[1.05]">
            Unlock Your <span className={theme.accentText}>Readiness Plan</span>
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
                  <span className="text-sm font-black text-white">
                    {ciLow}%–{ciHigh}%
                  </span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Social proof strip */}
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

        {/* ID card (identity upgrade) */}
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
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 text-3xl ${
                  isP ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-blue-50 border-blue-100 text-blue-600"
                }`}
              >
                {theme.icon}
              </div>
              <div>
                <p className={`text-xs font-black uppercase mb-0.5 ${isP ? "text-rose-600" : "text-blue-600"}`}>
                  {userLevel} MODE
                </p>
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
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 90%, 20% 90%, 25% 100%, 30% 100%, 35% 80%, 40% 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* “Real data” teaser: domain breakdown (blurred) */}
        {domainBreakdown && domainBreakdown.length > 0 && (
          <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Domain Breakdown</h3>
              <span className={`text-[11px] font-mono ${theme.accentText}`}>generated from your answers</span>
            </div>

            <div className="mt-4 space-y-2 relative">
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-black tracking-widest uppercase">
                  🔒 Unlock full breakdown
                </div>
              </div>

              <div className="relative opacity-40">
                {domainBreakdown.slice(0, 4).map((d) => (
                  <div key={d.category} className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-slate-100">{d.category}</div>
                      <div className="text-sm font-black text-white">{d.accuracy}%</div>
                    </div>
                    <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${theme.bar}`} style={{ width: `${d.accuracy}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-sm font-extrabold">What the plan does</div>
              <div className="mt-1 text-sm text-slate-300 leading-relaxed">
                It attacks your lowest domains first: drills → full sims → rationales → retest.
              </div>
            </div>
          </div>
        )}

        {/* Billion conversion booster: missed question + explanation blurred */}
        {missed && (
          <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Missed Question Preview</h3>
              <span className="text-[11px] font-mono text-slate-400">rationale inside</span>
            </div>

            <div className="mt-4 relative">
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[11px] font-black tracking-widest uppercase">
                  🔒 Unlock to reveal the rationale
                </div>
              </div>

              <div className="relative opacity-40">
                <div className="text-sm font-extrabold text-white leading-relaxed">{missed.text}</div>

                <div className="mt-3 space-y-2">
                  {missed.options.map((opt, i) => {
                    const isCorrect = i === missed.correctIndex;
                    const isPicked = i === missed.selectedIndex;
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
                  <div className="mt-1 text-sm text-slate-200 leading-relaxed">{missed.explanation}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Value stack */}
        <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Pro Medical Suite Includes</h3>
            <span className="text-[11px] font-mono text-slate-400">Instant unlock</span>
          </div>

          <div className="mt-4 space-y-3">
            <FeatureRow icon="🧪" text="CAT-style full simulations (70–120Q) + timers" />
            <FeatureRow icon="📚" text="3,000+ question bank + rapid drills" />
            <FeatureRow icon="🧠" text="Rationales that explain *why* (not just the answer)" />
            <FeatureRow icon="🎯" text="Personalized weakness fix plan (auto-generated)" />
            <FeatureRow icon={isP ? "⚡️" : "🚑"} text="EMT + Paramedic modes (switch anytime)" />
            <FeatureRow icon="🛡️" text="Pass Guarantee (refund if you complete plan + don’t pass)" highlight />
          </div>
        </div>

        {/* Plan selector */}
        <div className="mb-5 space-y-3">
          <PlanCard
            selected={selectedPlan === "annual"}
            onClick={() => setSelectedPlan("annual")}
            badge={PRICING.annual.badge}
            title="Annual Pro"
            subtitle={`Only ${fmt(annualMonthlyEquivalent)} /mo billed yearly`}
            rightTop={PRICING.annual.strike ? fmt(PRICING.annual.strike) : null}
            rightMain={`${fmt(PRICING.annual.price)}${PRICING.annual.cadence}`}
            accent={isP ? "rose" : "cyan"}
            badgeGrad={theme.badgeGrad}
          />

          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title="Monthly Pro"
            subtitle="Cancel anytime."
            rightTop={null}
            rightMain={`${fmt(PRICING.monthly.price)}${PRICING.monthly.cadence}`}
            accent={isP ? "rose" : "blue"}
            badgeGrad={theme.badgeGrad}
          />

          <PlanCard
            selected={selectedPlan === "lifetime"}
            onClick={() => setSelectedPlan("lifetime")}
            title="Lifetime Access"
            subtitle="One-time payment. Own it forever."
            rightTop={PRICING.lifetime.strike ? fmt(PRICING.lifetime.strike) : null}
            rightMain={`${fmt(PRICING.lifetime.price)}${PRICING.lifetime.cadence}`}
            accent="red"
            badgeGrad={theme.badgeGrad}
          />
        </div>

        {/* Nudge */}
        <div className="mb-6 rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-sm font-extrabold text-white">Why Annual wins</div>
          <div className="mt-1 text-sm text-slate-300 leading-relaxed">
            Most candidates study for weeks. Annual keeps your progress, costs less than 7 months of monthly, and removes “time pressure”.
          </div>
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

        {/* Mini FAQ (scroll-safe because of bottom padding + no hidden content) */}
        <div className="mb-4 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Quick answers</h3>
          <div className="mt-3 space-y-2">
            <FAQItem q="Do I get instant access after payment?" a="Yes — you’ll unlock the full report, rationales, and unlimited sims immediately." />
            <FAQItem q="How does the study plan work?" a="We prioritize your lowest domains first and give you a daily focus path (drills → sims → review)." />
            <FAQItem q="Is Monthly cancellable?" a="Yep — cancel anytime. Your access stays active until the end of the billing period." />
            <FAQItem q="What happens after I unlock?" a="You’ll see your full breakdown, get a focused plan, and can run full sims as many times as you want." />
            <FAQItem q="Does it work for my level?" a="Yes — the content and scoring calibrate to EMT or Paramedic mode automatically." />
          </div>
        </div>
      </div>

      {/* STICKY CHECKOUT (safe-area aware, doesn’t cover content due to pb-[260px]) */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="mx-auto w-full max-w-sm px-4 pb-4">
          <div className="rounded-2xl bg-black/35 backdrop-blur-xl border border-white/10 p-3 shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="text-xs text-slate-300 font-semibold">
                Selected:{" "}
                <span className="font-black text-white">
                  {selectedPlan === "annual" ? "Annual Pro" : selectedPlan === "monthly" ? "Monthly Pro" : "Lifetime"}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                {selectedPlan === "annual" && (
                  <>Save {fmt((PRICING.annual.strike ?? 0) - PRICING.annual.price)}</>
                )}
                {selectedPlan === "monthly" && <>Cancel anytime</>}
                {selectedPlan === "lifetime" && <>Pay once</>}
              </div>
            </div>

            <Link href={checkoutHref}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-xl font-black text-lg text-white border border-white/10 bg-gradient-to-r ${theme.ctaGrad} shadow-lg hover:shadow-white/10 transition-all`}
              >
                UNLOCK MY PLAN
              </motion.button>
            </Link>

            {/* Trust chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 opacity-95">
              <TrustChip icon={<ShieldIcon />} text="Secure checkout" />
              <TrustChip icon={<BoltIcon />} text="Instant access" />
              <TrustChip icon={<CheckIcon />} text="Guarantee eligible" />
              <TrustChip icon={<PayIcon />} text="Apple Pay • Card • Google Pay" />
            </div>

            {/* Safe area spacing for iOS */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- UI Bits ----------------- */

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

function TrustChip({ icon, text }: { icon: React.ReactNode; text: string }) {
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
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.382 2.456a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.539 1.118l-3.382-2.455a1 1 0 00-1.176 0l-3.382 2.455c-.783.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81H6.81a1 1 0 00.95-.69l1.289-3.975z" />
        </svg>
      ))}
    </div>
  );
}

/* Icons */
function ShieldIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2l7 4v6c0 5-3 7-7 8-4-1-7-3-7-8V6l7-4z" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11 1L3 11h6l-1 8 9-12h-6l0-6z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
function PayIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 7H3a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H3V9h18v6z" />
      <path d="M6 13h5v2H6z" />
    </svg>
  );
}
