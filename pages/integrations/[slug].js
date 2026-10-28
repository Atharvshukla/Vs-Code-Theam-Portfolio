import Head from "next/head";
import { Plug } from "lucide-react";
import ArticleShell from "../../components/article/ArticleShell";
import { StatusDot } from "../../components/ui";
import integrations from "../../data/integrations";

export async function getStaticPaths() {
  const paths = integrations.map((i) => ({
    params: { slug: i.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const index = integrations.findIndex((i) => i.slug === params.slug);
  const integration = integrations[index];
  const pick = (p) => (p ? { slug: p.slug, title: p.title } : null);
  return {
    props: {
      integration,
      prev: pick(integrations[index - 1]),
      next: pick(integrations[index + 1]),
    },
  };
}

export default function IntegrationPost({ integration, prev, next }) {
  if (!integration) return null;

  return (
    <>
      <Head>
        <title>{integration.title} — Atharv Shukla</title>
        <meta name="description" content={integration.subtitle} />
      </Head>
      <ArticleShell
        base="/integrations"
        backLabel="all integrations"
        slug={integration.slug}
        title={integration.title}
        description={integration.subtitle}
        date={integration.date}
        readTime={integration.readTime}
        tags={integration.tags}
        badges={
          <>
            <span className="inline-flex items-center gap-2 rounded-md border border-ink-600 bg-ink-850 px-2.5 py-1 font-mono text-[12px] text-fg">
              <Plug size={12} className="text-accent" />
              {integration.platform}
            </span>
            <StatusDot label="live in production" />
          </>
        }
        content={integration.content}
        prev={prev}
        next={next}
        footerNote="— Atharv Shukla, founding engineer"
      />
    </>
  );
}
