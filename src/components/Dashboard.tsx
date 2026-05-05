"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import CVCard from "./CVCard";
import ClaimPanel from "./ClaimPanel";
import { LogOut, Bell } from "lucide-react";

export default function Dashboard() {
  const { disconnect, publicKey } = useWallet();

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-40px] w-[240px] h-[240px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
      />

      {/* Top nav */}
      <motion.div
        className="flex items-center justify-between mb-8 z-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            OnChain CV
          </span>
          <span className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Your Identity
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ border: "1px solid rgba(0,0,0,0.07)", background: "rgba(255,255,255,0.7)" }}
          >
            <Bell size={15} style={{ color: "var(--text-muted)" }} />
          </button>
          <button
            onClick={disconnect}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-red-50"
            style={{ border: "1px solid rgba(0,0,0,0.07)", background: "rgba(255,255,255,0.7)" }}
          >
            <LogOut size={15} style={{ color: "#EF4444" }} />
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full max-w-sm mx-auto flex-1 z-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
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
          </h2>
        </motion.div>

        {/* CV Card */}
        <CVCard />

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
        >
          {[
            { label: "DeFi", value: "823", sub: "transactions" },
            { label: "NFTs", value: "412", sub: "minted/traded" },
            { label: "Programs", value: "67", sub: "interacted" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 p-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </span>
              <span className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {stat.value}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Claim panel trigger */}
        <ClaimPanel />

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs pb-4"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Data sourced live from Solana mainnet
        </motion.p>
      </div>
    </div>
  );
}
