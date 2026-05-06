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
      <motion.div
        className="flex flex-col items-center gap-8 text-center w-full max-w-xs"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <svg className="animate-spin-slow absolute inset-0 w-full h-full" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <path d="M28 4 a24 24 0 0 1 24 24" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-light)" }} />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-semibold text-lg tracking-tight mb-1" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Verifying on-chain history
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Analyzing your Solana activity…</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2.5 w-full">
          {STEPS.map((step, i) => (
            <motion.div key={step} className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.6, duration: 0.35 }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.6 + 0.2, type: "spring", stiffness: 400 }}
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <span className="text-xs text-left" style={{ color: "var(--text-muted)" }}>{step}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
