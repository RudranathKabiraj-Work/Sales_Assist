import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Does SalesAssist replace my sales team?",
    a: "No. It makes them more productive.",
  },
  {
    q: "Will it work with my CRM?",
    a: "Yes.",
  },
  {
    q: "Does it support WhatsApp?",
    a: "Yes.",
  },
  {
    q: "How quickly can we get started?",
    a: "Usually within a few days.",
  },
  {
    q: "Is it suitable for my business?",
    a: "If your business depends on converting enquiries into customers, SalesAssist is designed for you.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-secondary text-zinc-900 px-6 py-24 sm:px-12 md:py-28">
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
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Have another query? Feel free to ask during our live demo call.
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
                      className="faq-body grid transition-all duration-300 ease-out"
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
