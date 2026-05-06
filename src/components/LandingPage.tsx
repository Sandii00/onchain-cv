"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, TrendingUp, Link2 } from "lucide-react";
import WalletButton from "./WalletButton";

const STATS = [
  { value: "2.4M+", label: "Wallets indexed" },
  { value: "180M+", label: "Transactions parsed" },
  { value: "< 3s",  label: "Verification time" },
];

const FEATURES = [
  {
    icon: <Shield size={15} />,
    title: "Cryptographically verified",
    desc: "Sourced directly from Solana mainnet. Zero third-party trust.",
  },
  {
    icon: <TrendingUp size={15} />,
    title: "Activity tier ranking",
    desc: "Ranked against 2.4M wallets. Top 1%, 5%, or 10% — on-chain.",
  },
  {
    icon: <Link2 size={15} />,
    title: "Portable identity URL",
    desc: "One link that carries your entire on-chain reputation.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: "absolute", top: "-180px", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-120px", right: "-80px",
          width: "380px", height: "380px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
        }} />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
        className="relative z-10 flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
            <Activity size={13} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            OnChain<span style={{ color: "#9D6FFF" }}>CV</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/leaderboard" className="text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)" }}>
            Leaderboard
          </a>
          <WalletButton
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            Connect
          </WalletButton>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 py-14 text-center">

        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Live on Solana Mainnet
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}
          className="font-semibold mb-5"
          style={{
            fontSize: "clamp(1.9rem, 7vw, 2.9rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            maxWidth: "480px",
            color: "var(--text-primary)",
          }}
        >
          Your on-chain history,
          <br />
          <span style={{
            background: "linear-gradient(90deg, #9D6FFF 10%, #06B6D4 90%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            turned into a resume.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-9 leading-relaxed"
          style={{ fontSize: "0.875rem", color: "var(--text-muted)", maxWidth: "340px" }}
        >
          Connect your wallet. Get a verified identity card ranked against 2.4M Solana wallets — shareable in one link.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: "300px" }}
        >
          <WalletButton
            className="w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-all active:scale-[0.98]"
            style={{
              padding: "13px 24px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7C3AED, #5B21B6 50%, #0891B2)",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.35), 0 8px 28px rgba(124,58,237,0.28)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Connect Wallet <ArrowRight size={14} />
          </WalletButton>
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            Non-custodial · Read-only · No signing required
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-8 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {s.value}
              </span>
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 px-5 pb-14" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-sm mx-auto pt-8 flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-dim)" }}>
            What you get
          </p>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
              className="surface surface-hover flex items-start gap-3.5 p-4"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "#9D6FFF" }}>
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 py-4 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)" }}>
        <span className="text-xs" style={{ color: "var(--text-dim)" }}>© 2025 OnChainCV</span>
        <span className="text-xs" style={{ color: "var(--text-dim)" }}>Built on Solana</span>
      </div>
    </div>
  );
}
