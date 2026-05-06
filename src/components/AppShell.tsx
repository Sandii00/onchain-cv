"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { useOnChainData } from "@/hooks/useOnChainData";
import LandingPage from "./LandingPage";
import LoadingState from "./LoadingState";
import Dashboard from "./Dashboard";
import { AnimatePresence, motion } from "framer-motion";

type State = "landing" | "loading" | "dashboard";

export default function AppShell() {
  const { connected, connecting, publicKey } = useWallet();
  const { loading: dataLoading } = useOnChainData(connected ? publicKey : null);
  const [state, setState] = useState<State>("landing");
  const minDone = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (connecting) { setState("loading"); return; }

    if (connected) {
      setState("loading");
      minDone.current = false;
      timer.current = setTimeout(() => {
        minDone.current = true;
        if (!dataLoading) setState("dashboard");
      }, 2800);
    } else {
      setState("landing");
      if (timer.current) clearTimeout(timer.current);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [connected, connecting]);

  useEffect(() => {
    if (!dataLoading && minDone.current && state === "loading") setState("dashboard");
  }, [dataLoading, state]);

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
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
