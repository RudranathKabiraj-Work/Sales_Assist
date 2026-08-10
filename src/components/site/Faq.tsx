import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Who is this for?",
    a: "Coaches, consultants and course creators already doing at least $20k/month who want to scale to $100k+ with systems instead of hustle.",
  },
  {
    q: "What happens on the call?",
    a: "We look at your offer, traffic and funnel, find the #1 constraint holding you back, and map a clear plan to your next revenue level. No pressure, and no pitch unless it's genuinely a fit.",
  },
  {
    q: "Why should I listen to you?",
    a: "Over the last nine years I've built three separate seven-figure coaching businesses in three different niches. What I'll walk you through is the exact playbook, not recycled theory.",
  },
  {
    q: "Do you work in my niche?",
    a: "Almost certainly. I've scaled businesses across three very different niches, and the core systems – offer, traffic, DM setting and closing – work for virtually any coaching or consulting business.",
  },
  {
    q: "Is this just about AI setters?",
    a: "No. The AI appointment setter is one powerful piece. We work on your entire growth machine: your offer, Instagram ads, DM setting and your closing process.",
  },
  {
    q: "How fast will I see results?",
    a: "It depends on your starting point, but we fix the biggest bottleneck first. Most people feel a real difference within weeks, not months.",
  },
  {
    q: "I already have a team – can you help?",
    a: "Yes. We install the systems and processes your team plugs into, so they perform consistently without you babysitting them.",
  },
  {
    q: "Do I need a big audience?",
    a: "No, but you do need to already be getting some leads and making sales. This supercharges what's working – it won't build a business from scratch.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on your situation and exactly what you need. We'll cover it transparently on the call, once we both know it's a fit.",
  },
  {
    q: "How do I get started?",
    a: "Book a call below, answer a few quick questions and grab a time. We'll take it from there.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#EBEBEB] text-zinc-900 px-6 py-24 sm:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-lime inline-block shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold">
                  Questions
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                Anything else?
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Message me on Instagram at<br />
                <a
                  href="https://www.instagram.com/realryanwegner"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-medium text-zinc-900 hover:text-zinc-700"
                >
                  @realryanwegner
                </a>
                .
              </p>
            </Reveal>
          </div>

          {/* Right Column (FAQ items) */}
          <div className="lg:col-span-8">
            <div className="border-t border-zinc-300">
              {FAQS.map((f, i) => {
                const open = openIdx === i;
                return (
                  <div key={f.q} className="border-b border-zinc-300">
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-zinc-900 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold tracking-tight">{f.q}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-zinc-300 bg-zinc-200/50 text-[14px] text-zinc-700 transition-all duration-200 hover:bg-zinc-200 sm:h-7 sm:w-7 sm:text-[13px]">
                        {open ? "−" : "＋"}
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 text-sm leading-relaxed text-zinc-600">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
