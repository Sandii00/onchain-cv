"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useOnChainData } from "@/hooks/useOnChainData";
import CVCard from "./CVCard";
import ClaimPanel from "./ClaimPanel";
import DarkModeToggle from "./DarkModeToggle";
import { LogOut, Bell, Trophy } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { disconnect, publicKey } = useWallet();
  const { data, loading } = useOnChainData(publicKey);

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)" }} />
      <div className="absolute bottom-[-80px] left-[-40px] w-[240px] h-[240px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-cyan), transparent)" }} />

      {/* Top nav */}
      <motion.div className="flex items-center justify-between mb-8 z-10"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>OnChain CV</span>
          <span className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>Your Identity</span>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Link href="/leaderboard">
            <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              title="Leaderboard">
              <Trophy size={15} />
            </button>
          </Link>
          <button className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            <Bell size={15} />
          </button>
          <button onClick={disconnect}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-red-50 dark:hover:bg-red-900/20"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <LogOut size={15} style={{ color: "#EF4444" }} />
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full max-w-sm mx-auto flex-1 z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
          <h2 className="font-display text-2xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            Your Verified<br />
            <span className="gradient-text">On-Chain Identity</span>
          </h2>
        </motion.div>

        {/* CV Card */}
        <CVCard data={data} />

        {/* Stats grid */}
        <motion.div className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}>
          {[
            { label: "DeFi", value: data?.defiTxs?.toLocaleString() ?? "823", sub: "transactions" },
            { label: "NFTs", value: data?.nftTxs?.toLocaleString() ?? "412", sub: "minted/traded" },
            { label: "Programs", value: data?.programsInteracted?.toString() ?? "67", sub: "interacted" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-tile flex flex-col gap-1 p-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
              <span className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {loading ? <span className="inline-block w-10 h-5 rounded animate-pulse" style={{ background: "var(--border)" }} /> : stat.value}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{stat.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Top programs */}
        {data?.topPrograms && data.topPrograms.length > 0 && (
          <motion.div
            className="stat-tile p-4 flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Top Programs</span>
            {data.topPrograms.map((p, i) => {
              const max = data.topPrograms[0].count;
              const pct = Math.round((p.count / max) * 100);
              return (
                <div key={p.name} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      style={{ background: ["var(--accent)", "var(--accent-cyan)", "#FCD34D", "#34D399"][i] }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Claim panel */}
        <ClaimPanel handle={publicKey ? publicKey.toBase58().slice(0, 8).toLowerCase() : ""} />

        <motion.p className="text-center text-xs pb-4" style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Data sourced {process.env.NEXT_PUBLIC_HELIUS_API_KEY ? "live" : "via mock"} from Solana mainnet
        </motion.p>
      </div>
    </div>
  );
}
