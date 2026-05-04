"use client";

import Decor from "./decor";
import DeskScene from "./deskScene";

type DeskProps = {
  /** Pass `"hero"` for full-viewport landing — no section title. */
  anchorId?: string;
};

export default function Desk({ anchorId = "desk" }: DeskProps) {
  const isHero = anchorId === "hero";

  return (
    <section
      id={anchorId}
      data-hero={isHero ? "" : undefined}
      className={`relative scroll-mt-20 overflow-hidden ${
        isHero ? "w-full" : "py-24 px-6"
      }`}
      style={isHero ? { height: "calc(100dvh - 3.5rem)" } : undefined}
    >
      {!isHero && (
        <>
          <div className="absolute top-6 left-0 hidden lg:block" style={{ zIndex: 0 }}>
            <Decor src="/images/colored/cactus 1.png" w={100} tilt={4} opacity={0.7} />
          </div>
          <div className="absolute top-6 right-0 hidden lg:block" style={{ zIndex: 0 }}>
            <Decor src="/images/colored/mithila_prints.png" w={120} tilt={-5} opacity={0.65} />
          </div>
        </>
      )}

      <div className={`relative z-10 ${isHero ? "h-full" : "max-w-6xl mx-auto"}`}>
        {!isHero && (
          <>
            <h2 className="section-title mb-4">my desk</h2>
            <p className="prose-body text-lg sm:text-xl text-ink-soft mb-10 max-w-2xl">
              a pinboard of identity — drag, hover, peek into the chapters.
            </p>
          </>
        )}
        <DeskScene hero={isHero} />
      </div>
    </section>
  );
}
