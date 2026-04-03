import Head from "next/head";
import { Github, Linkedin, Mail, Twitter, MapPin, ArrowUpRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const socials = [
  {
    icon: Github,
    name: "GitHub",
    handle: "@atharvshukla",
    href: "https://github.com/atharvshukla",
    description: "Code & open source",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "Atharv Shukla",
    href: "https://linkedin.com/in/atharvshukla",
    description: "Professional network",
  },
  {
    icon: Twitter,
    name: "Twitter",
    handle: "@atharvshukla",
    href: "https://twitter.com/atharvshukla",
    description: "Thoughts & threads",
  },
  {
    icon: Mail,
    name: "Email",
    handle: "atharvshukla.dev@gmail.com",
    href: "mailto:atharvshukla.dev@gmail.com",
    description: "Direct line",
  },
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Atharv Shukla</title>
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <p className="text-sm text-accent font-medium tracking-wider uppercase mb-3">
              Contact
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-100 mb-4">
              Let&apos;s connect
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-4">
              I&apos;m always open to interesting conversations, collaborations,
              or just a friendly hello.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-16">
              <MapPin size={14} />
              <span>India</span>
            </div>
          </AnimatedSection>

          {/* Social cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
            {socials.map((social, i) => (
              <AnimatedSection key={social.name} delay={i * 0.08}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-light rounded-xl p-6 flex items-start gap-4 hover:border-zinc-600 transition-all duration-500 cursor-pointer block"
                >
                  <div className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/40 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                    <social.icon
                      size={22}
                      className="text-zinc-400 group-hover:text-accent transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-zinc-100 group-hover:text-accent transition-colors">
                        {social.name}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </div>
                    <p className="text-sm text-zinc-400 truncate">
                      {social.handle}
                    </p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {social.description}
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Direct email CTA */}
          <AnimatedSection delay={0.4}>
            <div className="glass rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-violet-600/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-zinc-100 mb-3">
                  Prefer email?
                </h2>
                <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                  Drop me a line and I&apos;ll get back to you as soon as I can.
                </p>
                <a
                  href="mailto:atharvshukla.dev@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-zinc-950 font-medium rounded-lg transition-all duration-300 cursor-pointer"
                >
                  <Mail size={18} />
                  atharvshukla.dev@gmail.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
