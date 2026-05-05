"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import LoadingState from "./LoadingState";
import Dashboard from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";

type AppState = "landing" | "loading" | "dashboard";

export default function AppShell() {
  const { connected, connecting } = useWallet();
  const [appState, setAppState] = useState<AppState>("landing");

  useEffect(() => {
    if (connecting) {
      setAppState("loading");
      return;
    }
    if (connected) {
      // Simulate on-chain data fetch
      if (appState === "loading" || appState === "landing") {
        setAppState("loading");
        const timer = setTimeout(() => {
          setAppState("dashboard");
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setAppState("landing");
    }
  }, [connected, connecting]);

  return (
    <AnimatePresence mode="wait">
      {appState === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage />
        </motion.div>
      )}
      {appState === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingState />
        </motion.div>
      )}
      {appState === "dashboard" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
