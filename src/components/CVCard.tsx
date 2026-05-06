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
  const colors = ["#A78BFA", "#38BDF8", "#FCD34D", "#4ADE80"];

  const handleCopy = () => {
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div className="w-full"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}>
      <div className="card-scene" style={{ minHeight: "172px" }}>
        <div className={`card-flipper ${flipped ? "flipped" : ""}`}>

          {/* ── FRONT ── */}
          <div className="card-face">
            <div className="cv-card relative overflow-hidden p-5" style={{ minHeight: "172px" }}>
              {/* Orbs */}
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)" }} />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)" }} />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      OnChain CV
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                      Solana Identity
                    </p>
                  </div>
                  <button onClick={() => setFlipped(true)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
                    <RotateCw size={10} /> Stats
                  </button>
                </div>

                {/* Address */}
                <button onClick={handleCopy} className="flex items-center gap-2 group"
                  style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>{display}</span>
                  <span className="transition-colors" style={{ color: copied ? "#4ADE80" : "rgba(255,255,255,0.2)" }}>
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                  </span>
                </button>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Since</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{data?.activeSince ?? "2021"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Transactions</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{data?.totalTxs?.toLocaleString() ?? "1,847"}</p>
                  </div>
                  <div className="badge badge-gold">{data?.tier ?? "Top 1%"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div className="card-face card-back">
            <div className="cv-card relative overflow-hidden p-5" style={{
              minHeight: "172px",
              background: "linear-gradient(140deg, #0F1F2E 0%, #1C2B4A 60%, #2D1B69 100%)",
            }}>
              <div className="relative z-10 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Activity Breakdown
                  </p>
                  <button onClick={() => setFlipped(false)}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
                    ← Back
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {(data?.topPrograms ?? [
                    { name: "Jupiter", count: 312 },
                    { name: "Magic Eden", count: 187 },
                    { name: "Raydium", count: 144 },
                    { name: "Tensor", count: 98 },
                  ]).map((p, i) => {
                    const max = data?.topPrograms?.[0]?.count ?? 312;
                    return (
                      <div key={p.name} className="flex items-center gap-3">
                        <span className="text-xs w-20 flex-shrink-0" style={{ color: "rgba(255,255,255,0.55)" }}>{p.name}</span>
                        <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full" style={{
                            width: `${Math.round((p.count / max) * 100)}%`,
                            background: colors[i],
                          }} />
                        </div>
                        <span className="text-xs font-mono w-7 text-right" style={{ color: "rgba(255,255,255,0.3)" }}>{p.count}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                <div className="flex justify-between">
                  {[
                    { l: "DeFi", v: data?.defiTxs ?? 823 },
                    { l: "NFT", v: data?.nftTxs ?? 412 },
                    { l: "Programs", v: data?.programsInteracted ?? 67 },
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
