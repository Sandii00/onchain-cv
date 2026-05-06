import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

export const metadata: Metadata = {
  title: "OnChain CV — Your Verified On-Chain Identity",
  description: "Connect your Solana wallet and get a verified on-chain CV with your transaction history, activity tier, and shareable identity URL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
        {children}
      </body>
    </html>
  );
}
