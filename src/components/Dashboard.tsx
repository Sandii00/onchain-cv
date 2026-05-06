"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOnChainData } from "@/hooks/useOnChainData";
import CVCard from "./CVCard";
import ClaimPanel from "./ClaimPanel";
import { Activity, Trophy, LogOut, ExternalLink, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function FadeIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const { disconnect, publicKey } = useWallet();
  const { data, loading } = useOnChainData(publicKey);
  const addr = publicKey?.toBase58() ?? "";
  const [copiedAddr, setCopiedAddr] = useState(false);

  const handleCopyAddr = () => {
    if (addr) { navigator.clipboard.writeText(addr); setCopiedAddr(true); setTimeout(() => setCopiedAddr(false), 2000); }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <Activity size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>OnChainCV</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/leaderboard">
            <button className="btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }}>
              <Trophy size={12} className="inline mr-1" /> Leaderboard
            </button>
          </Link>
          <button onClick={disconnect} className="btn-outline" style={{ padding: "6px 12px", fontSize: "12px", color: "#F87171" }}>
            <LogOut size={12} className="inline mr-1" /> Disconnect
          </button>
        </div>
      </motion.nav>

      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto px-5 py-6 flex-1">

        {/* Header */}
        <FadeIn delay={0.05}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--text-dim)" }}>Your OnChain CV</p>
              <h1 className="font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Identity Card
              </h1>
            </div>
            {data?.tier && <span className="badge badge-gold mt-1">{data.tier}</span>}
          </div>
        </FadeIn>

        {/* Wallet address pill */}
        {addr && (
          <FadeIn delay={0.08}>
            <button onClick={handleCopyAddr}
              className="card card-hover flex items-center justify-between px-4 py-3 w-full text-left"
              style={{ cursor: "pointer" }}>
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {`${addr.slice(0, 10)}...${addr.slice(-8)}`}
              </span>
              <span style={{ color: copiedAddr ? "#4ADE80" : "var(--text-dim)" }}>
                {copiedAddr ? <Check size={13} /> : <Copy size={13} />}
              </span>
            </button>
          </FadeIn>
        )}

        {/* CV Card */}
        <FadeIn delay={0.12}><CVCard data={data} /></FadeIn>

        {/* Stats */}
        <FadeIn delay={0.18}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "DeFi",     value: data?.defiTxs },
              { label: "NFTs",     value: data?.nftTxs },
              { label: "Programs", value: data?.programsInteracted },
            ].map(s => (
              <div key={s.label} className="stat-tile flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--text-dim)" }}>{s.label}</span>
                <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
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
            <div className="card p-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-dim)" }}>
                Top Programs
              </p>
              <div className="flex flex-col gap-3">
                {data.topPrograms.map((p, i) => {
                  const max = data.topPrograms[0].count;
                  const colors = ["#A78BFA", "#38BDF8", "#FCD34D", "#4ADE80"];
                  return (
                    <div key={p.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                        <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>{p.count} txs</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: "var(--border)" }}>
                        <motion.div className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.round((p.count / max) * 100)}%` }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.55 }}
                          style={{ background: colors[i] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Claim panel */}
        <FadeIn delay={0.26}><ClaimPanel handle={addr.slice(0, 8).toLowerCase()} /></FadeIn>

        {/* Solscan */}
        {addr && (
          <FadeIn delay={0.3}>
            <a href={`https://solscan.io/account/${addr}`} target="_blank" rel="noopener noreferrer"
              className="card card-hover flex items-center justify-between px-4 py-3">
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>View on Solscan</span>
              <ExternalLink size={13} style={{ color: "var(--text-dim)" }} />
            </a>
          </FadeIn>
        )}

        <p className="text-center text-xs pb-4" style={{ color: "var(--text-dim)" }}>
          {process.env.NEXT_PUBLIC_HELIUS_API_KEY ? "Live data ·" : "Mock data ·"} Solana Mainnet
        </p>
      </div>
    </div>
  );
}
