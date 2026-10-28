import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { navLinks } from "./site";

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ onOpenPalette }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [router.asPath]);

  // Render the current route as a shell path: ~/projects/relay
  const path = router.asPath.split(/[?#]/)[0].replace(/\/$/, "");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "border-ink-700 bg-ink-950/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 font-mono text-sm">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-ink-600 bg-ink-850 text-[11px] font-semibold text-fg transition-colors group-hover:border-accent/60 group-hover:text-accent">
            AS
          </span>
          <span className="truncate text-fg-dim">
            <span className="text-fg">atharv</span>
            <span className="text-fg-faint">@</span>
            <span className="text-fg-muted">dev</span>
            <span className="text-fg-faint">:</span>
            <span className="text-accent">~{path}</span>
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent/80" />
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(router.pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 font-mono text-[13px] transition-colors ${
                  active ? "text-fg" : "text-fg-dim hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md border border-ink-600 bg-ink-800"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={onOpenPalette}
            className="ml-3 flex items-center gap-1.5 rounded-md border border-ink-600 bg-ink-850 px-2.5 py-1.5 font-mono text-xs text-fg-dim transition-colors hover:border-ink-500 hover:text-fg"
            aria-label="Open command palette"
          >
            <Command size={12} />K
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenPalette}
            className="rounded-md border border-ink-600 bg-ink-850 p-2 text-fg-dim"
            aria-label="Open command palette"
          >
            <Command size={14} />
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-md border border-ink-600 bg-ink-850 p-2 text-fg-dim"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-700 lg:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-0.5 px-5 py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm ${
                      isActive(router.pathname, link.href)
                        ? "bg-ink-800 text-fg"
                        : "text-fg-dim hover:bg-ink-850 hover:text-fg"
                    }`}
                  >
                    <span className="text-fg-faint">cd</span> ~{link.href}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
