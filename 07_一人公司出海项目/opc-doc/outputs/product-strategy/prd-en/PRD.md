# Product Requirements Document (PRD) · "PurePen AI" — Dedup & AI-Detection SaaS

> Version: v1.0 (MVP definition) ｜ By: OPC Lead Yimu ｜ Date: 2026-07-17
> Linked decision: D-15 (Direction ② selected) ｜ Research: `product-strategy/market-research-2026-07.md`
> Working name (renameable): PurePen AI / 净文 AI
> Language: English (Chinese version: `../prd-zh/PRD.md`)

---

## 0. One-Line Positioning

**PurePen AI** = upload a document → AI dedup (paraphrase) + AIGC detection rate + sentence-level rewrite suggestions → export a "low-similarity, low-AI-smell" final draft, as a web subscription tool.
Target users: graduates, academic writers, self-media creators, and corporate copywriters needing to pass AI detectors. **Self-hosted SaaS + off-platform conversion, bypassing Xiaohongshu's 180-day virtual-goods gating (D-15)**, landing exactly in the July graduation-season peak demand window.

---

## 1. MVP Scope

### 1.1 Core Function Modules

| Module | Function | In MVP |
|---|---|---|
| M1 Document Intake | Upload docx / pdf / txt; parse into body + paragraph structure | ✅ |
| M2 Dedup Engine | LLM synonym replacement + sentence restructuring + semantic preservation (academic/general style) | ✅ |
| M3 AI Detection | Pre/post AI-generation rate (%) + high-risk paragraph flags | ✅ |
| M4 Rewrite Suggestions | Sentence-level diff (original ↔ rewritten) + one-click adopt/partial apply | ✅ |
| M5 Subscription & Payment | Free quota + membership (Stripe / WeChat·Alipay) | ✅ |
| M6 Report Export | Export Word / PDF (with change tracking) | ⚠️ Post-MVP (P2) |
| M7 History / Versions | Processing history, version comparison | ⚠️ Post-MVP |
| Batch / API / Team / Plugin / i18n | — | ❌ Not in MVP |

### 1.2 User Roles

| Role | Permission | Note |
|---|---|---|
| Free user | Limited monthly quota (e.g. 3 docs/mo, ≤3000 chars each) | Trial → conversion source |
| Paid member | High/unlimited quota, AI-detection mode, priority queue, export | Revenue (from ¥29.9/mo) |
| Founder (Admin) | Model config, risk control, metering, plans | Solo founder = self |

### 1.3 Key User Flow

```
[Sign up / Log in] → [Upload doc] → [Pick mode: dedup / de-AI / both]
   → [AI processing (streaming)] → [View report: AI-rate before/after + paragraph risk]
   → [Adopt rewrite suggestions per sentence] → [Export/copy final]
   → (quota exceeded) → [Subscribe] → [Pay] → [Entitlement active]
```

### 1.4 MVP Boundaries (IN / OUT)

- **IN**: single-document processing, dedup + de-AI, report, basic subscription, web, Chinese.
- **OUT (later iterations)**: batch processing, open API, team collaboration, multi-language, mobile app, browser extension, CNKI/checking-DB integration (needs license), digital-human/video generation.

---

## 2. Tech Stack

> Reuse the "AI Coding Going-Global" project workflow (see §5); prioritize the Next.js + Supabase + Stripe + Vercel paradigm.

| Layer | Choice | Rationale / Reuse |
|---|---|---|
| Frontend | **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui** | Reuse 12_Micro_SaaS scaffold; SSR/SEO aids acquisition |
| Backend | **Next.js Route Handlers (primary) + Python FastAPI microservice (AI inference)** | Full-stack reduces ops; heavy AI isolated to Python worker |
| Database | **PostgreSQL via Supabase** (Auth + Storage + RLS + optional vector) | Solo-founder friendly; Auth/storage/row-level security included |
| AI · Dedup/Rewrite | **LLM API (DeepSeek / Claude / GPT-4o-mini)**, prompt engineering + streaming | Cost-controlled; DeepSeek for topics/draft, Claude for quality |
| AI · Detection | **AIGC detection API (Zhuque/Duxiaoman) + self-built heuristic (perplexity/burstiness) fallback** | MVP uses 3rd-party + self baseline to avoid single dependency |
| Doc Parsing | **markitdown + python-docx + pdfplumber** (reuse markitdown MCP) | Zero new cost; user already has markitdown |
| Export | **python-docx (Word) + reportlab (PDF)** | Reuse academic content-engine experience |
| Payment | **Stripe (global) + WeChat Pay / Alipay (CN)** | Reuse 12_Micro_SaaS payment module |
| Deploy | **Vercel (frontend/Next.js) + Supabase cloud + Railway/Fly.io (Python worker)** | Reuse going-global deploy paradigm; env vars + CI/CD |
| Risk Control | **Reuse compliance_gate pattern**: rate-limit, content audit, abuse block | See §5 |

---

