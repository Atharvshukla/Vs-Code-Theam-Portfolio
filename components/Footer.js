import Link from "next/link";
import { GitBranch, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { navLinks, site } from "./site";

const commit = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) || "local";
const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main";

const socials = [
  { href: site.github, label: "GitHub", icon: Github },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.leetcode, label: "LeetCode", icon: Code2 },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-700">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-fg">atharv shukla</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-dim">
            Founding engineer. I take products from an empty repository to production and stay
            on call for them afterwards.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-md border border-ink-700 text-fg-dim transition-colors hover:border-ink-500 hover:text-fg"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="label mb-4">navigate</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[13px]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-dim transition-colors hover:text-fg">
                  ./{l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">elsewhere</p>
          <ul className="space-y-2 font-mono text-[13px]">
            <li>
              <a href={site.resume} className="text-fg-dim transition-colors hover:text-fg">
                resume.pdf ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-fg-dim transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Editor-style status bar */}
      <div className="border-t border-ink-700 bg-ink-900/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 font-mono text-[11px] text-fg-dim sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <GitBranch size={11} /> {branch}@{commit}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> build passing
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js · Tailwind · Framer Motion</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
