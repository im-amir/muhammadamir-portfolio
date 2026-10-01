import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";
import { projectJsonLd } from "@/lib/json-ld";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { TagList } from "@/components/ui/Tag";

// Only slugs from content.ts exist; anything else is a 404 at the edge.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function findProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.tagline}`;
  const url = `/projects/${project.slug}`;
  const images = [{ url: project.image.src, width: 1600, height: 1000, alt: project.image.alt }];

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: project.summary, images },
    twitter: { card: "summary_large_image", title, description: project.summary, images },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="py-12 sm:py-20">
      <JsonLd data={projectJsonLd(project)} />
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
        >
          <Icon name="arrowLeft" className="size-4" />
          All work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{project.tagline}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-6 text-lg text-muted">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.liveUrl.includes("github.com") ? "View on GitHub" : "Visit live site"}
              <Icon name="arrowUpRight" className="size-4" />
            </ButtonLink>
            {project.extraLink && (
              <ButtonLink href={project.extraLink.href} target="_blank" rel="noopener noreferrer" variant="secondary">
                {project.extraLink.label}
                <Icon name="arrowUpRight" className="size-4" />
              </ButtonLink>
            )}
          </div>
        </header>

        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1152px) 1088px, 100vw"
          preload
          className="mt-12 aspect-[8/5] w-full rounded-2xl border border-border bg-surface object-cover"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-12">
            <section aria-labelledby="problem-heading">
              <h2 id="problem-heading" className="text-2xl font-bold tracking-tight">
                The problem
              </h2>
              <p className="mt-4 text-lg text-muted">{project.problem}</p>
            </section>
            <section aria-labelledby="built-heading">
              <h2 id="built-heading" className="text-2xl font-bold tracking-tight">
                What I built
              </h2>
              <CheckList items={project.built} />
            </section>
            <section aria-labelledby="results-heading">
              <h2 id="results-heading" className="text-2xl font-bold tracking-tight">
                Results
              </h2>
              <CheckList items={project.results} />
            </section>
          </div>
          <aside className="h-fit space-y-6 rounded-2xl border border-border bg-surface p-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Tech stack</h2>
              <div className="mt-3">
                <TagList items={project.tags} label={`${project.title} tech stack`} />
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Need something similar?</h2>
              <p className="mt-2 text-sm text-muted">Let&apos;s talk about your project.</p>
              <ButtonLink href="/#contact" className="mt-4 w-full">
                Book a call
              </ButtonLink>
            </div>
          </aside>
        </div>

        <nav aria-label="Next project" className="mt-20 border-t border-border pt-10">
          <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col">
            <span className="text-sm text-muted">Next project</span>
            <span className="mt-1 inline-flex items-center gap-2 text-2xl font-bold group-hover:text-accent">
              {next.title}
              <Icon name="arrowRight" className="size-5" />
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg text-muted">
          <Icon name="check" className="mt-1.5 size-5 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
