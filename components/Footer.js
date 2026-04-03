import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/atharvshukla",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/atharvshukla",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/atharvshukla",
    label: "Twitter",
  },
  {
    icon: Mail,
    href: "mailto:atharvshukla.dev@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="font-display text-lg font-semibold text-zinc-100 hover:text-accent transition-colors cursor-pointer"
            >
              Atharv Shukla
            </Link>
            <p className="text-sm text-zinc-500">
              Founding Engineer at Mentorgain
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-accent transition-colors duration-300 cursor-pointer p-2"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Atharv Shukla. Built with intention.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
