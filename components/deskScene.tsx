"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties } from "react";
import deskLayoutDefaultsFile from "@/lib/deskLayoutDefaults.json";
import deskLayoutDefaultsMobileFile from "@/lib/deskLayoutDefaultsMobile.json";
import { useLoaderPhase } from "@/lib/useLoaderState";
import { pieces } from "@/components/desk/pieces";
import type { Piece } from "@/lib/deskTypes";

const DESK_W = 740;
const DESK_H = 720;
const DESK_ELEMENT_SCALE = 1.015;

function scaledW(base: number): number {
  return Math.round(base * DESK_ELEMENT_SCALE * 100) / 100;
}

const AVATAR_WIDTH_MULT = 1.8;

function avatarDisplayW(baseScaledLayoutW: number): number {
  return Math.round(baseScaledLayoutW * AVATAR_WIDTH_MULT * 100) / 100;
}

const NON_AVATAR_WIDTH_VISUAL_MULT = 1.2;

function applyNonAvatarWidthMult(wPct: number, pieceId: string): number {
  if (pieceId === "avatar") return wPct;
  return Math.round(wPct * NON_AVATAR_WIDTH_VISUAL_MULT * 100) / 100;
}

const MOBILE_LAYOUT_MQ = "(max-width: 767px)";
const TABLET_LAYOUT_MQ = "(min-width: 768px) and (max-width: 1023px)";

type DeskViewportBucket = "mobile" | "tablet" | "desktop";

const MOBILE_PIECE_WIDTH_MULT = 2;
const MOBILE_PIECE_WIDTH_EXTRA = 1.1;

function applyViewportPieceWidth(
  rawPieceW: number,
  pieceId: string,
  bucket: DeskViewportBucket,
): number {
  if (bucket === "mobile") {
    const mult =
      pieceId === "tagline"
        ? MOBILE_PIECE_WIDTH_MULT
        : MOBILE_PIECE_WIDTH_MULT * MOBILE_PIECE_WIDTH_EXTRA;
    return Math.round(rawPieceW * mult * 100) / 100;
  }
  return applyNonAvatarWidthMult(rawPieceW, pieceId);
}

const HERO_REF_W = 1440;
const HERO_REF_H = 712;

function halfHeightPct(wPct: number, stageW: number, stageH: number): number {
  const pw = (wPct / 100) * stageW;
  const ph = pw * (233 / 244);
  return (ph / 2 / stageH) * 100;
}

function heroHash(id: string, salt: number): number {
  let h = salt | 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return h >>> 0;
}

function heroJitter(id: string, salt: number): { jx: number; jy: number } {
  const h = heroHash(id, salt);
  const jx = ((h & 0x7ff) / 0x7ff) * 2 - 1;
  const jy = (((h >>> 11) & 0x7ff) / 0x7ff) * 2 - 1;
  return { jx, jy };
}

const HERO_SEED: Record<string, { x: number; y: number; w: number }> = {
  engineer: { x: 5, y: 13, w: 9 },
  ai: { x: 18, y: 17, w: 7 },
  plant: { x: 48, y: 11, w: 9 },
  "mithila-sticky": { x: 63, y: 16, w: 9 },
  artist: { x: 88, y: 12, w: 9 },
  laptop: { x: 13, y: 44, w: 13 },
  avatar: { x: 47, y: 47, w: 16 },
  "mithila-portrait": { x: 86, y: 46, w: 10 },
  "fate-sticky": { x: 6, y: 73, w: 9 },
  notebook: { x: 19, y: 79, w: 9 },
  blockchain: { x: 33, y: 75, w: 8 },
  books: { x: 43, y: 79, w: 8 },
  coffee: { x: 53, y: 76, w: 6 },
  tagline: { x: 68, y: 81, w: 12 },
  tablet: { x: 81, y: 74, w: 7 },
  journal: { x: 92, y: 78, w: 9 },
};

