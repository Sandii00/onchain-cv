import SolanaWalletProvider from "@/context/WalletProvider";
import { WalletModalProvider } from "@/context/WalletModalContext";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <SolanaWalletProvider>
      <WalletModalProvider>
        <AppShell />
      </WalletModalProvider>
    </SolanaWalletProvider>
  );
}
