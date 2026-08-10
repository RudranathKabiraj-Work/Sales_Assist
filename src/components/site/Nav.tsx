import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how" },
  { label: "Results", href: "#results" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className="mx-auto flex max-w-[1200px] h-[62px] items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-5"
        style={{
          background: scrolled ? "rgba(20, 20, 22, 0.9)" : "rgba(20, 20, 22, 0.72)",
          borderColor: scrolled ? "rgba(201, 242, 58, 0.22)" : "rgba(201, 242, 58, 0.14)",
          boxShadow: scrolled 
            ? "0 0 30px rgba(201, 242, 58, 0.2), 0 12px 34px rgba(0, 0, 0, 0.55)" 
            : "0 0 22px rgba(201, 242, 58, 0.13), 0 10px 30px rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime font-mono text-xs font-bold text-primary-foreground">
            RW
          </span>
          <span className="text-[17px] font-bold tracking-tight">Ryan Wegner</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#start"
            className="hidden rounded-xl bg-lime px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:scale-105 sm:inline-flex"
          >
            Book A Call
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-border md:hidden"
          >
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[1200px] animate-in fade-in-0 duration-200 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#start"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-lime py-2.5 text-center text-sm font-bold text-primary-foreground"
          >
            Book A Call
          </a>
        </div>
      )}
    </header>
  );
}
