"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function truncateAddress(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

const MOCK_ADDRESS = "7xKq...4mNp";

export default function CVCard() {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const displayAddress = publicKey
    ? truncateAddress(publicKey.toBase58())
    : MOCK_ADDRESS;

  const fullAddress = publicKey?.toBase58() ?? "7xKqBz9...4mNpRy8W";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 40%, #0891B2 100%)",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 24px 64px rgba(124,58,237,0.4), 0 4px 12px rgba(0,0,0,0.15)",
          minHeight: "200px",
        }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            borderRadius: "28px",
          }}
        />

        {/* Frosted circle decorations */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />

        <div className="relative z-10 flex flex-col gap-5">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-widest uppercase text-white/60">
                OnChain CV
              </span>
              <span className="font-display text-lg font-bold text-white leading-tight">
                Solana Identity
              </span>
            </div>
            {/* Solana logo circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 14.5h12l-4 3H4l4-3z" fill="white" fillOpacity="0.9"/>
                <path d="M4 8.5h12l-4 3H4l4-3z" fill="white"/>
                <path d="M8 2.5h8l-4 3H4l4-3z" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>
          </div>

          {/* Address */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 group"
          >
            <span
              className="font-mono text-sm font-medium text-white/90 tracking-wider"
            >
              {displayAddress}
            </span>
            <span className="text-white/40 group-hover:text-white/70 transition-colors">
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </span>
          </button>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.15)" }} />

          {/* Stats row */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-white/50 uppercase tracking-wider">Active since</span>
              <span className="text-white font-semibold text-sm">2021</span>
            </div>
            <div className="flex flex-col gap-0.5 items-center">
              <span className="text-xs text-white/50 uppercase tracking-wider">Total Txs</span>
              <span className="text-white font-semibold text-sm">1,847</span>
            </div>
            {/* Tier badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(245,158,11,0.2)",
                border: "1px solid rgba(245,158,11,0.5)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#F59E0B">
                <polygon points="5,1 6.2,3.8 9,3.8 6.8,5.7 7.6,8.5 5,6.8 2.4,8.5 3.2,5.7 1,3.8 3.8,3.8" />
              </svg>
              <span className="text-xs font-bold" style={{ color: "#FCD34D" }}>
                Top 1%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Below card: tier label */}
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Activity Tier ·{" "}
          <span style={{ color: "#7C3AED", fontWeight: 600 }}>Top 1% on Solana</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
