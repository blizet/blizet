"use client";

/**
 * Return a phase that is not `"in"` so the desk can assemble without a full-screen loader.
 * Wire this to your real loader when you add it back.
 */
export function useLoaderPhase(): string {
  return "out";
}
