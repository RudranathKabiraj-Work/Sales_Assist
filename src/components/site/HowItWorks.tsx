import { useState, useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const G3_NOTIFICATIONS = [
  { handle: "Meta Ads", time: "now" },
  { handle: "WhatsApp", time: "1m" },
  { handle: "Google Ads", time: "3m" },
  { handle: "Website Form", time: "6m" },
  { handle: "CRM Ingest", time: "9m" }
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [stack, setStack] = useState([
    G3_NOTIFICATIONS[0],
    G3_NOTIFICATIONS[1],
    G3_NOTIFICATIONS[2]
  ]);
  const [animating, setAnimating] = useState(false);
  const [flashLast, setFlashLast] = useState(false);

  // Only start the animation interval when this section is visible —
  // prevents constant re-renders blocking iOS touch during initial load.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let noteIndex = 3;
    const interval = setInterval(() => {
      setAnimating(true);
      
      const t1 = setTimeout(() => {
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
  }, [inView]);

  return (
    <section ref={sectionRef} id="how" className="bg-white text-foreground px-6 py-24 sm:px-12 md:py-28 border-y border-border">
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
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 4px 8px;
        }
        .g1-chip::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #556331;
          box-shadow: 0 0 5px #556331;
        }
        .g1-chip:nth-child(1) { animation: g1chip-anim 3.4s ease-in-out infinite; }
        .g1-chip:nth-child(2) { animation: g1chip-anim 3.4s ease-in-out 0.3s infinite; }
        .g1-chip:nth-child(3) { animation: g1chip-anim 3.4s ease-in-out 0.6s infinite; }
        .g1-chip:nth-child(4) { animation: g1chip-anim 3.4s ease-in-out 0.9s infinite; }
        @keyframes g1chip-anim {
          0%, 100% { border-color: rgba(0,0,0,0.1); }
          12% { border-color: #556331; }
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
          background: #556331;
          box-shadow: 0 0 7px #556331;
          transform: translateY(-50%);
          animation: g1flow-anim 1.7s linear infinite;
        }
        .g1-stream i:nth-child(2) { animation-delay: 0.42s; }
        .g1-stream i:nth-child(3) { animation-delay: 0.85s; }
        .g1-stream i:nth-child(4) { animation-delay: 1.27s; }
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
          background: radial-gradient(circle, #eef8c8, #d4f080);
          border: 1.5px solid #556331;
          display: grid;
          place-items: center;
          box-shadow: 0 0 26px rgba(85, 99, 49, 0.35);
          z-index: 2;
          animation: g1pulse-anim 2s ease-in-out infinite;
        }
        @keyframes g1pulse-anim {
          0%, 100% { box-shadow: 0 0 20px rgba(85, 99, 49, 0.3); transform: scale(1); }
          50% { box-shadow: 0 0 30px rgba(85, 99, 49, 0.55); transform: scale(1.05); }
        }

        /* G2 Animation styles */
        .g2-wave {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
          margin-right: 18px;
          height: 50px;
          gap: 1.5px;
        }
        .g2-wave span {
          width: 2.2px;
          background: #556331;
          border-radius: 2px;
          transform-origin: center;
          animation: g2bar-anim 1.05s ease-in-out infinite;
          box-shadow: 0 0 4px rgba(85, 99, 49, 0.25);
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
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 9px;
          padding: 0 11px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 11.5px;
          color: var(--color-foreground);
          white-space: nowrap;
          transition: box-shadow 0.35s ease;
        }
        .g3-item.flash {
          box-shadow: 0 0 0 1px #94b134, 0 0 16px rgba(148, 177, 52, 0.3);
        }
        .g3-item .ck {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #556331;
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
          color: var(--color-muted-foreground);
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
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              A New Way to Grow.
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
              More Leads Won't Grow Your Business. Better Sales Execution Will.
            </p>
          </div>
        </Reveal>

        {/* Steps Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <Reveal>
            <article className="h-full rounded-2xl border border-border bg-white p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#f1f4f8] border border-[rgba(148,177,52,0.25)] shadow-[0_0_20px_rgba(148,177,52,0.15)] mb-6 flex items-center justify-between px-4">
                  <div className="g1-inputs">
                    <span className="g1-chip">Website</span>
                    <span className="g1-chip">WhatsApp</span>
                    <span className="g1-chip">Forms</span>
                    <span className="g1-chip">CRM Ingest</span>
                  </div>
                  <div className="g1-stream">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="g1-core">
                    <svg className="w-[26px] h-[26px] stroke-[#556331] fill-none stroke-[1.7] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <rect x="7" y="7" width="10" height="10" rx="2" />
                      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
                    </svg>
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 01
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  Capture Every Lead
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Website, WhatsApp, Google Ads, Meta Ads, forms, referrals and CRM. We pull them all into one place.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={100}>
            <article className="h-full rounded-2xl border border-border bg-white p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#f1f4f8] border border-[rgba(148,177,52,0.25)] shadow-[0_0_20px_rgba(148,177,52,0.15)] mb-6 flex items-center justify-between px-4">
                  <div className="g2-wave">
                    {[
                      { h: 44, d: -1.32 },
                      { h: 43, d: -1.28 },
                      { h: 42, d: -1.24 },
                      { h: 40, d: -1.20 },
                      { h: 39, d: -1.16 },
                      { h: 38, d: -1.12 },
                      { h: 37, d: -1.08 },
                      { h: 36, d: -1.04 },
                      { h: 34, d: -1.00 },
                      { h: 33, d: -0.96 },
                      { h: 32, d: -0.92 },
                      { h: 31, d: -0.88 },
                      { h: 29, d: -0.84 },
                      { h: 28, d: -0.80 },
                      { h: 27, d: -0.76 },
                      { h: 26, d: -0.72 },
                      { h: 25, d: -0.68 },
                      { h: 23, d: -0.64 },
                      { h: 22, d: -0.60 },
                      { h: 21, d: -0.56 },
                      { h: 20, d: -0.52 },
                      { h: 19, d: -0.48 },
                      { h: 17, d: -0.44 },
                      { h: 16, d: -0.40 },
                      { h: 15, d: -0.36 },
                      { h: 14, d: -0.32 },
                      { h: 12, d: -0.28 },
                      { h: 11, d: -0.24 },
                      { h: 10, d: -0.20 },
                      { h: 9, d: -0.16 },
                      { h: 8, d: -0.12 },
                      { h: 6, d: -0.08 },
                      { h: 5, d: -0.04 },
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
                    <svg className="w-[26px] h-[26px] stroke-[#556331] fill-none stroke-[1.7] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <path d="M20 13.5a2 2 0 0 1-2 2H9l-4 3.5V6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
                      <path d="M8.5 9.5h7M8.5 12h4.5" />
                    </svg>
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 02
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  Execute Every Follow-up
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SalesAssist starts conversations instantly, qualifies prospects, books meetings and updates your CRM.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={200}>
            <article className="h-full rounded-2xl border border-border bg-white p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-[140px] relative rounded-xl overflow-hidden bg-[#f1f4f8] border border-[rgba(148,177,52,0.25)] shadow-[0_0_20px_rgba(148,177,52,0.15)] mb-6">
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
                          Lead Ingested
                          <small>{item.handle} &middot; {item.time}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-lime font-bold">
                  Step 03
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  Close More Business
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your team spends time speaking with qualified buyers instead of chasing cold leads and manually sending follow-ups.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
