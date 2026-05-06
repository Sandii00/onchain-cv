# OnChain CV — Next Sprint

## Features to build
1. [ ] Real Solana RPC hook (Helius) — live tx count, first tx date, program interactions
2. [ ] /[handle] public profile route — shareable CV page
3. [ ] CV card flip animation — front (identity) / back (stats breakdown)
4. [ ] Leaderboard page — top wallets ranked by activity
5. [ ] Dark mode toggle + micro-interactions polish

## Order of execution
1. RPC hook (useOnChainData) — everything depends on real data
2. Card flip — enhances existing CVCard
3. /[handle] route — needs card + data
4. Leaderboard page — new route
5. Dark mode + polish — final pass

## Files to create/modify
- src/hooks/useOnChainData.ts (new)
- src/hooks/useDarkMode.ts (new)
- src/components/CVCard.tsx (modify — add flip)
- src/components/Leaderboard.tsx (new)
- src/components/DarkModeToggle.tsx (new)
- src/app/[handle]/page.tsx (new)
- src/app/leaderboard/page.tsx (new)
- src/app/globals.css (modify — dark mode vars)
- src/context/ThemeProvider.tsx (new)
