import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal – scroll-triggered fade-in on desktop only.
 *
 * On mobile / tablet (window width < 1024 px) the component is a plain <div>
 * with no data-attributes, no IntersectionObserver and no CSS transition, so
 * every section paints immediately on the first frame.
 *
 * We deliberately avoid importing useReveal here so that the IntersectionObserver
 * is never instantiated on mobile at all.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // Detect mobile synchronously via a ref so we never go through an async
  // useState/useEffect cycle that would cause a flicker.
  const isMobileRef = useRef<boolean>(false);
  const [isMobile, setIsMobile] = useState(true); // start visible (safe default for SSR + mobile)

  // Determine layout on the first synchronous layout pass so we don't paint
  // twice on desktop.
  useLayoutEffect(() => {
    const mobile = window.innerWidth < 1024;
    isMobileRef.current = mobile;
    setIsMobile(mobile);
  }, []);

  // ── Mobile / tablet: plain passthrough, no animation machinery ──────────
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  // ── Desktop: full scroll-reveal animation ────────────────────────────────
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
