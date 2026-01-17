"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PlanKey = "monthly" | "annual" | "lifetime";

const PRICING = {
  monthly: { price: 19, cadence: "/mo", strike: null },
  annual: { price: 119, cadence: "/yr", strike: 228 }, // 19*12=228 anchor
  lifetime: { price: 249, cadence: " once", strike: 399 },
};

const fmt = (n: number) => `$${n}`;

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("annual");

  // Personalization
  const [userLevel, setUserLevel] = useState("EMT");
  const [userName, setUserName] = useState("CANDIDATE");
  const [readiness, setReadiness] = useState(68);
  const [weakDomain, setWeakDomain] = useState("Cardiology");
  const [weakPct, setWeakPct] = useState(42);
  const [daysToExam, setDaysToExam] = useState(14);

  useEffect(() => {
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
    // In real app, you'd pull name from auth or onboarding
    setUserName("FUTURE MEDIC");
  }, []);

  const status = useMemo(() => {
    if (readiness >= 80) return { label: "ON TRACK", tone: "text-emerald-400" };
    if (readiness >= 65) return { label: "BORDERLINE", tone: "text-yellow-400" };
    return { label: "AT RISK", tone: "text-red-400" };
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

  // In production, this would go to Stripe/RevenueCat
  const checkoutHref = "/dashboard"; 

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col items-center px-4 md:px-6 relative overflow-y-auto">
      
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[30%] -left-40 w-[520px] h-[520px] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-18%] right-[-18%] w-[620px] h-[620px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-sm z-10 pt-5 pb-32">
        {/* Top header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[11px] font-bold tracking-widest text-slate-300 uppercase">
              REPORT LOCKED
            </span>
            <span className="text-[11px] font-mono text-slate-400">T-{daysToExam} days</span>
          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight leading-[1.05]">
            Unlock Your <span className="text-cyan-400">Readiness Plan</span>
          </h1>

          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Your score is <span className="font-bold text-white">{readiness}%</span>{" "}
            <span className={`font-bold ${status.tone}`}>({status.label})</span>. Biggest risk:
            <span className="font-bold text-white"> {weakDomain}</span>{" "}
            <span className="font-bold text-red-400">({weakPct}%)</span>.
            Unlock the exact fix plan + unlimited sims.
          </p>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
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

        {/* The ID card (identity upgrade) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-blue-900/50 relative overflow-hidden text-black transform rotate-1 border-t-4 border-cyan-500">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/35 to-transparent opacity-60 pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  Operator Credential
                </p>
                <div className="h-1 w-12 bg-blue-600 mt-1" />
              </div>
              <span className="text-xl font-black text-gray-200">2026</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 text-3xl ${
                  userLevel === "Paramedic"
                    ? "bg-red-50 border-red-100 text-red-600"
                    : "bg-blue-50 border-blue-100 text-blue-600"
                }`}
              >
                {userLevel === "Paramedic" ? "⚡️" : "🚑"}
              </div>
              <div>
                <p
                  className={`text-xs font-black uppercase mb-0.5 ${
                    userLevel === "Paramedic" ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {userLevel} MODE
                </p>
                <h2 className="text-2xl font-black tracking-tight leading-none">{userName}</h2>
                <p className="text-[10px] font-mono text-gray-500 mt-1">
                  VALID THROUGH: {dateString}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">
                  FULL SIMS
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">
                  STUDY PLAN
                </div>
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

        {/* Value stack */}
        <div className="mb-6 rounded-2xl bg-slate-900/45 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">
              Pro Medical Suite Includes
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Instant unlock</span>
          </div>

          <div className="mt-4 space-y-3">
            <CompareRow label="Unlimited full simulations (70–120Q)" />
            <CompareRow label="3,000+ Question Bank + Rapid Drills" />
            <CompareRow label="Clinical rationales + weakness fix plan" />
            <CompareRow label="Readiness score + domain breakdown" />
            <CompareRow label="EMT + Paramedic modes" />
            <CompareRow
              label="Pass Guarantee (refund if you complete the plan and don’t pass)"
              highlight
            />
          </div>
        </div>

        {/* Plan selector */}
        <div className="mb-5 space-y-3">
          <PlanCard
            selected={selectedPlan === "annual"}
            onClick={() => setSelectedPlan("annual")}
            badge="Best Value"
            title="Annual Pro"
            subtitle={`Only ${fmt(annualMonthlyEquivalent)} /mo billed yearly`}
            rightTop={PRICING.annual.strike ? fmt(PRICING.annual.strike) : null}
            rightMain={`${fmt(PRICING.annual.price)}${PRICING.annual.cadence}`}
            accent="cyan"
          />

          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title="Monthly Pro"
            subtitle="Cancel anytime."
            rightTop={null}
            rightMain={`${fmt(PRICING.monthly.price)}${PRICING.monthly.cadence}`}
            accent="blue"
          />

          <PlanCard
            selected={selectedPlan === "lifetime"}
            onClick={() => setSelectedPlan("lifetime")}
            title="Lifetime Access"
            subtitle="One-time payment. Own it forever."
            rightTop={PRICING.lifetime.strike ? fmt(PRICING.lifetime.strike) : null}
            rightMain={`${fmt(PRICING.lifetime.price)}${PRICING.lifetime.cadence}`}
            accent="red"
          />
        </div>

        {/* Annual nudge */}
        <div className="mb-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
            <div className="text-sm font-extrabold text-blue-200">Why Annual wins</div>
            <div className="mt-1 text-sm text-slate-300 leading-relaxed">
              Most candidates study for weeks. Annual keeps your progress + costs less than 7 months of monthly.
            </div>
        </div>

        {/* Testimonials */}
        <div className="mb-6 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Recent wins</h3>
          <div className="mt-4 space-y-3">
            <Testimonial
              quote="The readiness score told me exactly what to fix. I hammered cardio for a week and passed."
              meta="EMT Candidate • 9 days ago"
            />
            <Testimonial
              quote="Feels like a real exam session. The pacing and review mode finally made it click."
              meta="Paramedic Candidate • 2 weeks ago"
            />
            <Testimonial
              quote="I stopped guessing. The rationales were the difference."
              meta="EMR → EMT • First attempt pass"
            />
          </div>
        </div>

        {/* Mini FAQ */}
        <div className="mb-2 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Quick answers</h3>
          <div className="mt-3 space-y-2">
            <FAQItem
              q="Do I get instant access after payment?"
              a="Yes — you’ll unlock the full report, rationales, and unlimited sims immediately."
            />
            <FAQItem
              q="How does the study plan work?"
              a="We prioritize your lowest domains first and give you a daily focus path (drills → sims → review)."
            />
            <FAQItem
              q="Is Monthly cancellable?"
              a="Yep — cancel anytime. Your access stays active until the end of the billing period."
            />
            <FAQItem
              q="How does the pass guarantee work?"
              a="Complete the plan + required sims, and if you don’t pass, you can request a refund."
            />
          </div>
        </div>
      </div>

      {/* Sticky checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="mx-auto w-full max-w-sm px-4 pb-4">
          <div className="rounded-2xl bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-3 shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="text-xs text-slate-300 font-semibold">
                Selected:{" "}
                <span className="font-black text-white">
                  {selectedPlan === "annual"
                    ? "Annual Pro"
                    : selectedPlan === "monthly"
                      ? "Monthly Pro"
                      : "Lifetime"}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {selectedPlan === "annual" && <>Save {fmt((PRICING.annual.strike ?? 0) - PRICING.annual.price)}</>}
                {selectedPlan === "monthly" && <>Cancel anytime</>}
                {selectedPlan === "lifetime" && <>Pay once</>}
              </div>
            </div>

            <Link href={checkoutHref}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-xl font-black text-lg text-white border border-white/10
                           bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                UNLOCK MY PLAN
              </motion.button>
            </Link>

            {/* Trust chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 opacity-90">
              <TrustChip icon={<ShieldIcon />} text="Secure checkout" />
              <TrustChip icon={<BoltIcon />} text="Instant access" />
              <TrustChip icon={<CheckIcon />} text="Guarantee eligible" />
            </div>
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
      <span className={`text-sm leading-relaxed ${highlight ? "text-yellow-300 font-bold" : "text-slate-200"}`}>
        {text}
      </span>
    </div>
  );
}

function PlanCard({ selected, onClick, badge, title, subtitle, rightTop, rightMain, accent }: any) {
  const accentStyles =
    accent === "cyan"
      ? { ring: "border-cyan-400/70", bg: "bg-cyan-500/10", glow: "shadow-[0_0_35px_-14px_rgba(34,211,238,0.55)]", badge: "from-cyan-400 to-blue-500" }
      : accent === "red"
        ? { ring: "border-red-400/60", bg: "bg-red-500/10", glow: "shadow-[0_0_35px_-14px_rgba(239,68,68,0.45)]", badge: "from-red-500 to-rose-500" }
        : { ring: "border-blue-400/60", bg: "bg-blue-500/10", glow: "shadow-[0_0_35px_-14px_rgba(59,130,246,0.45)]", badge: "from-blue-500 to-cyan-500" };

  return (
    <button
      onClick={onClick}
      className={[
        "relative w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left",
        selected
          ? `${accentStyles.bg} ${accentStyles.ring} ${accentStyles.glow}`
          : "bg-slate-800/30 border-white/10 opacity-85 hover:opacity-100 hover:border-white/15",
      ].join(" ")}
    >
      {selected && badge && (
        <div className={`absolute -top-3 right-4 bg-gradient-to-r ${accentStyles.badge} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg`}>
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

function CompareRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/25">
        <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
      <span className="text-sm text-slate-200">{label}</span>
    </div>
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

function ShieldIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l7 4v6c0 5-3 7-7 8-4-1-7-3-7-8V6l7-4z" /></svg>; }
function BoltIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 1L3 11h6l-1 8 9-12h-6l0-6z" /></svg>; }
function CheckIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>; }
function PayIcon() { return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7H3a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H3V9h18v6z" /><path d="M6 13h5v2H6z" /></svg>; }
