import SolanaWalletProvider from "@/context/WalletProvider";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <SolanaWalletProvider>
      <AppShell />
    </SolanaWalletProvider>
  );
}
