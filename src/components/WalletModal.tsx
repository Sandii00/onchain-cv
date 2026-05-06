"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MOBILE_DEEPLINKS: Record<string, (url: string) => string> = {
  Phantom:  (url) => `https://phantom.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(url)}`,
  Solflare: (url) => `https://solflare.com/ul/v1/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(url)}`,
  Backpack: (url) => `https://backpack.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(url)}`,
  Exodus:   (url) => `https://exodus.com/solana/browse/${encodeURIComponent(url)}`,
};

function getHostWallet(): string | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  if (w.solana?.isPhantom || w.phantom?.solana) return "Phantom";
  if (w.backpack?.solana) return "Backpack";
  if (w.solflare?.isSolflare) return "Solflare";
  if (w.exodus?.solana) return "Exodus";
  if (w.coinbaseSolana) return "Coinbase Wallet";
  return null;
}

export default function WalletModal({ open, onClose }: Props) {
  const { wallets, select, connect, connecting } = useWallet();
  const [connecting_to, setConnectingTo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hostWallet, setHostWallet] = useState<string | null>(null);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
    setHostWallet(getHostWallet());
  }, []);

  useEffect(() => {
    if (open) setConnectingTo(null);
  }, [open]);

  const handleWallet = async (name: string) => {
    setConnectingTo(name);

    // Inside a wallet browser — the host wallet is always available, connect directly
    if (hostWallet === name) {
      const wallet = wallets.find(w => w.adapter.name === name);
      if (wallet) {
        try {
          select(wallet.adapter.name);
          await new Promise(r => setTimeout(r, 80));
          await connect();
          onClose();
          return;
        } catch (err: any) {
          console.warn("Connect failed:", err?.message);
          setConnectingTo(null);
          return;
        }
      }
    }

    // On mobile (non-wallet browser) — use deep link
    if (isMobile && !hostWallet && MOBILE_DEEPLINKS[name]) {
      const currentUrl = window.location.href;
      window.open(MOBILE_DEEPLINKS[name](currentUrl), "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    const wallet = wallets.find(w => w.adapter.name === name);
    if (!wallet) {
      setConnectingTo(null);
      return;
    }

    const readyState = wallet.readyState;

    // Not installed — open install page
    if (readyState === "NotDetected" || readyState === "Unsupported") {
      if (wallet.adapter.url) window.open(wallet.adapter.url, "_blank");
      setConnectingTo(null);
      return;
    }

    try {
      select(wallet.adapter.name);
      await new Promise(r => setTimeout(r, 80));
      await connect();
      onClose();
    } catch (err: any) {
      console.warn("Connect failed:", err?.message);
      setConnectingTo(null);
    }
  };

  // Fallback list if wallet-adapter hasn't loaded yet
  const fallbackWallets = [
    { adapter: { name: "Phantom",  url: "https://phantom.app",    icon: "", readyState: "NotDetected" } },
    { adapter: { name: "Solflare", url: "https://solflare.com",   icon: "", readyState: "NotDetected" } },
    { adapter: { name: "Backpack", url: "https://backpack.app",   icon: "", readyState: "NotDetected" } },
    { adapter: { name: "Exodus",   url: "https://exodus.com",     icon: "", readyState: "NotDetected" } },
    { adapter: { name: "Coinbase", url: "https://coinbase.com",   icon: "", readyState: "NotDetected" } },
  ];

  const rawList = wallets.length > 0 ? wallets : fallbackWallets;
  // Sort: host wallet always first
  const displayWallets = hostWallet
    ? [...rawList].sort((a, b) =>
        a.adapter.name === hostWallet ? -1 : b.adapter.name === hostWallet ? 1 : 0
      )
    : rawList;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.85)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50"
            style={{
              bottom: 0, left: 0, right: 0,
              padding: "12px 12px 28px",
            }}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
          >
            <div style={{
              maxWidth: 400,
              margin: "0 auto",
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              overflow: "hidden",
            }}>
              {/* Handle */}
              <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
                <div style={{ width: 32, height: 4, borderRadius: 99, background: "var(--border)" }} />
              </div>

              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px" }}>
                <div>
                  <h3 className="serif" style={{ fontSize: "1.2rem", color: "var(--text)" }}>Connect wallet</h3>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                    {hostWallet ? `Detected: ${hostWallet}` : isMobile ? "Opens your wallet app" : "Select your Solana wallet"}
                  </p>
                </div>
                <button onClick={onClose} style={{
                  width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", cursor: "pointer",
                }}>
                  <X size={13} style={{ color: "var(--muted)" }} />
                </button>
              </div>

              {/* Wallet list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "0 14px 8px" }}>
                {displayWallets.map((w) => {
                  const name = w.adapter.name;
                  const isConnecting = connecting_to === name;
                  const isInstalled = w.adapter.readyState === "Installed" || w.adapter.readyState === "Loadable";
                  // Use the icon bundled with each adapter (base64 data URI) — no external URLs
                  const iconUrl = (w.adapter as any).icon ?? "";

                  return (
                    <motion.button
                      key={name}
                      onClick={() => handleWallet(name)}
                      disabled={!!connecting_to}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "13px 16px",
                        background: isConnecting ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isConnecting ? "rgba(139,92,246,0.35)" : "var(--border)"}`,
                        borderRadius: 12,
                        cursor: connecting_to ? "not-allowed" : "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "background 0.15s, border-color 0.15s",
                        opacity: connecting_to && !isConnecting ? 0.4 : 1,
                      }}
                      onMouseEnter={e => { if (!connecting_to) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; } }}
                      onMouseLeave={e => { if (!connecting_to) { e.currentTarget.style.background = isConnecting ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = isConnecting ? "rgba(139,92,246,0.35)" : "var(--border)"; } }}
                    >
                      {/* Icon — uses adapter's built-in base64 icon */}
                      <div style={{ width: 38, height: 38, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {iconUrl ? (
                          <img src={iconUrl} alt={name} style={{ width: 28, height: 28, objectFit: "contain" }} />
                        ) : (
                          <span style={{ fontSize: 16 }}>👛</span>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{name}</p>
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>
                          {isConnecting ? "Connecting…" :
                           hostWallet === name ? "Your wallet — tap to connect" :
                           isMobile && !hostWallet && MOBILE_DEEPLINKS[name] ? "Open in app" :
                           isInstalled ? "Detected" :
                           "Install extension"}
                        </p>
                      </div>

                      {/* Right indicator */}
                      {isConnecting ? (
                        <svg className="animate-spin-slow" style={{ width: 16, height: 16, flexShrink: 0 }} viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                          <path d="M8 2a6 6 0 0 1 6 6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      ) : isMobile && MOBILE_DEEPLINKS[name] ? (
                        <Smartphone size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                      ) : !isInstalled ? (
                        <ExternalLink size={13} style={{ color: "var(--dim)", flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile note */}
              {isMobile && (
                <p style={{ fontSize: 11, color: "var(--dim)", textAlign: "center", padding: "8px 20px 4px" }}>
                  On mobile, wallets open via deep link in your wallet app
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
