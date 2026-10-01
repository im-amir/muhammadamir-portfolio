import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/content";
import { Icon } from "@/components/ui/Icon";
import { TagList } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          className="aspect-[8/5] w-full bg-surface object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-accent">{project.tagline}</p>
        <h3 className="mt-1 text-xl font-semibold">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-muted">{project.summary}</p>
        <div className="mt-5">
          <TagList items={project.tags} label={`${project.title} tech stack`} />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-accent hover:underline">
            Case study <span className="sr-only">: {project.title}</span>
            <Icon name="arrowRight" className="size-4" />
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-foreground"
          >
            {project.liveUrl.includes("github.com") ? "View on GitHub" : "Live site"}
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            <Icon name="arrowUpRight" className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
