# Development Task Breakdown · "PurePen AI" Dedup/De-AI SaaS (MVP)

> Version: v1.0 ｜ By: OPC Lead Yimu ｜ Date: 2026-07-17
> Companion PRD: `../PRD.md` ｜ Chinese: `../prd-zh/DEV-TASKS.md`
> Execution: fully automatic (user instruction 2026-07-17, no confirmation needed)

## Priority Legend
- **P0** = MVP must-have, blocks launch
- **P1** = MVP core experience, complete before launch
- **P2** = post-MVP enhancement

## Dependency Overview
```
M0(infra) ──► M1(intake/parse) ──► M2(dedup) ──┬─► M3(AI detect) ──┐
                                                      └─► M4(rewrite) ┘──► M5(subscription)
M0 ──► M0.4(metering) ──► M5.3(quota sync)       M2/M4 ──► M6(export)
All modules ──► M7(ops/compliance/risk)           GTM pipeline runs parallel
```

---

## M0 Infrastructure (P0)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M0.1 | Scaffold: Next.js 14 + TS + Tailwind + shadcn/ui | P0 | none | 12_Micro_SaaS scaffold |
| M0.2 | Supabase project: Auth + Postgres + Storage + RLS | P0 | none | going-global paradigm |
| M0.3 | CI/CD + Vercel deploy + env/secrets management | P0 | M0.1 | Vercel paradigm |
| M0.4 | Usage metering middleware (per-user quota counter) | P1 | M0.2 | — |

## M1 Document Intake & Parsing (P0)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M1.1 | Upload UI (drag/select docx·pdf·txt) + format validation | P0 | M0.1 | shadcn/ui |
| M1.2 | Parse service: markitdown + python-docx + pdfplumber → structured text | P0 | M0.2 | **markitdown MCP** |
| M1.3 | Text chunking + paragraph mapping (for diff/flag) | P0 | M1.2 | — |

## M2 Dedup Engine (P0)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M2.1 | LLM integration (DeepSeek/Claude/GPT-4o-mini, streaming) | P0 | M0.2 | — |
| M2.2 | Dedup prompt: synonym + sentence restructure + semantic preserve (academic/general) | P0 | M2.1 | gpt_academic/SciTeX |
| M2.3 | Similarity eval (self shingles/edit-distance or check-API) | P1 | M1.3 | — |
| M2.4 | Streaming render + progress | P1 | M2.1 | — |

## M3 AI Detection Module (P1)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M3.1 | AIGC detection API (Zhuque/Duxiaoman) + self heuristic fallback | P1 | M1.3 | — |
| M3.2 | Paragraph AI-risk flag (high/mid/low) | P1 | M3.1 | — |
| M3.3 | Pre/post AI-rate comparison report | P1 | M3.1, M2 | — |

## M4 Rewrite Suggestions & Editor (P1)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M4.1 | Sentence diff (original ↔ rewritten) | P1 | M2 | — |
| M4.2 | One-click adopt / partial apply | P1 | M4.1 | — |
| M4.3 | Export Word/PDF (with change tracking) | P2 | M4.2 | python-docx / reportlab |

## M5 Subscription & Payment (P1)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M5.1 | Plan definition + entitlement gate (free/member) | P1 | M0.2 | 12_Micro_SaaS |
| M5.2 | Stripe + WeChat/Alipay integration | P1 | M5.1 | **12_Micro_SaaS payment module** |
| M5.3 | Subscription status sync + quota activation | P1 | M5.2, M0.4 | — |

## M6 Report & History (P2)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M6.1 | Processing history / version compare | P2 | M2, M3 | — |
| M6.2 | Report export + share link | P2 | M6.1 | — |

## M7 Ops / Compliance / Risk (P2)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| M7.1 | AI-label user notice (platform compliance tip) | P2 | M3 | — |
| M7.2 | Abuse/infringement risk control (rate-limit + audit) | P2 | M0.4 | **compliance_gate pattern** |
| M7.3 | XHS acquisition workflow (data topics + AI pipeline + matrix + private hook) | P2 | D-08/D-09 | article §5/§7 |

## GTM Acquisition Pipeline (parallel, non-blocking)
| ID | Task | Pri | Dep | Reuse |
|---|---|---|---|---|
| G1 | Data-topic pipeline (search drop-down + high-freq comments → blue-ocean verify) | P1 | none | article selection method |
| G2 | AI content pipeline (DeepSeek topic → framework → real experience → image → video) | P1 | none | article content method |
| G3 | Matrix accounts + private hook + A/B test | P2 | G1,G2 | article scaling method |

---

## Milestones (align with roadmap M0–M5)
- **M0 engineering closed**: M0.1–M0.3 + P1 tail (P1-04/05/06/01) done, semi-auto publish usable
- **M1 intake ready**: M1.1–M1.3 done, upload & parse works
- **M2 dedup ready**: M2.1–M2.2 done, dedup text produced
- **M3+M4 experience loop**: M3.1–M3.3 + M4.1–M4.2 done
- **M5 monetization loop**: M5.1–M5.3 done, subscription payable
- **GTM launch**: G1–G3 running, XHS seeding → off-platform SaaS

## Execution Notes
- All tasks run under "user instruction 2026-07-17 fully automatic"; lead verifies personally (no blind trust of agent reports, per P0 lesson).
- Maintain D-08 semi-auto: acquisition content keeps real human participation; no unattended/AI-managed publishing.
