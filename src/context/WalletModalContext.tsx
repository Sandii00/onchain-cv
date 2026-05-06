"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import WalletModal from "@/components/WalletModal";

interface Ctx { open: () => void; close: () => void; }
const WalletModalCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <WalletModalCtx.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
    </WalletModalCtx.Provider>
  );
}

export const useWalletModalCtx = () => useContext(WalletModalCtx);
