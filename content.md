# Anjali Jha — portfolio site content export

Structured copy, metadata, and user-facing text used on the site. Sources: `app/layout.tsx`, `app/data.ts`, pages and components under `app/`.

---

## Global metadata & SEO

| Field | Value |
|--------|--------|
| **Default title** | Anjali Jha · Software Developer |
| **Title template** | %s · Anjali Jha |
| **Description** | where code meets craft. Building systems, designing experiences, and shaping ideas into something real. |
| **OG / Twitter title** | Anjali Jha · Software Developer |
| **OG site name** | Anjali Jha |
| **OG image alt** | Anjali Jha — portrait |
| **Theme color** | #f5ecd9 |
| **Category** | technology |
| **Keywords (metadata)** | Anjali Jha, frontend engineer, Web3 engineer, React, TypeScript, Google Summer of Code, GSoC, AOSSIE, Fate Protocol, prediction market, portfolio |
| **Robots** | index, follow |
| **Canonical (home)** | / |
| **HTML lang** | en |

**Note:** `app/data.ts` also defines `site.title` as “Anjali Jha | Software Engineer” and a different `site.description` (Python/React/GSoC line). That is app data and may differ from `layout` metadata.

---

## `/projects` page metadata

- **Title:** Projects
- **Description:** Case files and shipped work — prediction markets, platforms, OSS, and product engineering.
- **Open Graph title:** Projects · Anjali Jha
- **Open Graph description:** Full archive of case files — scroll the stacked deck and read the briefs.
- **Canonical:** /projects

---

## Contact & links (authoritative in `data`)

- **Email:** anjalijha2k3@gmail.com
- **LinkedIn:** https://linkedin.com/in/anjali-jha-49734924a
- **GitHub:** https://github.com/blizet
- **Timezone label (data):** Mumbai / IST (nav clock)

**Footer links (`data.footer`):** LINKEDIN, GITHUB, EMAIL (same URLs as above)

**Copyright string (`data.footer`):** ANJALI JHA - ALL RIGHTS RESERVED

**Contact section UI (`contact.tsx`):** Heading “like the vibe? say hi.” — buttons: email, resume · pdf, github, linkedin — tagline “tech · art · purpose” — “© {year} anjali jha”

**Resume file:** `/Anjali_Jha_Resume.pdf`

---

## Navigation

**Primary nav (desktop):** Brand “anjali jha”, stickers: home, about, work, “↓ resume”

**Mobile drawer:** “menu”, “same stickers — tap a chapter ↓”, “close”

**Aria:** Anjali Jha — home; Open/Close menu; Site navigation

**Section scroll ids (`navbar.tsx`):** hero → home, about → hero anchor, contact → contact

**`data.navigation.sectionLinks`:** HOME, ABOUT, WORK, CONTACT

**`data.navigation.trackedSections`:** HOME, ABOUT, SELECTED WORK, EXPERIENCE, CAPABILITIES, RECOGNITION, CREATIVE PURSUITS, FREQUENTLY ASKED, GET IN TOUCH (with parent groupings)

---

## Loader (`loader.tsx`)

- Title: **anjali** / **jha**
- Tagline: **bring the systems to life**
- Caption: **painting your screen… almost there ✦**
- Progress label: **loading pigments**
- Aria: Loading portfolio

`data.loader` also contains monogram, session label, palette label, etc.; the live component uses the strings above.

---

## Grayscale / color reveal (`colorVeil.tsx`)

- FAB label: **paint the page** (palette emoji, arrow →)
- Aria: Paint the page — reveal all colours

---

## Home page section dividers (`page.tsx`)

- **MEANWHILE, in the case files...**
- **tools & craft ↓**

---

## Hero / desk (`desk.tsx`)

- Standalone section title: **my desk**
- Intro: **a pinboard of identity — drag, hover, peek into the chapters.**

### Desk collage (`deskScene.tsx`)

