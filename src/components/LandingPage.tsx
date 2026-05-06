"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Award } from "lucide-react";
import WalletButton from "./WalletButton";

export default function LandingPage() {

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ padding: "48px 24px" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-140px] left-[-100px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-120px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.14), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="w-full flex flex-col items-center text-center z-10"
        style={{ maxWidth: "400px", gap: "36px" }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
      >
        {/* Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#7C3AED",
            }}
          >
            <Zap size={11} fill="#7C3AED" strokeWidth={0} />
            Powered by Solana
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="flex flex-col"
          style={{ gap: "16px" }}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h1
            className="font-display font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 3.2rem)",
              lineHeight: "1.08",
              color: "var(--text-primary)",
            }}
          >
            Your Verified
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              On-Chain Identity
            </span>
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "var(--text-muted)",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            Connect your Solana wallet and get a beautiful, shareable CV built entirely from your on-chain history.
          </p>
        </motion.div>

        {/* Feature pills — stacked, not inline */}
        <motion.div
          className="flex flex-col"
          style={{ gap: "10px", width: "100%" }}
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {[
            { icon: <Shield size={14} />, label: "Verified on-chain — no third party" },
            { icon: <Award size={14} />, label: "Activity tier badge based on real data" },
            { icon: <Zap size={14} />, label: "Claim your instant identity URL" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(0,0,0,0.06)",
                color: "var(--text-muted)",
                fontSize: "0.83rem",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ width: "100%" }}
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <WalletButton
            className="w-full font-semibold text-white transition-all duration-200 active:scale-[0.97]"
            style={{
              padding: "18px 24px",
              borderRadius: "18px",
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 55%, #0891B2 100%)",
              boxShadow: "0 10px 40px rgba(124,58,237,0.38), 0 2px 4px rgba(0,0,0,0.1)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </WalletButton>
        </motion.div>

        {/* Footer note */}
        <motion.p
          style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "-12px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
        >
          Non-custodial · Read-only · No signing required
        </motion.p>
      </motion.div>
    </div>
  );
}
