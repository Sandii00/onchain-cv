"use client";

import { motion } from "framer-motion";

const STEPS = [
  "Fetching transaction signatures…",
  "Analyzing program interactions…",
  "Calculating activity percentile…",
  "Building your identity card…",
];

export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--bg)" }}>
      <motion.div className="flex flex-col items-center gap-7 text-center w-full max-w-xs"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

        {/* Spinner */}
        <div className="relative w-12 h-12">
          <svg className="animate-spin-slow absolute inset-0 w-full h-full" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <path d="M24 4 a20 20 0 0 1 20 20" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-light)" }} />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-base mb-1" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Verifying on-chain history
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Analyzing your Solana activity…</p>
        </div>

        <div className="flex flex-col gap-2.5 w-full text-left">
          {STEPS.map((step, i) => (
            <motion.div key={step} className="flex items-center gap-3"
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.55, duration: 0.3 }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.55 + 0.15, type: "spring", stiffness: 400 }}
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent)" }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{step}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
