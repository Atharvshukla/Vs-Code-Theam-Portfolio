import Head from "next/head";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const milestones = [
  {
    period: "2026 — Present",
    title: "Founding Engineer",
    company: "Mentorgain",
    description:
      "Building the platform from the ground up — architecture, product, and engineering culture. Taking an idea from zero to one.",
  },
  {
    period: "2022 — 2026",
    title: "B.Tech Computer Science",
    company: "VIT, Vellore",
    description:
      "Studied Computer Science, explored full-stack development, cloud computing, blockchain, and competitive programming.",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },

  { category: "Backend", items: ["Node.js", "NestJS", "Express", "PostgreSQL", "Redis"] },
  { category: "AI & Data", items: ["Machine Learning", "RAG", "PgVector", "Python", "LLMs"] },
  { category: "Full Stack", items: ["MERN Stack", "Next.js", "TypeScript", "REST APIs"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Vercel", "New Relic"] },
  { category: "Other", items: ["Solidity", "IPFS", "Git"] },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — Atharv Shukla</title>
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <p className="text-sm text-accent font-medium tracking-wider uppercase mb-3">
              About
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-100 mb-8">
              The story so far
            </h1>
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none mb-20">
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                I&apos;m Atharv Shukla — a founding engineer at Mentorgain, where
                I&apos;m building the future of mentorship from the ground up. I
                care deeply about crafting products that solve real problems, and
                I believe the best software comes from engineers who understand
                both the code and the people it serves.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                My journey started with curiosity — tinkering with code as a
                student at VIT, building everything from expense trackers to
                decentralized applications. That curiosity evolved into
                conviction: I want to be at the earliest stages of building
                products, where every decision matters and every line of code
                shapes the future.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                As a founding engineer, I wear many hats — architect, product
                thinker, DevOps engineer, and sometimes designer. I write about
                this journey because I believe the founding engineer role is one
                of the most unique and underexplored in tech.
              </p>
            </div>
          </AnimatedSection>

          {/* Journey */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-display text-2xl font-semibold text-zinc-100 mb-8">
              Journey
            </h2>
          </AnimatedSection>

          <div className="space-y-6 mb-20">
            {milestones.map((milestone, i) => (
              <AnimatedSection key={milestone.title} delay={0.2 + i * 0.1}>
                <div className="glass-light rounded-xl p-6 group hover:border-zinc-600 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <span className="text-sm text-zinc-500 font-medium whitespace-nowrap pt-0.5 sm:w-36 shrink-0">
                      {milestone.period}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-zinc-100">
                        {milestone.title}
                      </h3>
                      <p className="text-accent text-sm mb-2">
                        {milestone.company}
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Skills */}
          <AnimatedSection delay={0.3}>
            <h2 className="font-display text-2xl font-semibold text-zinc-100 mb-8">
              Technical Skills
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {skills.map((skillGroup, i) => (
              <AnimatedSection key={skillGroup.category} delay={0.3 + i * 0.08}>
                <div className="glass-light rounded-xl p-6">
                  <h3 className="text-sm text-accent font-medium mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => {
                      const highlighted = ["NestJS", "React"].includes(skill);
                      return (
                        <span
                          key={skill}
                          className={`text-sm px-3 py-1.5 rounded-lg border ${
                            highlighted
                              ? "bg-accent/15 text-accent border-accent/30 font-medium"
                              : "bg-zinc-800/60 text-zinc-300 border-zinc-700/40"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors cursor-pointer"
              >
                Read about my journey
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <Link
                href="/contact"
                className="group flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors cursor-pointer"
              >
                Get in touch
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
