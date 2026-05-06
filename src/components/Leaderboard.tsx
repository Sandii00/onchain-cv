"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Star, Zap } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const MOCK_LEADERS = [
  { rank: 1, handle: "phantom.sol", address: "7xKq...4mNp", txs: 12847, tier: "Top 1%", activeSince: "2020", badge: "👑" },
  { rank: 2, handle: "defi_sage", address: "9pRt...7vWq", txs: 9312, tier: "Top 1%", activeSince: "2020", badge: "🔥" },
  { rank: 3, handle: "solana_oG", address: "3mHz...2kJx", txs: 8204, tier: "Top 1%", activeSince: "2021", badge: "⚡" },
  { rank: 4, handle: "nftmaxi", address: "5bNq...8rTy", txs: 6891, tier: "Top 5%", activeSince: "2021", badge: null },
  { rank: 5, handle: "liquidator", address: "2cVp...1mWz", txs: 5743, tier: "Top 5%", activeSince: "2021", badge: null },
  { rank: 6, handle: "jup_farmer", address: "8eKs...6pAn", txs: 4920, tier: "Top 5%", activeSince: "2022", badge: null },
  { rank: 7, handle: "orca_whale", address: "4tYu...9qBm", txs: 3812, tier: "Top 10%", activeSince: "2022", badge: null },
  { rank: 8, handle: "tensor_god", address: "6rMn...3xCv", txs: 2947, tier: "Top 10%", activeSince: "2022", badge: null },
  { rank: 9, handle: "mango_max", address: "1wQp...5zDk", txs: 2103, tier: "Top 10%", activeSince: "2023", badge: null },
  { rank: 10, handle: "saga_user", address: "0sLb...7fHj", txs: 1847, tier: "Top 10%", activeSince: "2023", badge: null },
];

const TIER_COLORS: Record<string, string> = {
  "Top 1%": "#F59E0B",
  "Top 5%": "#06B6D4",
  "Top 10%": "#7C3AED",
  "Top 25%": "#10B981",
};

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold"
      style={{ background: "var(--border)", color: "var(--text-muted)" }}>
      {rank}
    </span>
  );
}

export default function Leaderboard() {
  const top3 = MOCK_LEADERS.slice(0, 3);
  const rest = MOCK_LEADERS.slice(3);

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-[260px] h-[260px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)" }} />
      <div className="absolute bottom-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-cyan), transparent)" }} />

      {/* Nav */}
      <motion.div className="flex items-center justify-between mb-8 z-10"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <ArrowLeft size={15} />
            </button>
          </Link>
          <div>
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>OnChain CV</span>
            <div className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>Leaderboard</div>
          </div>
        </div>
        <DarkModeToggle />
      </motion.div>

      <div className="flex flex-col gap-5 w-full max-w-sm mx-auto z-10">

        {/* Header */}
        <motion.div className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Top Wallets
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Ranked by on-chain activity. Updated daily.
          </p>
        </motion.div>

        {/* Podium — top 3 */}
        <motion.div className="grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* 2nd */}
          <motion.div className="stat-tile flex flex-col items-center gap-2 p-3 pt-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}>
            <span className="text-2xl">🥈</span>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{top3[1].handle}</span>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{top3[1].txs.toLocaleString()} txs</span>
            </div>
          </motion.div>

          {/* 1st — tallest */}
          <motion.div className="flex flex-col items-center gap-2 p-3 pt-3 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #5B21B6, #7C3AED, #0891B2)",
              boxShadow: "0 12px 40px rgba(124,58,237,0.4)",
            }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.02 }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }} />
            <span className="text-2xl relative z-10">👑</span>
            <div className="flex flex-col items-center gap-0.5 relative z-10">
              <span className="text-xs font-bold text-white">{top3[0].handle}</span>
              <span className="text-[10px] text-white/60">{top3[0].txs.toLocaleString()} txs</span>
              <div className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(245,158,11,0.25)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.4)" }}>
                {top3[0].tier}
              </div>
            </div>
          </motion.div>

          {/* 3rd */}
          <motion.div className="stat-tile flex flex-col items-center gap-2 p-3 pt-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}>
            <span className="text-2xl">🥉</span>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{top3[2].handle}</span>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{top3[2].txs.toLocaleString()} txs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Rest of the list */}
        <motion.div className="flex flex-col gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {rest.map((entry, i) => (
            <motion.div
              key={entry.rank}
              className="stat-tile flex items-center gap-3 px-4 py-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32 + i * 0.05 }}
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.99 }}
            >
              <RankMedal rank={entry.rank} />
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{entry.handle}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{entry.address}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  {entry.txs.toLocaleString()}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: `${TIER_COLORS[entry.tier]}18`,
                    color: TIER_COLORS[entry.tier],
                    border: `1px solid ${TIER_COLORS[entry.tier]}40`,
                  }}>
                  {entry.tier}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="stat-tile p-4 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-cyan))" }}>
            <Trophy size={18} color="white" />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Want your wallet here?</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Connect your wallet and claim your OnChain CV</p>
          </div>
          <Link href="/" className="w-full">
            <button className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-97"
              style={{ background: "linear-gradient(135deg, var(--accent), #0891B2)", boxShadow: "0 6px 20px rgba(124,58,237,0.3)" }}>
              Get your CV →
            </button>
          </Link>
        </motion.div>

        <p className="text-center text-xs pb-4" style={{ color: "var(--text-muted)" }}>
          Rankings update every 24h · Mock data in demo mode
        </p>
      </div>
    </div>
  );
}
