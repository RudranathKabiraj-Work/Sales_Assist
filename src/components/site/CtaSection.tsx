import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section id="start" className="bg-[#121213] px-4 py-20 md:px-8">
      <Reveal>
        <div
          className="relative mx-auto max-w-5xl rounded-[28px] border border-[#A6C82F] text-center overflow-hidden px-10 py-16 max-sm:px-[22px] max-sm:py-12"
          style={{
            background: "radial-gradient(120% 140% at 50% -20%, #20280f, #141510)"
          }}
        >
          {/* Radial Glow */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[640px] h-[420px]"
            style={{
              top: "-160px",
              background: "radial-gradient(circle, rgba(201, 242, 58, 0.2), transparent 62%)"
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.15]">
              Ready to scale your coaching
              <br className="max-sm:hidden" />
              business?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-balance text-sm md:text-base leading-relaxed text-[#CFCFCF]">
              Book a free game-plan call. We'll map out exactly
              <br className="hidden sm:inline" />
              how to get you to $100k+/month, no pressure.
            </p>

            <div className="mt-8">
              <a
                href="https://ryanwegner.com/#start"
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#C9F23A] px-[26px] py-[14px] text-[16px] font-bold text-[#141709] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105"
              >
                Book A Call With Me &rarr;
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#2b2b2e] bg-[#121213] text-[#9C9C9C] py-[52px] pb-[40px] px-6 sm:px-12">
      <div className="mx-auto max-w-[1180px]">
        {/* Upper footer content (foot-in) */}
        <div className="flex flex-wrap items-center justify-between gap-[30px]">
          <div className="max-w-[320px] text-left">
            <a href="#top" className="inline-flex items-center gap-[11px] font-bold text-[20px] text-white tracking-[-0.02em]">
              <span className="w-[30px] h-[30px] rounded-[8px] bg-[#C9F23A] text-[#141709] flex items-center justify-center font-mono font-bold text-[17px]">
                RW
              </span>
              Ryan Wegner
            </a>
            <p className="mt-[16px] text-[17px] leading-relaxed text-[#9C9C9C]">
              Helping coaches &amp; consultants scale past $100k/month.
            </p>
          </div>

          <div>
            <a
              href="#start"
              className="inline-flex items-center gap-[9px] bg-[#C9F23A] text-[#141709] font-bold text-[16px] px-[26px] py-[14px] rounded-[12px] transition-transform duration-150 hover:-translate-y-0.5 hover:brightness-105"
            >
              Book A Call &rarr;
            </a>
          </div>
        </div>

        {/* Lower footer content (foot-bottom) */}
        <div className="mt-[40px] pt-[24px] border-t border-[#2b2b2e] flex flex-wrap items-center justify-between gap-[16px] font-mono text-[12.5px] tracking-[0.06em] text-[#6E6E6E]">
          <div>
            <span>© 2026 Ryan Wegner</span>
          </div>

          <div className="flex gap-[22px]">
            <a href="https://instagram.com/realryanwegner" target="_blank" rel="noreferrer" className="text-[#6E6E6E] hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://smartsetters.ai" target="_blank" rel="noreferrer" className="text-[#6E6E6E] hover:text-white transition-colors">
              Smart Setters
            </a>
          </div>

          <div>
            <span>@realryanwegner · ryanwegner.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
