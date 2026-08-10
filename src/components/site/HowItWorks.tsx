import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";

const G3_NOTIFICATIONS = [
  { handle: "@mikefit", time: "now" },
  { handle: "@dan.reels", time: "1m" },
  { handle: "@sarah.co", time: "3m" },
  { handle: "@james_fit", time: "6m" },
  { handle: "@coach.liv", time: "9m" },
  { handle: "@alec.fit", time: "12m" },
  { handle: "@mindset.jo", time: "16m" },
  { handle: "@growth.tay", time: "21m" }
];

export function HowItWorks() {
  // G3 conveyor state
  const [stack, setStack] = useState([
    G3_NOTIFICATIONS[0],
    G3_NOTIFICATIONS[1],
    G3_NOTIFICATIONS[2]
  ]);
  const [animating, setAnimating] = useState(false);
  const [flashLast, setFlashLast] = useState(false);

  useEffect(() => {
    let noteIndex = 3; // start from 4th note
    const interval = setInterval(() => {
      setAnimating(true);
      
      // Step 1: slide up
      const t1 = setTimeout(() => {
        // Step 2: append new note, remove first, reset slide
        setStack((prev) => {
          const next = [...prev.slice(1), G3_NOTIFICATIONS[noteIndex % G3_NOTIFICATIONS.length]];
          noteIndex++;
          return next;
        });
        setAnimating(false);
        setFlashLast(true);
      }, 550);

      const t2 = setTimeout(() => {
        setFlashLast(false);
      }, 1200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how" className="bg-background text-foreground px-6 py-24 sm:px-12 md:py-28">
      {/* Self-contained CSS Animations */}
      <style>{`
        /* G1 Animation styles */
        .g1-inputs {
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }
        .g1-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--color-muted-foreground);
          background: #161618;
          border: 1px solid #2b2b2e;
          border-radius: 6px;
          padding: 4px 8px;
          animation: g1chip-anim 3.4s ease-in-out infinite;
        }
        .g1-chip::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9F23A;
          box-shadow: 0 0 5px #C9F23A;
        }
        @keyframes g1chip-anim {
          0%, 100% { border-color: #2b2b2e; }
          12% { border-color: #C9F23A; }
        }
        .g1-stream {
          position: relative;
          flex: 1;
          height: 100%;
        }
        .g1-stream i {
          position: absolute;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9F23A;
          box-shadow: 0 0 7px #C9F23A;
          transform: translateY(-50%);
          animation: g1flow-anim 1.7s linear infinite;
        }
        @keyframes g1flow-anim {
          0% { left: 10%; opacity: 0; }
          15% { opacity: 1; }
          82% { opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }
        .g1-core, .g2-ai {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: radial-gradient(circle, #26310f, #111309);
          border: 1.5px solid #C9F23A;
          display: grid;
          place-items: center;
          box-shadow: 0 0 26px rgba(201, 242, 58, 0.35);
          z-index: 2;
          animation: g1pulse-anim 2s ease-in-out infinite;
        }
        @keyframes g1pulse-anim {
          0%, 100% { box-shadow: 0 0 20px rgba(201, 242, 58, 0.3); transform: scale(1); }
          50% { box-shadow: 0 0 30px rgba(201, 242, 58, 0.55); transform: scale(1.05); }
        }

        /* G2 Animation styles */
        .g2-wave {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
          margin-right: 12px;
          height: 50px;
        }
        .g2-wave span {
          width: 2px;
          background: #C9F23A;
          border-radius: 2px;
          transform: scaleY(.3);
          animation: g2bar-anim 1.05s ease-in-out infinite;
          box-shadow: 0 0 5px rgba(201, 242, 58, 0.35);
        }
        @keyframes g2bar-anim {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1.0); }
        }

        /* G3 Conveyor styles */
        .g3-conveyor {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 11px 12px;
          will-change: transform;
        }
        .g3-item {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
          height: 34px;
          background: #161618;
          border: 1px solid #2b2b2e;
          border-radius: 9px;
          padding: 0 11px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 11.5px;
          color: #f5f5f5;
          white-space: nowrap;
          transition: box-shadow 0.35s ease;
        }
        .g3-item.flash {
          box-shadow: 0 0 0 1px #C9F23A, 0 0 16px rgba(201, 242, 58, 0.4);
        }
        .g3-item .ck {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #C9F23A;
          color: #141709;
          display: grid;
          place-items: center;
          font-size: 10px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .g3-item small {
          font-family: var(--font-mono);
          font-weight: 400;
          font-size: 10px;
          color: #9c9c9c;
          margin-left: auto;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lime font-bold">
              How it works
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              A clear path to $100k+/month.
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-zinc-400">
              A simple path from stuck to scaling, tailored to your business.
            </p>
          </div>
        </Reveal>

        {/* Steps Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <Reveal>
            <article className="h-full rounded-2xl border border-[#2B2B2E] bg-[#141416] p-7 flex flex-col justify-between">
              <div>
                {/* Step Gfx 1 */}
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#0D0D0F] border border-[rgba(201,242,58,0.18)] shadow-[0_0_30px_rgba(201,242,58,0.22)] mb-6 flex items-center justify-between px-4">
                  <div className="g1-inputs">
                    <span className="g1-chip" style={{ animationDelay: "0s" }}>Offer</span>
                    <span className="g1-chip" style={{ animationDelay: "0.3s" }}>Traffic</span>
                    <span className="g1-chip" style={{ animationDelay: "0.6s" }}>Funnel</span>
                    <span className="g1-chip" style={{ animationDelay: "0.9s" }}>Sales</span>
                  </div>
                  <div className="g1-stream">
                    <i style={{ animationDelay: "0s" }} />
                    <i style={{ animationDelay: "0.42s" }} />
                    <i style={{ animationDelay: "0.85s" }} />
                    <i style={{ animationDelay: "1.27s" }} />
                  </div>
                  <div className="g1-core">
                    <svg className="w-[26px] h-[26px] stroke-[#C9F23A] fill-none stroke-[1.7] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <rect x="7" y="7" width="10" height="10" rx="2" />
                      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
                    </svg>
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 01
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                  We map your business
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  We audit your offer, your traffic and your funnel to find the one constraint holding your revenue back.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={100}>
            <article className="h-full rounded-2xl border border-[#2B2B2E] bg-[#141416] p-7 flex flex-col justify-between">
              <div>
                {/* Step Gfx 2 */}
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#0D0D0F] border border-[rgba(201,242,58,0.18)] shadow-[0_0_30px_rgba(201,242,58,0.22)] mb-6 flex items-center justify-between px-4">
                  <div className="g2-wave">
                    {[
                      { h: 44, d: -0.825 },
                      { h: 43, d: -0.8 },
                      { h: 42, d: -0.775 },
                      { h: 40, d: -0.75 },
                      { h: 39, d: -0.725 },
                      { h: 38, d: -0.7 },
                      { h: 37, d: -0.675 },
                      { h: 36, d: -0.65 },
                      { h: 34, d: -0.625 },
                      { h: 33, d: -0.6 },
                      { h: 32, d: -0.575 },
                      { h: 31, d: -0.55 },
                      { h: 29, d: -0.525 },
                      { h: 28, d: -0.5 },
                      { h: 27, d: -0.475 },
                      { h: 26, d: -0.45 },
                      { h: 25, d: -0.425 },
                      { h: 23, d: -0.4 },
                      { h: 22, d: -0.375 },
                      { h: 21, d: -0.35 },
                      { h: 20, d: -0.325 },
                      { h: 19, d: -0.3 },
                      { h: 17, d: -0.275 },
                      { h: 16, d: -0.25 },
                      { h: 15, d: -0.225 },
                      { h: 14, d: -0.2 },
                      { h: 12, d: -0.175 },
                      { h: 11, d: -0.15 },
                      { h: 10, d: -0.125 },
                      { h: 9, d: -0.1 },
                      { h: 8, d: -0.075 },
                      { h: 6, d: -0.05 },
                      { h: 5, d: -0.025 },
                      { h: 4, d: 0 }
                    ].map((w, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          height: `${w.h}px`, 
                          animationDelay: `${w.d}s` 
                        }} 
                      />
                    ))}
                  </div>
                  <div className="g2-ai">
                    <svg className="w-[26px] h-[26px] stroke-[#C9F23A] fill-none stroke-[1.7] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <path d="M20 13.5a2 2 0 0 1-2 2H9l-4 3.5V6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
                      <path d="M8.5 9.5h7M8.5 12h4.5" />
                    </svg>
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 02
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                  We install the systems
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Offer, Instagram ads, DM setting and closing. We build the machines that fill your calendar predictably.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={200}>
            <article className="h-full rounded-2xl border border-[#2B2B2E] bg-[#141416] p-7 flex flex-col justify-between">
              <div>
                {/* Step Gfx 3 */}
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#0D0D0F] border border-[rgba(201,242,58,0.18)] shadow-[0_0_30px_rgba(201,242,58,0.22)] mb-6">
                  <div 
                    className="g3-conveyor transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      transform: animating ? "translateY(-42px)" : "translateY(0)"
                    }}
                  >
                    {stack.map((item, idx) => {
                      const isNewest = idx === stack.length - 1;
                      return (
                        <div 
                          key={`${item.handle}-${idx}`} 
                          className={`g3-item ${isNewest && flashLast ? "flash" : ""}`}
                        >
                          <span className="ck">&#10003;</span>
                          Booked call
                          <small>{item.handle} &middot; {item.time}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 03
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                  You scale, predictably
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Qualified calls hit your calendar every week, and we optimize the system with you as you grow.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
