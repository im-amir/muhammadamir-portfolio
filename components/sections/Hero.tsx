import { hero, profile } from "@/data/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container>
        <p className="text-sm font-medium text-muted">
          {profile.name} · {profile.location} · {profile.locationNote}
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{hero.subline}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <Icon name="arrowRight" className="size-4" />
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
        <ul aria-label="Upwork track record" className="mt-12 flex flex-wrap gap-3">
          {hero.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-foreground"
            >
              <Icon name="check" className="size-4 text-accent" />
              {badge}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
