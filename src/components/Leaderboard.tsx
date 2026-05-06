"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Activity, Trophy } from "lucide-react";
import Link from "next/link";

const LEADERS = [
  { rank: 1,  handle: "phantom.sol",   address: "7xKq…4mNp", txs: 12847, tier: "Top 1%",  since: "2020" },
  { rank: 2,  handle: "defi_sage",     address: "9pRt…7vWq", txs: 9312,  tier: "Top 1%",  since: "2020" },
  { rank: 3,  handle: "solana_oG",     address: "3mHz…2kJx", txs: 8204,  tier: "Top 1%",  since: "2021" },
  { rank: 4,  handle: "nftmaxi",       address: "5bNq…8rTy", txs: 6891,  tier: "Top 5%",  since: "2021" },
  { rank: 5,  handle: "liquidator",    address: "2cVp…1mWz", txs: 5743,  tier: "Top 5%",  since: "2021" },
  { rank: 6,  handle: "jup_farmer",    address: "8eKs…6pAn", txs: 4920,  tier: "Top 5%",  since: "2022" },
  { rank: 7,  handle: "orca_whale",    address: "4tYu…9qBm", txs: 3812,  tier: "Top 10%", since: "2022" },
  { rank: 8,  handle: "tensor_god",    address: "6rMn…3xCv", txs: 2947,  tier: "Top 10%", since: "2022" },
  { rank: 9,  handle: "mango_max",     address: "1wQp…5zDk", txs: 2103,  tier: "Top 10%", since: "2023" },
  { rank: 10, handle: "saga_user",     address: "0sLb…7fHj", txs: 1847,  tier: "Top 10%", since: "2023" },
];

const TIER_COLORS: Record<string, string> = {
  "Top 1%":  "#FCD34D",
  "Top 5%":  "#38BDF8",
  "Top 10%": "#A78BFA",
};

const TIER_BG: Record<string, string> = {
  "Top 1%":  "rgba(245,158,11,0.12)",
  "Top 5%":  "rgba(56,189,248,0.1)",
  "Top 10%": "rgba(124,58,237,0.12)",
};

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="btn-outline" style={{ padding: "6px 10px" }}>
              <ArrowLeft size={13} />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <Activity size={14} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>OnChainCV</span>
          </div>
        </div>
      </motion.nav>

      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto px-5 py-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-xs mb-1" style={{ color: "var(--text-dim)" }}>Rankings</p>
          <h1 className="font-bold text-xl tracking-tight flex items-center gap-2"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            <Trophy size={18} style={{ color: "var(--accent-light)" }} />
            Leaderboard
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Top wallets ranked by on-chain activity · Updated daily
          </p>
        </motion.div>

        {/* Podium */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-2">
          {/* 2nd */}
          <div className="card flex flex-col items-center gap-2 p-3 pt-5">
            <span className="text-2xl">🥈</span>
            <p className="text-xs font-semibold text-center" style={{ color: "var(--text-primary)" }}>{LEADERS[1].handle}</p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{LEADERS[1].txs.toLocaleString()}</p>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center gap-2 p-3 pt-3 rounded-xl relative overflow-hidden"
            style={{ background: "linear-gradient(140deg, #2D1B69, #1C2B4A)", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 4px 20px rgba(124,58,237,0.2)" }}>
            <span className="text-2xl">👑</span>
            <p className="text-xs font-bold text-center text-white">{LEADERS[0].handle}</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{LEADERS[0].txs.toLocaleString()}</p>
            <span className="badge badge-gold" style={{ fontSize: "9px" }}>{LEADERS[0].tier}</span>
          </div>
          {/* 3rd */}
          <div className="card flex flex-col items-center gap-2 p-3 pt-5">
            <span className="text-2xl">🥉</span>
            <p className="text-xs font-semibold text-center" style={{ color: "var(--text-primary)" }}>{LEADERS[2].handle}</p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{LEADERS[2].txs.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* List */}
        <motion.div className="flex flex-col gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {LEADERS.slice(3).map((e, i) => (
            <motion.div key={e.rank}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + i * 0.04 }}
              className="card card-hover flex items-center gap-3 px-4 py-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold flex-shrink-0"
                style={{ background: "var(--bg-input)", color: "var(--text-dim)" }}>
                {e.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{e.handle}</p>
                <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{e.address}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{e.txs.toLocaleString()}</span>
                <span className="badge" style={{
                  background: TIER_BG[e.tier], color: TIER_COLORS[e.tier],
                  border: `1px solid ${TIER_COLORS[e.tier]}30`, fontSize: "9px",
                }}>{e.tier}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="card p-4 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Want to appear here?</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Connect your wallet and claim your OnChainCV</p>
          <Link href="/" className="w-full">
            <button className="btn-primary">Get your CV →</button>
          </Link>
        </motion.div>

        <p className="text-center text-xs pb-4" style={{ color: "var(--text-dim)" }}>
          Rankings update every 24h · Demo data
        </p>
      </div>
    </div>
  );
}
