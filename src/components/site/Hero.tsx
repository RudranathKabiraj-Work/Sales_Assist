import { useState } from "react";
import poster from "@/assets/vsl-poster.jpg";
import { HillsButton } from "./HillsButton";

export function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section 
      id="top" 
      className="relative overflow-hidden px-4 pb-24 pt-24 sm:pt-28"
      style={{
        background: "radial-gradient(120% 100% at 50% -10%, #e6f5c0 0%, #f1f4f8 50%, #f1f4f8 100%)"
      }}
    >
      <style>{`
        .lh-title {
          font-size: clamp(30px, 5vw, 64px);
          line-height: 1.15;
          letter-spacing: -0.025em;
          font-weight: 800;
          text-align: center;
          margin: 22px 0 0;
        }
        .custom-ul-lime {
          position: relative;
          z-index: 0;
        }
        .custom-ul-lime::after {
          content: "";
          position: absolute;
          left: calc(1% - 2px);
          right: 0%;
          bottom: calc(0.14em + 1px);
          height: 0.25em;
          background: #94b134;
          transform: rotate(-0.5deg);
          transform-origin: left center;
          z-index: -1;
        }
        .vsl-play-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(85, 99, 49, 0.45);
          animation: vslpulse 2.2s ease-out infinite;
        }
        @keyframes vslpulse {
          0% {
            box-shadow: 0 0 0 0 rgba(85, 99, 49, 0.45);
          }
          70% {
            box-shadow: 0 0 0 26px rgba(85, 99, 49, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(85, 99, 49, 0);
          }
        }
      `}</style>

      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl text-center z-10 px-4">
        <h1 className="lh-title text-foreground">
          Stop Losing Customers<br />
          After They <span className="custom-ul-lime">Become Leads</span>.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-[19px]">
          SalesAssist ensures every enquiry is contacted, followed up, qualified and moved towards the next step, so your team converts more of the leads you've already worked hard to generate.
        </p>

        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground mt-12 flex items-center justify-center gap-2 select-none">
          <span className="text-[#556331]">▶</span>
          How SalesAssist helps businesses scale — the full breakdown
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <HillsButton
            href="#start"
            className="w-full sm:w-auto rounded-xl px-8 py-4 font-bold text-[15px] text-center"
          >
            Book a Demo
          </HillsButton>
          <a
            href="#dashboard"
            className="w-full sm:w-auto rounded-xl border border-border bg-white px-8 py-4 font-bold text-foreground text-[15px] text-center"
          >
            Watch SalesAssist in Action
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex -space-x-2">
            {["AR", "JK", "MP", "DL", "SB"].map((a) => (
              <span
                key={a}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-lime font-mono text-[10px] font-bold text-primary-foreground"
              >
                {a}
              </span>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-sm tracking-widest text-[#556331]">★★★★★</div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Trusted by 120+ coaches &amp; consultants
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
