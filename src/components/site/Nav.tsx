import { useEffect, useState } from "react";
import logo from "@/assets/Logo.jpeg";
import { HillsButton } from "./HillsButton";

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
          background: scrolled ? "rgba(241, 244, 248, 0.95)" : "rgba(241, 244, 248, 0.80)",
          borderColor: scrolled ? "rgba(148, 177, 52, 0.35)" : "rgba(148, 177, 52, 0.2)",
          boxShadow: scrolled 
            ? "0 0 30px rgba(148, 177, 52, 0.12), 0 8px 24px rgba(0, 0, 0, 0.1)" 
            : "0 0 20px rgba(148, 177, 52, 0.07), 0 4px 16px rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <a href="#top" className="flex items-center select-none overflow-hidden h-[54px] max-w-[280px]">
          <img
            src={logo}
            alt="Sales Assist Logo"
            className="h-[130px] w-auto object-contain mix-blend-multiply my-[-38px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(180deg, transparent 28%, black 36%, black 64%, transparent 72%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(180deg, transparent 28%, black 36%, black 64%, transparent 72%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
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
          <HillsButton
            href="#start"
            className="hidden rounded-xl px-5 py-2.5 text-sm font-bold sm:inline-flex"
          >
            Book a Demo
          </HillsButton>
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
          <HillsButton
            href="#start"
            onClick={() => setOpen(false)}
            className="mt-2 flex w-full rounded-xl py-2.5 text-center text-sm font-bold"
          >
            Book a Demo
          </HillsButton>
        </div>
      )}
    </header>
  );
}