| id | tag | title | blurb |
|----|-----|--------|--------|
| engineer | philosophy | engineer + artist | Completed B.E. in IT from University of Mumbai, CGPA: 9.33 |
| plant | desk garden | plants of focus | ZZ + pothos + money plant + snake plant. they survive my forgetfulness (mostly). |
| quote | mantra | the mantra | building the future, designing the present, inspiring always. on my screensaver, my notebook, my t-shirts. |
| ai | AI tinkering | ai experiments | voice bots, RAG pipelines, tiny models. EOSGlobe with Azure TTS + Mistral was where I fell in love. |
| artist | artist heart | artist by heart | designing culture. wearing stories. typography as the protagonist. all that good stuff. |
| laptop | GSoC '25 | Fate Protocol | decentralized perpetual prediction market. dual-vault architecture, multi-oracle support, lots of solidity. Link: GitHub · blizet |
| avatar | that's me | hi, I'm Anjali | I like building things because it feels like solving puzzles that actually matter… Link: LinkedIn · anjali-jha |
| mithila-sticky | life is an art | do i paint | Painting is way of living… Tradition meets modern moods… Link: Pinterest · Mithila inspo |
| fate-sticky | why blockchain | trustless tomorrow | blockchain is just transparency by design… |
| blockchain | north star | blockchain · ai · innovation · impact | the four pillars that decide what I'll spend my week on. anything else is noise. |
| notebook | today's plan | today's plan | Always working on myself — the landscape shifts fast with AI… |
| mithila-portrait | from home | madhubani roots | Growing up around Madhubani / Mithila art… Link: Pinterest · Mithila inspo |
| books | dsa stack | books & practice | Still-stacks of fundamentals — DSA, systems… Link: LeetCode · anjalijha2k3 |
| coffee | coffee > code | caffeine, honestly | Very much needed when you're shipping… gently at war with the bitterness. |
| tagline | superpower | tech · art · purpose | On tile: “tech · art · purpose” / “THAT'S MY SUPERPOWER”. Blurb: when those three line up… |
| tablet | figma life | sketch → frame | Rough layouts… Link: Figma · @blizet |
| journal | ideas · plans · impact | the journal | Long threads… Link: Medium · @anjalijha2k3 |

---

## Hero headline (`data.hero`)

- **headline:** Anjali Jha
- **subtitle:** Software Developer | Full Stack Developer
- **intro:** I craft digital experiences that blend functionality with innovation, turning complex systems into elegant solutions.
- **techStack:** React, Next.js, TypeScript, FastAPI, Python, GCP (icons R, N, TS, F, Py, G)

---

## About (`data.about`)

- **kicker:** / HI, I'M ANJALI
- **headline:** Software developer building web3, full-stack and AI productst.
- **paragraphs:** (two paragraphs on product engineering, GSoC, Kridinify, Extraction Esports)
- **quickFacts:** BASED IN — Mumbai; FOCUS — Web3 / Full-Stack / AI; STATUS — Open to roles + collabs; EDUCATION — Computer Engineering
- **stats:** 7+ Projects shipped; GSoC '25 AOSSIE contributor; 5+ Roles & internships; Mentor AOSSIE OSS
- **highlights:** GSoC 2025 @ AOSSIE; SDE @ Kridinify; Apprenticeship @ Stability Nexus; R&D @ CDAC; AI voice bot @ EOSGlobe; Mentor @ AOSSIE

---

## Experience — growth curve (`experience.tsx`)

- **title:** my growth curve
- **subtitle:** hover the dots or the index chips to explore each chapter ✦
- **empty:** hover a dot to see details
- **axes:** Growth (Y), Timeline (X)
- **index:** — index —
- **goal labels:** Goal, Growth

**Milestones:** Start (2021); Hackathons (2023); Eosglobe (2024); C-DAC (2024); Open Source (2024); Apprenticeship (2024); GSoC (2025); Kridinify team (2025); Growth (→). Each has taglines and a short `desc` — see component source for full sticky-note text.

**Job history:** Full entries (titles, companies, bullets, dates, locations) are in `data.experience` — six positions from Mentor @ AOSSIE through EOSGlobe.

---

## Projects — home (`projects.tsx`)

- **title:** selected work
- **callout:** 3 case files!
- **intro:** shipped products with metrics — scroll and each case file stacks over the last like a deck on the desk.
- **AOSSIE strip:** “+ mentor” / “GSoC '26 · AOSSIE”; heading “gsoc '26 mentor + maintainer @ aossie”; body about PR reviews and pairing; link “visit aossie →”
- **CTA:** view all 6 projects →

---

## Projects — full page (`projectsFull.tsx`)

- **title:** all case files
- **callout:** full deck!
- **intro:** The same stacked desk treatment as the home page — scroll so each case pins and the next stacks on top.
- Same AOSSIE mentor strip as home (heading level differs: h2 vs h4).

---

## Project case labels (`projectCase.tsx`)

- **CASE FILE · nn / dd**
- **✎ the brief** / **★ the outcome**
- **highlights**
- Stack hints: **scroll — next stacks over ↑** / **end of deck ✦**

**Display order (`PROJECT_ORDER`):** fate-protocol, prosper-dev, clowder, kridinify, extraction-esports, rnt

### Project pitches (`PROJECT_PITCH`)

