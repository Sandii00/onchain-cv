"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModalCtx } from "@/context/WalletModalContext";
import { useEffect, useState, CSSProperties, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function WalletButton({ children, className, style }: Props) {
  const { connected, disconnect, publicKey } = useWallet();
  const { open } = useWalletModalCtx();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (connected) {
    const addr = publicKey?.toBase58() ?? "";
    return (
      <button
        onClick={disconnect}
        className={className}
        style={style}
      >
        {addr ? `${addr.slice(0, 4)}…${addr.slice(-4)}` : "Disconnect"}
      </button>
    );
  }

  return (
    <button onClick={open} className={className} style={style}>
      {children ?? "Connect Wallet"}
    </button>
  );
}
