"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOnChainData } from "@/hooks/useOnChainData";
import CVCard from "./CVCard";
import ClaimPanel from "./ClaimPanel";
import { Activity, Trophy, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const { disconnect, publicKey } = useWallet();
  const { data, loading } = useOnChainData(publicKey);
  const addr = publicKey?.toBase58() ?? "";

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Glow */}
      <div className="pointer-events-none absolute top-[-160px] left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
            <Activity size={13} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            OnChain<span style={{ color: "#9D6FFF" }}>CV</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/leaderboard">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer" }}>
              <Trophy size={13} />
            </button>
          </Link>
          <button onClick={disconnect}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "#EF4444", cursor: "pointer" }}>
            <LogOut size={13} />
          </button>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto px-5 py-6 z-10 flex-1">

        <FadeIn delay={0.05}>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Your Identity</p>
            <h1 className="font-semibold tracking-tight flex items-center gap-2"
              style={{ fontSize: "1.4rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
              On-Chain CV
              {data?.tier && <span className="badge-gold">{data.tier}</span>}
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}><CVCard data={data} /></FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.17}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "DeFi txs",  value: data?.defiTxs },
              { label: "NFT txs",   value: data?.nftTxs },
              { label: "Programs",  value: data?.programsInteracted },
            ].map(s => (
              <div key={s.label} className="stat-pill flex flex-col gap-1 p-3">
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                  {loading || !s.value
                    ? <span className="inline-block w-8 h-4 rounded animate-pulse" style={{ background: "var(--border)" }} />
                    : s.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Top programs */}
        {data?.topPrograms && data.topPrograms.length > 0 && (
          <FadeIn delay={0.22}>
            <div className="surface p-4 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Top Programs</p>
              {data.topPrograms.map((p, i) => {
                const max = data.topPrograms[0].count;
                const colors = ["#9D6FFF", "#06B6D4", "#F59E0B", "#10B981"];
                return (
                  <div key={p.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                      <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{p.count}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: "var(--border)" }}>
                      <motion.div className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((p.count / max) * 100)}%` }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                        style={{ background: colors[i] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.28}><ClaimPanel handle={addr.slice(0, 8).toLowerCase()} /></FadeIn>

        {addr && (
          <FadeIn delay={0.33}>
            <a href={`https://solscan.io/account/${addr}`} target="_blank" rel="noopener noreferrer"
              className="surface surface-hover flex items-center justify-between px-4 py-3">
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>View full history on Solscan</span>
              <ExternalLink size={13} style={{ color: "var(--text-muted)" }} />
            </a>
          </FadeIn>
        )}

        <p className="text-center text-xs pb-4" style={{ color: "var(--text-dim)" }}>
          {process.env.NEXT_PUBLIC_HELIUS_API_KEY ? "Live · " : "Mock · "}Solana Mainnet
        </p>
      </div>
    </div>
  );
}
