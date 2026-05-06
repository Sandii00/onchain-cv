"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function WalletButton({ className, style, children }: Props) {
  const { setVisible } = useWalletModal();
  const { connected, disconnect } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        if (connected) {
          disconnect();
        } else {
          setVisible(true);
        }
      }}
      className={className}
      style={style}
    >
      {children ?? (connected ? "Disconnect" : "Connect Wallet")}
    </button>
  );
}
