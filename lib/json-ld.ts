import { profile, projects, seo, services, socials, type Project } from "@/data/content";
import { absoluteUrl, siteUrl } from "@/lib/site";

type JsonLdValue = string | number | boolean | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue };

const personId = `${siteUrl}/#person`;

const sameAs = socials.filter((s) => s.icon !== "mail").map((s) => s.href);

export function homeJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.title,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        image: absoluteUrl("/opengraph-image"),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "National University of Sciences and Technology (NUST)",
        },
        award: profile.achievement,
        knowsAbout: [...profile.mainStack, "SaaS development", "AI agents"],
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${profile.name} — ${profile.title}`,
        description: seo.description,
        url: siteUrl,
        image: absoluteUrl("/opengraph-image"),
        founder: { "@id": personId },
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
        },
        sameAs,
      },
      {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/projects/${p.slug}`),
          name: p.title,
        })),
      },
    ],
  };
}

export function projectJsonLd(project: Project): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image.src),
    keywords: project.tags.join(", "),
    sameAs: project.liveUrl,
    creator: { "@type": "Person", name: profile.name, url: siteUrl },
  };
}
