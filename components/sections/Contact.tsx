import { contact, socials } from "@/data/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title={contact.heading} intro={contact.intro}>
      <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="reveal rounded-2xl border border-border p-6 sm:p-8">
          <ContactForm />
        </div>
        <div className="reveal">
          <h3 className="font-semibold">Prefer a direct line?</h3>
          <ul className="mt-4 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted transition-colors hover:text-accent"
                >
                  <Icon name={s.icon} />
                  <span>{s.icon === "mail" ? s.href.replace("mailto:", "") : s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
