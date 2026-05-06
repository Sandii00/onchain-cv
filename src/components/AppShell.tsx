"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
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
    w.coinbaseSolana       ||
    w.solana?.isConnected !== undefined
  );
}

export default function AppShell() {
  const { connected, connecting, publicKey } = useWallet();
  const { data, stale } = useOnChainData(connected ? publicKey : null);
  const [state, setState] = useState<State>("landing");

  // Client-only: skip landing inside wallet browsers
  useEffect(() => {
    if (isInsideWalletBrowser()) setState("loading");
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
      // Go straight to dashboard — hook shows instant data immediately
      // No loading screen needed
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
