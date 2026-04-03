import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import projects from "../data/projects";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — Atharv Shukla</title>
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="mb-16">
              <p className="text-sm text-accent font-medium tracking-wider uppercase mb-3">
                Portfolio
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-100 mb-4">
                Things I&apos;ve Built
              </h1>
              <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                From startup products to personal experiments — a collection of
                projects that reflect my journey as an engineer.
              </p>
            </div>
          </AnimatedSection>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group glass-light rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-500 h-full flex flex-col"
                >
                  {/* Image area */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-display font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500 select-none">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display text-xl font-semibold text-zinc-100 mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
                      {project.link && project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
                        >
                          <ArrowUpRight size={15} />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
                        >
                          <Github size={15} />
                          Source
                        </a>
                      )}
                      {project.link === "#" && !project.github && (
                        <span className="text-sm text-zinc-500 italic">
                          Private project
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
