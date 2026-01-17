"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PlanKey = "monthly" | "lifetime";

// YOUR PRICING CONFIGURATION
const PRICING = {
  monthly: { price: 19.99, cadence: "/mo", strike: null as number | null },
  lifetime: { price: 99.99, cadence: " once", strike: 149.99 }, // High anchor
};

const fmt = (n: number) => `$${n}`;

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("lifetime");

  // Personalization
  const [userLevel, setUserLevel] = useState("EMT");
  const [userName, setUserName] = useState("CANDIDATE");
  const [readiness, setReadiness] = useState(68); // Hardcoded "Scary" starting score
  const [daysToExam, setDaysToExam] = useState(14);

  useEffect(() => {
    setUserLevel(localStorage.getItem("userLevel") || "EMT");
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

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col items-center px-4 md:px-6 relative overflow-y-auto pb-40">
      
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-18%] right-[-18%] w-[620px] h-[620px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-sm z-10 pt-8">
        
        {/* Top header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-[10px] font-black tracking-widest text-red-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> REPORT LOCKED
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight leading-[1.1] mb-2">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Readiness Plan</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            Your initial score is <span className="font-bold text-white">{readiness}%</span>{" "}
            <span className={`font-black ${status.tone}`}>({status.label})</span>. 
            Unlock the full 3,000+ Question Bank to bridge the gap.
          </p>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-3 flex items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Stars />
              <div className="leading-tight">
                <div className="text-sm font-black text-white">4.8/5</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Candidate Rating</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="leading-tight text-right">
              <div className="text-sm font-black text-white">12,000+</div>
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Passes Verified</div>
            </div>
          </div>
        </motion.div>

        {/* The ID card (Identity Upgrade) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-blue-900/50 relative overflow-hidden text-black transform rotate-1 border-t-4 border-red-600">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  National Registry
                </p>
                <div className="h-1 w-12 bg-blue-600 mt-1" />
              </div>
              <span className="text-xl font-black text-gray-200">2026</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 text-3xl ${userLevel === "Paramedic" ? "bg-red-50 border-red-100 text-red-600" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
                {userLevel === "Paramedic" ? "⚡️" : "🚑"}
              </div>
              <div>
                <p className={`text-xs font-black uppercase mb-0.5 ${userLevel === "Paramedic" ? "text-red-600" : "text-blue-600"}`}>
                  {userLevel} CERTIFICATION
                </p>
                <h2 className="text-2xl font-black tracking-tight leading-none">{userName}</h2>
                <p className="text-[10px] font-mono text-gray-500 mt-1">
                  VALID THROUGH: {dateString}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">NREMT</div>
                <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-600">PRO</div>
              </div>
              <div className="h-6 w-24 bg-black opacity-80" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 90%, 20% 90%, 25% 100%, 30% 100%, 35% 80%, 40% 100%)" }} />
            </div>
          </div>
        </motion.div>

        {/* Plan selector */}
        <div className="mb-6 space-y-3">
          <PlanCard
            selected={selectedPlan === "lifetime"}
            onClick={() => setSelectedPlan("lifetime")}
            badge="BEST VALUE"
            title="Lifetime Access"
            subtitle="One-time payment. Own it forever."
            rightTop={PRICING.lifetime.strike ? fmt(PRICING.lifetime.strike) : null}
            rightMain={fmt(PRICING.lifetime.price)}
            accent="red"
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
        </div>

        {/* Plan comparison */}
        <div className="mb-8 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">
              Pro Medical Suite Includes
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">INSTANT UNLOCK</span>
          </div>

          <div className="grid gap-3">
            <CompareRow label="Unlimited adaptive simulations (70-120Q)" />
            <CompareRow label="3,000+ Question Bank with Rationales" />
            <CompareRow label="Weakness Analyzer & Study Plan" />
            <CompareRow label="Readiness Score Tracking" />
            <CompareRow label="100% Pass Guarantee or Money Back" highlight />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Candidate Wins</h3>
          <div className="space-y-3">
            <Testimonial quote="The readiness score told me exactly what to fix. I hammered cardio for a week and passed." meta="EMT Candidate • 9 days ago" />
            <Testimonial quote="Feels like a real exam session. The pacing and review mode finally made it click." meta="Paramedic Candidate • 2 weeks ago" />
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-32 rounded-2xl bg-slate-900/40 border border-white/10 p-5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-3">Quick Answers</h3>
          <div className="space-y-2">
            <FAQItem q="Do I get instant access?" a="Yes — you’ll unlock the full report, rationales, and unlimited sims immediately." />
            <FAQItem q="Is Monthly cancellable?" a="Yep — cancel anytime. Your access stays active until the end of the billing period." />
            <FAQItem q="How does the guarantee work?" a="Complete the plan + required sims, and if you don’t pass, simply email us for a full refund." />
          </div>
        </div>

      </div>

      {/* STICKY CHECKOUT BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0F172A] via-[#0F172A] to-transparent">
        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-2xl bg-[#1E293B]/90 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
            <div className="flex items-center justify-between px-1 pb-3">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                Selected: <span className="text-white">{selectedPlan === "lifetime" ? "LIFETIME" : "MONTHLY"}</span>
              </div>
              <div className="text-xs text-emerald-400 font-mono font-bold">
                {selectedPlan === "lifetime" ? "SAVE $50.00" : "CANCEL ANYTIME"}
              </div>
            </div>

            <Link href="/dashboard" className="block w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-black text-lg text-white border border-white/10 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                UNLOCK CERTIFICATION <span className="text-white/60">→</span>
              </motion.button>
            </Link>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 opacity-60">
              <TrustChip text="Secure Checkout" />
              <TrustChip text="Instant Access" />
              <TrustChip text="Money Back Guarantee" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* --- COMPONENTS --- */

function PlanCard({ selected, onClick, badge, title, subtitle, rightTop, rightMain, accent }: any) {
  const borderClass = selected 
    ? (accent === "red" ? "border-red-500 bg-red-500/10" : "border-blue-500 bg-blue-500/10")
    : "border-white/10 bg-slate-800/50 opacity-80 hover:opacity-100";

  return (
    <button onClick={onClick} className={`relative w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${borderClass}`}>
      {selected && badge && (
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
          {badge}
        </div>
      )}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h3 className="font-black text-white">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right whitespace-nowrap">
          {rightTop && <span className="text-xs text-slate-500 line-through block">{rightTop}</span>}
          <span className="text-xl font-black text-white">{rightMain}</span>
        </div>
      </div>
    </button>
  );
}

function CompareRow({ label, highlight }: { label: string, highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${highlight ? "bg-yellow-500/10 border-yellow-500/20" : "bg-white/5 border-white/5"}`}>
      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${highlight ? "bg-yellow-500 text-black" : "bg-emerald-500/20 text-emerald-400"}`}>
        ✓
      </span>
      <span className={`text-sm font-medium ${highlight ? "text-yellow-200" : "text-slate-200"}`}>{label}</span>
    </div>
  );
}

function Testimonial({ quote, meta }: { quote: string, meta: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-4">
      <div className="text-sm text-slate-300 leading-relaxed mb-2">"{quote}"</div>
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{meta}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-bold text-white">{q}</span>
        <span className="text-slate-400 text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrustChip({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
      <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{text}</span>
    </div>
  );
}

function Stars() {
  return <div className="flex gap-0.5 text-yellow-400">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>;
}
