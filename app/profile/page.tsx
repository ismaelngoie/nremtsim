"use client";

import Dock from "@/components/Dock";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Level = "EMT" | "Paramedic";
type Stats = { drillsRun: number; mastery: number; daysActive: number };

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

function normalizeAccess(x: unknown): "subscription" | "lifetime" | "pro" | "unknown" {
  const v = String(x || "").toLowerCase();
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

  // Billing / subscription
  const [billingEmail, setBillingEmail] = useState("");
  const [billingEmailDraft, setBillingEmailDraft] = useState("");
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingMsg, setBillingMsg] = useState<string | null>(null);
  const [accessType, setAccessType] = useState<"subscription" | "lifetime" | "pro" | "unknown">("unknown");

  // Privacy accordion
  const [privacyOpen, setPrivacyOpen] = useState(false);

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

    // Billing info (set by your /pay restore)
    const proEmail = (localStorage.getItem("proEmail") || "").trim().toLowerCase();
    const proAccess = normalizeAccess(localStorage.getItem("proAccess"));

    setBillingEmail(proEmail);
    setBillingEmailDraft(proEmail);
    setAccessType(proAccess);
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

  const saveBillingEmail = () => {
    const cleaned = billingEmailDraft.trim().toLowerCase();
    if (!cleaned.includes("@")) {
      setBillingMsg("Enter the Stripe checkout email.");
      return;
    }
    localStorage.setItem("proEmail", cleaned);
    setBillingEmail(cleaned);
    setBillingEmailDraft(cleaned);
    setBillingMsg("✅ Billing email saved.");
  };

  const openBillingPortal = async () => {
    const email = (billingEmailDraft || billingEmail).trim().toLowerCase();
    if (!email.includes("@")) {
      setBillingMsg("Enter the Stripe checkout email first.");
      return;
    }

    setBillingLoading(true);
    setBillingMsg(null);

    try {
      const returnUrl = typeof window !== "undefined" ? `${window.location.origin}/profile` : "/profile";

      const res = await fetch("/api/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, returnUrl }),
      });

      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };

      if (!res.ok || !data.ok || !data.url) {
        setBillingMsg(data?.error ? `❌ ${data.error}` : "❌ Could not open billing portal.");
        return;
      }

      // Save for next time (since everyone is paid)
      localStorage.setItem("proEmail", email);
      setBillingEmail(email);

      window.location.href = data.url;
    } catch (e: any) {
      setBillingMsg(`❌ ${e?.message || "Failed"}`);
    } finally {
      setBillingLoading(false);
    }
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

  const accessLabel = useMemo(() => {
    if (accessType === "lifetime") return "LIFETIME";
    if (accessType === "subscription") return "SUBSCRIPTION";
    if (accessType === "pro") return "PRO";
    return "ACTIVE";
  }, [accessType]);

  return (
    <div className={`min-h-screen ${theme.bg} text-white pb-32 font-sans relative overflow-x-hidden`}>
      {/* Background FX */}
      <div
        className={`fixed -top-40 -right-40 w-96 h-96 ${isP ? "bg-rose-600/10" : "bg-cyan-500/10"} blur-[100px] rounded-full pointer-events-none`}
      />

      <header className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black text-white tracking-tight">Profile</h1>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Personnel Management</p>
      </header>

      <main className="px-4 space-y-6 max-w-md mx-auto">
        {/* 1) ID CARD */}
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

              <div className="mt-1 flex items-center gap-2">
                <p className={`text-xs font-black uppercase ${theme.accent}`}>{level} MODE</p>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/10 text-gray-700">
                  {accessLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-gray-100 pt-4">
            <div className="text-[10px] text-gray-400 font-mono">
              ID: 8492-ALPHA
              <br />
              REGION: US-NREMT
            </div>
            <div className="flex gap-0.5 h-6 opacity-60" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`bg-black ${i % 3 === 0 ? "w-1" : "w-0.5"}`} />
              ))}
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
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Operator Name</div>

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

        {/* 2) MODE SWITCHER */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Operational Protocol</h3>

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

        {/* 3) SERVICE RECORD */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Service Record</h3>

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

        {/* 4) MANAGE SUBSCRIPTION */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 px-2">Subscription</h3>

          <div className="rounded-2xl bg-slate-900/55 border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-black text-white">Manage your plan</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Opens Stripe portal (cancel / pause / update payment).
                </div>
              </div>

              <a
                href="mailto:contact@nremts.com?subject=Support%20Request%20-%20NREMTS&body=Please%20describe%20your%20issue%20and%20include%20the%20email%20used%20at%20checkout."
                className="text-[10px] px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-black uppercase tracking-widest"
              >
                Contact Support
              </a>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Stripe checkout email
              </div>

              <div className="flex gap-2">
                <input
                  value={billingEmailDraft}
                  onChange={(e) => setBillingEmailDraft(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-white/20"
                />
                <button
                  onClick={saveBillingEmail}
                  className="px-4 py-3 rounded-xl font-black text-sm bg-white/10 border border-white/10 hover:bg-white/15"
                >
                  SAVE
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2">
                <button
                  onClick={openBillingPortal}
                  disabled={billingLoading}
                  className={`w-full py-3 rounded-xl font-black text-sm border ${theme.border} ${theme.softBg} ${theme.chipText} disabled:opacity-60`}
                >
                  {billingLoading ? "OPENING..." : "MANAGE SUBSCRIPTION (STRIPE)"}
                </button>
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
            </div>
          </div>
        </section>

        {/* 5) DATA CONTROLS */}
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

        {/* 6) PRIVACY + DISCLAIMER (BOTTOM ONLY) */}
        <section className="pt-2">
          <div className="rounded-2xl bg-slate-900/40 border border-white/10 overflow-hidden">
            <button
              onClick={() => setPrivacyOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
            >
              <div>
                <div className="text-sm font-black text-white">Privacy & Disclaimer</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Legal + privacy basics
                </div>
              </div>
              <span className="text-slate-300">{privacyOpen ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {privacyOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed space-y-3">
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Privacy</p>
                    <p>
                      We store your study progress (scores, history, and preferences) primarily on your device using
                      browser storage. If you clear site data, your local progress may be removed.
                    </p>
                    <p>
                      Payments are processed by Stripe. We do not store your card numbers or banking details on our
                      servers. Stripe may collect and process payment information under its own policies.
                    </p>

                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Disclaimer</p>
                    <p>
                      This product is an independent study tool. It is not medical advice and does not replace formal
                      training, local protocols, or clinical judgment.
                    </p>
                    <p>
                      <b>Not affiliated:</b> NREMTS is not affiliated with, endorsed by, or sponsored by the National
                      Registry of Emergency Medical Technicians (NREMT®). NREMT® is a registered trademark of its
                      respective owners.
                    </p>

                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Support</p>
                    <p>
                      Need help?{" "}
                      <a
                        className="underline text-white font-bold"
                        href="mailto:contact@nremts.com?subject=Support%20Request%20-%20NREMTS&body=Please%20include%20the%20email%20used%20at%20checkout%20and%20a%20description%20of%20the%20issue."
                      >
                        contact@nremts.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center pt-6 pb-2">
            <p className="text-[10px] text-slate-600 font-mono">NREMTS • {isP ? "ALS" : "BLS"} BUILD</p>
          </div>
        </section>
      </main>

      <Dock />
    </div>
  );
}
