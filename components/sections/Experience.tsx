import { experience, profile } from "@/data/content";
import { Section } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={`${profile.yearsOfExperience} years building for the web`}
      className="bg-surface"
    >
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <ol className="relative border-l border-border">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="reveal mb-10 ml-6 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute -left-1.5 mt-2 size-3 rounded-full border-2 border-surface bg-accent"
              />
              <p className="text-sm font-medium text-muted">{job.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{job.role}</h3>
              <p className="text-muted">
                {job.company} · {job.location}
              </p>
            </li>
          ))}
        </ol>
        <aside aria-label="Education and achievements" className="reveal space-y-6">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Education</h3>
            <p className="mt-2 font-semibold">{profile.education.degree}</p>
            <p className="text-muted">
              {profile.education.school} · {profile.education.period}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Achievement</h3>
            <p className="mt-2 font-semibold">{profile.achievement}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
