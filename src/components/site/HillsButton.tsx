import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HillsButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "lime" | "dark";
};

export function HillsButton({
  children,
  className,
  variant = "lime",
  ...props
}: HillsButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "btn-hills inline-flex items-center justify-center",
        variant === "dark" && "btn-hills-dark",
        className,
      )}
    >
      <span className="btn-hills__scene" aria-hidden="true">
        <span className="btn-hills__sky" />
        <span className="btn-hills__glow" />
        <span className="btn-hills__mist" />
        <svg
          className="btn-hills__svg btn-hills__svg--far"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 120 V68 C28 58 46 42 78 48 C108 54 126 78 164 70 C198 62 214 34 252 40 C286 46 304 72 340 64 C368 58 384 48 400 52 V120 Z"
          />
        </svg>
        <svg
          className="btn-hills__svg btn-hills__svg--mid"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 120 V78 C36 66 58 48 96 56 C132 64 148 88 188 80 C226 72 244 46 286 54 C322 62 344 84 376 76 C390 72 396 70 400 70 V120 Z"
          />
        </svg>
        <svg
          className="btn-hills__svg btn-hills__svg--near"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 120 V90 C40 78 62 62 104 70 C144 78 166 98 210 90 C250 82 270 60 314 68 C348 74 372 92 400 86 V120 Z"
          />
        </svg>
        <span className="btn-hills__sheen" />
      </span>
      <span className="btn-hills__label">{children}</span>
    </a>
  );
}
