"use client";

import Dock from "@/components/Dock";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Level = "EMT" | "Paramedic";

type Stats = {
  drillsRun: number;
  mastery: number;
  daysActive: number;
};

type ProAccess = "subscription" | "lifetime" | "pro" | "unknown";

function safeJSON<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeLevel(x: unknown): Level {
  return x === "Paramedic" ? "Paramedic" : "EMT";
}

function normalizeAccess(x: unknown): ProAccess {
  const v = typeof x === "string" ? x : "";
  if (v === "subscription" || v === "lifetime" || v === "pro") return v;
  return "unknown";
}

export default function ProfilePage() {
  const router = useRouter();

  // --- State ---
  const [level, setLevel] = useState<Level>("EMT");
  const [name, setName] = useState("FUTURE MEDIC");
  const [editName, setEditName] = useState(false);
  const [nameDraft, setNameDraft] = useState("FUTURE MEDIC");
  const [stats, setStats] = useState<Stats>({ drillsRun: 0, mastery: 0, daysActive: 1 });

  // Pro / billing
  const [isPro, setIsPro] = useState(false);
  const [proEmail, setProEmail] = useState<string>("");
  const [proAccess, setProAccess] = useState<ProAccess>("unknown");
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingMsg, setBillingMsg] = useState<string | null>(null);
  const [manageDismissed, setManageDismissed] = useState(false);

  // Privacy modal
  const [showPrivacy, setShowPrivacy] = useState(false);

  // --- Theme Engine ---
  const isP = level === "Paramedic";
  const theme = useMemo(
    () => ({
      bg: isP ? "bg-[#0B1022]" : "bg-[#0F172A]",
      accent: isP ? "text-rose-500" : "text-cyan-500",
      border: isP ? "border-rose-500/30" : "border-cyan-500/30",
      cardBorder: isP ? "border-rose-500" : "border-cyan-500",
      softBg: isP ? "bg-rose-500/10" : "bg-cyan-500/10",
      icon: isP ? "⚡️" : "🚑",
      chipText: isP ? "text-rose-200" : "text-cyan-200",
      link: isP ? "text-rose-300" : "text-cyan-300",
    }),
    [isP]
  );

  // Freeze expiry date per mount
  const dateString = useMemo(() => {
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 2);
    return expDate.toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" });
  }, []);

  // --- Init ---
  useEffect(() => {
    const storedLevel = normalizeLevel(localStorage.getItem("userLevel"));
    const storedName = localStorage.getItem("userName") || "FUTURE MEDIC";

    setLevel(storedLevel);
    setName(storedName);
    setNameDraft(storedName);

    const mastered = safeJSON<number[]>(localStorage.getItem("mastered-ids"), []);
    const shiftHistory = safeJSON<string[]>(localStorage.getItem("shift-history"), []);

    const uniqueDays = new Set(
      shiftHistory
        .filter((x) => typeof x === "string" && x.length > 0)
        .map((x) => x.trim())
    );

    setStats({
      drillsRun: shiftHistory.length,
      mastery: mastered.length,
      daysActive: Math.max(1, uniqueDays.size),
    });

    // Pro / billing state
    const pro = localStorage.getItem("pro") === "true";
    const email = (localStorage.getItem("proEmail") || "").trim().toLowerCase();
    const access = normalizeAccess(localStorage.getItem("proAccess"));

    setIsPro(pro);
    setProEmail(email);
    setProAccess(access);

    const dismissed = localStorage.getItem("manageSubDismissed") === "true";
    setManageDismissed(dismissed);
  }, []);

  // --- Actions ---
  const toggleLevel = (newLevel: Level) => {
    if (newLevel === level) return;
    localStorage.setItem("userLevel", newLevel);
    setLevel(newLevel);
  };

  const saveName = () => {
    const cleaned = nameDraft.trim().slice(0, 32) || "FUTURE MEDIC";
    localStorage.setItem("userName", cleaned);
    setName(cleaned);
    setNameDraft(cleaned);
    setEditName(false);
  };

  const cancelName = () => {
    setNameDraft(name);
    setEditName(false);
  };

  const exportData = async () => {
    const keys = [
      "userLevel",
      "userName",
      "shift-history",
      "last-shift-date",
      "last-shift-result",
      "category-performance",
      "mastered-ids",
      "readinessScore",
      "weakestDomain",
      "weakestDomainPct",
      "domainBreakdown",
      "diagnosticAnswers",
      "exam-date",
      "pro",
      "proEmail",
      "proAccess",
    ];

    const payload: Record<string, unknown> = {};
    for (const k of keys) payload[k] = safeJSON(localStorage.getItem(k), localStorage.getItem(k));

    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      alert("Export copied to clipboard.");
    } catch {
      alert("Could not copy automatically. (Clipboard blocked)");
      console.log(text);
    }
  };

  const handleReset = () => {
    if (!confirm("WARNING: This will wipe progress + history. This cannot be undone.")) return;

    const keysToRemove = [
      "shift-history",
      "last-shift-date",
      "last-shift-result",
      "category-performance",
      "mastered-ids",
      "readinessScore",
      "weakestDomain",
      "weakestDomainPct",
      "statusLabel",
      "passProbability",
      "confidenceLow",
      "confidenceHigh",
      "domainBreakdown",
      "diagnosticAnswers",
      "exam-date",
      "daysToExam",
    ];
    keysToRemove.forEach((k) => localStorage.removeItem(k));

    setStats({ drillsRun: 0, mastery: 0, daysActive: 1 });
    router.replace("/dashboard");
  };

  const dismissManage = () => {
    localStorage.setItem("manageSubDismissed", "true");
    setManageDismissed(true);
  };

  const restoreManage = () => {
    localStorage.removeItem("manageSubDismissed");
    setManageDismissed(false);
  };

  // Stripe customer portal (manage/cancel)
  const openBillingPortal = async () => {
    setBillingMsg(null);

    if (!isPro) {
      router.push("/pay");
      return;
    }

    const email = (proEmail || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setBillingMsg("No email on file. Go to /pay and use Restore so we can attach your billing email.");
      return;
    }

    setBillingLoading(true);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };

      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      setBillingMsg(data.error || "Could not open billing portal. Try again.");
    } catch (e: any) {
      setBillingMsg(`Error: ${e?.message || "Failed"}`);
    } finally {
      setBillingLoading(false);
    }
  };

  const accessLabel = useMemo(() => {
    if (!isPro) return "FREE";
    if (proAccess === "subscription") return "SUBSCRIPTION";
    if (proAccess === "lifetime") return "LIFETIME";
    if (proAccess === "pro") return "PRO";
    return "PRO";
  }, [isPro, proAccess]);

  const hasCancelableSubscription = useMemo(() => {
    return isPro && proAccess === "subscription";
  }, [isPro, proAccess]);

  return (
    <div className={`min-h-screen ${theme.bg} text-white pb-32 font-sans relative overflow-x-hidden`}>
      {/* Background FX */}
      <div
        className={`fixed -top-40 -right-40 w-96 h-96 ${
          isP ? "bg-rose-600/10" : "bg-cyan-500/10"
        } blur-[100px] rounded-full pointer-events-none`}
      />

      <header className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black text-white tracking-tight">Identity</h1>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">
          Personnel Management
        </p>
      </header>

      <main className="px-4 space-y-6 max-w-md mx-auto">
        {/* 1. THE ID CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative bg-white rounded-2xl p-6 shadow-2xl overflow-hidden text-black transform transition-all duration-500 border-t-4 ${theme.cardBorder}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-50 pointer-events-none" />

          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Credential</p>
              <div className={`h-1 w-8 mt-1 ${isP ? "bg-rose-500" : "bg-blue-500"}`} />
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 block">EXPIRY</span>
              <span className="text-lg font-black text-gray-800">{dateString}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-2 bg-gray-50 ${
                isP ? "border-rose-100 text-rose-500" : "border-blue-100 text-blue-500"
              }`}
              aria-hidden="true"
            >
              {theme.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight leading-none uppercase truncate">{name}</h2>
                <button
                  onClick={() => setEditName(true)}
                  className="text-[10px] px-2 py-1 rounded bg-black/10 hover:bg-black/15 font-bold uppercase tracking-widest"
                >
                  Edit
                </button>
              </div>

              <p className={`text-xs font-black uppercase mt-1 ${theme.accent}`}>{level} MODE</p>

              <p className="mt-1 text-[10px] font-mono text-gray-500">
                ACCESS: <span className="font-black text-gray-800">{accessLabel}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-gray-100 pt-4">
            <div className="text-[10px] text-gray-400 font-mono">
              ID: 8492-ALPHA
              <br />
              REGION: TRAINING
            </div>
            <div className="flex gap-0.5 h-6 opacity-60" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`bg-black ${i % 3 === 0 ? "w-1" : "w-0.5"}`} />
              ))}
            </div>
          </div>

          {/* Non-affiliation disclaimer */}
          <div className="mt-4 rounded-xl bg-black/5 border border-black/10 px-3 py-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              Disclosure
            </div>
            <div className="mt-1 text-[11px] text-gray-700 leading-relaxed">
              This app is an independent study tool and is <b>not affiliated with</b>, endorsed by, or sponsored by the{" "}
              <b>National Registry of Emergency Medical Technicians (NREMT)</b>.
            </div>
          </div>
        </motion.div>

        {/* Name Editor */}
        <AnimatePresence>
          {editName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl bg-slate-900/55 border border-white/10 p-4"
            >
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                Operator Name
              </div>

              <input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-white/20"
                placeholder="FUTURE MEDIC"
                maxLength={32}
              />

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={saveName}
                  className={`py-3 rounded-xl font-black text-sm border ${theme.border} ${theme.softBg} ${theme.chipText}`}
                >
                  SAVE
                </button>
                <button
                  onClick={cancelName}
                  className="py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MODE SWITCHER */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Operational Protocol
          </h3>

          <div className="bg-slate-900 border border-white/10 p-1.5 rounded-2xl flex relative">
            <motion.div
              layout
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl ${theme.softBg} border ${theme.border} shadow-lg z-0`}
              animate={{ x: isP ? "100%" : "0%" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />

            <button
              onClick={() => toggleLevel("EMT")}
              className={`flex-1 relative z-10 py-3 text-sm font-bold transition-colors focus:outline-none ${
                !isP ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              EMT (BLS)
            </button>

            <button
              onClick={() => toggleLevel("Paramedic")}
              className={`flex-1 relative z-10 py-3 text-sm font-bold transition-colors focus:outline-none ${
                isP ? "text-rose-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              PARAMEDIC (ALS)
            </button>
          </div>

          <p className="text-[10px] text-slate-500 mt-2 px-2">
            Switching modes recalibrates the simulator and station drill pool.
          </p>
        </section>

        {/* 3. SERVICE RECORD */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Service Record
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className="text-xl font-black text-white">{stats.drillsRun}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold">Drills Run</div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className="text-xl font-black text-white">{stats.mastery}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold">Items Mastered</div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-3 rounded-xl text-center">
              <div className={`text-xl font-black ${theme.accent}`}>{stats.daysActive}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold">Days Active</div>
            </div>
          </div>
        </section>

        {/* 4. MANAGE SUBSCRIPTION */}
        <section>
          <div className="flex items-center justify-between px-2 mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subscription</h3>

            {manageDismissed ? (
              <button onClick={restoreManage} className={`text-[11px] font-black ${theme.link} hover:opacity-90`}>
                Show
              </button>
            ) : (
              <button onClick={dismissManage} className="text-[11px] font-black text-slate-400 hover:text-slate-200">
                Skip
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {!manageDismissed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-2xl bg-slate-900/55 border border-white/10 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-black text-white">{isPro ? "Premium Access Active" : "Free Access"}</div>
                    <div className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {isPro ? (
                        <>
                          Plan: <span className="font-black text-white">{accessLabel}</span>
                          {proEmail ? (
                            <>
                              {" "}
                              • Email: <span className="font-mono text-slate-200">{proEmail}</span>
                            </>
                          ) : null}
                        </>
                      ) : (
                        <>Upgrade to unlock full simulations, rationales, and your full breakdown.</>
                      )}
                    </div>
                  </div>

                  <div
                    className={`px-2 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${theme.border} ${theme.softBg} ${theme.chipText}`}
                  >
                    {isPro ? "PRO" : "FREE"}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {!isPro ? (
                    <>
                      <button
                        onClick={() => router.push("/pay")}
                        className={`py-3 rounded-xl font-black text-sm border ${theme.border} ${theme.softBg} ${theme.chipText}`}
                      >
                        UPGRADE
                      </button>
                      <button
                        onClick={() => setShowPrivacy(true)}
                        className="py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10"
                      >
                        PRIVACY
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={openBillingPortal}
                        disabled={billingLoading}
                        className={`py-3 rounded-xl font-black text-sm border ${theme.border} ${theme.softBg} ${theme.chipText} disabled:opacity-60`}
                      >
                        {billingLoading ? "OPENING..." : "MANAGE"}
                      </button>

                      {hasCancelableSubscription ? (
                        <button
                          onClick={openBillingPortal}
                          disabled={billingLoading}
                          className="py-3 rounded-xl font-black text-sm bg-red-900/10 border border-red-500/20 hover:bg-red-900/20 text-red-300 disabled:opacity-60"
                        >
                          CANCEL
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowPrivacy(true)}
                          className="py-3 rounded-xl font-black text-sm bg-white/5 border border-white/10 hover:bg-white/10"
                        >
                          PRIVACY
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-3 text-[11px] text-slate-400 leading-relaxed">
                  {hasCancelableSubscription ? (
                    <>
                      <b className="text-slate-200">Canceling:</b> Tap <b>Manage</b> or <b>Cancel</b> to open the secure
                      Stripe portal where you can cancel or update payment method.
                    </>
                  ) : isPro && proAccess === "lifetime" ? (
                    <>
                      <b className="text-slate-200">Lifetime:</b> No subscription. You keep access forever.
                    </>
                  ) : isPro ? (
                    <>
                      <b className="text-slate-200">Manage:</b> If your plan is subscription-based, you can manage it in
                      the Stripe portal.
                    </>
                  ) : (
                    <>
                      <b className="text-slate-200">Note:</b> Payments are processed by Stripe. We don’t store your full
                      card details.
                    </>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {billingMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="mt-3 text-sm text-slate-200"
                    >
                      {billingMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 5. DATA CONTROLS */}
        <section className="space-y-3">
          <button
            onClick={exportData}
            className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${theme.softBg} flex items-center justify-center text-lg`}>⛭</div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Export Data</div>
                <div className="text-[10px] text-slate-400">Copies your progress JSON</div>
              </div>
            </div>
            <div className="text-slate-500">→</div>
          </button>

          <button
            onClick={handleReset}
            className="w-full bg-red-900/10 border border-red-500/20 p-4 rounded-xl flex items-center justify-between hover:bg-red-900/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-lg">
                ⚠️
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-red-400">Factory Reset</div>
                <div className="text-[10px] text-red-400/60">Wipe progress + history keys</div>
              </div>
            </div>
          </button>
        </section>

        {/* PRIVACY / LEGAL QUICK LINK */}
        <section className="rounded-2xl bg-slate-900/45 border border-white/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-black text-white">Privacy & Disclosures</div>
              <div className="mt-1 text-xs text-slate-300 leading-relaxed">
                Data handling, payment processing, and non-affiliation disclaimer.
              </div>
            </div>
            <button onClick={() => setShowPrivacy(true)} className={`text-[11px] font-black ${theme.link} hover:opacity-90`}>
              Open →
            </button>
          </div>
        </section>

        <div className="text-center pt-6 pb-2">
          <p className="text-[10px] text-slate-600 font-mono">NREMT SIM OS • {isP ? "ALS" : "BLS"} BUILD</p>
          <p className="mt-1 text-[10px] text-slate-600 font-mono">Independent study tool — not affiliated with NREMT.</p>
        </div>
      </main>

      {/* PRIVACY MODAL */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowPrivacy(false)} aria-hidden="true" />

            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0B1224] border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-white">Privacy Policy & Legal</div>
                  <div className="text-[11px] text-slate-400 font-mono uppercase tracking-widest mt-0.5">
                    Short-form policy (in-app)
                  </div>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-black"
                >
                  Close
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4 text-sm text-slate-200 leading-relaxed">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">Non-Affiliation</div>
                  <p className="mt-2">
                    This app is an independent test-prep and simulation platform. We are <b>not affiliated with</b>,
                    endorsed by, sponsored by, or approved by the{" "}
                    <b>National Registry of Emergency Medical Technicians (NREMT)</b>. References to exam categories,
                    terminology, or standards are for educational compatibility only.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">What We Collect</div>
                  <p className="mt-2">
                    Your study data (scores, history, weak domains, answers) is stored <b>locally on your device</b> using
                    browser storage. Clearing browser storage may remove this data.
                  </p>
                  <p className="mt-2">
                    For paid access, we may store your email to help restore access. Payments are processed by <b>Stripe</b>;
                    we do not store full card numbers.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">Payments & Billing</div>
                  <p className="mt-2">
                    Billing management (cancel, update payment method, invoices) is handled through Stripe’s secure customer portal.
                    When you tap <b>Manage</b>, you may be redirected to Stripe.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">No Medical Advice</div>
                  <p className="mt-2">
                    This app is for educational practice only. It does not provide medical or clinical advice. Always follow
                    your training, local protocols, and medical direction.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">Disclaimers & Liability</div>
                  <p className="mt-2">
                    The app is provided “as is” without warranties. We do not guarantee exam results or outcomes. To the maximum
                    extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive
                    damages, or any loss of data, profits, or revenue arising from use of the app.
                  </p>
                </div>

                <p className="text-[11px] text-slate-400">
                  This in-app summary is for clarity. You can also publish a full /privacy page later if you want.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dock />
    </div>
  );
}