## 3. Validation Metrics (KPIs) & MVP Success Criteria

### 3.1 Core KPIs

| Metric | Definition | MVP Target |
|---|---|---|
| Dedup rate | (pre-similarity − post-similarity) / pre-similarity | similarity < 15% (via check-API/self shingles) |
| AI-pass rate | share of docs with post-AI-rate < threshold (e.g. 20%) | ≥ 70% |
| 7-day retention | return within 7 days of signup | > 30% |
| 30-day retention | return within 30 days | > 15% |
| Free→Paid conversion | paid / registered | > 5% |
| Unit economics | per-user LLM cost vs monthly ARPU | cost < 30% ARPU |
| Throughput | daily active docs processed | > 50 (after 30 days) |

### 3.2 MVP Success Criteria (exit validation)

- Within **30 days of launch**, meet any one:
  - Paying users ≥ 100; **or**
  - MRR ≥ ¥3,000; **or**
  - Organic (Xiaohongshu-referred) daily signups ≥ 20 AND 7-day retention > 30%.
- If unmet → iterate (dedup quality / pricing / acquisition).

---

## 4. Workflow Reuse (AI Coding Going-Global Project)

| Reuse Source | Reuse Content | Landing |
|---|---|---|
| **12_Micro_SaaS (≈26 products)** | SaaS scaffold, Auth, payment (Stripe/WeChat), i18n, Vercel deploy, landing page | M0 infra, M5 payment |
| **markitdown MCP** | Document parsing (docx/pdf/txt → structured text) | M1 parser |
| **gpt_academic / SciTeX / AutoFigure** | Academic text processing, format preservation, section awareness | M2 dedup quality (academic style) |
| **compliance_gate (xiaohongshu_automation)** | Rate-limit, content audit, abuse-block guard pattern | M7 risk control |
| **Xiaohongshu seeding workflow (see §7)** | Data-driven topics + AI content pipeline + matrix accounts + private-domain hooks | GTM acquisition (off-platform SaaS) |

---

## 5. Reference Article Methodology Reuse (toutiao 7662039148701696514)

From "Xiaohongshu E-com 2026 Dividend: 0-follower store + AI bulk content, ¥800k in 3 months", mapped to this SaaS's **acquisition workflow** (SaaS only seeds on Xiaohongshu; conversion goes off-platform, per D-08/D-09):

| Article Method | Reuse in This SaaS |
|---|---|
| **Data-driven selection**: Chanmama filter "growth>50% & notes<5000" for blue-ocean | Use XHS search drop-down + high-freq comments to set **content topics** & **feature priority** (e.g. "de-AI rate", "thesis dedup" are high-demand) |
| **AI content pipeline**: DeepSeek topics → template framework → human real experience (AI 70% / human 30%) → Canva AI image → Jimeng AI video → CapCut | Reuse as SaaS's XHS seeding production flow; **must keep real human participation** (remove AI-smell + satisfy 04-27 governance, avoid AI-managed-account ban) |
| **Posting cadence**: daily 5–8 posts (3 image+2 video), 7–9pm, first-30-min comment interaction | SaaS official account cadence; first two weeks low is normal, week 3 may spike |
| **Matrix scaling**: replicate 3–4 accounts, AI-regenerate to avoid dup | Multi-account seeding matrix (grad / self-media / workplace segments), AI rewrite dedup |
| **3 monetization paths**: in-platform commission / private-domain hook ("comment 1 for guide") / brand deals (≥1000 followers) | SaaS uses: seed only on-platform (no link) → private-domain/landing carries signup → off-platform SaaS conversion |
| **A/B testing**: 3 versions of hero/copy, 3-day run, keep best | Seeding cover/copy A/B to lift click→signup |
| ⚠️ **Digital-human 24h live (article claims +¥50k/mo)** | **DO NOT adopt**: 04-27 governance lists "AI-managed operation with no real human" as violating operation (ban-level), conflicts with D-08. Acquisition must be human-led + AI-assisted |

---

## 6. Compliance & Risk (cross-cutting)

1. **Platform compliance (XHS acquisition)**: seeding notes must label "AI-generated" (04-27); no external links/QR (D-09); keep real human participation (D-08).
2. **Product compliance (SaaS itself)**: dedup must preserve originality, oppose academic misconduct (D-11); no ghostwriting, only production engine (user self-use).
3. **Risk control**: rate-limit anti-abuse, content audit anti-infringement (reuse compliance_gate pattern).
4. **Data compliance**: no over-retention of user docs, optional auto-delete; explicit privacy policy.

---

## 7. Development Task Breakdown (see `DEV-TASKS.md`)

Split by module with priority (P0/P1/P2) and dependencies; M0→M1→M2→(M3∥M4)→M5, M6/M7 later. Fully auto-executed per user instruction 2026-07-17, no per-step confirmation.

---

> This is the English master; Chinese version `../prd-zh/PRD.md` mirrors it section by section to avoid confusion.
