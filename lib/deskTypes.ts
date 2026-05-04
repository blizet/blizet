import type { ReactNode } from "react";

export type Piece = {
  id: string;
  src: string | null;
  custom?: ReactNode;
  tag: string;
  title: string;
  blurb: string;
  links?: { href: string; label: string }[];
  x: number;
  y: number;
  w: number;
  rotate: number;
  z: number;
  order: number;
  decor?: boolean;
};
