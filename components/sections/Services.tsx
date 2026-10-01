import { services } from "@/data/content";
import { Section } from "@/components/ui/Section";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      intro="End-to-end product development, from database design to the last pixel of the UI."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <li key={service.title} className="reveal rounded-2xl border border-border p-6">
            <span aria-hidden="true" className="text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-muted">{service.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
