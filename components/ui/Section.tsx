import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-28 ${className}`}>
      <Container>
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
          <h2 id={headingId} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
