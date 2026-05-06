"use client";

import React, { FC, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { ExodusWalletAdapter } from "@solana/wallet-adapter-exodus";
import { clusterApiUrl } from "@solana/web3.js";

interface Props { children: ReactNode; }

const SolanaWalletProvider: FC<Props> = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Mainnet), []);

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new BackpackWalletAdapter(),
    new ExodusWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new TrustWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true} onError={(err) => console.warn("Wallet error:", err)}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletProvider;
