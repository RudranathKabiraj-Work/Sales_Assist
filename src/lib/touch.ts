/** Returns true if running on any iOS device (iPhone, iPad, iPod). */
export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /iP(hone|od|ad)/.test(navigator.userAgent) ||
    // iPad on iOS 13+ reports as MacIntel but has touch support
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    isIOS() ||
    window.matchMedia?.("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
