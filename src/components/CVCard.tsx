"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCw } from "lucide-react";
import type { OnChainData } from "@/hooks/useOnChainData";

interface Props { data: OnChainData | null; }

function truncate(addr: string) { return `${addr.slice(0, 6)}···${addr.slice(-4)}`; }

export default function CVCard({ data }: Props) {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const display = publicKey ? truncate(publicKey.toBase58()) : "7xKqBz···4mNp";
  const full = publicKey?.toBase58() ?? "7xKqBz9fR3pL4mNpRy8W";

  const handleCopy = () => {
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const d = data;
  const colors = ["#9D6FFF", "#06B6D4", "#F59E0B", "#10B981"];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-scene" style={{ minHeight: "176px" }}>
        <div className={`card-flipper ${flipped ? "flipped" : ""}`}>

          {/* ── FRONT ── */}
          <div className="card-face">
            <div className="cv-card relative overflow-hidden p-5" style={{ minHeight: "176px" }}>
              {/* Shimmer */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.04) 50%, transparent 65%)",
                borderRadius: "20px",
              }} />
              {/* Orbs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent)" }} />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent)" }} />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest mb-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}>OnChain CV · Solana</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                      Identity Card
                    </p>
                  </div>
                  <button onClick={() => setFlipped(true)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                    <RotateCw size={11} />
                    Stats
                  </button>
                </div>

                {/* Address */}
                <button onClick={handleCopy} className="flex items-center gap-2 group" style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {display}
                  </span>
                  <span style={{ color: copied ? "#10B981" : "rgba(255,255,255,0.25)" }} className="transition-colors group-hover:text-white">
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                  </span>
                </button>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

                {/* Stats row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Since</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{d?.activeSince ?? "2021"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Transactions</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{d?.totalTxs?.toLocaleString() ?? "1,847"}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <span className="text-xs font-bold" style={{ color: "#FCD34D" }}>{d?.tier ?? "Top 1%"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div className="card-face card-back">
            <div className="cv-card relative overflow-hidden p-5" style={{
              minHeight: "176px",
              background: "linear-gradient(135deg, #051520 0%, #0A1A35 50%, #1A0A3D 100%)",
            }}>
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent)" }} />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Activity Breakdown
                  </p>
                  <button onClick={() => setFlipped(false)}
                    className="text-xs px-2.5 py-1 rounded-md transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                    ← Back
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {(d?.topPrograms ?? [
                    { name: "Jupiter", count: 312 },
                    { name: "Magic Eden", count: 187 },
                    { name: "Raydium", count: 144 },
                    { name: "Tensor", count: 98 },
                  ]).map((p, i) => {
                    const max = d?.topPrograms?.[0]?.count ?? 312;
                    return (
                      <div key={p.name} className="flex items-center gap-3">
                        <span className="text-xs w-20 flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }}>{p.name}</span>
                        <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full transition-all" style={{
                            width: `${Math.round((p.count / max) * 100)}%`,
                            background: colors[i],
                          }} />
                        </div>
                        <span className="text-xs font-mono w-8 text-right" style={{ color: "rgba(255,255,255,0.35)" }}>{p.count}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                <div className="flex justify-between">
                  {[
                    { l: "DeFi", v: d?.defiTxs ?? 823 },
                    { l: "NFT", v: d?.nftTxs ?? 412 },
                    { l: "Programs", v: d?.programsInteracted ?? 67 },
                  ].map(s => (
                    <div key={s.l}>
                      <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{s.l}</p>
                      <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
