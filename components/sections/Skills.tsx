import { skills } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I use every day">
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.name} className="reveal">
            <dt className="font-semibold">{group.name}</dt>
            <dd className="mt-3">
              <TagList items={group.items} label={`${group.name} skills`} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
