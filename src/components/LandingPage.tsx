"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, CheckCircle } from "lucide-react";
import WalletButton from "./WalletButton";
import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your Solana wallet",
    desc: "Phantom, Solflare, or any Solana wallet. Read-only — no signing required.",
  },
  {
    step: "02",
    title: "We verify your on-chain history",
    desc: "Transaction count, DeFi activity, NFTs, programs — all pulled from mainnet.",
  },
  {
    step: "03",
    title: "Get your identity card + URL",
    desc: "Share onchaincv.xyz/yourhandle. Your reputation, in one link.",
  },
];

const PERKS = [
  "Verified against 2.4M+ Solana wallets",
  "Activity tier badge — Top 1%, 5%, 10%",
  "Program breakdown — Jupiter, Magic Eden & more",
  "Shareable identity URL for early adopters",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}>
            <Activity size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>
            OnChainCV
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/leaderboard">
            <span className="text-xs font-medium transition-colors hover:opacity-70" style={{ color: "var(--text-muted)", cursor: "pointer" }}>
              Leaderboard
            </span>
          </Link>
          <WalletButton className="btn-outline text-xs">Connect</WalletButton>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col px-5 pt-12 pb-10 max-w-sm mx-auto w-full">

        {/* Tag */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.35 }}
          className="mb-6">
          <span className="badge badge-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Live on Solana
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-4">
          <h1 className="font-bold leading-tight" style={{ fontSize: "2rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            Claim your name.<br />
            <span style={{ color: "var(--accent-light)" }}>Own your identity.</span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}
          className="mb-8 leading-relaxed" style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Connect your Solana wallet and get a verified on-chain CV — your transaction history, activity tier, and a shareable identity URL. All from your wallet.
        </motion.p>

        {/* Claim box */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
          className="card p-5 mb-6">
          <p className="font-semibold mb-3 text-sm" style={{ color: "var(--text-primary)" }}>Claim your name</p>
          <div className="flex items-center gap-0 mb-3 rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--bg-input)" }}>
            <span className="px-3 py-2.5 text-sm font-medium flex-shrink-0"
              style={{ color: "var(--text-dim)", borderRight: "1px solid var(--border)" }}>
              onchaincv.xyz/
            </span>
            <input
              type="text"
              placeholder="yourname"
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <p className="text-xs mb-4" style={{ color: "var(--text-dim)" }}>
            + another name — claim multiple names at once
          </p>
          <WalletButton className="btn-primary">
            Connect Wallet to Claim
          </WalletButton>
          <p className="text-center text-xs mt-3" style={{ color: "var(--text-dim)" }}>
            Names cost $05 — $3.75 each depending on length
          </p>
        </motion.div>

        {/* Perks list */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.35 }}
          className="flex flex-col gap-2.5 mb-10">
          {PERKS.map((p) => (
            <div key={p} className="flex items-start gap-2.5">
              <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-light)" }} />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{p}</span>
            </div>
          ))}
        </motion.div>

        {/* Divider + how it works */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <div className="divider mb-8" />
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-dim)" }}>
            How it works
          </p>
          <div className="flex flex-col gap-4">
            {HOW_IT_WORKS.map((h, i) => (
              <motion.div key={h.step}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.35 }}
                className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--accent-light)" }}>{h.step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{h.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="divider mt-10 mb-5" />
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>© 2025 OnChainCV</span>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>Built on Solana</span>
        </div>
      </div>
    </div>
  );
}
