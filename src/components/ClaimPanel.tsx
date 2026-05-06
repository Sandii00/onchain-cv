"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";

interface Props { handle?: string; }

export default function ClaimPanel({ handle: defaultHandle = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(defaultHandle);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!handle.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setClaimed(true);
  };

  const slug = handle.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setOpen(true)}
        className="card card-hover w-full flex items-center justify-between px-4 py-3.5 text-left"
        style={{ cursor: "pointer" }}>
        <div>
          <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
            Claim your Identity URL
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            onchaincv.xyz/<span style={{ color: "var(--accent-light)" }}>{slug || "yourhandle"}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="badge badge-gold">Early</span>
          <ArrowRight size={14} style={{ color: "var(--text-dim)" }} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.75)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setOpen(false)} />

            {/* Sheet */}
            <motion.div className="fixed bottom-0 left-0 right-0 z-50 p-4"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}>
              <div className="w-full max-w-sm mx-auto card overflow-hidden">
                {/* Drag handle */}
                <div className="flex justify-center pt-3">
                  <div className="w-8 h-1 rounded-full" style={{ background: "var(--border-light)" }} />
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {!claimed ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base mb-1" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                            Claim your Identity URL
                          </h3>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Free for the first 500 users · 487 spots left
                          </p>
                        </div>
                        <button onClick={() => setOpen(false)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--bg-input)", border: "1px solid var(--border)", cursor: "pointer" }}>
                          <X size={13} style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>

                      {/* URL preview */}
                      <div className="flex items-center gap-0 rounded-lg overflow-hidden"
                        style={{ border: "1px solid var(--border)", background: "var(--bg-input)" }}>
                        <span className="px-3 py-2.5 text-xs font-medium flex-shrink-0"
                          style={{ color: "var(--text-dim)", borderRight: "1px solid var(--border)" }}>
                          onchaincv.xyz/
                        </span>
                        <span className="px-3 py-2.5 text-xs font-semibold" style={{ color: "var(--accent-light)" }}>
                          {slug || "yourhandle"}
                        </span>
                      </div>

                      {/* Input */}
                      <input
                        className="input"
                        type="text"
                        placeholder="Choose your handle"
                        value={handle}
                        onChange={e => setHandle(e.target.value)}
                        maxLength={30}
                      />

                      {/* CTA */}
                      <button onClick={handleClaim} disabled={!handle.trim() || loading}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin-slow w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                              <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Reserving…
                          </span>
                        ) : "Claim Free URL →"}
                      </button>
                    </>
                  ) : (
                    <motion.div className="flex flex-col items-center gap-4 py-3 text-center"
                      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                      <CheckCircle2 size={36} style={{ color: "#4ADE80" }} />
                      <div>
                        <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Handle claimed!</p>
                        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                          Live at <span style={{ color: "var(--accent-light)" }}>onchaincv.xyz/{slug}</span>
                        </p>
                      </div>
                      <button onClick={() => setOpen(false)} className="btn-outline w-full">Done</button>
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
