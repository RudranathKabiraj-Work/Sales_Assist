import { useCountUp, useReveal } from "@/hooks/use-reveal";

const STATS = [
  { value: 9, suffix: " yrs", label: "In the game" },
  { value: 3, suffix: "", label: "7-figure businesses" },
  { value: 3, suffix: "", label: "Different niches" },
  { value: 100, suffix: "+", label: "Coaches scaled" },
];

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <span className="text-[40px] font-bold tracking-tight text-[#C9F23A] leading-none">
        {n}
        <span>{suffix}</span>
      </span>
      <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#9C9C9C] mt-2">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <div 
      ref={ref}
      className="border-t border-b border-[#2B2B2E] bg-[#151516] w-full px-6 py-[34px] md:px-12"
    >
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} start={visible} />
        ))}
      </div>
    </div>
  );
}
