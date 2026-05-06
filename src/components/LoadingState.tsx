"use client";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", gap: 24, padding: 24 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
        {/* Spinner */}
        <div style={{ position: "relative", width: 52, height: 52 }}>
          <svg className="animate-spin-slow" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="22" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <path d="M26 4a22 22 0 0 1 22 22" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent2)" }} />
          </div>
        </div>

        <div>
          <h2 className="serif" style={{ fontSize: "1.5rem", color: "var(--text)", marginBottom: 8 }}>
            Verifying your wallet
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>Pulling data from Solana mainnet…</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 260, textAlign: "left" }}>
          {["Fetching transactions", "Analyzing programs", "Calculating tier", "Building card"].map((s, i) => (
            <motion.div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.55, duration: 0.3 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.55 + 0.15, type: "spring", stiffness: 400 }}
                style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{s}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
