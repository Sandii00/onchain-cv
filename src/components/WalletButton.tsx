"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function WalletButton({ className, style, children, onClick }: Props) {
  const { connected, disconnect, connect, wallets, select } = useWallet();
  const { setVisible, visible } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleClick = () => {
    if (onClick) { onClick(); return; }
    if (connected) { disconnect(); return; }

    // Try direct Phantom injection first
    if (typeof window !== "undefined" && (window as any).phantom?.solana?.isPhantom) {
      const phantomWallet = wallets.find(w =>
        w.adapter.name.toLowerCase().includes("phantom")
      );
      if (phantomWallet) {
        select(phantomWallet.adapter.name);
        setTimeout(() => connect().catch(() => setVisible(true)), 100);
        return;
      }
    }

    // Fallback to modal
    setVisible(true);
  };

  return (
    <button onClick={handleClick} className={className} style={style}>
      {children ?? (connected ? "Disconnect" : "Connect Wallet")}
    </button>
  );
}