| Slug | Headline | Problem | Outcome |
|------|-----------|---------|---------|
| fate-protocol | a market that never closes. | prediction markets lock liquidity to fixed windows. | shipped a perpetual market with dual vaults + 8 oracles, live on EVM. |
| prosper-dev | real-estate ops, finally one workspace. | approvals, docs and buyers were lost across spreadsheets and email. | one Firestore-backed source of truth · ~60% faster approvals. |
| clowder | contribution, made verifiable. | effort in OSS / DAOs is invisible without trusted accounting. | CAT tokens mint proof-of-work on-chain · auditable + portable. |
| kridinify | platform engine for multi-site operators. | non-technical operators need to run scrapes, audits, dashboards solo. | 15+ FastAPI services + React dashboards + scheduled pipelines. |
| extraction-esports | editorial-grade esports brand site. | esports sites usually feel like banner farms. | Figma → Next.js editorial system · narrative, fast, scalable. |
| rnt | one decision, one screen. | Complete website revamp for an esports brand. | collapsed to a single clear screen · smart defaults, kept context. |

**Full project records** (titles, categories, descriptions, tech, roles, timelines, clients, story sections, highlights, links, galleries): see `data.projects`. Includes a seventh project **AOSSIE** (not in `PROJECT_ORDER` stack).

---

## Recognition (`achievements.tsx` + `data.awards`)

- **section title:** recognition
- **sticker:** ACHIEVED!
- **sub:** collected stamps so far
- **WIP panel:** 2026 · WIP — **next →** — **what i'm chasing in 2026**
  - Ship Fate Protocol v2 — Chainlink-compatible oracle layer for pricing, aggregation, real-time market signals.
  - Mentor 3+ first-time GSoC and open-source contributors to ship real PRs.
  - Grow the product to 1000+ real users interacting with live markets.

**Enrichment overrides** (`ENRICH` in `achievements.tsx`): extended copy for Google Summer of Code, ETC Nova Hackathon, Research Publication, MSME Idea Hackathon 3.0, Hackoverflow · 2nd Place.

**Base awards in `data.awards`:** titles, orgs, categories, descriptions — see `data.ts`.

---

## Capabilities (`capabilities.tsx`)

- **title:** capabilities
- **sticker:** depth, not bars.
- **intro:** grouped by what i've actually shipped — not skill bars.
- **footer:** minimal stack · heavy lifting · honest depth.

**Tier 1 — shipped in production:** caption “used to deliver real users / revenue / on-chain TX”; chips: react, next.js 15, typescript, tailwind, fastapi, firebase, firestore, postgresql, solidity, viem, wagmi, ethers.js, rainbowkit

**Tier 2 — actively building with:** caption “current daily-driver tools, sharpening this quarter”; gsap, framer motion, redis, docker, github actions, oauth 2.0, cloud functions, prisma

**Tier 3 — exploring · curious:** caption “experimenting with — not yet production-grade”; rust, foundry, zk circuits, three.js, langchain, mistral, azure tts

Detailed percentage-based skill groups live in `data.skills.groups` (reference data).

---

## Creative pursuits (`data.creativePursuits`)

Three entries: Typography (Medium), Design (Contra), Open Source (GitHub) — kickers, titles, italics, bodies, manifestos, tags, hrefs.

---

## Cartoon timeline (`data.cartoon.curveNodes`)

Nodes: exploring (2022), SIH finals (2023), first internship (Aug '24), EOSGlobe, Stability Nexus, C-DAC R&D, Kridinify (Jun '25), GSoC '25, AOSSIE Mentor (Dec '25 →). Each has `caption` text in `data.ts`.

---

## FAQ — structured (`data.faq`)

Topics: Getting Started, Pricing, Timeline, Process, Contact, Consultation.

Six Q&A pairs — full text in `app/data.ts` under `faq.entries`.

---

## Interactive keyboard FAQ (`keyboardFAQ.tsx`)

- **title:** ask me something.
- **chips:** work, gsoc, tech, hire, aossie, fate, design, web3 (rendered as `[ chip ]`)
- **hint:** try: gsoc · fate · web3 · hire
- **placeholder:** type something…
- **note:** one-word answers only. no chat. no AI. ~100 terms covered.
- **defaults:** try a chip or just type. / hmm. try 'gsoc', 'fate', 'web3', 'hire'…

**Full keyword → response map:** `RESPONSES` object in `app/components/keyboardFAQ.tsx` (~100 keys).

---

## Fonts (`layout.tsx`)

- Inter → `--font-sans`
- Caveat → `--font-hand` (500, 700)
- Permanent Marker → `--font-marker` (400)

---

## OG image asset

- Path: `/colored/profile_clr.png` (resolved against `metadataBase` / site URL)

---

## Maintenance

When you change copy in the UI, update this file or regenerate from `app/data.ts` and components if you want the export to stay in sync.
