import Leaderboard from "@/components/Leaderboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard — OnChain CV",
  description: "Top Solana wallets ranked by on-chain activity.",
};

export default function LeaderboardPage() {
  return <Leaderboard />;
}
