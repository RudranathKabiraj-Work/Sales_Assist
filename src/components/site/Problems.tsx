import { Reveal } from "./Reveal";

const PROBLEMS = [
  {
    title: "Unpredictable income",
    body: "Some months are huge, others fall flat. With no system feeding your calendar, revenue is a rollercoaster you can't plan around.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[28px] h-[28px] overflow-visible">
        <circle cx="20" cy="20" r="12.5" stroke="#ff6b6b" strokeWidth="2.4" />
        <line
          className="pg-hand"
          x1="20"
          y1="20"
          x2="20"
          y2="10.5"
          stroke="#ff6b6b"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="1.7" fill="#ff6b6b" />
      </svg>
    ),
  },
  {
    title: "Everything runs through you",
    body: "You're the marketer, the setter, the closer and the coach. You've bought yourself a job, not a business.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[28px] h-[28px] overflow-visible">
        <rect x="7.5" y="7.5" width="25" height="25" rx="5" stroke="#ff6b6b" strokeWidth="2.2" />
        <circle className="pg-m" cx="15" cy="15" r="2.2" fill="#ff6b6b" />
        <circle className="pg-m pg-m2" cx="25" cy="15" r="2.2" fill="#ff6b6b" />
        <circle className="pg-m pg-m3" cx="15" cy="25" r="2.2" fill="#ff6b6b" />
        <circle className="pg-m pg-m4" cx="25" cy="25" r="2.2" fill="#ff6b6b" />
      </svg>
    ),
  },
  {
    title: "Stuck at a ceiling",
    body: "You've plateaued and more hustle isn't moving the needle. You need leverage and systems, not more hours.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[28px] h-[28px] overflow-visible">
        <polyline
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="5,25 13,15 21,28 29,13 34,22"
        >
          <animate
            attributeName="points"
            dur="3.4s"
            repeatCount="indefinite"
            values="5,25 13,15 21,28 29,13 34,22; 5,18 13,27 21,14 29,24 34,16; 5,27 13,13 21,26 29,15 34,27; 5,15 13,24 21,16 29,28 34,13; 5,25 13,15 21,28 29,13 34,22"
          />
        </polyline>
        <circle cx="34" r="3" fill="#ff6b6b">
          <animate attributeName="cy" dur="3.4s" repeatCount="indefinite" values="22;16;27;13;22" />
        </circle>
      </svg>
    ),
  },
];

const REASONS = [
  {
    n: "01",
    title: "Proven, not",
    em: "theory",
    body: "Everything I show you is battle-tested in real businesses generating real revenue, not recycled guru advice.",
  },
  {
    n: "02",
    title: "Systems that",
    em: "compound",
    body: "We install repeatable machines for leads, calls and sales, so growth stacks month over month instead of resetting.",
  },
  {
    n: "03",
    title: "Built for",
    em: "coaches",
    body: "Offers, Instagram, DM setting and closing. The exact levers that scale coaching and consulting businesses specifically.",
  },
  {
    n: "04",
    title: "Move",
    em: "fast",
    body: "No six-month overhauls. We find the constraint and fix it, so you feel the difference in weeks, not quarters.",
  },
];

export function Problems() {
  return (
    <>
      {/* 1. Problems Section (Dark) */}
      <section id="problems" className="bg-[#121213] text-[#F5F5F5] px-6 py-24 sm:px-12 md:py-28 border-b border-[#2B2B2E]/50">
        {/* Custom inline style animations matching the website */}
        <style>{`
          .custom-ul-capped {
            position: relative;
            white-space: nowrap;
            z-index: 0;
          }
          .custom-ul-capped::after {
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

          /* Clock hand rotation */
          .pg-hand {
            transform-box: view-box;
            transform-origin: 20px 20px;
            animation: pgspin 2.4s linear infinite;
          }
          @keyframes pgspin {
            to { transform: rotate(360deg); }
          }

          /* Fade animation for dots */
          .pg-m {
            animation: pgfade 2.4s ease-in-out infinite;
          }
          .pg-m2 { animation-delay: .3s; }
          .pg-m3 { animation-delay: .6s; }
          .pg-m4 { animation-delay: .9s; }
          @keyframes pgfade {
            0%, 100% { opacity: 1; }
            50% { opacity: .12; }
          }
        `}</style>

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-[42px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.15]">
                A great coach with a <span className="custom-ul-capped">capped</span>
                <br className="max-sm:hidden" />
                business.
              </h2>
              <p className="mt-6 text-[17px] sm:text-[19px] lg:text-[22px] leading-relaxed text-[#9C9C9C] max-w-3xl mx-auto">
                The skills got you here. But without systems, growth
                <br className="hidden sm:inline" />
                stalls, income swings, and everything still runs through
                <br className="hidden sm:inline" />
                you.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="group h-full rounded-[22px] border border-[#2B2B2E] bg-[#1A1A1C] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#A6C82F]/30">
                  <div className="flex-shrink-0 w-[46px] h-[46px] rounded-[12px] bg-[#2a1414] text-[#ff6b6b] flex items-center justify-center mb-6">
                    {p.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight text-[#CFCFCF]">{p.title}</h3>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-[#9C9C9C]">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Reasons Section (Light - I've built this three times) */}
      <section id="about" className="bg-[#ECECEC] text-[#161616] px-6 py-24 sm:px-12 md:py-28">
        {/* Custom underline style */}
        <style>{`
          .custom-ul-olive {
            position: relative;
            white-space: nowrap;
            z-index: 0;
          }
          .custom-ul-olive::after {
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
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-[38px] lg:text-[50px] font-bold tracking-tight text-[#161616] leading-[1.15]">
                I've built this <span className="custom-ul-olive">three times</span>, in
                <br className="max-sm:hidden" />
                three niches.
              </h2>
              <p className="mt-6 text-[17px] sm:text-[19px] lg:text-[22px] leading-relaxed text-[#4C4C46] max-w-2xl">
                This isn't theory. It's the exact playbook behind three <br className="hidden sm:inline" />seven-figure coaching businesses.
              </p>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 80}>
                <article className="h-full bg-[#f6f6f4] border border-black/5 rounded-[20px] py-7 px-8 shadow-[0_14px_34px_rgba(0,0,0,0.04)] hover:bg-[#efefed] transition-colors duration-300">
                  <span className="font-mono text-xs font-bold text-[#5F7A0C] tracking-widest uppercase">
                    {r.n}
                  </span>
                  
                  <h3 className="mt-3.5 text-2xl font-bold tracking-tight text-[#161616] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{r.title}</span>
                    <span className="bg-[#C9F23A] text-[#141709] px-2 py-0.5 rounded-[6px] font-bold text-[22px] leading-normal inline-block">
                      {r.em}
                    </span>
                  </h3>
                  
                  <p className="mt-4 text-[15px] leading-relaxed text-[#4C4C46]">
                    {r.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
