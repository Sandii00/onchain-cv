"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WalletButton from "./WalletButton";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--text)" }}>
          OnChain<span style={{ color: "var(--accent2)" }}>CV</span>
        </span>
        <div className="flex items-center gap-3">
          <Link href="/leaderboard">
            <button className="btn-ghost">Leaderboard</button>
          </Link>
          <WalletButton className="btn-ghost" style={{ color: "var(--text)", borderColor: "rgba(255,255,255,0.15)" }}>
            Connect
          </WalletButton>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center"
        style={{ paddingTop: "72px", paddingBottom: "72px" }}>

        {/* Live pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px" }}
        >
          <span className="badge badge-green">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />
            Live on Solana
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="serif"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
          style={{
            fontSize: "clamp(2.6rem, 9vw, 3.8rem)",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "380px",
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          Your wallet
          <br />
          <em style={{ color: "var(--accent2)", fontStyle: "italic" }}>is your CV.</em>
        </motion.h1>

        {/* Sub — one line max */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontSize: "16px",
            color: "var(--muted)",
            maxWidth: "300px",
            lineHeight: "1.6",
            marginBottom: "48px",
          }}
        >
          Connect your Solana wallet and get a verified on-chain identity card in seconds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          style={{ width: "100%", maxWidth: "280px", marginBottom: "64px" }}
        >
          <WalletButton className="btn btn-purple">
            Connect Wallet <ArrowRight size={16} />
          </WalletButton>
          <p style={{ fontSize: "12px", color: "var(--dim)", marginTop: "12px" }}>
            Read-only · No signing required
          </p>
        </motion.div>

        {/* Stats row — minimal */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            display: "flex",
            gap: "40px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { v: "2.4M+", l: "Wallets" },
            { v: "180M+", l: "Transactions" },
            { v: "< 3s",  l: "Verification" },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
                {s.v}
              </span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── 3 features — ultra clean ── */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "56px 24px" }}>
        <div style={{ maxWidth: "340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          {[
            {
              num: "01",
              title: "Verified identity",
              body: "Every stat sourced directly from Solana mainnet.",
            },
            {
              num: "02",
              title: "Activity tier",
              body: "Ranked Top 1%, 5%, or 10% against 2.4M wallets.",
            },
            {
              num: "03",
              title: "Your own URL",
              body: "Share onchaincv.xyz/yourname with anyone.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
            >
              <span className="serif" style={{ fontSize: "13px", color: "var(--accent2)", opacity: 0.6, paddingTop: "2px", minWidth: "20px" }}>
                {f.num}
              </span>
              <div>
                <p style={{ fontWeight: 600, fontSize: "15px", color: "var(--text)", marginBottom: "6px" }}>{f.title}</p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>© 2025 OnChainCV</span>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>Built on Solana</span>
      </div>
    </div>
  );
}
