"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Zap, Shield, Award } from "lucide-react";

export default function LandingPage() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-[-120px] left-[-80px] w-[340px] h-[340px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />
      <div
        className="absolute bottom-[-100px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
      />

      <motion.div
        className="w-full max-w-sm flex flex-col items-center text-center gap-8 z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {/* Logo pill */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#7C3AED",
            }}
          >
            <Zap size={12} fill="#7C3AED" />
            Powered by Solana
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="flex flex-col gap-3"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h1
            className="font-display text-[2.6rem] leading-[1.1] font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Your Verified
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              On-Chain Identity
            </span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Connect your Solana wallet. Get a beautiful, shareable CV built
            entirely from your on-chain history.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {[
            { icon: <Shield size={12} />, label: "Verified on-chain" },
            { icon: <Award size={12} />, label: "Activity tier badge" },
            { icon: <Zap size={12} />, label: "Instant identity URL" },
          ].map((f) => (
            <div
              key={f.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.07)",
                color: "var(--text-muted)",
              }}
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="w-full"
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <button
            onClick={() => setVisible(true)}
            className="w-full py-4 rounded-2xl font-semibold text-base text-white tracking-tight transition-all duration-200 active:scale-[0.97] hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 60%, #0891B2 100%)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.35), 0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Connect Wallet
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-xs"
          style={{ color: "var(--text-muted)" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
        >
          Non-custodial · Read-only · No signing required
        </motion.p>
      </motion.div>
    </div>
  );
}