function clampNum(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function buildHeroLayout(): Record<string, { x: number; y: number; w: number }> {
  const out: Record<string, { x: number; y: number; w: number }> = {};
  const sA = HERO_SEED.avatar;
  const { jx: jax, jy: jay } = heroJitter("avatar", 7);
  const ax = clampNum(sA.x + jax * 2.8, 40, 54);
  const ay = clampNum(sA.y + jay * 2.4, 42, 52);
  const aw = avatarDisplayW(scaledW(sA.w));
  out.avatar = { x: ax, y: ay, w: aw };

  const qw = scaledW(10);
  const ahy = halfHeightPct(aw, HERO_REF_W, HERO_REF_H);
  const qhy = halfHeightPct(qw, HERO_REF_W, HERO_REF_H);
  const gapY = 1.45;
  const jq = heroJitter("quote", 3);
  let qy = ay - ahy - qhy - gapY + jay * 0.28 + jq.jy * 0.32;
  qy = clampNum(qy, 5.2, Math.min(20, ay - ahy - qhy - 0.55));
  let qx = ax + aw * 0.37 + 3.85 + jq.jx * 1.35;
  qx = clampNum(qx, 74.2, 94);
  out.quote = { x: qx, y: qy, w: qw };

  for (const id of Object.keys(HERO_SEED)) {
    if (id === "avatar") continue;
    const s = HERO_SEED[id];
    const { jx, jy } = heroJitter(id, 11);
    const w = scaledW(s.w);
    const hh = halfHeightPct(w, HERO_REF_W, HERO_REF_H);
    const topStrip = ["engineer", "ai", "plant", "mithila-sticky", "artist"].includes(id);
    let xAmp = topStrip ? 2.85 : s.y <= 52 ? 2.85 : s.y >= 68 ? 1.85 : 2.65;
    const yAmp = topStrip ? 2.65 : s.y >= 68 ? 2.08 : 2.55;
    if (id === "books" || id === "coffee") xAmp = 1.15;
    let x = clampNum(s.x + jx * xAmp, w / 2 + 2.2, 100 - w / 2 - 2.2);
    if (id === "coffee") x = clampNum(x, w / 2 + 2.8, 56);
    const y = clampNum(s.y + jy * yAmp, hh + 2.3, 100 - hh - 2.3);
    out[id] = { x, y, w };
  }
  return out;
}

const HERO_LAYOUT = buildHeroLayout();

function scatterFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const angle = ((h & 0xff) / 256) * Math.PI * 2;
  const dist = 420 + (((h >> 8) & 0x3f) / 64) * 220;
  const rot = (((h >> 16) & 0x3f) / 64) * 140 - 70;
  return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, dr: rot };
}

function initPositions(hero: boolean): Record<string, { x: number; y: number }> {
  const o: Record<string, { x: number; y: number }> = {};
  for (const p of pieces) {
    const ov = hero ? HERO_LAYOUT[p.id] : undefined;
    o[p.id] = { x: ov?.x ?? p.x, y: ov?.y ?? p.y };
  }
  return o;
}

function parseDeskLayoutOverlay(raw: unknown): Partial<Record<string, { x: number; y: number }>> | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const blob = raw as Record<string, unknown>;
  const out: Partial<Record<string, { x: number; y: number }>> = {};
  for (const p of pieces) {
    const v = blob[p.id];
    if (v === undefined) continue;
    if (typeof v !== "object" || v === null || Array.isArray(v)) continue;
    const rec = v as Record<string, unknown>;
    const x = rec.x;
    const y = rec.y;
    if (typeof x !== "number" || typeof y !== "number" || !Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x > 100 || y < 0 || y > 100) continue;
    out[p.id] = { x, y };
  }
  return Object.keys(out).length > 0 ? out : null;
}

function mergeLayoutOverlay(
  heroMode: boolean,
  overlay: Partial<Record<string, { x: number; y: number }>> | null,
): Record<string, { x: number; y: number }> {
  const base = initPositions(heroMode);
  if (!overlay) return base;
  const merged: Record<string, { x: number; y: number }> = { ...base };
  for (const id of Object.keys(overlay)) {
    const pt = overlay[id];
    if (pt) merged[id] = pt;
  }
  return merged;
}

function deskStorageKey(heroMode: boolean, bucket: DeskViewportBucket): string {
  return `paint_it_desk_${heroMode ? "hero" : "main"}_${bucket}_v1`;
}

function loadMergedPositions(
  heroMode: boolean,
  bucket: DeskViewportBucket,
): Record<string, { x: number; y: number }> {
  const defaultsRaw = bucket === "mobile" ? deskLayoutDefaultsMobileFile : deskLayoutDefaultsFile;
  const base = mergeLayoutOverlay(heroMode, parseDeskLayoutOverlay(defaultsRaw));
  if (typeof window === "undefined") return base;
  try {
    const raw = localStorage.getItem(deskStorageKey(heroMode, bucket));
    if (!raw) return base;
    const stored = parseDeskLayoutOverlay(JSON.parse(raw) as unknown);
    if (!stored || Object.keys(stored).length === 0) return base;
    const merged: Record<string, { x: number; y: number }> = { ...base };
    for (const id of Object.keys(stored)) {
      const pt = stored[id];
      if (pt) merged[id] = pt;
    }
    return merged;
  } catch {
    return base;
  }
}

