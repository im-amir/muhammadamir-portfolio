import type { Metadata } from "next";
import { homeJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Work />
      <Services />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  );
}
