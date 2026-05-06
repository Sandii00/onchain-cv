"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { useOnChainData, fetchOnChainData, readCache } from "@/hooks/useOnChainData";
import LandingPage from "./LandingPage";
import LoadingState from "./LoadingState";
import Dashboard from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";

type State = "landing" | "loading" | "dashboard";

function isInsideWalletBrowser(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return !!(
    w.solana?.isPhantom    ||
    w.phantom?.solana      ||
    w.backpack?.solana     ||
    w.solflare?.isSolflare ||
    w.exodus?.solana       ||
    w.coinbaseSolana
  );
}

export default function AppShell() {
  const { connected, connecting, publicKey, connect, select, wallets } = useWallet();
  const { data, stale } = useOnChainData(connected ? publicKey : null);
  const [state, setState] = useState<State>("landing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Client-only: inside wallet browser — try to connect immediately
  useEffect(() => {
    if (!isInsideWalletBrowser()) return;

    // Already connected — go straight to dashboard
    if (connected) { setState("dashboard"); return; }

    setState("loading");

    // Try to trigger connect via the detected wallet
    const tryConnect = async () => {
      try {
        const w = window as any;
        // Directly call the injected provider's connect
        const provider = w.phantom?.solana || w.solana || w.backpack?.solana || w.solflare;
        if (provider?.connect) {
          await provider.connect({ onlyIfTrusted: true });
        }
      } catch {
        // onlyIfTrusted fails if not previously approved — that's fine, autoConnect handles it
      }
    };

    tryConnect();

    // Hard timeout: if still on loading after 4s, go to dashboard anyway
    // User can connect manually from there
    timeoutRef.current = setTimeout(() => {
      setState(s => s === "loading" ? "dashboard" : s);
    }, 4000);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // Pre-fetch the moment publicKey appears (before connected=true)
  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      if (!readCache(address)) fetchOnChainData(address).catch(() => {});
    }
  }, [publicKey?.toBase58()]);

  useEffect(() => {
    if (connecting) { setState("loading"); return; }

    if (connected) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("dashboard");
    } else {
      if (!isInsideWalletBrowser()) setState("landing");
    }
  }, [connected, connecting]);

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -6 },
  };

  return (
    <AnimatePresence mode="wait">
      {state === "landing" && (
        <motion.div key="landing" {...variants} transition={{ duration: 0.3 }}>
          <LandingPage />
        </motion.div>
      )}
      {state === "loading" && (
        <motion.div key="loading" {...variants} transition={{ duration: 0.3 }}>
          <LoadingState />
        </motion.div>
      )}
      {state === "dashboard" && (
        <motion.div key="dashboard" {...variants} transition={{ duration: 0.35 }}>
          <Dashboard stale={stale} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
