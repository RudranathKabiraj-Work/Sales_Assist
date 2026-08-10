import { Reveal } from "./Reveal";
import { HillsButton } from "./HillsButton";

const WHO_ITS_FOR = [
  "Professional Services",
  "Agencies",
  "Healthcare",
  "Education",
  "Financial Advisors",
  "Real Estate",
  "B2B Services",
  "High-ticket Businesses"
];

export function CtaSection() {
  return (
    <section id="start" className="bg-white px-4 py-20 md:px-8 border-y border-border">
      {/* 1. Who It's For section integrated above the final CTA */}
      <div className="mx-auto max-w-5xl mb-24">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold text-lime uppercase tracking-wider">Target Audience</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
              Who SalesAssist Is Built For
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              If your business depends on converting enquiries into customers, SalesAssist is designed for you.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {WHO_ITS_FOR.map((item, idx) => (
            <Reveal key={item} delay={idx * 60}>
              <div className="bg-secondary/40 border border-border/80 rounded-xl p-5 text-center font-bold text-foreground text-sm hover:border-lime/40 transition-colors shadow-sm">
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 2. Final Call to Action */}
      <Reveal>
        <div
          className="relative mx-auto max-w-5xl rounded-[28px] border border-[#94b134]/40 text-center overflow-hidden px-10 py-16 max-sm:px-[22px] max-sm:py-12 shadow-sm"
          style={{
            background: "radial-gradient(120% 140% at 50% -20%, #d4f080, #eef8c8)"
          }}
        >
          {/* Radial Glow */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[640px] h-[420px]"
            style={{
              top: "-160px",
              background: "radial-gradient(circle, rgba(85, 99, 49, 0.15), transparent 62%)"
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
              Every Lead Is An Opportunity.<br />
              Make Sure None Of Them Are Wasted.
            </h2>

            <div className="mt-8 grid gap-3 max-w-md mx-auto text-left">
              {[
                "Stop relying on memory.",
                "Stop relying on spreadsheets.",
                "Stop relying on inconsistent follow-up.",
                "Start building a sales system that works every lead until there is a clear outcome."
              ].map((bullet, index) => (
                <div key={index} className="flex gap-3 items-start text-sm md:text-base text-foreground/90 font-medium">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#141709] text-lime flex items-center justify-center text-[10px] font-bold mt-0.5">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <HillsButton
                href="#start"
                variant="dark"
                className="inline-flex items-center gap-2 rounded-[12px] px-[28px] py-[15px] text-[16px] font-bold"
              >
                Book Your Demo
              </HillsButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-white text-muted-foreground py-[52px] pb-[40px] px-6 sm:px-12">
      <div className="mx-auto max-w-[1180px]">
        {/* Upper footer content */}
        <div className="flex flex-wrap items-center justify-between gap-[30px]">
          <div className="max-w-[320px] text-left">
            <a href="#top" className="inline-flex items-center gap-[11px] font-bold text-[20px] text-foreground tracking-[-0.02em]">
              SalesAssist
            </a>
            <p className="mt-[16px] text-[15px] leading-relaxed text-muted-foreground">
              Ensure every enquiry is contacted, followed up, qualified and closed.
            </p>
          </div>

          <div>
            <HillsButton
              href="#start"
              className="inline-flex items-center gap-[9px] font-bold text-[15px] px-[26px] py-[14px] rounded-[12px]"
            >
              Book a Demo
            </HillsButton>
          </div>
        </div>

        {/* Lower footer content */}
        <div className="mt-[40px] pt-[24px] border-t border-border flex flex-wrap items-center justify-between gap-[16px] font-mono text-[12.5px] tracking-[0.06em] text-muted-foreground">
          <div>
            <span>© {new Date().getFullYear()} SalesAssist</span>
          </div>

          <div className="flex gap-[22px]">
            <span>Product by BDA Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
