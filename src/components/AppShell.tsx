"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState, useRef } from "react";
import { useOnChainData } from "@/hooks/useOnChainData";
import LandingPage from "./LandingPage";
import LoadingState from "./LoadingState";
import Dashboard from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";

type AppState = "landing" | "loading" | "dashboard";

export default function AppShell() {
  const { connected, connecting, publicKey } = useWallet();
  const { loading: dataLoading } = useOnChainData(connected ? publicKey : null);
  const [appState, setAppState] = useState<AppState>("landing");
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minExpiredRef = useRef(false);

  useEffect(() => {
    if (connecting) {
      setAppState("loading");
      return;
    }

    if (connected) {
      setAppState("loading");
      minExpiredRef.current = false;

      // Show loading for at least 2.8s for UX polish
      minTimerRef.current = setTimeout(() => {
        minExpiredRef.current = true;
        if (!dataLoading) setAppState("dashboard");
      }, 2800);
    } else {
      setAppState("landing");
      if (minTimerRef.current) clearTimeout(minTimerRef.current);
    }

    return () => { if (minTimerRef.current) clearTimeout(minTimerRef.current); };
  }, [connected, connecting]);

  // Transition to dashboard once data is ready AND min time passed
  useEffect(() => {
    if (!dataLoading && minExpiredRef.current && appState === "loading") {
      setAppState("dashboard");
    }
  }, [dataLoading, appState]);

  return (
    <AnimatePresence mode="wait">
      {appState === "landing" && (
        <motion.div key="landing"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          <LandingPage />
        </motion.div>
      )}
      {appState === "loading" && (
        <motion.div key="loading"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <LoadingState />
        </motion.div>
      )}
      {appState === "dashboard" && (
        <motion.div key="dashboard"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
