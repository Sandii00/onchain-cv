"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles, X, CheckCircle2, Link2 } from "lucide-react";

export default function ClaimPanel() {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!handle.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setClaimed(true);
  };

  const slug = handle.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl group transition-all duration-200 active:scale-[0.98]"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
          >
            <Link2 size={16} color="white" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Claim your Identity URL
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              onchaincv.xyz/<span style={{ color: "#7C3AED" }}>yourhandle</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.12)",
              color: "#D97706",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            Early
          </span>
          <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </motion.button>

      {/* Slide-up panel backdrop + sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div
                className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(32px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>

                <div className="px-6 pt-4 pb-6 flex flex-col gap-5">
                  {!claimed ? (
                    <>
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <Sparkles size={15} style={{ color: "#F59E0B" }} />
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D97706" }}>
                              Early Adopter
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                            Claim your Premium
                            <br />Identity URL
                          </h3>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            Lock in your handle before it's taken. Free for the first 500 users.
                          </p>
                        </div>
                        <button
                          onClick={() => setOpen(false)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                        >
                          <X size={16} style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>

                      {/* URL preview */}
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl"
                        style={{
                          background: "rgba(124,58,237,0.06)",
                          border: "1px solid rgba(124,58,237,0.15)",
                        }}
                      >
                        <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                          onchaincv.xyz/
                        </span>
                        <span
                          className="text-sm font-mono font-semibold"
                          style={{ color: "#7C3AED" }}
                        >
                          {slug || "yourhandle"}
                        </span>
                      </div>

                      {/* Input */}
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Choose your handle"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value)}
                          maxLength={30}
                          className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all"
                          style={{
                            background: "#F5F4F0",
                            border: "1px solid rgba(0,0,0,0.08)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(124,58,237,0.4)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(0,0,0,0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* CTA */}
                      <button
                        onClick={handleClaim}
                        disabled={!handle.trim() || loading}
                        className="w-full py-4 rounded-2xl font-semibold text-sm text-white transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 60%, #0891B2 100%)",
                          boxShadow: handle.trim()
                            ? "0 8px 24px rgba(124,58,237,0.35)"
                            : "none",
                        }}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                              <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Reserving handle…
                          </span>
                        ) : (
                          "Claim Free Identity URL →"
                        )}
                      </button>

                      <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                        487 of 500 early spots remaining
                      </p>
                    </>
                  ) : (
                    /* Success state */
                    <motion.div
                      className="flex flex-col items-center gap-4 py-4 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(124,58,237,0.1)" }}
                      >
                        <CheckCircle2 size={32} style={{ color: "#7C3AED" }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                          Handle claimed!
                        </h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          Your identity URL is live at
                        </p>
                        <p className="text-sm font-semibold mt-1" style={{ color: "#7C3AED" }}>
                          onchaincv.xyz/{slug}
                        </p>
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97]"
                        style={{
                          background: "#F5F4F0",
                          color: "var(--text-primary)",
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
