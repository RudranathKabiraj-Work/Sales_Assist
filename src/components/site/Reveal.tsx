import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal – scroll-triggered fade-in on ≥1024 px non-iOS desktop ONLY.
 *
 * Key design decisions to fix iOS lag:
 *
 * 1. NO module-level window access — SSR renders a plain <div class="reveal">
 *    which CSS keeps fully visible (opacity:1). Zero hydration mismatches.
 *
 * 2. NO useLayoutEffect, NO React state — the JS enhancement is purely
 *    imperative via a useEffect that sets data-attributes directly on the DOM.
 *    This means React never re-renders the component for visibility changes.
 *
 * 3. On iOS / touch / mobile the useEffect returns early immediately, so the
 *    element stays at opacity:1 forever — no flash, no delay, no IntersectionObserver.
 *
 * 4. CSS default for .reveal is opacity:1 — so even if JS never runs (SSR,
 *    slow device) content is always visible.
 */

function getIsDesktopNonIOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  // Explicit iOS UA check — catches iPhone, iPad (all iOS 13+ variants incl iPadOS)
  if (/iP(hone|od|ad)/.test(ua)) return false;
  // iPad on iOS 13+ lies and reports MacIntel but has maxTouchPoints > 1
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return false;
  // Android, other touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  // Viewport too narrow (e.g. desktop browser resized)
  if (window.innerWidth < 1024) return false;
  return true;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On mobile/iOS: do nothing. The CSS default keeps .reveal at opacity:1.
    if (!getIsDesktopNonIOS()) return;

    const el = ref.current;
    if (!el) return;

    // Mark as JS-enhanced — CSS will now apply animation.
    el.setAttribute("data-reveal", "ready");

    const rect = el.getBoundingClientRect();
    // Already in view on page load — mark visible immediately, no observer.
    if (rect.top < window.innerHeight * 0.95) {
      el.setAttribute("data-visible", "true");
      return;
    }

    // Below fold — hide and watch for intersection.
    el.setAttribute("data-visible", "false");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "true");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);

    // Safety net: if observer never fires, reveal after 1.5s.
    const safety = window.setTimeout(() => {
      el.setAttribute("data-visible", "true");
      io.disconnect();
    }, 1500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
