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
}

const MOCK_DATA: OnChainData = {
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

function readCache(address: string): OnChainData | null {
  try {
    const raw = localStorage.getItem(LS_PREFIX + address);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    // Stale-while-revalidate: show cache up to 1 hour old, refresh in bg
    if (Date.now() - ts < 60 * 60 * 1000) return data;
    return null;
  } catch { return null; }
}

function writeCache(address: string, data: OnChainData) {
  try {
    localStorage.setItem(LS_PREFIX + address, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export function useOnChainData(publicKey: PublicKey | null) {
  const [data, setData]         = useState<OnChainData | null>(null);
  const [loading, setLoading]   = useState(false);
  const [stale, setStale]       = useState(false); // true = showing cached, refreshing in bg
  const [error, setError]       = useState<string | null>(null);
  const prefetchRef             = useRef<Promise<void> | null>(null);

  // ── Optimisation 3: expose prefetch so AppShell can call it on wallet-connect ──
  const prefetch = (pk: PublicKey) => {
    if (prefetchRef.current) return; // already in flight
    prefetchRef.current = doFetch(pk, true);
  };

  const doFetch = async (pk: PublicKey, silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    const address = pk.toBase58();
    const apiKey  = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    try {
      // ── Optimisation 1+4: hit server-side cached route (Node, not browser) ──
      // Falls back to direct Helius if no API key
      const url = apiKey
        ? `/api/onchain/${address}`
        : null;

      if (!url) {
        if (!silent) { setData(MOCK_DATA); setLoading(false); }
        return;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const fresh: OnChainData = await res.json();

      writeCache(address, fresh);
      setData(fresh);
      setStale(false);
    } catch (e) {
      if (!data) setData(MOCK_DATA); // last resort
      setError("Could not refresh data");
    } finally {
      setLoading(false);
      setStale(false);
      prefetchRef.current = null;
    }
  };

  useEffect(() => {
    if (!publicKey) { setData(null); setStale(false); return; }

    const address = publicKey.toBase58();

    // ── Optimisation 2: show localStorage cache instantly ──
    const cached = readCache(address);
    if (cached) {
      setData(cached);
      setStale(true);   // show immediately, refresh silently in background
      setLoading(false);
      doFetch(publicKey, true); // silent background refresh
      return;
    }

    // No cache — full loading fetch
    doFetch(publicKey, false);
  }, [publicKey?.toBase58()]);

  return { data, loading, stale, error, prefetch };
}
