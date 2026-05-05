"use client";

import { motion } from "framer-motion";

const steps = [
  "Fetching transaction history…",
  "Analyzing activity patterns…",
  "Calculating tier ranking…",
  "Verifying on-chain history…",
];

export default function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <motion.div
        className="flex flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <svg
            className="animate-spin-slow absolute inset-0"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="url(#spinnerGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80 140"
            />
            <defs>
              <linearGradient id="spinnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner pulse */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-10 h-10 rounded-full"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                opacity: 0.2,
              }}
            />
          </motion.div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2
            className="font-display text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Verifying on-chain history…
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            This takes just a moment
          </p>
        </div>

        {/* Animated steps */}
        <div className="flex flex-col gap-3 w-full max-w-[260px]">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.55, duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.55 + 0.2, type: "spring", stiffness: 400 }}
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <span className="text-xs text-left" style={{ color: "var(--text-muted)" }}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
