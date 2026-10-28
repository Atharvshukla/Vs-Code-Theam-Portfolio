import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { StatusDot, Tag, ease } from "../ui";

/** Poster that previews the muted demo on hover, framed as a browser window. */
function Preview({ project }) {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const start = () => {
    setHovering(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = project.video.chapters[2]?.t ?? 0;
      v.play().catch(() => {});
    }
  };
  const stop = () => {
    setHovering(false);
    videoRef.current?.pause();
  };

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={stop}
      className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40 transition-colors group-hover:border-ink-500"
    >
      <div className="flex h-8 items-center gap-3 border-b border-ink-700 bg-ink-850 px-3">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-500" />
          <span className="h-2 w-2 rounded-full bg-ink-500" />
          <span className="h-2 w-2 rounded-full bg-ink-500" />
        </div>
        <p className="flex-1 truncate rounded bg-ink-900 px-2 py-0.5 text-center font-mono text-[10px] text-fg-dim">
          {project.links.live.replace("https://", "")}
        </p>
      </div>
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={project.video.poster}
          alt={`${project.name} demo`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          src={project.video.src}
          muted
          playsInline
          loop
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur transition-opacity ${
            hovering ? "opacity-0" : "opacity-100"
          }`}
        >
          <Play size={10} className="fill-white" /> hover to preview
        </span>
      </div>
    </div>
  );
}

export default function ProjectShowcase({ project, index, reverse }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div style={{ y }} className={reverse ? "lg:order-2" : ""}>
        <Link href={`/projects/${project.slug}`} aria-label={`${project.name} case study`}>
          <Preview project={project} />
        </Link>
      </motion.div>

      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[12px]" style={{ color: project.color }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-ink-600" />
          <StatusDot color={project.color} label={project.status.toLowerCase()} />
        </div>
        <h3 className="text-4xl font-semibold tracking-tight text-fg">{project.name}</h3>
        <p className="mt-2 text-lg text-fg-muted">{project.tagline}</p>
        <p className="mt-5 line-clamp-3 text-pretty leading-relaxed text-fg-dim">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stackLine.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="group/btn inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-white"
          >
            Read the case study
            <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-850 px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-ink-500"
          >
            Live demo
            <ArrowUpRight size={15} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
