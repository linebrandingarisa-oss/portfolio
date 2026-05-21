import type { ReactNode } from "react";
import { FadeIn } from "@/components/FadeIn";

type SectionHeadingWithCozyProps = {
  title: string;
  lead?: ReactNode;
  illustration: ReactNode;
  className?: string;
  leadClassName?: string;
};

export function SectionHeadingWithCozy({
  title,
  lead,
  illustration,
  className = "",
  leadClassName = "",
}: SectionHeadingWithCozyProps) {
  return (
    <FadeIn className={className}>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-10">
        <div
          className="flex shrink-0 justify-center text-purple-400/80 sm:justify-start [&_svg]:h-[4.75rem] [&_svg]:w-auto sm:[&_svg]:h-[5.75rem]"
          aria-hidden
        >
          {illustration}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
            {title}
          </h2>
          {lead != null ? (
            <div
              className={`mt-3 mx-auto w-full max-w-prose whitespace-pre-line text-sm leading-relaxed text-muted sm:mx-0 sm:text-base ${leadClassName}`.trim()}
            >
              {lead}
            </div>
          ) : null}
        </div>
      </div>
    </FadeIn>
  );
}
