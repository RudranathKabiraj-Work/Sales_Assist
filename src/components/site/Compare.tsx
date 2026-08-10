import { Reveal } from "./Reveal";

const OLD = [
  "Guessing at what to fix next, month after month.",
  "Income swings wildly with no predictable pipeline.",
  "Every part of the business depends on you.",
  "Random tactics from gurus that never connect.",
  "Working more hours just to stay in the same place.",
  "Putting out fires instead of leading the business.",
  "Hiring people with no system to plug them into.",
  "Growth stalls the moment you stop hustling.",
];

const NEW = [
  "A clear plan built around your #1 constraint.",
  "A predictable pipeline of qualified calls every week.",
  "Systems that run without you in the weeds.",
  "A proven playbook from three seven-figure builds.",
  "Leverage that scales revenue without more hours.",
  "Roles and processes your team can actually run.",
  "An offer and funnel built to scale profitably.",
  "Growth that compounds month over month.",
];

export function Compare() {
  return (
    <section id="results" className="bg-[#121213] text-[#F5F5F5] px-6 py-24 sm:px-12 md:py-28">
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
              className="font-mono text-[12px] tracking-[0.22em] uppercase text-[#C9F23A] font-semibold"
              style={{ textShadow: "0 0 8px rgba(201, 242, 58, 0.45)" }}
            >
              The difference is the system
            </span>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.15]">
              Grinding it out alone vs running a
              <br />
              real <span className="custom-ul">growth machine</span>.
            </h2>
          </Reveal>
        </div>

        {/* Compare Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mt-12">
          {/* Old Way Box */}
          <Reveal>
            <div className="rounded-[22px] p-8 border border-[#2B2B2E] bg-[#1A1A1C]">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#9C9C9C] font-bold">
                The old way
              </span>
              <h3 className="mt-1 text-[22px] font-bold tracking-tight text-[#CFCFCF] mb-5">
                Scaling On Your Own
              </h3>
              <div className="flex flex-col">
                {OLD.map((t, idx) => (
                  <div
                    key={t}
                    className={`flex gap-4 items-start py-[15px] text-[15px] leading-relaxed text-[#9C9C9C] ${idx > 0 ? "border-t border-white/[0.06]" : ""
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
            <div className="rounded-[22px] p-8 border-[1.5px] border-[#A6C82F]/70 bg-gradient-to-b from-[#C9F23A]/[0.08] to-[#C9F23A]/[0.015] bg-[#1A1A1C] shadow-[0_0_44px_rgba(201,242,58,0.1)]">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#C9F23A] font-bold">
                The new way
              </span>
              <h3 className="mt-1 text-[22px] font-bold tracking-tight text-white mb-5">
                Scaling With Ryan
              </h3>
              <div className="flex flex-col">
                {NEW.map((t, idx) => (
                  <div
                    key={t}
                    className={`flex gap-4 items-start py-[15px] text-[15px] leading-relaxed text-[#CFCFCF] ${idx > 0 ? "border-t border-white/[0.06]" : ""
                      }`}
                  >
                    <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[#C9F23A] text-[#141709] flex items-center justify-center text-[10px] font-black mt-0.5">
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
