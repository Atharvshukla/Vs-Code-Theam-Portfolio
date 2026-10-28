import Head from "next/head";
import { ArrowUpRight } from "lucide-react";
import { archive, flagship } from "../../data/projects";
import { Container, PageHeader, Reveal, SectionHeader, Stagger, StaggerItem } from "../../components/ui";
import ProjectShowcase from "../../components/project/ProjectShowcase";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — Atharv Shukla</title>
      </Head>

      <PageHeader
        path="projects"
        title="Products I designed, built and shipped end to end."
        description="Three production systems, each live on AWS with a public demo, a narrated walkthrough and a full case study: the architecture, the trade-offs and the bugs that taught me something."
      />

      <Container className="space-y-28 pb-24 md:space-y-36">
        {flagship.map((p, i) => (
          <ProjectShowcase key={p.slug} project={p} index={i} reverse={i % 2 === 1} />
        ))}
      </Container>

      <Container>
        <SectionHeader index="04" label="archive" title="Earlier work" description="Projects from university and before — where I learned most of what I now do for a living." />
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-ink-700">
            <div className="hidden grid-cols-[180px_1fr_240px_40px] gap-6 border-b border-ink-700 bg-ink-850 px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-fg-dim md:grid">
              <span>name</span>
              <span>description</span>
              <span>stack</span>
              <span />
            </div>
            <Stagger as="ul">
              {archive.map((a) => (
                <StaggerItem as="li" key={a.name} className="border-b border-ink-700 last:border-b-0">
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-2 px-5 py-4 transition-colors hover:bg-ink-850 md:grid-cols-[180px_1fr_240px_40px] md:items-center md:gap-6"
                  >
                    <span className="font-mono text-sm text-fg">{a.name}</span>
                    <span className="text-sm text-fg-muted">{a.description}</span>
                    <span className="font-mono text-[12px] text-fg-dim">{a.tags.join(" · ")}</span>
                    <ArrowUpRight size={15} className="hidden text-fg-faint transition-colors group-hover:text-fg md:block" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
