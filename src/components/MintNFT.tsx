"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, CheckCircle2, ExternalLink } from "lucide-react";
import type { OnChainData } from "@/hooks/useOnChainData";

interface Props { data: OnChainData | null; }

type MintState = "idle" | "signing" | "minting" | "done" | "error";

export default function MintNFT({ data }: Props) {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [open, setOpen]       = useState(false);
  const [mintState, setMintState] = useState<MintState>("idle");
  const [txSig, setTxSig]     = useState<string | null>(null);
  const [errMsg, setErrMsg]   = useState<string | null>(null);

  const tier      = data?.tier ?? "Active";
  const tierColor = data?.tierColor ?? "#6B7280";
  const totalTxs  = data?.totalTxs ?? 0;

  const tierGradients: Record<string, string> = {
    "Top 1%":  "linear-gradient(135deg, #F59E0B, #D97706)",
    "Top 5%":  "linear-gradient(135deg, #06B6D4, #0284C7)",
    "Top 10%": "linear-gradient(135deg, #7C3AED, #6D28D9)",
    "Top 25%": "linear-gradient(135deg, #10B981, #059669)",
    "Active":  "linear-gradient(135deg, #6B7280, #4B5563)",
  };
  const gradient = tierGradients[tier] ?? tierGradients["Active"];

  const handleMint = async () => {
    if (!publicKey) return;
    setMintState("signing");
    setErrMsg(null);

    try {
      // Call our server-side mint API
      setMintState("minting");
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          tier,
          totalTxs,
        }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Mint failed");

      setTxSig(json.signature ?? null);
      setMintState("done");
    } catch (e: any) {
      setErrMsg(e?.message ?? "Something went wrong");
      setMintState("error");
    }
  };

  const reset = () => { setMintState("idle"); setErrMsg(null); setTxSig(null); };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px", borderRadius: 14, cursor: "pointer", textAlign: "left",
          background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(196,181,253,0.06))",
          border: "1px solid rgba(139,92,246,0.25)",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)")}
      >
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4, display: "flex", alignItems: "center", gap: 7 }}>
            <Sparkles size={15} style={{ color: "var(--accent2)" }} />
            Mint your CV as NFT
          </p>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Permanent on-chain record · {tier} tier
          </p>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
          background: gradient, color: "#fff", flexShrink: 0,
        }}>{tier}</span>
      </button>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.85)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if (mintState !== "minting") { setOpen(false); reset(); } }} />

            <motion.div className="fixed bottom-0 left-0 right-0 z-50" style={{ padding: "12px 12px 28px" }}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}>
              <div style={{ maxWidth: 400, margin: "0 auto", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>

                {/* Handle bar */}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
                  <div style={{ width: 32, height: 4, borderRadius: 99, background: "var(--border)" }} />
                </div>

                <div style={{ padding: "20px 22px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 className="serif" style={{ fontSize: "1.3rem", color: "var(--text)", marginBottom: 4 }}>Mint CV NFT</h3>
                      <p style={{ fontSize: 13, color: "var(--muted)" }}>Minted to your wallet · Free</p>
                    </div>
                    {mintState !== "minting" && (
                      <button onClick={() => { setOpen(false); reset(); }}
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <X size={13} style={{ color: "var(--muted)" }} />
                      </button>
                    )}
                  </div>

                  {/* NFT Preview */}
                  <div style={{
                    borderRadius: 16, padding: "24px", background: gradient,
                    display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>OnChain CV · Solana</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "var(--font-serif)" }}>{tier}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>
                      {publicKey?.toBase58().slice(0, 12)}···
                    </p>
                    <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                      {[
                        { l: "Txs",      v: totalTxs },
                        { l: "DeFi",     v: data?.defiTxs },
                        { l: "Programs", v: data?.programsInteracted },
                      ].map(s => (
                        <div key={s.l}>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{s.l}</p>
                          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.v ?? "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* States */}
                  {mintState === "idle" && (
                    <button onClick={handleMint}
                      className="btn btn-purple"
                      style={{ width: "100%" }}>
                      <Sparkles size={14} /> Mint Free NFT
                    </button>
                  )}

                  {(mintState === "signing" || mintState === "minting") && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "8px 0" }}>
                      <svg style={{ width: 32, height: 32, animation: "spin 1s linear infinite" }} viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                        <path d="M16 3a13 13 0 0 1 13 13" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <p style={{ fontSize: 14, color: "var(--muted)" }}>
                        {mintState === "signing" ? "Waiting for approval…" : "Minting on-chain…"}
                      </p>
                    </div>
                  )}

                  {mintState === "done" && (
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle2 size={40} style={{ color: "#34D399" }} />
                      <div>
                        <p className="serif" style={{ fontSize: "1.2rem", color: "var(--text)", marginBottom: 4 }}>Minted!</p>
                        <p style={{ fontSize: 13, color: "var(--muted)" }}>Your CV NFT is live on Solana</p>
                      </div>
                      {txSig && (
                        <a href={`https://solscan.io/tx/${txSig}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--accent2)", textDecoration: "none" }}>
                          View on Solscan <ExternalLink size={12} />
                        </a>
                      )}
                      <button onClick={() => { setOpen(false); reset(); }} className="btn" style={{ background: "var(--border)", color: "var(--text)", width: "100%" }}>Close</button>
                    </motion.div>
                  )}

                  {mintState === "error" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <p style={{ fontSize: 13, color: "#F87171", textAlign: "center" }}>{errMsg}</p>
                      <button onClick={reset} className="btn btn-purple" style={{ width: "100%" }}>Try Again</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
