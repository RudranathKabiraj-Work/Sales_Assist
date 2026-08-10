import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { isIOS, isTouchDevice } from "@/lib/touch";

/**
 * Reveal – scroll-triggered fade-in on desktop only.
 *
 * On mobile, tablet, or ANY iOS device the component is a plain <div>
 * with no data-attributes, no IntersectionObserver and no CSS transition,
 * so every section paints immediately on the first frame.
 *
 * iOS Safari has a notoriously unreliable IntersectionObserver (it fires
 * late, misses entries during momentum scrolling, and can leave sections
 * permanently invisible). We short-circuit ALL animation on iOS.
 */

/**
 * Compute once, synchronously at module load time (client-only).
 * This avoids a two-render cycle (isMobile true → useLayoutEffect → false)
 * that causes the visible→hidden→visible flash on iPhone.
 */
const IS_MOBILE_OR_IOS =
  typeof window === "undefined"
    ? true // SSR → safe default (always visible)
    : isIOS() || isTouchDevice() || window.innerWidth < 1024;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // ── Mobile / iOS / tablet: plain passthrough, no animation machinery ──────────
  if (IS_MOBILE_OR_IOS) {
    return <div className={className}>{children}</div>;
  }

  // ── Desktop (non-iOS): full scroll-reveal animation ───────────────────────
  return (
    <DesktopReveal delay={delay} className={className}>
      {children}
    </DesktopReveal>
  );
}

function DesktopReveal({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only animate elements that start below the fold.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setVisible(false);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);

    // Safety net: reveal after 3 s if the observer never fires.
    const fallback = window.setTimeout(() => {
      io.disconnect();
      setVisible(true);
    }, 3000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      data-ready={ready}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
