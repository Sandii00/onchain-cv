"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { useOnChainData } from "@/hooks/useOnChainData";
import LandingPage from "./LandingPage";
import LoadingState from "./LoadingState";
import Dashboard from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";

type State = "landing" | "loading" | "dashboard";

function isInsideWalletBrowser(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return !!(
    w.solana?.isPhantom  ||
    w.phantom?.solana    ||
    w.backpack?.solana   ||
    w.solflare?.isSolflare ||
    w.exodus?.solana     ||
    w.coinbaseSolana     ||
    w.solana?.isConnected !== undefined
  );
}

export default function AppShell() {
  const { connected, connecting, publicKey } = useWallet();
  const { data, loading: dataLoading, stale, prefetch } = useOnChainData(
    connected ? publicKey : null
  );

  const [state, setState] = useState<State>("landing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Client-only: wallet browser skips landing
  useEffect(() => {
    if (isInsideWalletBrowser()) setState("loading");
  }, []);

  // ── Optimisation 3: pre-fetch the moment publicKey is known ──
  // This fires BEFORE connected=true, as soon as wallet provides a key
  useEffect(() => {
    if (publicKey) prefetch(publicKey);
  }, [publicKey?.toBase58()]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (connecting) { setState("loading"); return; }

    if (connected) {
      // If we already have cached data — go straight to dashboard
      if (data && !dataLoading) {
        setState("dashboard");
      } else {
        setState("loading");
      }
    } else {
      if (!isInsideWalletBrowser()) setState("landing");
    }

    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [connected, connecting]);

  // Transition to dashboard as soon as data arrives
  useEffect(() => {
    if (connected && !dataLoading && data && state === "loading") {
      setState("dashboard");
    }
  }, [dataLoading, data, connected, state]);

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
          {/* stale = cached data showing, bg refresh running */}
          <Dashboard stale={stale} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
