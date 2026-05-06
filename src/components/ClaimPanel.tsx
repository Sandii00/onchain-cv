"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X, CheckCircle2, Link2, Sparkles } from "lucide-react";

interface Props { handle?: string; }

export default function ClaimPanel({ handle: defaultHandle = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(defaultHandle);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!handle.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setClaimed(true);
  };

  const slug = handle.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3.5 surface surface-hover rounded-xl transition-all active:scale-[0.99]"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
            <Link2 size={14} color="white" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Claim Identity URL</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              onchaincv.xyz/<span style={{ color: "var(--accent-light)" }}>{slug || "yourhandle"}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-gold">Early</span>
          <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setOpen(false)} />

            <motion.div className="fixed bottom-0 left-0 right-0 z-50 p-4"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}>
              <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>

                {/* Handle bar */}
                <div className="flex justify-center pt-3">
                  <div className="w-8 h-1 rounded-full" style={{ background: "var(--border)" }} />
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {!claimed ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Sparkles size={13} style={{ color: "#F59E0B" }} />
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D97706" }}>Early Adopter</span>
                          </div>
                          <h3 className="font-semibold text-base tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                            Claim your Identity URL
                          </h3>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            Free for the first 500. 487 spots left.
                          </p>
                        </div>
                        <button onClick={() => setOpen(false)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer" }}>
                          <X size={13} style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>

                      {/* URL preview */}
                      <div className="flex items-center gap-1 px-3 py-2.5 rounded-lg"
                        style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>onchaincv.xyz/</span>
                        <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-light)" }}>
                          {slug || "yourhandle"}
                        </span>
                      </div>

                      {/* Input */}
                      <input
                        type="text"
                        placeholder="Choose your handle"
                        value={handle}
                        onChange={e => setHandle(e.target.value)}
                        maxLength={30}
                        className="w-full px-3.5 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "inherit",
                        }}
                        onFocus={e => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; }}
                        onBlur={e => { e.target.style.borderColor = "var(--border)"; }}
                      />

                      <button
                        onClick={handleClaim}
                        disabled={!handle.trim() || loading}
                        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
                        style={{
                          background: "linear-gradient(135deg, #7C3AED, #5B21B6 50%, #0891B2)",
                          boxShadow: handle.trim() ? "0 4px 20px rgba(124,58,237,0.35)" : "none",
                          border: "none",
                          cursor: handle.trim() && !loading ? "pointer" : "not-allowed",
                        }}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin-slow w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                              <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Reserving…
                          </span>
                        ) : "Claim Free URL →"}
                      </button>
                    </>
                  ) : (
                    <motion.div className="flex flex-col items-center gap-4 py-2 text-center"
                      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                      <CheckCircle2 size={36} style={{ color: "#10B981" }} />
                      <div>
                        <p className="font-semibold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>Handle claimed</p>
                        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                          Live at <span style={{ color: "var(--accent-light)" }}>onchaincv.xyz/{slug}</span>
                        </p>
                      </div>
                      <button onClick={() => setOpen(false)}
                        className="w-full py-3 rounded-xl text-sm font-medium"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", cursor: "pointer" }}>
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
