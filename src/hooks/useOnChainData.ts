"use client";

import { useEffect, useRef, useState } from "react";
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
  solBalance?: number;
  isInstant?: boolean; // true = shown instantly from wallet, helius loading in bg
}

export const MOCK_DATA: OnChainData = {
  totalTxs: 1847,
  activeSince: "2021",
  topPrograms: [
    { name: "Jupiter",    count: 312 },
    { name: "Magic Eden", count: 187 },
    { name: "Raydium",    count: 144 },
    { name: "Tensor",     count: 98  },
  ],
  tier: "Top 1%",
  tierColor: "#F59E0B",
  defiTxs: 823,
  nftTxs: 412,
  programsInteracted: 67,
  solBalance: 0,
};

const LS_PREFIX = "oncv_cache_";

export function readCache(address: string): OnChainData | null {
  try {
    const raw = localStorage.getItem(LS_PREFIX + address);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < 60 * 60 * 1000) return data;
    return null;
  } catch { return null; }
}

export function writeCache(address: string, data: OnChainData) {
  try {
    localStorage.setItem(LS_PREFIX + address, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

// Get SOL balance directly from the injected wallet — instant, no API call
function getWalletSOLBalance(): number | null {
  try {
    const w = window as any;
    const provider = w.solana || w.phantom?.solana || w.backpack?.solana;
    if (provider?.account?.lamports) return provider.account.lamports / 1e9;
    // Some wallets expose it differently
    if (provider?.wallet?.account?.lamports) return provider.wallet.account.lamports / 1e9;
    return null;
  } catch { return null; }
}

// Build instant placeholder data from just the public key + optional sol balance
// Shows immediately while Helius loads in background
function buildInstantData(solBalance: number | null): OnChainData {
  return {
    totalTxs: 0,
    activeSince: new Date().getFullYear().toString(),
    topPrograms: [],
    tier: "Active",
    tierColor: "#6B7280",
    defiTxs: 0,
    nftTxs: 0,
    programsInteracted: 0,
    solBalance: solBalance ?? 0,
    isInstant: true,
  };
}

// Global dedup — same address = same promise
const inFlight = new Map<string, Promise<OnChainData>>();

export async function fetchOnChainData(address: string): Promise<OnChainData> {
  if (inFlight.has(address)) return inFlight.get(address)!;

  const promise = (async () => {
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    if (!apiKey) return buildInstantData(null);

    const res = await fetch(`/api/onchain/${address}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json() as OnChainData;
    return { ...data, isInstant: false };
  })().finally(() => inFlight.delete(address));

  inFlight.set(address, promise);
  return promise;
}

export function useOnChainData(publicKey: PublicKey | null) {
  const [data, setData]       = useState<OnChainData | null>(null);
  const [loading, setLoading] = useState(false);
  const [stale, setStale]     = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const fetchedFor            = useRef<string | null>(null);

  useEffect(() => {
    if (!publicKey) { setData(null); setStale(false); return; }

    const address = publicKey.toBase58();
    if (fetchedFor.current === address && data && !data.isInstant) return;

    // 1. Check localStorage cache — show instantly
    const cached = readCache(address);
    if (cached && !cached.isInstant) {
      setData(cached);
      setStale(true);
      setLoading(false);
      // Silent background refresh
      fetchOnChainData(address).then(fresh => {
        writeCache(address, fresh);
        setData(fresh);
        setStale(false);
        fetchedFor.current = address;
      }).catch(() => setStale(false));
      return;
    }

    // 2. No cache — show instant wallet data immediately, fetch Helius in bg
    const instantSol = getWalletSOLBalance();
    setData(buildInstantData(instantSol));
    setLoading(false); // Don't block on loading screen
    setStale(true);

    // Fetch real data in background
    fetchOnChainData(address).then(fresh => {
      writeCache(address, fresh);
      setData(fresh);
      setStale(false);
      fetchedFor.current = address;
    }).catch(() => {
      // Don't show fake mock data — keep showing instant zeros
      setStale(false);
      setError("Could not load metrics");
    });

  }, [publicKey?.toBase58()]);

  return { data, loading, stale, error };
}
