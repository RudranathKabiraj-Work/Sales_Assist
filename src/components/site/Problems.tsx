import { Reveal } from "./Reveal";

const PROBLEMS = [
  {
    title: "Slow Response",
    body: "Customers expect immediate replies.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[28px] h-[28px] overflow-visible">
        <circle cx="20" cy="20" r="12.5" stroke="#556331" strokeWidth="2.4" />
        <line
          className="pg-hand"
          x1="20"
          y1="20"
          x2="20"
          y2="10.5"
          stroke="#556331"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="1.7" fill="#556331" />
      </svg>
    ),
  },
  {
    title: "Inconsistent Follow-up",
    body: "Older opportunities disappear while new leads get attention.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#556331" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] overflow-visible">
        {/* Calendar icon outline */}
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        {/* Alert/Warning exclamation sign on calendar to mark inconsistency */}
        <path d="M12 14v2M12 18h.01" strokeWidth="3" className="pg-alert-blink" style={{ transformOrigin: "12px 16px" }} />
      </svg>
    ),
  },
  {
    title: "Too Much Manual Work",
    body: "Your team spends more time managing leads than selling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#556331" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px] overflow-visible">
        {/* Document clipboard / papers with lines to show manual work */}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" className="pg-shake" />
        <line x1="16" y1="17" x2="8" y2="17" className="pg-shake pg-shake2" />
        <polyline points="10 9 9 9 8 9" className="pg-shake pg-shake3" />
      </svg>
    ),
  },
  {
    title: "No Visibility",
    body: "Founders shouldn't have to ask if someone followed up.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-[28px] h-[28px] overflow-visible">
        <polyline
          fill="none"
          stroke="#556331"
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
        <circle cx="34" r="3" fill="#556331">
          <animate attributeName="cy" dur="3.4s" repeatCount="indefinite" values="22;16;27;13;22" />
        </circle>
      </svg>
    ),
  },
];

const REASONS = [
  {
    n: "01",
    title: "Capture every",
    em: "lead",
    body: "Website, WhatsApp, Google Ads, Meta Ads, forms, referrals and CRM. We ingest every channel instantly.",
  },
  {
    n: "02",
    title: "Execute every",
    em: "follow-up",
    body: "SalesAssist starts conversations instantly, qualifies prospects, books meetings and updates your CRM.",
  },
  {
    n: "03",
    title: "Close more",
    em: "business",
    body: "Your team spends time speaking with qualified buyers instead of chasing leads and cold prospects.",
  },
  {
    n: "04",
    title: "Clear outcome",
    em: "guaranteed",
    body: "Nothing gets forgotten. Nothing falls through the cracks. Every single opportunity reaches a definitive state.",
  },
];

export function Problems() {
  return (
    <>
      {/* 1. Problems Section (Dark) */}
      <section id="problems" className="bg-background text-foreground px-6 py-24 sm:px-12 md:py-28">
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

           /* Shaking animation for manual work lines */
          .pg-shake {
            animation: pgshake 1.8s ease-in-out infinite;
          }
          .pg-shake2 { animation-delay: 0.3s; }
          .pg-shake3 { animation-delay: 0.6s; }
          @keyframes pgshake {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          /* Bouncing animation for visibility arrow */
          .pg-bounce {
            animation: pgbounce 1.6s ease-in-out infinite;
          }
          @keyframes pgbounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }

          /* Alert blink for inconsistent calendar */
          .pg-alert-blink {
            animation: pgalert 1.5s ease-in-out infinite;
          }
          @keyframes pgalert {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}</style>

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-[42px] lg:text-[52px] font-bold tracking-tight text-foreground leading-[1.15]">
                You don't have a lead problem.<br />
                You have a <span className="custom-ul-capped">follow-up</span> problem.
              </h2>
              <p className="mt-6 text-[17px] sm:text-[19px] lg:text-[22px] leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                Every day businesses spend thousands on marketing to generate enquiries. Yet many potential customers never receive the attention they deserve. Every missed conversation is revenue left on the table.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="group h-full rounded-[22px] border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 shadow-sm">
                  <div className="flex-shrink-0 w-[46px] h-[46px] rounded-[12px] bg-[#556331]/10 text-[#556331] flex items-center justify-center mb-6">
                    {p.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Reasons Section / Introducing SalesAssist */}
      <section id="about" className="bg-white text-foreground px-6 py-24 sm:px-12 md:py-28 border-y border-border">
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
              <span className="font-mono text-xs font-bold text-lime uppercase tracking-wider">Introducing SalesAssist</span>
              <h2 className="text-3xl sm:text-[38px] lg:text-[50px] font-bold tracking-tight text-foreground leading-[1.15] mt-2">
                Your AI Sales <span className="custom-ul-olive">Execution Team</span>.
              </h2>
              <p className="mt-6 text-[17px] sm:text-[19px] lg:text-[22px] leading-relaxed text-muted-foreground max-w-2xl">
                Most businesses respond to low sales by buying more leads. The smartest businesses increase the value of every lead they already have. That's exactly what SalesAssist is built to do.
              </p>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 80}>
                <article className="h-full bg-white border border-border rounded-[20px] py-7 px-8 shadow-[0_14px_34px_rgba(0,0,0,0.02)] hover:bg-[#efefed]/35 transition-colors duration-300">
                  <span className="font-mono text-xs font-bold text-lime tracking-widest uppercase">
                    {r.n}
                  </span>
                  
                  <h3 className="mt-3.5 text-2xl font-bold tracking-tight text-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{r.title}</span>
                    <span className="bg-[#556331] text-white px-2 py-0.5 rounded-[6px] font-bold text-[22px] leading-normal inline-block">
                      {r.em}
                    </span>
                  </h3>
                  
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
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
