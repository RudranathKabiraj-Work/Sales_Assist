import { useCountUp, useReveal } from "@/hooks/use-reveal";

const STATS = [
  { value: 99, suffix: "%", label: "Lead Follow-up Coverage" },
  { value: 5, prefix: "< ", suffix: " Min", label: "Average First Response" },
  { value: 24, suffix: "×7", label: "AI Sales Execution", isTextSuffix: true },
  { value: 100, suffix: "%", label: "Pipeline Visibility" },
];

function Stat({
  value,
  prefix = "",
  suffix,
  label,
  start,
  isTextSuffix,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  start: boolean;
  isTextSuffix?: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <span className="text-[36px] sm:text-[40px] font-bold tracking-tight text-foreground leading-none">
        <span className="text-zinc-400 font-normal mr-1">{prefix}</span>
        {isTextSuffix ? `${value}${suffix}` : <>{n}{suffix}</>}
      </span>
      <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.12em] uppercase text-muted-foreground mt-2.5">
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
      className="border-t border-b border-border bg-white w-full px-6 py-[34px] md:px-12"
    >
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} start={visible} />
        ))}
      </div>
    </div>
  );
}
