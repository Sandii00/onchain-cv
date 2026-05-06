"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOnChainData } from "@/hooks/useOnChainData";
import CVCard from "./CVCard";
import ClaimPanel from "./ClaimPanel";
import MintNFT from "./MintNFT";
import { Trophy, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

function FI({ d = 0, children }: { d?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d, duration: 0.38 }}>
      {children}
    </motion.div>
  );
}

export default function Dashboard({ stale: staleProp }: { stale?: boolean }) {
  const { disconnect, publicKey } = useWallet();
  const { data, loading, stale } = useOnChainData(publicKey);
  const isInstant = data?.isInstant ?? false;
  const addr = publicKey?.toBase58() ?? "";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="font-semibold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
          OnChain<span style={{ color: "var(--accent2)" }}>CV</span>
          {stale && (
            <span style={{ fontSize: 10, color: "var(--dim)", display: "flex", alignItems: "center", gap: 4 }}>
              <svg style={{ width: 8, height: 8, animation: "spin 1s linear infinite" }} viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8" strokeDashoffset="4" />
              </svg>
              syncing
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          <Link href="/leaderboard">
            <button className="btn-ghost"><Trophy size={13} /></button>
          </Link>
          <button className="btn-ghost" onClick={disconnect} style={{ color: "#F87171" }}>
            <LogOut size={13} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: "360px", width: "100%", margin: "0 auto", padding: "32px 20px 48px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Title */}
        <FI d={0.05}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 className="serif" style={{ fontSize: "1.8rem", color: "var(--text)", letterSpacing: "-0.01em" }}>
              Your Identity
            </h1>
            {data?.tier && <span className="badge badge-gold">{data.tier}</span>}
          </div>
        </FI>

        {/* Card */}
        <FI d={0.1}><CVCard data={data} /></FI>

        {/* 3 stats */}
        <FI d={0.16}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { l: "DeFi",     v: data?.defiTxs },
              { l: "NFTs",     v: data?.nftTxs },
              { l: "Programs", v: data?.programsInteracted },
            ].map(s => (
              <div key={s.l} className="stat-tile">
                <p style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{s.l}</p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em" }}>
                  {loading || isInstant || !s.v
                    ? <span style={{ display: "inline-block", width: 32, height: 20, borderRadius: 4, background: "var(--border)", animation: "pulse 1.5s ease-in-out infinite" }} />
                    : s.v.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </FI>

        {/* Programs */}
        {data?.topPrograms && data.topPrograms.length > 0 && (
          <FI d={0.22}>
            <div className="card" style={{ padding: "20px" }}>
              <p style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                Top Programs
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {data.topPrograms.map((p, i) => {
                  const max = data.topPrograms[0].count;
                  const clr = ["#A78BFA", "#38BDF8", "#FCD34D", "#4ADE80"][i];
                  return (
                    <div key={p.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: 500 }}>{p.name}</span>
                        <span style={{ fontSize: "13px", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{p.count}</span>
                      </div>
                      <div style={{ height: 3, borderRadius: 99, background: "var(--border)" }}>
                        <motion.div style={{ height: "100%", borderRadius: 99, background: clr }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.round((p.count / max) * 100)}%` }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FI>
        )}

        {/* Mint NFT */}
        <FI d={0.26}><MintNFT data={data} /></FI>

        {/* Claim */}
        <FI d={0.32}><ClaimPanel handle={addr.slice(0, 8).toLowerCase()} /></FI>

        {/* Solscan */}
        {addr && (
          <FI d={0.32}>
            <a href={`https://solscan.io/account/${addr}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 12, textDecoration: "none" }}>
              <span style={{ fontSize: "14px", color: "var(--muted)" }}>View on Solscan</span>
              <ExternalLink size={14} style={{ color: "var(--dim)" }} />
            </a>
          </FI>
        )}
      </div>
    </div>
  );
}
