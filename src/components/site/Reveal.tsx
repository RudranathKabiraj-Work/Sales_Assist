import { useEffect, useState, type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

// On desktop: animated reveal on scroll.
// On mobile/tablet (< 1024px): render children immediately with no wrapper
// behaviour so sections are never hidden and the page never snaps to top.
function DesktopReveal({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [ready, setReady] = useState(false);

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

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Before hydration: render as plain div so SSR and initial client paint
  // always show content (no flash of hidden content).
  if (isMobile === null) {
    return <div className={className}>{children}</div>;
  }

  // Mobile/tablet: completely skip all reveal machinery.
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Desktop: full scroll-reveal animation.
  return (
    <DesktopReveal delay={delay} className={className}>
      {children}
    </DesktopReveal>
  );
}