function persistDeskLayout(
  heroMode: boolean,
  bucket: DeskViewportBucket,
  pos: Record<string, { x: number; y: number }>,
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(deskStorageKey(heroMode, bucket), JSON.stringify(pos));
  } catch {
    /* quota / private mode */
  }
}

function getDeskViewportBucket(): DeskViewportBucket {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MOBILE_LAYOUT_MQ).matches) return "mobile";
  if (window.matchMedia(TABLET_LAYOUT_MQ).matches) return "tablet";
  return "desktop";
}

function subscribeDeskViewportBucket(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mmMobile = window.matchMedia(MOBILE_LAYOUT_MQ);
  const mmTablet = window.matchMedia(TABLET_LAYOUT_MQ);
  const onWin = () => onStoreChange();
  mmMobile.addEventListener("change", onWin);
  mmTablet.addEventListener("change", onWin);
  window.addEventListener("resize", onWin, { passive: true });
  return () => {
    mmMobile.removeEventListener("change", onWin);
    mmTablet.removeEventListener("change", onWin);
    window.removeEventListener("resize", onWin);
  };
}

type DragRef = {
  id: string;
  startClientX: number;
  startClientY: number;
  startCenterX: number;
  startCenterY: number;
};

const DRAG_THRESHOLD_PX = 6;

const TOOLTIP_W_PCT_MOBILE = (230 / 740) * 100;

