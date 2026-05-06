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
};

const WALLET_ICONS: Record<string, string> = {
  Phantom:  "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/phantom/icon.png",
  Solflare: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/solflare/icon.svg",
  Torus:    "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/torus/icon.svg",
  Coinbase: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/coinbase/icon.svg",
  Trust:    "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/trust/icon.svg",
};

export default function WalletModal({ open, onClose }: Props) {
  const { wallets, select, connect, connecting } = useWallet();
  const [connecting_to, setConnectingTo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (open) setConnectingTo(null);
  }, [open]);

  const handleWallet = async (name: string) => {
    setConnectingTo(name);

    // On mobile — use deep link for Phantom / Solflare
    if (isMobile && MOBILE_DEEPLINKS[name]) {
      const currentUrl = window.location.href;
      window.location.href = MOBILE_DEEPLINKS[name](currentUrl);
      onClose();
      return;
    }

    // Check if extension is installed
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
      await new Promise(r => setTimeout(r, 80)); // let select settle
      await connect();
      onClose();
    } catch (err: any) {
      console.warn("Connect failed:", err?.message);
      setConnectingTo(null);
    }
  };

  const displayWallets = wallets.length > 0
    ? wallets
    : [
        { adapter: { name: "Phantom",  url: "https://phantom.app",  readyState: "NotDetected" } },
        { adapter: { name: "Solflare", url: "https://solflare.com", readyState: "NotDetected" } },
        { adapter: { name: "Torus",    url: "https://tor.us",       readyState: "NotDetected" } },
      ];

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
                    {isMobile ? "Opens your wallet app" : "Select your Solana wallet"}
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
                  const iconUrl = WALLET_ICONS[name];

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
                      {/* Icon */}
                      <div style={{ width: 38, height: 38, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {iconUrl ? (
                          <img src={iconUrl} alt={name} style={{ width: 28, height: 28, objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <span style={{ fontSize: 16 }}>👛</span>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{name}</p>
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>
                          {isConnecting ? "Connecting…" :
                           isMobile && MOBILE_DEEPLINKS[name] ? "Open in app" :
                           isInstalled ? "Detected" :
                           "Install extension"}
                        </p>
                      </div>

                      {/* Right */}
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
