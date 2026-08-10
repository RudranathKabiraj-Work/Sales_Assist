import { useState, useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const RANGES_DATA = [
  {
    label: "Last 7 days",
    pts: [30, 42, 36, 50, 44, 58, 52, 64, 60, 70, 66, 76],
    t: [64, 5, 41, 22, 17, 6, 8500, 26, 12000],
    d: ["+8%", "< 5m", "+5%", "+9%", "+14%", "+2%", "+15%", "+4%", "+18%"]
  },
  {
    label: "Last 14 days",
    pts: [22, 30, 26, 36, 32, 44, 40, 52, 48, 60, 64, 72],
    t: [128, 4, 73, 44, 34, 11, 16200, 28, 24000],
    d: ["+12%", "< 4m", "+6%", "+15%", "+21%", "+3%", "+18%", "+3%", "+21%"]
  },
  {
    label: "Last 30 days",
    pts: [34, 28, 42, 38, 52, 48, 60, 64, 58, 72, 78, 86],
    t: [296, 4, 121, 88, 71, 24, 39400, 31, 56000],
    d: ["+34%", "< 4m", "+12%", "+31%", "+26%", "+5%", "+24%", "+5%", "+32%"]
  },
  {
    label: "This month",
    pts: [26, 34, 32, 42, 46, 54, 50, 62, 68, 64, 74, 80],
    t: [214, 5, 98, 63, 52, 18, 28500, 29, 41000],
    d: ["+19%", "< 5m", "+8%", "+22%", "+18%", "+4%", "+16%", "+4%", "+25%"]
  }
];

const METRICS_LABELS = [
  "New Leads",
  "Response Time",
  "Active Conv.",
  "Qualified Opps",
  "Meetings Booked",
  "Follow-ups Pending",
  "Pipeline Value",
  "Conversion Rate",
  "Revenue Forecast"
];

const W = 420;
const H = 128;
const TOP = 12;
const BOT = 12;
const N = 12;

function getCoords(ptsArray: number[]) {
  return ptsArray.map((v, i) => [
    (i / (N - 1)) * W,
    H - BOT - (v / 100) * (H - TOP - BOT)
  ]);
}

function getSmoothPath(c: number[][]) {
  if (!c || c.length === 0) return "";
  let d = `M${c[0][0].toFixed(1)},${c[0][1].toFixed(1)}`;
  for (let i = 0; i < c.length - 1; i++) {
    const p0 = c[i - 1] || c[i];
    const p1 = c[i];
    const p2 = c[i + 1];
    const p3 = c[i + 2] || p2;

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

export function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIdx, setActiveIdx] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(1);
  const [animatedPts, setAnimatedPts] = useState<number[]>(RANGES_DATA[1].pts);
  const [animatedNums, setAnimatedNums] = useState<number[]>(RANGES_DATA[1].t);

  // Only start animations when section is visible — prevents main-thread
  // saturation on iOS during initial page load (which blocks touch input).
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
    let animationFrameId: number;
    const start = performance.now();
    const duration = 950;

    const startPts = [...animatedPts];
    const targetPts = RANGES_DATA[activeIdx].pts;

    const startNums = [...animatedNums];
    const targetNums = RANGES_DATA[activeIdx].t;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const nextPts = startPts.map((sVal, idx) => sVal + (targetPts[idx] - sVal) * ease);
      const nextNums = startNums.map((sVal, idx) => sVal + (targetNums[idx] - sVal) * ease);

      setAnimatedPts(nextPts);
      setAnimatedNums(nextNums);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeIdx, inView]);

  useEffect(() => {
    if (!inView) return;
    const cycleInterval = setInterval(() => {
      setDropdownOpen(true);
      const nextIdx = (activeIdx + 1) % RANGES_DATA.length;

      const t1 = setTimeout(() => {
        setHighlightIdx(nextIdx);
      }, 650);

      const t2 = setTimeout(() => {
        setActiveIdx(nextIdx);
      }, 1250);

      const t3 = setTimeout(() => {
        setDropdownOpen(false);
      }, 1750);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, 5500);

    return () => clearInterval(cycleInterval);
  }, [activeIdx, inView]);

  const coords = getCoords(animatedPts);
  const pathD = getSmoothPath(coords);
  const areaD = pathD ? `${pathD} L${W},${H} L0,${H} Z` : "";
  const lastCoord = coords[coords.length - 1] || [0, 0];

  return (
    <section ref={sectionRef} className="bg-background text-foreground px-6 py-[80px] sm:px-12" id="dashboard">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lime font-bold">
                Founder Dashboard
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
                Complete Visibility Over Every Lead.
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
                Know what is moving. Know what is stuck. Know what needs your attention. Track all metrics in real time.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Dashboard Widget */}
          <div className="lg:col-span-7 relative max-w-[580px] mx-auto w-full">
            <Reveal className="relative">
              {/* Top Edge Glow */}
              <div 
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "-100px",
                  left: "10%",
                  width: "80%",
                  height: "180px",
                  background: "radial-gradient(ellipse at center, rgba(201,242,58,0.15), rgba(201,242,58,0) 70%)",
                  zIndex: 0,
                  filter: "blur(20px)",
                }}
              />
              
              {/* Simulated Dashboard Container */}
              <div className="relative z-10 flex bg-white border border-border rounded-[18px] overflow-hidden shadow-[0_34px_70px_rgba(0,0,0,0.06)] select-none">

                {/* Dashboard Sidebar */}
                <aside className="w-[150px] shrink-0 bg-[#f1f4f8] border-r border-border p-4 flex flex-col max-sm:hidden">
                  <div className="font-sans font-bold text-[14px] text-foreground tracking-tight">
                    SalesAssist
                  </div>
                  <nav className="flex flex-col gap-0.5 mt-5">
                    <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-[#556331] text-white font-mono text-[9px] tracking-wide font-bold uppercase">
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      Dashboard
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-muted-foreground font-mono text-[9px] tracking-wide uppercase">
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Leads
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-muted-foreground font-mono text-[9px] tracking-wide uppercase">
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                        <path d="M3 6h18M6 12h12M10 18h4" />
                      </svg>
                      Opps
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-muted-foreground font-mono text-[9px] tracking-wide uppercase">
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                      </svg>
                      Settings
                    </div>
                  </nav>

                  <div className="mt-auto flex items-center gap-1.5 px-2 py-1 font-mono text-[8px] tracking-wider text-muted-foreground uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#556331]" />
                    Live Ops
                  </div>
                </aside>

                {/* Dashboard Main Area */}
                <div className="flex-1 min-w-0 p-4 pb-5 relative bg-white">

                  {/* Top Row: Head & Date Picker */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-mono text-[8.5px] tracking-widest text-lime uppercase m-0">
                        Workspace
                      </p>
                      <h3 className="font-sans font-bold text-base text-foreground mt-0.5 tracking-tight">
                        Analytics
                      </h3>
                    </div>

                    {/* Simulated Datepicker */}
                    <div className="relative">
                      <div className="font-mono text-[9.5px] text-muted-foreground border border-border rounded-lg px-2 py-1 flex items-center gap-1.5 bg-[#f1f4f8]">
                        <svg className="w-2.5 h-2.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                          <rect x="3" y="5" width="18" height="16" rx="2" />
                          <path d="M3 9h18M8 3v4M16 3v4" />
                        </svg>
                        <span>{RANGES_DATA[activeIdx].label}</span>
                        <span className="text-[#6E6E6E] text-[7px]">&#9662;</span>
                      </div>

                      {/* Datepicker Dropdown */}
                      {dropdownOpen && (
                        <div className="absolute right-0 top-[calc(100%+6px)] w-[130px] bg-white border border-border rounded-lg p-1 shadow-[0_15px_30px_rgba(0,0,0,0.08)] z-20 transition-all duration-200">
                          {RANGES_DATA.map((r, rIdx) => {
                            const isSelected = rIdx === activeIdx;
                            const isHighlighted = rIdx === highlightIdx;
                            return (
                              <div
                                key={r.label}
                                className={`flex items-center justify-between gap-2 px-2 py-1 rounded-md font-mono text-[9px] cursor-pointer transition-colors ${isSelected ? "text-foreground font-bold" : "text-muted-foreground"
                                  } ${isHighlighted ? "bg-secondary" : ""}`}
                              >
                                <span>{r.label}</span>
                                {isSelected && <span className="text-lime text-[8px]">&#10003;</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SVG Chart Area */}
                  <div className="h-[96px] w-full border border-border/80 rounded-xl overflow-hidden relative bg-[#f1f4f8]/30">
                    <svg className="w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#556331" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#556331" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>
                      <path d={areaD} fill="url(#dashFill)" />
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#94b134"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: "drop-shadow(0 0 5px rgba(148,177,52,0.3))" }}
                      />
                      <circle
                        cx={lastCoord[0]}
                        cy={lastCoord[1]}
                        r="4"
                        fill="#94b134"
                        style={{ filter: "drop-shadow(0 0 6px rgba(148,177,52,0.6))" }}
                      />
                    </svg>
                  </div>

                  {/* Dashboard Metrics Tiles */}
                  <div className="grid grid-cols-3 gap-2 mt-2.5">
                    {METRICS_LABELS.map((lbl, idx) => {
                      const val = animatedNums[idx] || 0;
                      // Format custom values for specific metrics like pipeline, response time
                      let displayedVal = String(Math.round(val));
                      if (lbl === "Response Time") {
                        displayedVal = `< ${Math.round(val)}m`;
                      } else if (lbl === "Pipeline Value" || lbl === "Revenue Forecast") {
                        displayedVal = `$${(Math.round(val) / 1000).toFixed(1)}k`;
                      } else if (lbl === "Conversion Rate") {
                        displayedVal = `${Math.round(val)}%`;
                      }

                      return (
                        <div
                          key={lbl}
                          className="bg-[#f1f4f8]/55 border border-border/80 rounded-lg p-2"
                        >
                          <p className="font-mono text-[7.5px] tracking-wider text-muted-foreground uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                            {lbl}
                          </p>
                          <p className="font-sans font-bold text-sm text-foreground mt-1 leading-none">
                            {displayedVal}
                          </p>
                          <span className="font-mono text-[8px] text-lime mt-1.5 inline-block font-semibold">
                            {RANGES_DATA[activeIdx].d[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Floating Chip A */}
              <div className="absolute z-20 top-[-16px] right-[-14px] flex items-center gap-2 bg-white text-foreground font-sans font-bold text-xs px-3.5 py-2.5 rounded-full shadow-[0_14px_30px_rgba(0,0,0,0.06)] border border-border animate-float-soft max-sm:hidden">
                <span className="w-[18px] h-[18px] rounded-full bg-[#556331] text-white flex items-center justify-center text-[10px] font-black">
                  ✓
                </span>
                Meeting Booked
              </div>

              {/* Floating Chip B */}
              <div className="absolute z-20 bottom-[-14px] left-[-16px] flex items-center gap-2 bg-white text-foreground font-sans font-bold text-xs px-3.5 py-2.5 rounded-full shadow-[0_14px_30px_rgba(0,0,0,0.06)] border border-border animate-float-soft [animation-delay:0.7s] max-sm:hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-[#556331] shadow-[0_0_0_3px_rgba(85,99,49,0.3)] animate-pulse" />
                Active Conversation
              </div>

            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
