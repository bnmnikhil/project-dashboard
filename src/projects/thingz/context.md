## What Thingz is

An **inventory tracker for makerspaces**. Physical tools get a BLE beacon; the app shows where each tool is and who has it checked out, live on a floor map.

## Current Context

We are **waiting on hardware**. The software path is ready to consume gateway data but we only have one gateway mounted — not enough to triangulate zones.

## Architecture Notes

- Gateways publish RSSI samples over MQTT.
- Server buffers raw samples; **zone inference happens server-side** so we can re-tune without reflashing.
- Floor map is an inline SVG; each region carries a `data-zone` id.

## Blockers

No code blockers. Purely waiting on the 2nd gateway batch.

## Open Questions

- How many gateways per 1000 sq ft for stable zone detection?
- Do we surface "last seen" when a tag drops off, or hide it?

## Roadmap

| Phase | Scope | State |
|-------|-------|-------|
| v1 | Presence + checkout | in progress |
| v1.1 | Low-battery alerts | planned |

## Current Sprint

- [x] SVG floor map
- [x] RSSI sample buffering
- [ ] Mount gateway batch 2
- [ ] Zone calibration

## Known Issues

- Single-gateway setup can't distinguish adjacent zones (expected).

## Useful Commands

```bash
npm run dev
mosquitto_sub -t 'thingz/rssi/#'
```

> Don't over-fit zone thresholds to one gateway. Wait for the full mesh.
