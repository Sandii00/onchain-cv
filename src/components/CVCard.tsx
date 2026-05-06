"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCw } from "lucide-react";
import type { OnChainData } from "@/hooks/useOnChainData";

interface Props { data: OnChainData | null; }

export default function CVCard({ data }: Props) {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const addr = publicKey?.toBase58() ?? "";
  const display = addr ? `${addr.slice(0, 6)}···${addr.slice(-4)}` : "7xKqBz···4mNp";
  const clrs = ["#A78BFA", "#38BDF8", "#FCD34D", "#4ADE80"];

  const copy = () => {
    navigator.clipboard.writeText(addr || display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="card-scene" style={{ minHeight: 170 }}>
        <div className={`card-flipper ${flipped ? "flipped" : ""}`}>

          {/* FRONT */}
          <div className="card-face">
            <div className="cv-card" style={{ padding: "22px", minHeight: 170, position: "relative", overflow: "hidden" }}>
              {/* glow */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
                      OnChain CV
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>Solana Identity</p>
                  </div>
                  <button onClick={() => setFlipped(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    <RotateCw size={10} /> Stats
                  </button>
                </div>

                {/* address */}
                <button onClick={copy} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>{display}</span>
                  <span style={{ color: copied ? "#34D399" : "rgba(255,255,255,0.2)" }}>{copied ? <Check size={11} /> : <Copy size={11} />}</span>
                </button>

                <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

                {/* stats row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Since</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{data?.activeSince ?? "2021"}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Transactions</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{data?.totalTxs?.toLocaleString() ?? "1,847"}</p>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: 11 }}>{data?.tier ?? "Top 1%"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="card-face card-back">
            <div className="cv-card" style={{ padding: "22px", minHeight: 170, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #091520 0%, #0f1e3a 60%, #1e1040 100%)" }}>
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Activity Breakdown</p>
                  <button onClick={() => setFlipped(false)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>← Back</button>
                </div>
                {(data?.topPrograms ?? [{ name: "Jupiter", count: 312 }, { name: "Magic Eden", count: 187 }, { name: "Raydium", count: 144 }, { name: "Tensor", count: 98 }]).map((p, i) => {
                  const max = data?.topPrograms?.[0]?.count ?? 312;
                  return (
                    <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", width: 72, flexShrink: 0 }}>{p.name}</span>
                      <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ height: "100%", borderRadius: 99, width: `${Math.round((p.count / max) * 100)}%`, background: clrs[i] }} />
                      </div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "monospace", minWidth: 24, textAlign: "right" }}>{p.count}</span>
                    </div>
                  );
                })}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[["DeFi", data?.defiTxs ?? 823], ["NFT", data?.nftTxs ?? 412], ["Programs", data?.programsInteracted ?? 67]].map(([l, v]) => (
                    <div key={l as string}>
                      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{l}</p>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{v}</p>
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
