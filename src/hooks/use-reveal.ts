import { useEffect, useRef, useState } from "react";

function shouldSkipAnimation(): boolean {
  if (typeof window === "undefined") return true;
  const ua = navigator.userAgent;
  if (/iP(hone|od|ad)/.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.innerWidth < 1024) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On iOS, mobile/tablet or reduced-motion: always visible, no animation.
    if (shouldSkipAnimation()) {
      setVisible(true);
      return;
    }

    // Start above-the-fold content already visible so it never waits on
    // hydration. Only animate-in elements that begin below the fold.
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
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    // Safety net: never allow content to stay hidden if the observer never
    // fires (slow mobile devices, scroll container quirks, etc).
    const fallback = window.setTimeout(() => {
      io.disconnect();
      setVisible(true);
    }, 3000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return { ref, visible };
}

export function useCountUp(target: number, start: boolean, duration = 1400) {
  // On mobile/iOS: skip animation entirely, show final number immediately.
  const isMobile = typeof window !== "undefined" && (
    /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 1024
  );

  const [value, setValue] = useState(isMobile ? target : 0);

  useEffect(() => {
    if (!start || isMobile) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration, isMobile]);

  return value;
}

export function useTypewriter(text: string, speed = 45, delay = 350) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const step = () => {
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) timer = setTimeout(step, speed);
      };
      step();
    }, delay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [text, speed, delay]);

  return out;
}
