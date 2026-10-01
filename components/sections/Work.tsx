import { projects } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Products I've helped build and ship"
      intro="From AI analytics to lending platforms for banks — a few projects I'm proud of."
      className="bg-surface"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
