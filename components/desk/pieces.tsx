"use client";

import type { Piece } from "@/lib/deskTypes";

/** Files live in `public/images/colored/` → URLs `/images/colored/…` */
const IMG = (file: string) => `/images/colored/${file}`;

export const pieces: Piece[] = [
  {
    id: "engineer",
    src: IMG("engineer.png"),
    tag: "philosophy",
    title: "engineer + artist",
    blurb: "Completed my B.E. in IT from University of Mumbai, CGPA: 9.33",
    x: 10,
    y: 10,
    w: 17,
    rotate: -3,
    z: 2,
    order: 0,
  },
  {
    id: "plant",
    src: IMG("cactus 1.png"),
    tag: "desk garden",
    title: "plants of focus",
    blurb: "ZZ + pothos + money plant + snake plant. they survive my forgetfulness (mostly).",
    x: 47,
    y: 8,
    w: 14,
    rotate: -2,
    z: 3,
    order: 7,
  },
  {
    id: "quote",
    src: IMG("Quote.png"),
    tag: "mantra",
    title: "the mantra",
    blurb:
      "building the future, designing the present, inspiring always. on my screensaver, my notebook, my t-shirts.",
    x: 90,
    y: 9,
    w: 16,
    rotate: 4,
    z: 2,
    order: 5,
  },
  {
    id: "ai",
    src: IMG("ai_chip 2.png"),
    tag: "AI tinkering",
    title: "ai experiments",
    blurb:
      "voice bots, RAG pipelines, tiny models. EOSGlobe with Azure TTS + Mistral was where I fell in love.",
    x: 9,
    y: 27,
    w: 11,
    rotate: -2,
    z: 3,
    order: 6,
  },
  {
    id: "artist",
    src: IMG("artist.png"),
    tag: "artist heart",
    title: "artist by heart",
    blurb: "designing culture. wearing stories. typography as the protagonist. all that good stuff.",
    x: 81,
    y: 26,
    w: 16,
    rotate: 3,
    z: 2,
    order: 1,
  },
  {
    id: "laptop",
    src: IMG("laptop 2.png"),
    tag: "GSoC '25",
    title: "Fate Protocol",
    blurb:
      "decentralized perpetual prediction market. dual-vault architecture, multi-oracle support, lots of solidity.",
    links: [{ href: "https://github.com/blizet", label: "GitHub · blizet" }],
    x: 13,
    y: 47,
    w: 21,
    rotate: -1,
    z: 3,
    order: 9,
  },
  {
    id: "avatar",
    src: IMG("profile_clr.png"),
    tag: "that's me",
    title: "hi, I'm Anjali",
    blurb:
      "I like building things because it feels like solving puzzles that actually matter. Taking messy ideas and turning them into something real and usable is what keeps me here.",
    links: [{ href: "https://linkedin.com/in/anjali-jha-49734924a", label: "LinkedIn · anjali-jha" }],
    x: 47,
    y: 41,
    w: 25,
    rotate: 0,
    z: 6,
    order: 17,
  },
  {
    id: "mithila-sticky",
    src: IMG("paper_chiesel 1.png"),
    tag: "life is an art",
    title: "do i paint",
    blurb:
      "Painting is way of living for me — I'm still forging a style that's mine. Tradition meets modern moods; more inspo lives on Pinterest.",
    links: [{ href: "https://in.pinterest.com/anjalijha2k3/mithila-inspo/", label: "Pinterest · Mithila inspo" }],
    x: 76,
    y: 46,
    w: 15,
    rotate: 3,
    z: 4,
    order: 3,
  },
  {
    id: "fate-sticky",
    src: IMG("fate_protocol.png"),
    tag: "why blockchain",
    title: "trustless tomorrow",
    blurb:
      "blockchain is just transparency by design. building trustless solutions for a better tomorrow — that's the why.",
    x: 14,
    y: 67,
    w: 16,
    rotate: -3,
    z: 2,
    order: 2,
  },
  {
    id: "blockchain",
    src: IMG("blockchain_ai.png"),
    tag: "north star",
    title: "blockchain · ai · innovation · impact",
    blurb: "the four pillars that decide what I'll spend my week on. anything else is noise.",
    x: 30,
    y: 73,
    w: 13,
    rotate: -2,
    z: 3,
    order: 4,
  },
  {
    id: "notebook",
    src: IMG("to_do_list 2.png"),
    tag: "today's plan",
    title: "today's plan",
    blurb:
      "Always working on myself — the landscape shifts fast with AI in the picture, so showing up sharper every week is part of the plan.",
    x: 45,
    y: 70,
    w: 15,
    rotate: -1,
    z: 5,
    order: 15,
  },
  {
    id: "mithila-portrait",
    src: IMG("mithila_t-shirt 2.png"),
    tag: "from home",
    title: "madhubani roots",
    blurb:
      "Growing up around Madhubani / Mithila art shows up in patterns, palettes, and how I compose UI. Rooted in tradition, redrawn for today.",
    links: [{ href: "https://in.pinterest.com/anjalijha2k3/mithila-inspo/", label: "Pinterest · Mithila inspo" }],
    x: 86,
    y: 66,
    w: 19,
    rotate: 3,
    z: 3,
    order: 8,
  },
  {
    id: "books",
    src: IMG("books 2.png"),
    tag: "dsa stack",
    title: "books & practice",
    blurb:
      "Still-stacks of fundamentals — DSA, systems, curiosity reads. Problems and patterns live on my LeetCode profile too.",
    links: [{ href: "https://leetcode.com/u/anjalijha2k3/", label: "LeetCode · anjalijha2k3" }],
    x: 9,
    y: 86,
    w: 13,
    rotate: 1,
    z: 3,
    order: 11,
  },
  {
    id: "coffee",
    src: IMG("coffee_mug 2.png"),
    tag: "coffee > code",
    title: "caffeine, honestly",
    blurb:
      "Very much needed when you're shipping as a developer — but I'm still gently at war with the bitterness.",
    x: 23,
    y: 90,
    w: 10,
    rotate: -4,
    z: 4,
    order: 12,
  },
  {
    id: "tagline",
    src: null,
    custom: (
      <div
        className="max-md:origin-center max-md:scale-[2]"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        <span
          className="font-marker text-amber-950"
          style={{ fontSize: "clamp(13.2px, 2.28vw, 25.2px)" }}
        >
          tech · art · purpose
        </span>
        <span
          className="font-sans text-amber-900/85"
          style={{
            fontSize: "clamp(7.2px, 1.14vw, 12px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 2.4,
          }}
        >
          that&apos;s my superpower
        </span>
      </div>
    ),
    tag: "superpower",
    title: "tech · art · purpose",
    blurb: "when those three line up, I'm unstoppable. that's the cocktail I keep mixing.",
    x: 52,
    y: 88,
    w: 18,
    rotate: 0,
    z: 4,
    order: 16,
  },
  {
    id: "tablet",
    src: IMG("tablet 1.png"),
    tag: "figma life",
    title: "sketch → frame",
    blurb: "Rough layouts and motifs graduate into real frames here — before they become components or Solidity.",
    links: [{ href: "https://www.figma.com/@blizet", label: "Figma · @blizet" }],
    x: 70,
    y: 80,
    w: 12,
    rotate: -2,
    z: 3,
    order: 13,
  },
  {
    id: "journal",
    src: IMG("Journal.png"),
    tag: "ideas · plans · impact",
    title: "the journal",
    blurb:
      "Long threads, messy mind-maps, and build logs — deeper writing lives on Medium when it outgrows a page.",
    links: [{ href: "https://medium.com/@anjalijha2k3", label: "Medium · @anjalijha2k3" }],
    x: 88,
    y: 87,
    w: 16,
    rotate: 4,
    z: 3,
    order: 14,
  },
];
