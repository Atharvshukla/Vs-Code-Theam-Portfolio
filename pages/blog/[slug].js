import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import blogPosts from "../../data/blog";

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return { props: { post } };
}

export default function BlogPost({ post }) {
  if (!post) return null;

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.trim().split("\n");
    const elements = [];
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-2 text-zinc-300 mb-6 pl-2"
          >
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        flushList();
        // Skip h1 — we render the title separately
        continue;
      }

      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={i}
            className="font-display text-2xl font-semibold text-zinc-100 mt-10 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        );
        continue;
      }

      if (line.startsWith("**") && line.endsWith("**")) {
        flushList();
        elements.push(
          <h3
            key={i}
            className="font-display text-lg font-semibold text-zinc-200 mt-6 mb-2"
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
        continue;
      }

      if (line.startsWith("- ")) {
        inList = true;
        const text = line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1");
        listItems.push(text);
        continue;
      }

      if (line.startsWith("---")) {
        flushList();
        elements.push(
          <hr key={i} className="border-zinc-800 my-8" />
        );
        continue;
      }

      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        flushList();
        elements.push(
          <p key={i} className="text-zinc-500 italic mb-6">
            {line.replace(/^\*|\*$/g, "")}
          </p>
        );
        continue;
      }

      if (line.trim() === "") {
        flushList();
        continue;
      }

      flushList();
      // Regular paragraph — handle inline bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <p key={i} className="text-zinc-300 leading-relaxed mb-4">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="text-zinc-100 font-semibold">
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }

    flushList();
    return elements;
  };

  return (
    <>
      <Head>
        <title>{post.title} — Atharv Shukla</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors cursor-pointer mb-10"
            >
              <ArrowLeft size={16} />
              Back to blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Calendar size={14} />
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-100 leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Divider */}
          <motion.hr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-zinc-800 mb-12"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose-custom"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-zinc-800"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                All posts
              </Link>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(
                  `https://atharvshukla.dev/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-accent transition-colors cursor-pointer"
              >
                Share on Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
