"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";

export default function ClaimPanel({ handle: def = "" }: { handle?: string }) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(def);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const slug = handle.trim().toLowerCase().replace(/\s+/g, "-");

  const claim = async () => {
    if (!handle.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setClaimed(true);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "border-color 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>Claim your identity URL</p>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            onchaincv.xyz/<span style={{ color: "var(--accent2)" }}>{slug || "yourhandle"}</span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span className="badge badge-gold" style={{ fontSize: 11 }}>Early</span>
          <ArrowRight size={15} style={{ color: "var(--dim)" }} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.8)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setOpen(false)} />
            <motion.div className="fixed bottom-0 left-0 right-0 z-50" style={{ padding: "16px" }}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}>
              <div style={{ maxWidth: 380, margin: "0 auto", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
                  <div style={{ width: 32, height: 4, borderRadius: 99, background: "var(--border)" }} />
                </div>
                <div style={{ padding: "20px 22px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
                  {!claimed ? (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <h3 className="serif" style={{ fontSize: "1.3rem", color: "var(--text)", marginBottom: 4 }}>Claim your URL</h3>
                          <p style={{ fontSize: 13, color: "var(--muted)" }}>Free · 487 of 500 spots left</p>
                        </div>
                        <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <X size={13} style={{ color: "var(--muted)" }} />
                        </button>
                      </div>

                      {/* URL preview */}
                      <div style={{ display: "flex", alignItems: "center", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "10px 14px", gap: 4 }}>
                        <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace" }}>onchaincv.xyz/</span>
                        <span style={{ fontSize: 13, color: "var(--accent2)", fontFamily: "monospace", fontWeight: 600 }}>{slug || "yourhandle"}</span>
                      </div>

                      <input className="input" placeholder="yourhandle" value={handle} onChange={e => setHandle(e.target.value)} maxLength={30} />

                      <button onClick={claim} disabled={!handle.trim() || loading}
                        className="btn btn-purple" style={{ opacity: !handle.trim() || loading ? 0.4 : 1, cursor: !handle.trim() || loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Reserving…" : "Claim Free URL →"}
                      </button>
                    </>
                  ) : (
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "12px 0", textAlign: "center" }}
                      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle2 size={40} style={{ color: "#34D399" }} />
                      <div>
                        <p className="serif" style={{ fontSize: "1.3rem", color: "var(--text)", marginBottom: 6 }}>Done!</p>
                        <p style={{ fontSize: 14, color: "var(--muted)" }}>Live at <span style={{ color: "var(--accent2)" }}>onchaincv.xyz/{slug}</span></p>
                      </div>
                      <button onClick={() => setOpen(false)} className="btn" style={{ background: "var(--border)", color: "var(--text)", width: "100%" }}>Close</button>
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
