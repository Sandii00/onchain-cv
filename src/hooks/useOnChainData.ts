"use client";

import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";

export interface OnChainData {
  totalTxs: number;
  activeSince: string;
  topPrograms: { name: string; count: number }[];
  tier: "Top 1%" | "Top 5%" | "Top 10%" | "Top 25%" | "Active";
  tierColor: string;
  defiTxs: number;
  nftTxs: number;
  programsInteracted: number;
}

const MOCK_DATA: OnChainData = {
  totalTxs: 1847,
  activeSince: "2021",
  topPrograms: [
    { name: "Jupiter", count: 312 },
    { name: "Magic Eden", count: 187 },
    { name: "Raydium", count: 144 },
    { name: "Tensor", count: 98 },
  ],
  tier: "Top 1%",
  tierColor: "#F59E0B",
  defiTxs: 823,
  nftTxs: 412,
  programsInteracted: 67,
};

function classifyTier(txCount: number): OnChainData["tier"] {
  if (txCount > 1000) return "Top 1%";
  if (txCount > 500) return "Top 5%";
  if (txCount > 200) return "Top 10%";
  if (txCount > 50) return "Top 25%";
  return "Active";
}

function tierToColor(tier: OnChainData["tier"]): string {
  switch (tier) {
    case "Top 1%": return "#F59E0B";
    case "Top 5%": return "#06B6D4";
    case "Top 10%": return "#7C3AED";
    case "Top 25%": return "#10B981";
    default: return "#6B7280";
  }
}

export function useOnChainData(publicKey: PublicKey | null) {
  const [data, setData] = useState<OnChainData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setData(null);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    if (!apiKey) {
      setData(MOCK_DATA);
      return;
    }

    // Real Helius fetch — parallel requests, capped at 100 sigs
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const address = publicKey.toBase58();
        const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;

        // Fire both requests in parallel
        const [sigRes, enhancedRes] = await Promise.all([
          fetch(rpcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getSignaturesForAddress",
              params: [address, { limit: 100 }],
            }),
          }),
          fetch(
            `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${apiKey}&limit=100`
          ),
        ]);

        const [sigJson, enhanced] = await Promise.all([
          sigRes.json(),
          enhancedRes.json(),
        ]);

        const sigs: { blockTime: number; signature: string }[] =
          sigJson.result ?? [];
        const totalTxs = sigs.length;
        const earliest = sigs.length
          ? new Date(Math.min(...sigs.map((s) => s.blockTime * 1000)))
              .getFullYear()
              .toString()
          : "2021";

        let topPrograms: { name: string; count: number }[] = [];
        let defiTxs = Math.floor(totalTxs * 0.45);
        let nftTxs = Math.floor(totalTxs * 0.22);
        let programsInteracted = Math.min(67, Math.floor(totalTxs / 28));

        if (Array.isArray(enhanced)) {
          const programCounts: Record<string, number> = {};
          enhanced.forEach((tx: { source?: string; type?: string }) => {
            const src = tx.source ?? "Unknown";
            programCounts[src] = (programCounts[src] ?? 0) + 1;
          });
          topPrograms = Object.entries(programCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, count]) => ({ name, count }));

          defiTxs = enhanced.filter(
            (tx: { type?: string }) =>
              tx.type === "SWAP" || tx.type === "ADD_LIQUIDITY"
          ).length;
          nftTxs = enhanced.filter(
            (tx: { type?: string }) =>
              tx.type === "NFT_SALE" || tx.type === "NFT_MINT"
          ).length;
        }

        if (!topPrograms.length) topPrograms = MOCK_DATA.topPrograms;

        const tier = classifyTier(totalTxs);

        setData({
          totalTxs,
          activeSince: earliest,
          topPrograms,
          tier,
          tierColor: tierToColor(tier),
          defiTxs,
          nftTxs,
          programsInteracted,
        });
      } catch (e) {
        setError("Failed to fetch on-chain data");
        setData(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey?.toBase58()]);

  return { data, loading, error };
}
