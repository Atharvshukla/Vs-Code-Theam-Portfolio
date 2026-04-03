const blogPosts = [
  {
    slug: "founding-engineer-week-one",
    title: "Week One as a Founding Engineer",
    excerpt:
      "What it actually feels like to walk into a startup on day one — no playbook, no legacy code, just a blank canvas and an overwhelming amount of possibility.",
    date: "2026-01-15",
    readTime: "5 min read",
    tags: ["Founding Engineer", "Startup Life"],
    featured: true,
    content: `
# Week One as a Founding Engineer

Walking into Mentorgain on day one felt different from any job I'd ever started. There was no onboarding doc, no Confluence wiki to read through, no "here's how we do things." Because there was no "how we do things" yet. That was my job to figure out.

## The Blank Canvas Problem

The first thing I realized is that a blank canvas is both exhilarating and terrifying. Every decision you make in week one compounds. The database schema you choose, the folder structure you set up, the CI/CD pipeline you configure — these aren't just technical decisions. They're the foundation that everything else will be built on.

## What I Actually Did

- Set up the monorepo structure with Turborepo
- Configured CI/CD with GitHub Actions
- Made the first architectural decisions for our API layer
- Had about 47 conversations about product vision
- Wrote more docs than code (and that felt right)

## The Biggest Lesson

The most valuable skill in week one wasn't coding — it was listening. Understanding the founder's vision, the problem space, and where the product needs to be in 6 months matters more than any technical decision you'll make.

---

*This is the first in a series documenting my journey as a founding engineer at Mentorgain.*
    `,
  },
  {
    slug: "architecture-decisions-that-matter",
    title: "Architecture Decisions That Actually Matter at a Startup",
    excerpt:
      "Not every architectural decision deserves a meeting. Here's how I learned to distinguish the ones that matter from the ones that don't.",
    date: "2026-02-01",
    readTime: "8 min read",
    tags: ["Architecture", "Engineering"],
    featured: true,
    content: `
# Architecture Decisions That Actually Matter at a Startup

After a month at Mentorgain, I've made hundreds of technical decisions. Most of them don't matter. A few of them matter enormously. Here's how I've learned to tell the difference.

## The Two-Way Door Framework

Jeff Bezos talks about one-way and two-way door decisions. In engineering:

**One-way doors (be careful):**
- Database choice and schema design
- API contract design for external consumers
- Authentication architecture
- Data privacy and compliance patterns

**Two-way doors (move fast):**
- UI component library choice
- Internal API naming conventions
- Folder structure
- Testing framework

## Our Stack Decisions

We went with Next.js, PostgreSQL, and AWS. Not because they're trendy — because they're boring in the best way. At a startup, you want your infrastructure to be the most boring part of your day.

## The Real Lesson

The best architecture is the one that lets you move fast today without painting yourself into a corner tomorrow. That's it. That's the whole framework.
    `,
  },
  {
    slug: "building-from-zero-to-one",
    title: "Building from 0 to 1: The First 90 Days",
    excerpt:
      "A retrospective on my first three months as a founding engineer — the wins, the mistakes, and everything I wish I'd known.",
    date: "2026-03-15",
    readTime: "10 min read",
    tags: ["Retrospective", "Founding Engineer"],
    featured: true,
    content: `
# Building from 0 to 1: The First 90 Days

Three months in. We have a product in beta, real users giving real feedback, and a codebase that I'm (mostly) proud of. Here's the retrospective.

## What Went Well

**Shipping early:** We got our MVP in front of users in 6 weeks. It was rough around the edges, but the feedback was invaluable.

**Documentation-first approach:** Every major decision got a short RFC. It felt slow at the time but saved us countless hours of "why did we do this?" conversations later.

**Hiring the second engineer:** Bringing someone else on at month two forced me to write better code, better docs, and think about developer experience.

## What I'd Do Differently

**Over-engineered the auth system:** I built a custom auth layer when we could have used a managed service for the first 6 months. Two weeks of work that didn't need to happen yet.

**Underestimated DevOps:** Setting up proper staging environments, preview deployments, and monitoring took longer than expected. Should have prioritized this in week one.

## By The Numbers

- 847 commits
- 23 PRs merged
- 4 major features shipped
- 1 production incident (and a much better monitoring setup afterward)
- Countless cups of chai

## Looking Ahead

The next 90 days are about scale — both technical and organizational. We're growing the team, growing our user base, and growing the product. The foundation is solid. Now it's time to build.
    `,
  },
  {
    slug: "lessons-in-product-thinking",
    title: "Why Every Founding Engineer Needs Product Thinking",
    excerpt:
      "Code is the easy part. Understanding what to build and why — that's the real challenge of being a founding engineer.",
    date: "2026-04-01",
    readTime: "6 min read",
    tags: ["Product", "Founding Engineer"],
    featured: false,
    content: `
# Why Every Founding Engineer Needs Product Thinking

The biggest misconception about being a founding engineer is that it's primarily a technical role. It's not. It's a product role that happens to require deep technical skills.

## The Builder's Trap

Engineers love to build. Give us a problem and we'll architect a solution. But the founding engineer's job isn't just to build — it's to decide *what* to build and, more importantly, *what not to build*.

## How I Develop Product Intuition

1. **Talk to users weekly** — Not through surveys. Real conversations.
2. **Use your own product daily** — Dogfooding isn't optional.
3. **Study the metrics** — But don't let them make decisions for you.
4. **Question every feature request** — The user's problem is real. Their proposed solution usually isn't the best one.

## The Uncomfortable Truth

Sometimes the most valuable thing a founding engineer can do is say "we shouldn't build this." That takes more courage than any technical challenge.
    `,
  },
];

export default blogPosts;