export default function DeskScene({ hero = false }: { hero?: boolean }) {
  const loaderPhase = useLoaderPhase();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragRef | null>(null);
  const dragMovedRef = useRef(false);
  const isStageVisibleRef = useRef(false);

  const [assembled, setAssembled] = useState(false);
  const [assemblyComplete, setAssemblyComplete] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    mergeLayoutOverlay(hero, parseDeskLayoutOverlay(deskLayoutDefaultsFile)),
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [layoutBanner, setLayoutBanner] = useState<string | null>(null);

  const positionsRef = useRef(positions);
  positionsRef.current = positions;
  const assembledRef = useRef(false);
  assembledRef.current = assembled;
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;

  const [stageScale, setStageScale] = useState(1);

  const deskViewportBucket = useSyncExternalStore(
    subscribeDeskViewportBucket,
    getDeskViewportBucket,
    (): DeskViewportBucket => "desktop",
  );
  const deskViewportBucketRef = useRef(deskViewportBucket);
  deskViewportBucketRef.current = deskViewportBucket;
  const heroRef = useRef(hero);
  heroRef.current = hero;

  const maxOrder = Math.max(...pieces.map((p) => p.order));
  const assemblyTailMs = Math.ceil(maxOrder * 70 + 1100);

  const active = draggingId !== null ? null : (pieces.find((p) => p.id === activeId) ?? null);

  useEffect(() => {
    if (hero) return;
    const update = () => {
      if (!rootRef.current) return;
      const avail = rootRef.current.clientWidth;
      setStageScale(avail >= DESK_W ? 1 : avail / DESK_W);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [hero]);

  useLayoutEffect(() => {
    setPositions(loadMergedPositions(hero, deskViewportBucket));
  }, [hero, deskViewportBucket]);

  useEffect(() => {
    if (!stageRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isStageVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && loaderPhase !== "in") {
          setAssembled(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(stageRef.current);
    return () => obs.disconnect();
  }, [loaderPhase]);

  useEffect(() => {
    if (loaderPhase === "in" || assembled) return;
    if (isStageVisibleRef.current) setAssembled(true);
  }, [loaderPhase, assembled]);

  useEffect(() => {
    if (!assembled) return;
    const t = window.setTimeout(() => setAssemblyComplete(true), assemblyTailMs);
    return () => window.clearTimeout(t);
  }, [assembled, assemblyTailMs]);

  const snapshotDeskLayout = useCallback(() => {
    const snap = { ...positionsRef.current };
    const json = JSON.stringify(snap, null, 2);
    try {
      const blob = new Blob([json], { type: "application/json;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "deskLayoutDefaults.json";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {
      /* continue */
    }
    void navigator.clipboard.writeText(json).catch(() => {});
    persistDeskLayout(heroRef.current, deskViewportBucketRef.current, snap);
    setLayoutBanner(
      "Snapshot downloaded (and saved for this screen size). Replace lib/deskLayoutDefaults.json or deskLayoutDefaultsMobile.json with the file for defaults; localStorage keeps your desk per phone / tablet / desktop.",
    );
    window.setTimeout(() => setLayoutBanner(null), 14000);
  }, []);

  useEffect(() => {
    const onDocumentKeyDown = (e: KeyboardEvent) => {
      const isEnter =
        e.key === "Enter" ||
        e.key === "NumpadEnter" ||
        (e as KeyboardEvent & { keyCode?: number }).keyCode === 13;
      if (!isEnter || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (target.isContentEditable) return;
      }
      if (!assembledRef.current) return;
      const stageEl = stageRef.current;
      if (!stageEl) return;
      const activeEl = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
      const focusOnDesk = activeEl !== null && stageEl.contains(activeEl);
      const mobileDeskIntent =
        deskViewportBucketRef.current === "mobile" && activeIdRef.current !== null;
      if (!focusOnDesk && !mobileDeskIntent) return;
      e.preventDefault();
      e.stopPropagation();
      snapshotDeskLayout();
    };
    window.addEventListener("keydown", onDocumentKeyDown, true);
    return () => window.removeEventListener("keydown", onDocumentKeyDown, true);
  }, [snapshotDeskLayout]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !assembled) return;
    const onFocusOut = (e: FocusEvent) => {
      if (draggingId) return;
      const next = e.relatedTarget as Node | null;
      if (next && el.contains(next)) return;
      setActiveId(null);
    };
    el.addEventListener("focusout", onFocusOut);
    return () => el.removeEventListener("focusout", onFocusOut);
  }, [assembled, draggingId]);

  const tooltipCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleTooltipClose = useCallback((id: string) => {
    if (tooltipCloseTimerRef.current !== null) clearTimeout(tooltipCloseTimerRef.current);
    tooltipCloseTimerRef.current = setTimeout(() => {
      setActiveId((prev) => (prev === id ? null : prev));
    }, 80);
  }, []);

  const cancelTooltipClose = useCallback(() => {
    if (tooltipCloseTimerRef.current !== null) {
      clearTimeout(tooltipCloseTimerRef.current);
      tooltipCloseTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      if (tooltipCloseTimerRef.current !== null) clearTimeout(tooltipCloseTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!activeId || deskViewportBucket !== "mobile") return;
    const t = setTimeout(() => setActiveId(null), 3000);
    return () => clearTimeout(t);
  }, [activeId, deskViewportBucket]);

  const tooltipPosition = (
    cx: number,
    cy: number,
    wEff: number,
    isMobile: boolean,
  ): CSSProperties => {
    if (isMobile) {
      const pieceHalfHPct = (wEff * (233 / 244)) / 2;
      const GAP = 2.5;
      const rawLeft = cx - TOOLTIP_W_PCT_MOBILE / 2;
      const left = Math.max(1.5, Math.min(100 - TOOLTIP_W_PCT_MOBILE - 1.5, rawLeft));
      if (cy > 58) {
        return {
          left: `${left}%`,
          top: `${cy - pieceHalfHPct - GAP}%`,
          minWidth: "unset",
          transform: "translateY(-100%) rotate(-0.4deg)",
        };
      }
      return {
        left: `${left}%`,
        top: `${cy + pieceHalfHPct + GAP}%`,
        minWidth: "unset",
        transform: "rotate(0.4deg)",
      };
    }
    const ttY = Math.min(Math.max(cy, 10), 90);
    if (cx > 50) {
      return {
        right: `${100 - (cx - wEff / 2) + 1.4}%`,
        top: `${ttY}%`,
        transform: "translateY(-50%) rotate(-1deg)",
      };
    }
    return {
      left: `${cx + wEff / 2 + 1.4}%`,
      top: `${ttY}%`,
      transform: "translateY(-50%) rotate(1deg)",
    };
  };

  const tooltipSide = (cx: number, isMobile: boolean): string =>
    isMobile ? "is-below" : cx > 50 ? "is-left" : "is-right";

  const clampPieceToStage = (
    stageRect: DOMRect,
    pieceRect: DOMRect,
    desiredCenterX: number,
    desiredCenterY: number,
  ) => {
    const halfW = pieceRect.width / 2;
    const halfH = pieceRect.height / 2;
    const cx = Math.max(stageRect.left + halfW, Math.min(stageRect.right - halfW, desiredCenterX));
    const cy = Math.max(stageRect.top + halfH, Math.min(stageRect.bottom - halfH, desiredCenterY));
    const xPct = ((cx - stageRect.left) / stageRect.width) * 100;
    const yPct = ((cy - stageRect.top) / stageRect.height) * 100;
    return { x: xPct, y: yPct };
  };

  const handlePiecePointerDown =
    (p: Piece) => (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!assembled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragMovedRef.current = false;
      const pieceRect = e.currentTarget.getBoundingClientRect();
      dragRef.current = {
        id: p.id,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCenterX: pieceRect.left + pieceRect.width / 2,
        startCenterY: pieceRect.top + pieceRect.height / 2,
      };
      setDraggingId(p.id);
      setActiveId(null);
    };

  const handlePiecePointerMove =
    (p: Piece) => (e: React.PointerEvent<HTMLButtonElement>) => {
      const d = dragRef.current;
      if (!d || d.id !== p.id || !stageRef.current) return;
      const dx = Math.abs(e.clientX - d.startClientX);
      const dy = Math.abs(e.clientY - d.startClientY);
      if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) dragMovedRef.current = true;
      const stageRect = stageRef.current.getBoundingClientRect();
      const pieceRect = e.currentTarget.getBoundingClientRect();
      const newCenterX = d.startCenterX + (e.clientX - d.startClientX);
      const newCenterY = d.startCenterY + (e.clientY - d.startClientY);
      const next = clampPieceToStage(stageRect, pieceRect, newCenterX, newCenterY);
      setPositions((prev) => ({ ...prev, [p.id]: next }));
    };

  const handlePiecePointerUp =
    (p: Piece) => (e: React.PointerEvent<HTMLButtonElement>) => {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const wasDrag = dragRef.current?.id === p.id && dragMovedRef.current;
      dragRef.current = null;
      setDraggingId(null);
      if (!wasDrag) {
        const prev = activeIdRef.current;
        const next = prev === p.id ? null : p.id;
        setActiveId(next);
        if (next === p.id && deskViewportBucketRef.current === "mobile") {
          e.currentTarget.focus({ preventScroll: true });
        }
      }
      if (wasDrag) {
        requestAnimationFrame(() => {
          persistDeskLayout(heroRef.current, deskViewportBucketRef.current, positionsRef.current);
        });
      }
    };

  const scaledH = DESK_H * stageScale;

  return (
    <div
      ref={rootRef}
      className="desk-scene-root"
      style={
        hero ? { width: "100%", height: "100%" } : stageScale < 1 ? { height: `${scaledH}px` } : undefined
      }
    >
      <div
        ref={stageRef}
        className={`desk-stage${assembled ? " is-assembled" : ""}`}
        style={
          hero
            ? { width: "100%", height: "100%", aspectRatio: "unset", minHeight: "unset" }
            : stageScale < 1
              ? {
                  width: `${DESK_W}px`,
                  minHeight: `${DESK_H}px`,
                  transform: `scale(${stageScale})`,
                  transformOrigin: "top left",
                }
              : undefined
        }
        onPointerLeave={(ev) => {
          if (draggingId) return;
          if (ev.pointerType === "touch" || ev.pointerType === "pen") return;
          setActiveId(null);
        }}
      >
        {pieces.map((p) => {
          const isActive = activeId === p.id;
          const isDragging = draggingId === p.id;
          const scatter = scatterFor(p.id);
          const heroOv = hero ? HERO_LAYOUT[p.id] : undefined;
          const rawPieceW =
            p.id === "avatar"
              ? hero
                ? (heroOv?.w ?? avatarDisplayW(scaledW(p.w)))
                : avatarDisplayW(scaledW(p.w))
              : (heroOv?.w ?? scaledW(p.w));
          const pieceW = applyViewportPieceWidth(rawPieceW, p.id, deskViewportBucket);
          const pos = positions[p.id] ?? { x: heroOv?.x ?? p.x, y: heroOv?.y ?? p.y };

          const finalTransform = `translate(-50%, -50%) rotate(${p.rotate}deg)`;
          const startTransform = `translate(calc(-50% + ${scatter.dx}px), calc(-50% + ${scatter.dy}px)) rotate(${scatter.dr}deg)`;

          return (
            <button
              key={p.id}
              type="button"
              className={`desk-piece${isActive ? " is-active" : ""}${isDragging ? " is-dragging" : ""}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pieceW}%`,
                aspectRatio: "244 / 233",
                transform: assembled ? finalTransform : startTransform,
                transitionDelay:
                  !assembled || assemblyComplete || isDragging ? "0ms" : `${p.order * 70}ms`,
                zIndex: isDragging ? 100 : isActive ? 50 : p.id === "avatar" ? Math.max(p.z, 80) : p.z,
              }}
              onMouseEnter={() => {
                cancelTooltipClose();
                if (draggingId == null && assembled) setActiveId(p.id);
              }}
              onMouseLeave={() => {
                if (!isDragging && activeId === p.id) scheduleTooltipClose(p.id);
              }}
              onFocus={() => {
                cancelTooltipClose();
                if (draggingId == null && assembled) setActiveId(p.id);
              }}
              onBlur={() => {
                if (!isDragging && activeId === p.id) scheduleTooltipClose(p.id);
              }}
              onPointerDown={handlePiecePointerDown(p)}
              onPointerMove={handlePiecePointerMove(p)}
              onPointerUp={(e) => {
                handlePiecePointerUp(p)(e);
                if (!dragMovedRef.current && p.links?.[0] && !e.ctrlKey && !e.metaKey) {
                  window.open(p.links[0].href, "_blank");
                }
              }}
              onPointerCancel={handlePiecePointerUp(p)}
              aria-pressed={Boolean(isActive || isDragging)}
              aria-grabbed={isDragging}
              aria-label={`${p.tag}${assembled ? ". drag to rearrange." : ""}${p.links?.[0] ? ". click to visit link" : ""}`}
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.title}
                  width={244}
                  height={233}
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 200px"
                  draggable={false}
                />
              ) : (
                p.custom
              )}
            </button>
          );
        })}

        {assembled &&
          active &&
          draggingId == null &&
          (() => {
            const activeCx = positions[active.id]?.x ?? (hero ? HERO_LAYOUT[active.id].x : active.x);
            const activeCy = positions[active.id]?.y ?? (hero ? HERO_LAYOUT[active.id].y : active.y);
            const activeWEff = applyViewportPieceWidth(
              hero
                ? HERO_LAYOUT[active.id].w
                : active.id === "avatar"
                  ? avatarDisplayW(scaledW(active.w))
                  : scaledW(active.w),
              active.id,
              deskViewportBucket,
            );
            const isMobileTooltip = deskViewportBucket === "mobile";
            return (
              <div
                className={`desk-tooltip ${tooltipSide(activeCx, isMobileTooltip)}`}
                style={{
                  ...tooltipPosition(activeCx, activeCy, activeWEff, isMobileTooltip),
                  zIndex: 200,
                }}
                role="tooltip"
                onMouseEnter={cancelTooltipClose}
                onMouseLeave={() => scheduleTooltipClose(active.id)}
                onFocus={cancelTooltipClose}
                onBlur={() => scheduleTooltipClose(active.id)}
              >
                <h4>{active.title}</h4>
                <p>{active.blurb}</p>
                {active.links && active.links.length > 0 && (
                  <div className="desk-tooltip-links">
                    {active.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="desk-tooltip-link"
                        aria-label={`${l.label} (opens in new tab)`}
                      >
                        <span className="desk-tooltip-link-icon" aria-hidden>
                          ↗
                        </span>
                        <span className="desk-tooltip-link-text">{l.label}</span>
                        <span className="desk-tooltip-link-open" aria-hidden>
                          open ↗
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                <span className="desk-tooltip-tag">· {active.tag}</span>
              </div>
            );
          })()}
      </div>

      <p className="mt-4 md:mt-5 text-center prose-body text-amber-950/70 text-base px-4">
        {assembled
          ? "drag to rearrange — tap any item for notes. layout is remembered separately for phone, tablet, and wide screens. with a cutout open, Enter snapshots (or Save layout on phone); phone cutouts scale up except the tagline tile."
          : "putting the desk together…"}
      </p>
      {assembled && deskViewportBucket === "mobile" ? (
        <div className="mt-3 flex justify-center px-4">
          <button
            type="button"
            className="rounded-lg border border-ink/20 bg-amber-50/90 px-4 py-2 font-sans text-sm text-amber-950 shadow-sm active:scale-[0.98]"
            onClick={() => snapshotDeskLayout()}
          >
            Save layout (JSON)
          </button>
        </div>
      ) : null}
      {layoutBanner ? (
        <p
          className="mx-auto mt-4 max-w-2xl rounded-lg border border-ink/25 bg-emerald-50 px-4 py-3 font-sans text-sm text-emerald-950"
          role="status"
          aria-live="polite"
        >
          {layoutBanner}
        </p>
      ) : null}
    </div>
  );
}
