import { useEffect, useState } from "react";
import poster from "@/assets/vsl-poster.jpg";

const AVATARS = ["AR", "JK", "MP", "DL", "SB"];

export function Hero() {
  const [typedText, setTypedText] = useState("Without Living In Your DMs.");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const phrases = [
      "Without Living In Your DMs.",
      "With Systems, Not Hustle.",
      "Like The Top 1% Of Coaches.",
      "Predictably, Every Month."
    ];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedText(phrases[0]);
      return;
    }
    let pi = 0;
    let ci = phrases[0].length;
    let del = false;
    let timerId: ReturnType<typeof setTimeout>;

    function tick() {
      const full = phrases[pi];
      if (!del) {
        ci++;
        if (ci > full.length) {
          del = true;
          timerId = setTimeout(tick, 1600);
          return;
        }
        setTypedText(full.slice(0, ci));
      } else {
        ci--;
        setTypedText(full.slice(0, ci));
        if (ci <= 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          timerId = setTimeout(tick, 340);
          return;
        }
      }
      timerId = setTimeout(tick, del ? 40 : 75);
    }

    timerId = setTimeout(tick, 1700);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <section 
      id="top" 
      className="relative overflow-hidden px-4 pb-24 pt-24 sm:pt-28"
      style={{
        background: "radial-gradient(120% 100% at 50% -12%, #181a20 0%, #101014 50%, #121213 100%)"
      }}
    >
      {/* Inline styles matching the typewriter & layout structure of ryanwegner.com */}
      <style>{`
        .lh-title {
          font-size: clamp(34px, 5.6vw, 70px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          font-weight: 700;
          text-align: center;
          margin: 22px 0 0;
        }
        .lh-line1, .lh-type-line {
          display: block;
          white-space: nowrap;
        }
        .custom-ul-lime {
          position: relative;
          white-space: nowrap;
          z-index: 0;
        }
        .custom-ul-lime::after {
          content: "";
          position: absolute;
          left: calc(1% - 2px);
          right: 0%;
          bottom: calc(0.14em + 1px);
          height: 0.2em;
          background: #94b134;
          transform: rotate(-1deg);
          transform-origin: left center;
          z-index: -1;
        }
        .tw-caret {
          display: inline-block;
          width: 5px;
          height: 0.82em;
          background: #C9F23A;
          margin-left: 5px;
          vertical-align: -0.02em;
          border-radius: 2px;
          animation: cblink 1.05s steps(1) infinite;
        }
        @keyframes cblink {
          50% { opacity: 0; }
        }

        /* Scale the title down on mobile so each nowrap line fits on one
           line without overflowing the viewport (mirrors the original site). */
        @media (max-width: 640px) {
          .lh-title {
            font-size: clamp(16px, 5vw, 32px);
          }
        }

        /* Video player play button pulse effect */
        .vsl-play-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(201, 242, 58, 0.45);
          animation: vslpulse 2.2s ease-out infinite;
        }
        @keyframes vslpulse {
          0% {
            box-shadow: 0 0 0 0 rgba(201, 242, 58, 0.45);
          }
          70% {
            box-shadow: 0 0 0 26px rgba(201, 242, 58, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(201, 242, 58, 0);
          }
        }
      `}</style>

      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="lh-title">
          <span className="lh-line1">
            Scale Past <span className="custom-ul-lime">$100k/Month</span>
          </span>
          <span className="lh-type-line">
            <span>{typedText}</span>
            <i className="tw-caret" />
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          I help coaches and consultants install the exact systems I used to build three
          seven-figure businesses in three different niches, so you can scale without the chaos.
        </p>

        <div 
          className="vsl relative mx-auto mt-11 aspect-video max-w-[760px] overflow-hidden rounded-[20px] border border-[#2b2b2e] bg-[#0d0d0f]"
          style={{
            boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(201,242,58,0.05)"
          }}
        >
          {playing ? (
            <video
              src="https://vz-8e13198e-194.b-cdn.net/e4f2346b-e9c3-427a-bae0-a23f728ad463/play_1080p.mp4"
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-[10]"
            />
          ) : (
            <>
              {/* Dots Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[size:22px_22px] opacity-50 pointer-events-none z-[2]" />
              
              <img
                src={poster}
                alt="Ryan Wegner recording the VSL breakdown video in his studio"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03] z-[1]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/40 z-[2]" />
              
              <div className="mono-label absolute left-[18px] top-[16px] z-[4] flex items-center gap-[8px] text-[12px] tracking-[0.14em] uppercase text-[#9C9C9C]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#C9F23A]" />
                VSL · Ryan Wegner
              </div>
              
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-[22px] z-[4]"
                aria-label="Play video"
              >
                {/* Play button with pulsing ring effect */}
                <span className="vsl-play-btn relative w-[94px] h-[94px] rounded-full bg-[#C9F23A] flex items-center justify-center shadow-[0_0_50px_rgba(201,242,58,0.4)] transition-transform duration-150 hover:scale-105">
                  <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" className="translate-x-[2px]">
                    <path d="M9 6.5L18.5 12 9 17.5Z" fill="#141709" stroke="#141709" strokeWidth="3.2" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#F5F5F5]">
                  Click to play
                </span>
              </button>
            </>
          )}
        </div>

        <p className="mono-label mt-5 flex items-center justify-center gap-2 text-muted-foreground">
          <span className="text-lime">▶</span>
          How I help coaches scale to $100k+/month — the full breakdown
        </p>

        <a
          href="#start"
          className="mono-label mt-10 inline-flex items-center gap-2 rounded-xl bg-lime px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-8px_oklch(0.9_0.21_121/60%)]"
        >
          Book A Call With Me →
        </a>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <span
                key={a}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-lime font-mono text-[10px] font-bold text-primary-foreground"
              >
                {a}
              </span>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-sm tracking-widest text-lime">★★★★★</div>
            <div className="mono-label text-muted-foreground">
              Trusted by 120+ coaches &amp; consultants
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
