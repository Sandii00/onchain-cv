"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";
import type { OnChainData } from "@/hooks/useOnChainData";

interface Props {
  data: OnChainData | null;
}

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function CVCard({ data }: Props) {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const displayAddress = publicKey
    ? truncate(publicKey.toBase58())
    : "7xKqBz...4mNp";

  const handleCopy = () => {
    const addr = publicKey?.toBase58() ?? "7xKqBz9...4mNpRy8W";
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const d = data;

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-scene" style={{ minHeight: "200px" }}>
        <div className={`card-flipper ${flipped ? "flipped" : ""}`}>

          {/* ── FRONT ── */}
          <div className="card-face">
            <div
              className="relative overflow-hidden"
              style={{
                background: "var(--card-bg)",
                borderRadius: "28px",
                padding: "28px",
                boxShadow: "0 24px 64px rgba(124,58,237,0.4), 0 4px 12px rgba(0,0,0,0.15)",
                minHeight: "200px",
              }}
            >
              {/* shimmer */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                borderRadius: "28px",
              }} />
              {/* circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }} />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium tracking-widest uppercase text-white/60">OnChain CV</span>
                    <span className="font-display text-lg font-bold text-white leading-tight">Solana Identity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Flip button */}
                    <button
                      onClick={() => setFlipped(true)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20 active:scale-95"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                      title="See stats"
                    >
                      <RotateCcw size={13} color="rgba(255,255,255,0.8)" />
                    </button>
                    {/* Solana logo */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M4 14.5h12l-4 3H4l4-3z" fill="white" fillOpacity="0.9"/>
                        <path d="M4 8.5h12l-4 3H4l4-3z" fill="white"/>
                        <path d="M8 2.5h8l-4 3H4l4-3z" fill="white" fillOpacity="0.7"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <button onClick={handleCopy} className="flex items-center gap-2 group">
                  <span className="font-mono text-sm font-medium text-white/90 tracking-wider">{displayAddress}</span>
                  <span className="text-white/40 group-hover:text-white/70 transition-colors">
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                  </span>
                </button>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.15)" }} />

                {/* Stats */}
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Active since</span>
                    <span className="text-white font-semibold text-sm">{d?.activeSince ?? "2021"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 items-center">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Total Txs</span>
                    <span className="text-white font-semibold text-sm">{d?.totalTxs.toLocaleString() ?? "1,847"}</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.5)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill={d?.tierColor ?? "#F59E0B"}>
                      <polygon points="5,1 6.2,3.8 9,3.8 6.8,5.7 7.6,8.5 5,6.8 2.4,8.5 3.2,5.7 1,3.8 3.8,3.8" />
                    </svg>
                    <span className="text-xs font-bold" style={{ color: "#FCD34D" }}>{d?.tier ?? "Top 1%"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div className="card-face card-back">
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0E7490 0%, #1D4ED8 50%, #4C1D95 100%)",
                borderRadius: "28px",
                padding: "28px",
                boxShadow: "0 24px 64px rgba(14,116,144,0.4), 0 4px 12px rgba(0,0,0,0.15)",
                minHeight: "200px",
              }}
            >
              <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }} />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Back header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">Activity Breakdown</span>
                  <button
                    onClick={() => setFlipped(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20 active:scale-95"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <RotateCcw size={13} color="rgba(255,255,255,0.8)" style={{ transform: "scaleX(-1)" }} />
                  </button>
                </div>

                {/* Program bars */}
                <div className="flex flex-col gap-3">
                  {(d?.topPrograms ?? [
                    { name: "Jupiter", count: 312 },
                    { name: "Magic Eden", count: 187 },
                    { name: "Raydium", count: 144 },
                    { name: "Tensor", count: 98 },
                  ]).map((p, i) => {
                    const max = d?.topPrograms[0]?.count ?? 312;
                    const pct = Math.round((p.count / max) * 100);
                    return (
                      <div key={p.name} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-white/80">{p.name}</span>
                          <span className="text-xs text-white/50">{p.count} txs</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: ["#9D6FFF", "#22D3EE", "#FCD34D", "#34D399"][i] ?? "#fff",
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.12)" }} />

                {/* Bottom row */}
                <div className="flex justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">DeFi</span>
                    <span className="text-white text-sm font-semibold">{d?.defiTxs ?? 823}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 items-center">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">NFTs</span>
                    <span className="text-white text-sm font-semibold">{d?.nftTxs ?? 412}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Programs</span>
                    <span className="text-white text-sm font-semibold">{d?.programsInteracted ?? 67}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Below card label */}
      <motion.div className="mt-3 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Activity Tier ·{" "}
          <span style={{ color: d?.tierColor ?? "var(--accent)", fontWeight: 600 }}>{d?.tier ?? "Top 1%"} on Solana</span>
          <span style={{ color: "var(--text-muted)" }}> · tap <RotateCcw size={10} className="inline" /> to flip</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
