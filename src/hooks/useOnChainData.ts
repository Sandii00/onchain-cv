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
};

const LS_PREFIX = "oncv_cache_";

export function readCache(address: string): OnChainData | null {
  try {
    const raw = localStorage.getItem(LS_PREFIX + address);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < 60 * 60 * 1000) return data; // 1hr stale-while-revalidate
    return null;
  } catch { return null; }
}

export function writeCache(address: string, data: OnChainData) {
  try {
    localStorage.setItem(LS_PREFIX + address, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

// Global in-flight promise — prevents duplicate fetches across components
const inFlight = new Map<string, Promise<OnChainData>>();

export async function fetchOnChainData(address: string): Promise<OnChainData> {
  // De-duplicate: if already fetching this address, return same promise
  if (inFlight.has(address)) return inFlight.get(address)!;

  const promise = (async () => {
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    if (!apiKey) return MOCK_DATA;

    const res = await fetch(`/api/onchain/${address}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<OnChainData>;
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

    // Don't re-fetch if we already have fresh data for this address
    if (fetchedFor.current === address && data) return;

    // Show localStorage cache instantly (optimistic UI)
    const cached = readCache(address);
    if (cached) {
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

    // No cache — full load
    setLoading(true);
    fetchOnChainData(address).then(fresh => {
      writeCache(address, fresh);
      setData(fresh);
      setLoading(false);
      fetchedFor.current = address;
    }).catch(() => {
      setData(MOCK_DATA);
      setLoading(false);
      setError("Could not load data");
    });
  }, [publicKey?.toBase58()]);

  return { data, loading, stale, error };
}
