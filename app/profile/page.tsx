"use client";

import Dock from "@/components/Dock";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-32 p-6">
      
      {/* Header */}
      <header className="mb-8 mt-4">
        <h1 className="text-2xl font-black text-white">OPERATOR PROFILE</h1>
        <p className="text-gray-500 text-sm font-mono">ID: 8492-ALPHA</p>
      </header>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 p-6 rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded">ACTIVE</div>
        </div>
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Status</h3>
        <h2 className="text-xl font-bold text-white mb-4">NREMT OS: PRO</h2>
        <button className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-bold transition-colors">
          Manage Subscription
        </button>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
          <span className="text-sm font-medium">Notifications</span>
          <div className="w-10 h-6 bg-green-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
          <span className="text-sm font-medium">Station Mode (Fullscreen)</span>
          <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
        </div>

        <Link href="/" className="block bg-red-900/20 border border-red-500/20 p-4 rounded-xl text-center text-red-400 font-bold text-sm">
          Log Out / Reset
        </Link>
      </div>

      {/* Version */}
      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-700 font-mono">NREMT SIM OS v1.0.0 (BUILD 2026)</p>
      </div>

      <Dock />
    </div>
  );
}
