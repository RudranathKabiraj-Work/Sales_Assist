import { Reveal } from "./Reveal";

const OLD = [
  "Manual follow-up",
  "Missed callbacks",
  "Incomplete CRM",
  "Founder guessing performance",
  "Leads fall through the cracks",
];

const NEW = [
  "Every lead contacted",
  "Automated follow-up",
  "CRM always updated",
  "Complete pipeline visibility",
  "Sales team focuses on closing",
];

export function Compare() {
  return (
    <section id="results" className="bg-secondary text-foreground px-6 py-24 sm:px-12 md:py-28">
      {/* Custom Styles for Diagonal Underline Highlight */}
      <style>{`
        .custom-ul {
          position: relative;
          white-space: nowrap;
          z-index: 0;
        }
        .custom-ul::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 4px;
          height: 8px;
          background: #94b134;
          transform: rotate(-1deg);
          transform-origin: left center;
          z-index: -1;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Reveal>
            <span 
              className="font-mono text-[12px] tracking-[0.22em] uppercase text-lime font-bold"
            >
              Traditional Sales vs SalesAssist
            </span>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-foreground leading-[1.15]">
              How does your current team compare to a<br />
              dedicated <span className="custom-ul">growth machine</span>?
            </h2>
          </Reveal>
        </div>

        {/* Compare Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mt-12">
          {/* Old Way Box */}
          <Reveal>
            <div className="rounded-[22px] p-8 border border-border bg-white shadow-sm">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted-foreground font-bold">
                The old way
              </span>
              <h3 className="mt-1 text-[22px] font-bold tracking-tight text-foreground mb-5">
                Traditional Sales
              </h3>
              <div className="flex flex-col">
                {OLD.map((t, idx) => (
                  <div
                    key={t}
                    className={`flex gap-4 items-start py-[15px] text-[15px] leading-relaxed text-muted-foreground ${idx > 0 ? "border-t border-border" : ""
                      }`}
                  >
                    <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(255,107,107,0.13)] text-[#ff6b6b] flex items-center justify-center text-[10px] mt-0.5">
                      ✕
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* New Way Box */}
          <Reveal delay={120}>
            <div className="rounded-[22px] p-8 border-[1.5px] border-lime/50 bg-gradient-to-b from-lime/[0.08] to-lime/[0.015] bg-white shadow-[0_0_44px_rgba(148,177,52,0.1)]">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-lime font-bold">
                The new way
              </span>
              <h3 className="mt-1 text-[22px] font-bold tracking-tight text-foreground mb-5">
                With SalesAssist
              </h3>
              <div className="flex flex-col">
                {NEW.map((t, idx) => (
                  <div
                    key={t}
                    className={`flex gap-4 items-start py-[15px] text-[15px] leading-relaxed text-foreground ${idx > 0 ? "border-t border-border" : ""
                      }`}
                  >
                    <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[#556331] text-white flex items-center justify-center text-[10px] font-black mt-0.5">
                      ✓
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
