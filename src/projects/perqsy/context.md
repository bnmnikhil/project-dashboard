## What Perqsy is

A **B2B perks marketplace**. HR admins build a catalog of rewards; employees earn and spend points.

### The current push

We're closing out the **redemption checkout**. Everything up to "Confirm redemption" works — the last mile is money movement.

## Architecture Notes

- Frontend: React + Vite + TypeScript, TanStack Query for server state.
- Points are an **append-only ledger**. Balance = `SUM(entries)`. Never mutate.
- Payments via **Stripe PaymentIntents** (SCA-ready).

```ts
type LedgerEntry = {
  id: string;
  employeeId: string;
  delta: number;   // + earn, - redeem
  reason: 'earn' | 'redeem' | 'adjust';
  createdAt: string;
};
```

## Open Questions

- Do we refund points automatically on a failed capture, or hold in "pending"?
- Multi-currency catalogs in v2 — worth designing the ledger for it now?

## Roadmap

| Phase | Scope | State |
|-------|-------|-------|
| v1 | Catalog + redeem + checkout | in progress |
| v1.1 | Admin analytics | queued |
| v2 | Multi-currency, budgets | planned |

## Current Sprint

- [x] Redemption store scaffolding
- [x] Catalog pagination
- [ ] PaymentIntent confirmation
- [ ] Idempotency + retries

## Known Issues

- Catalog images occasionally flash on refetch (needs `placeholderData`).
- Point balance can look stale for ~1s after redeem (optimistic update pending).

## Useful Commands

```bash
npm run dev
npm run test:redemption
stripe listen --forward-to localhost:5173/webhook
```

> Ledger is the source of truth. If a number looks wrong, replay the ledger before touching balances.
