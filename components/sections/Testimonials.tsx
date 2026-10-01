import { testimonials, upworkStats } from "@/data/content";
import { Section } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="What clients say" className="bg-surface">
      <dl className="reveal mb-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {upworkStats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="mt-1 text-2xl font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.quote} className="reveal">
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
              <blockquote className="flex-1 text-lg">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-muted">— {t.author}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
