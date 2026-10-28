import Head from "next/head";
import ArticleShell from "../../components/article/ArticleShell";
import { Tag } from "../../components/ui";
import blogPosts from "../../data/blog";

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const index = blogPosts.findIndex((p) => p.slug === params.slug);
  const post = blogPosts[index];
  const pick = (p) => (p ? { slug: p.slug, title: p.title } : null);
  return {
    props: { post, prev: pick(blogPosts[index - 1]), next: pick(blogPosts[index + 1]) },
  };
}

export default function BlogPost({ post, prev, next }) {
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} — Atharv Shukla</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <ArticleShell
        base="/blog"
        backLabel="all posts"
        slug={post.slug}
        title={post.title}
        description={post.excerpt}
        date={post.date}
        readTime={post.readTime}
        tags={post.tags}
        badges={post.featured ? <Tag className="border-accent/30 text-accent">★ pinned</Tag> : null}
        content={post.content}
        prev={prev}
        next={next}
        footerNote="— Atharv Shukla, founding engineer"
      />
    </>
  );
}
