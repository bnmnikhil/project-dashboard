## What the Trading Platform is

A **paper-trading sandbox** for learning options. No real money — real-ish quotes, a visual strategy builder, and live P&L simulation.

## Current Context — BLOCKED

Our market-data vendor **killed the free WebSocket tier** partway through the live-quotes integration. The builder still works against cached/stubbed data, but nothing is live.

## Architecture Notes

- All quotes flow through a single `QuoteAdapter` interface — provider swap is isolated.
- **P&L simulation is 100% client-side.** Adjusting a leg re-runs instantly, no network.
- Greeks come from a local **Black-Scholes** util, not the vendor.

```ts
interface QuoteAdapter {
  subscribe(symbols: string[], cb: (q: Quote) => void): () => void;
  chain(symbol: string): Promise<OptionChain>;
}
```

## Blockers

1. Free WebSocket plan sunset — live quotes offline.
2. Options-chain endpoint now paid — greeks stubbed.

## Open Questions

- Polygon vs Alpaca: which has saner options-chain latency on the paid tier?
- Do we cache last-known chains so the builder degrades gracefully offline?

## Roadmap

| Phase | Scope | State |
|-------|-------|-------|
| v1 | Quotes + builder + P&L | blocked |
| v1.1 | Save/share strategies | planned |
| v2 | Multi-leg backtesting | planned |

## Current Sprint

- [x] QuoteAdapter interface
- [x] Client-side P&L
- [ ] New market-data provider
- [ ] Re-enable live subscriptions

## Known Issues

- Greeks are approximate while the chain endpoint is stubbed.
- Reconnect logic assumes the old vendor's heartbeat format.

## Useful Commands

```bash
npm run dev
npm run sim -- --strategy iron-condor
```

> The interface is the moat. Any new provider should be < 200 lines behind QuoteAdapter.
