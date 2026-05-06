"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

// Mock data for public profile — in production, fetch by handle from DB
const MOCK = {
  handle: "",
  address: "7xKqBz9fR3pL4mNpRy8W2dXvQs5tUjYh",
  activeSince: "2021",
  totalTxs: 1847,
  tier: "Top 1%",
  tierColor: "#F59E0B",
  defiTxs: 823,
  nftTxs: 412,
  programsInteracted: 67,
  topPrograms: [
    { name: "Jupiter", count: 312 },
    { name: "Magic Eden", count: 187 },
    { name: "Raydium", count: 144 },
    { name: "Tensor", count: 98 },
  ],
};

interface Props {
  handle: string;
}

export default function PublicProfile({ handle }: Props) {
  const data = { ...MOCK, handle };
  const [copied, setCopied] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://onchaincv.xyz/${handle}`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAddr = () => {
    navigator.clipboard.writeText(data.address);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)" }} />
      <div className="absolute bottom-[-80px] left-[-40px] w-[240px] h-[240px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-cyan), transparent)" }} />

      {/* Nav */}
      <motion.div className="flex items-center justify-between mb-8 z-10"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <ArrowLeft size={15} />
            </button>
          </Link>
          <div>
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>OnChain CV</span>
            <div className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>Public Profile</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <button onClick={handleShare}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            {copied ? <Check size={15} style={{ color: "var(--accent)" }} /> : <Share2 size={15} />}
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col gap-5 w-full max-w-sm mx-auto z-10">

        {/* Profile header */}
        <motion.div className="flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-cyan))", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
            <span className="font-display text-2xl font-bold text-white">
              {handle.slice(0, 2).toUpperCase()}
            </span>
            {/* Tier ring */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: data.tierColor, boxShadow: `0 2px 8px ${data.tierColor}60` }}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="white">
                <polygon points="5,1 6.2,3.8 9,3.8 6.8,5.7 7.6,8.5 5,6.8 2.4,8.5 3.2,5.7 1,3.8 3.8,3.8" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {handle}
            </h1>
            <button onClick={handleCopyAddr} className="flex items-center gap-1.5 mx-auto mt-1 group">
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                {`${data.address.slice(0, 8)}...${data.address.slice(-6)}`}
              </span>
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                {copiedAddr ? <Check size={11} /> : <Copy size={11} />}
              </span>
            </button>
          </div>

          {/* Tier badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{ background: `${data.tierColor}18`, border: `1px solid ${data.tierColor}40` }}>
            <svg width="12" height="12" viewBox="0 0 10 10" fill={data.tierColor}>
              <polygon points="5,1 6.2,3.8 9,3.8 6.8,5.7 7.6,8.5 5,6.8 2.4,8.5 3.2,5.7 1,3.8 3.8,3.8" />
            </svg>
            <span className="text-xs font-bold" style={{ color: data.tierColor }}>{data.tier} Activity Tier</span>
          </div>
        </motion.div>

        {/* CV Card — simplified display */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: "var(--card-bg)",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 24px 64px rgba(124,58,237,0.4)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)", borderRadius: "28px" }} />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest">onchaincv.xyz</p>
                <p className="font-display text-xl font-bold text-white">{handle}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14.5h12l-4 3H4l4-3z" fill="white" fillOpacity="0.9"/>
                  <path d="M4 8.5h12l-4 3H4l4-3z" fill="white"/>
                  <path d="M8 2.5h8l-4 3H4l4-3z" fill="white" fillOpacity="0.7"/>
                </svg>
              </div>
            </div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.15)" }} />

            <div className="flex justify-between">
              <div><p className="text-xs text-white/50 uppercase tracking-wider">Since</p><p className="text-white font-semibold">{data.activeSince}</p></div>
              <div><p className="text-xs text-white/50 uppercase tracking-wider">Total Txs</p><p className="text-white font-semibold">{data.totalTxs.toLocaleString()}</p></div>
              <div className="px-3 py-1.5 rounded-full self-end" style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.5)" }}>
                <span className="text-xs font-bold" style={{ color: "#FCD34D" }}>{data.tier}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {[
            { label: "DeFi", value: data.defiTxs.toLocaleString() },
            { label: "NFTs", value: data.nftTxs.toLocaleString() },
            { label: "Programs", value: data.programsInteracted },
          ].map((s) => (
            <div key={s.label} className="stat-tile flex flex-col gap-1 p-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{s.label}</span>
              <span className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Top programs */}
        <motion.div className="stat-tile p-4 flex flex-col gap-3"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Top Programs</span>
          {data.topPrograms.map((p, i) => {
            const max = data.topPrograms[0].count;
            return (
              <div key={p.name} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.count}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                  <motion.div className="h-full rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${Math.round((p.count / max) * 100)}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    style={{ background: ["var(--accent)", "var(--accent-cyan)", "#FCD34D", "#34D399"][i] }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Solscan link */}
        <motion.a
          href={`https://solscan.io/account/${data.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="stat-tile flex items-center justify-between px-4 py-3 transition-all active:scale-97"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.01 }}>
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>View on Solscan</span>
          <ExternalLink size={15} style={{ color: "var(--text-muted)" }} />
        </motion.a>

        {/* CTA */}
        <motion.div className="stat-tile p-4 flex flex-col gap-3 text-center"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Get your own OnChain CV</p>
          <Link href="/">
            <button className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-97"
              style={{ background: "linear-gradient(135deg, var(--accent), #0891B2)", boxShadow: "0 6px 20px rgba(124,58,237,0.3)" }}>
              Connect Wallet →
            </button>
          </Link>
        </motion.div>

        <p className="text-center text-xs pb-4" style={{ color: "var(--text-muted)" }}>
          onchaincv.xyz/{handle}
        </p>
      </div>
    </div>
  );
}
