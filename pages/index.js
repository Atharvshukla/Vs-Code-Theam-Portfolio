import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import projects from "../data/projects";
import blogPosts from "../data/blog";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] animate-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-600/8 rounded-full blur-[128px] animate-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400"
          >
            <Sparkles size={14} className="text-accent" />
            <span>Founding Engineer at Mentorgain</span>
          </motion.div>

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-6">
            <span className="text-zinc-100">Building </span>
            <span className="gradient-text italic">products</span>
            <br />
            <span className="text-zinc-100">that </span>
            <span className="gradient-text-warm italic">matter</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl mx-auto text-lg text-zinc-400 leading-relaxed mb-10"
          >
            I&apos;m Atharv Shukla — a founding engineer crafting the future of
            mentorship at Mentorgain. I write about building from zero to one,
            and everything I learn along the way.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-zinc-950 font-medium rounded-lg transition-all duration-300 cursor-pointer"
            >
              View Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/blog"
              className="group flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-medium rounded-lg transition-all duration-300 cursor-pointer"
            >
              Read the Blog
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-zinc-700 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-zinc-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-accent font-medium tracking-wider uppercase mb-2">
                Selected Work
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="group relative glass-light rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-500 cursor-pointer h-full flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-display font-semibold text-zinc-700 group-hover:text-zinc-600 transition-colors">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-zinc-100 mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function LatestPosts() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-accent font-medium tracking-wider uppercase mb-2">
                From the Blog
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100">
                Founding Engineer Chronicles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              All posts
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {latest.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block cursor-pointer">
                <article className="group glass-light rounded-xl p-6 hover:border-zinc-600 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-xs text-zinc-500 font-medium">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span className="text-xs text-zinc-600">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              All posts
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="relative glass rounded-2xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-600/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100 mb-4">
                Let&apos;s build something together
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                Whether you have an idea, want to collaborate, or just want to
                say hello — I&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:atharvshukla.dev@gmail.com"
                  className="group flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-zinc-950 font-medium rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Or find me on socials
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Atharv Shukla — Founding Engineer</title>
      </Head>
      <HeroSection />
      <FeaturedProjects />
      <LatestPosts />
      <ContactCTA />
    </>
  );
}
