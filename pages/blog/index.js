import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import blogPosts from "../../data/blog";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — Atharv Shukla</title>
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <p className="text-sm text-accent font-medium tracking-wider uppercase mb-3">
              Blog
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-100 mb-4">
              Founding Engineer Chronicles
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-16">
              Writing about building products from scratch, the founding
              engineer journey, and everything I learn along the way at
              Mentorgain.
            </p>
          </AnimatedSection>

          {/* Posts */}
          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block cursor-pointer"
                >
                  <article className="group glass-light rounded-xl p-6 md:p-8 hover:border-zinc-600 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <time className="text-sm text-zinc-500 font-medium">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                          <span className="text-sm text-zinc-600">
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="font-display text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-3">
                          {post.title}
                        </h2>
                        <p className="text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                      />
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
