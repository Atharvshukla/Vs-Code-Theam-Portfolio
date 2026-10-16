const integrations = [
  {
    slug: "microsoft-teams",
    title: "Building a Multi-Tenant Microsoft Teams Integration from Scratch",
    subtitle:
      "A step-by-step guide to SSO, per-tenant manifests, and the gotchas nobody warns you about.",
    date: "2026-04-06",
    readTime: "15 min read",
    platform: "Microsoft Teams",
    platformIcon: "teams",
    status: "published",
    tags: ["Azure AD", "SSO", "OBO Flow", "Multi-Tenant", "Manifest"],
    featured: true,
    content: `If you're building a B2B SaaS product and need to bring it inside Microsoft Teams — with full SSO, multi-tenant support, and per-customer manifests — this guide walks through every step. Consider a scenario where your platform serves enterprises, each with their own subdomain, their own users, their own data silo. One day a customer asks, "Can we use this inside Microsoft Teams?" You might think it'll take a week.

It takes considerably longer. Here's what you need to know.

## Why Teams?

Enterprise users live in Teams. They don't want another tab. They don't want another login. They want to open Teams, click an icon, and be inside your product — already authenticated, zero friction.

For a B2B SaaS product, a Teams integration isn't a nice-to-have. It's how you go from "tool they use" to "tool they never leave."

## The Architecture in One Paragraph

A Teams app is surprisingly simple at its core: a manifest JSON file that tells Teams to load your web app in an iframe. That's it. Your existing web app runs inside Teams. The complexity is in everything around it — authentication, multi-tenancy, and the manifest itself.

## Step 1: The Manifest

A Teams manifest is a JSON file bundled in a zip with two icons (192x192 color, 32x32 outline). It declares who you are, what to load, what you need, and how auth works.

The \`contentUrl\` points to your web app. The \`webApplicationInfo\` block links to your Azure AD app registration. Looks straightforward. It isn't.

## Step 2: Single Sign-On (SSO)

This is where Teams gets genuinely clever. When your app loads inside the Teams iframe, you can call \`microsoftTeams.authentication.getAuthToken()\`. Teams hands you a JWT — no popup, no redirect, no user interaction.

But this token isn't a Graph API token. It's a Teams SSO token — scoped to your app's custom API. You need the **On-Behalf-Of (OBO) flow** to exchange it for a Graph API token.

### The OBO Flow

1. Your frontend gets the Teams SSO token
2. It sends this token to your backend
3. Your backend exchanges it with Microsoft's token endpoint
4. Microsoft returns a Graph API access token
5. You call \`GET /me\` to get the user's email
6. You match the email against your database
7. You issue your own session

The beauty: the user sees none of it. They open Teams, click your app, and they're in. No login screen. Pure SSO.

## Step 3: The Multi-Tenant Problem

Here's where it gets interesting. If you're building a single-tenant app, you're done. But if your app is multi-tenant — where each customer has their own subdomain — you run into a constraint.

**Teams requires that the \`resource\` URI in your manifest matches the domain of your \`contentUrl\`.** This means different customers need different resource URIs, and each must be registered in your Azure AD app registration.

The Azure Portal UI only shows one Application ID URI field. You might think you can only have one. You can have many — via the Microsoft Graph API. Important: it's a replacement operation, not an append.

### Automating it

In production, you should build this into your tenant provisioning flow — when a new organization enables Teams integration, the backend automatically registers their identifier URI.

## Step 4: Pre-Authorized Applications

For SSO without consent popups, you need to pre-authorize the Teams client application IDs for your custom scope. Without this, every user sees a consent popup — which in an enterprise context, is a dealbreaker.

## Step 5: The Manifest as a Downloadable

Since each customer needs a unique manifest, build an admin endpoint that generates the manifest zip on the fly. The customer's IT team downloads and uploads it to their Teams Admin Center. No manual JSON editing.

## Gotchas That Cost Me Hours

**HTTPS everywhere** — Teams requires every URL in the manifest to use HTTPS. Any HTTP URL fails with a cryptic error.

**The iframe origin check** — The domain in your \`resource\` URI must match the domain serving your \`contentUrl\`. No generic URIs.

**Version bumps** — Updating an existing Teams app requires incrementing the \`version\` field. Same version number = rejected.

**Admin consent** — Enterprise users can't consent individually. A tenant admin needs to grant consent once.

**The \`common\` vs specific tenant endpoint** — Getting this wrong results in AADSTS errors that are surprisingly hard to debug.

## Permissions: Less Is More

Your app should request the bare minimum: \`User.Read\` (delegated) and \`access_as_user\` (custom SSO scope). That's it. Every permission you request is a question the customer's IT team has to answer.

## What I'd Do Differently

**Start with SSO, not OAuth redirects.** My first attempt used popup-based OAuth inside Teams. It worked but felt janky. SSO with OBO should be the default.

**Automate identifier URI registration from day one.** Don't manually add URIs for the first few customers before automating. Do it immediately.

**Build the manifest generator early.** Hand-crafting manifests is error-prone.

## The Payoff

The integration takes effort, but the result is transformative. Users go from "let me switch to the other tool" to "let me open the app in Teams." Engagement goes up. Support tickets about login issues go down. And when customers ask "do you integrate with Teams?" — the answer is yes, with SSO, in about ten minutes of IT setup time.

If you're building a B2B SaaS product and your customers use Microsoft 365, a Teams integration isn't optional anymore. It's table stakes.

— Atharv Shukla, Founding Engineer`,
  },
  {
    slug: "mixpanel-analytics",
    title: "Building Product Analytics Into a Multi-Tenant SaaS Platform with Mixpanel",
    subtitle:
      "How to instrument 140+ events across a multi-tenant React app — identity, multi-tenancy, and the event taxonomy nobody plans upfront.",
    date: "2026-04-06",
    readTime: "18 min read",
    platform: "Mixpanel",
    platformIcon: "mixpanel",
    status: "published",
    tags: ["Analytics", "Multi-Tenant", "React", "Event Taxonomy", "Redux"],
    featured: true,
    content: `If you're building a multi-tenant B2B SaaS platform — where each organization gets its own subdomain, its own users, its own data silo — you've probably reached a point where you have usage numbers and server logs, but not *understanding*.

Which features do people actually use? Where do they drop off during onboarding? Does anyone click "Explore Mentors" after the first week?

You need product analytics. This guide walks through how to instrument a multi-tenant React app with Mixpanel from scratch.

## Why Mixpanel?

When evaluating Amplitude, PostHog, and Mixpanel for a B2B SaaS product where you need to segment by organization, role, and feature area, Mixpanel wins on three fronts:

1. **Event-driven model** — Mixpanel thinks in events, not pageviews. For a platform where the interesting actions are "Session Requested" and "Goal Created," not "visited /dashboard," this matters.
2. **Identity management** — Mixpanel's \`identify\` and super properties make multi-tenant user tracking straightforward.
3. **Funnels and retention** — Need to answer "what percentage of invited users complete onboarding and book their first session?" Mixpanel's funnel builder handles this natively.

## The Architecture in One Paragraph

A thin helper module wraps the Mixpanel SDK, handles initialization with the org's tenant context, identifies users on login, and exposes a \`trackEvent()\` function. A React hook auto-tracks page views on route changes. Individual features call \`trackEvent()\` at meaningful moments — session booked, goal created, feedback submitted. That's the entire system.

## Step 1: The Helper Module

Everything flows through one file. This is deliberate — a single source of truth for analytics means a single place to add global properties, debug issues, or swap providers.

The key decisions:

**\`track_pageview: false\`** — Mixpanel's automatic pageview tracking counts every route change, including programmatic redirects during auth flows. You end up with noise. Build your own page tracking with human-readable names instead.

**\`persistence: "localStorage"\`** — The default is cookies. For a platform loaded inside iframes (like a Teams integration), cookies get blocked by third-party cookie policies. localStorage just works.

**\`tenant\` as a registered property** — Every single event automatically includes which organization it came from. Extract the tenant from the subdomain. This one line saves you from manually passing \`orgId\` to every \`trackEvent\` call.

## Step 2: Identity and Multi-Tenancy

When a user logs in, identify them and register super properties — \`orgId\`, \`orgName\`, \`tenant\`, and \`userRole\`. Every future event automatically carries this context.

### Why this matters for multi-tenancy

In a single-tenant app, you'd just identify the user and move on. In multi-tenant, you need to answer questions like:

- "How does engagement differ between Organization A and Organization B?"
- "Do mentors in large orgs behave differently from mentors in small orgs?"
- "Which organization has the highest onboarding completion rate?"

By registering org context as **super properties**, every event carries this automatically. In Mixpanel's UI, you can segment any report by organization without changing a single line of instrumentation code.

### The logout reset

\`mixpanel.reset()\` clears the identified user and all super properties. This is critical in a multi-tenant app — if User A logs out and User B logs into the same browser, you don't want User B's events attributed to User A. Call this on every logout.

## Step 3: Automatic Page Tracking

Rather than sprinkling \`trackEvent("Page Viewed")\` across every component, build a hook that maps route paths to human-readable names. One line in \`App.tsx\` and every route change shows up in Mixpanel as a "Page Viewed" event with a readable name. "/mentee-dashboard" becomes "Mentee Dashboard." Your product manager can read the data without a route-to-feature translation guide.

## Step 4: The Event Taxonomy

This is where most teams go wrong. They either track everything (and drown in noise) or track nothing meaningful (and can't answer basic questions).

Consider organizing your events into clear categories:

### Authentication lifecycle
\`User Signed Up → Invite Accepted → User Logged In → User Logged Out\`
Password resets, account deletions, social login clicks with provider context.

### Onboarding funnel
\`Survey Completed → Profile Photo Uploaded → Availability Set → Profile Updated\`

### Core platform loop
\`Mentor List Searched → Mentor List Filtered → Session Requested → Session Completed → Feedback Submitted\`

### Goals
\`Goal Created → Goal Progress Updated → Goal Shared → Goal Comment Added\`

### The naming convention

Every event follows **Noun + Past Tense Verb**: "Session Requested" not "Request Session." "Goal Created" not "Create Goal." The first word tells you the feature area, the second tells you the action. Three months in, you can find any event without searching.

### Properties carry context, not redundancy

User identity and org context are already in super properties. Event properties should carry *what's unique about this specific action* — the session mode, the filter applied, the goal type selected. Don't repeat what super properties already provide.

## Step 5: Where to Put trackEvent Calls

Follow one rule: **track at the point of success, not the point of intent.**

Tracking in Redux thunks (your async actions) means the event only fires if the API call succeeded, you have access to both request and response data, and there's one tracking call per action regardless of how many UI surfaces trigger it.

The exception is UI-specific interactions — opening a filter panel, switching tabs, playing a video. Those fire in component handlers because they're about the *interaction*, not a backend operation.

## Gotchas That Cost Me Hours

### 1. The initialization race condition
If \`trackEvent\` fires before \`init\` completes, events are silently dropped. Add token existence guards and make sure initialization happens before any tracking.

### 2. Super property staleness
Super properties persist in localStorage. If you add a new super property, existing users who don't log out and back in will never get it. Solution: re-register super properties on app initialization if the user is already authenticated, not just on login.

### 3. The PII question
Mixpanel stores everything you send. For enterprise customers with data residency requirements, this matters. Send emails and names (if approved) but never message content, session notes, feedback text, or free-form user input. Properties should be categorical or numerical, never content.

### 4. Event volume in autocapture
You might enable \`autocapture: true\` thinking it will give you free insights. It gives you thousands of "click" events with no useful context. For a complex SaaS app, autocapture generates noise. Keep it on for session recording but rely entirely on manual instrumentation for analytics.

### 5. The "both" role problem
If your users can hold multiple roles (e.g., mentor and mentee), which dashboard's events do you attribute to which role? Solve this by tracking the \`userRole\` at identification, and letting specific events carry their own context — the tab or view tells you which hat they're wearing.

## Reports That Actually Drive Product Decisions

After instrumenting 140+ events, here are the five reports worth building:

**1. Onboarding completion funnel** — \`Invite Accepted → Survey Completed → Availability Set → First Session Requested\`. This can reveal where users drop off. If a significant percentage bail between survey completion and setting availability, simplify the availability picker.

**2. Feature adoption by organization** — Segment any event by \`orgName\`. Instantly see which organizations use Goals, which use advanced features, and which just use basic session booking. This drives customer success conversations.

**3. Discovery to booking** — How many searches lead to bookings? Which filter combinations correlate with successful matches?

**4. Session lifecycle health** — The ratio of reschedules to completions is a leading indicator of platform health.

**5. Retention by role** — Weekly retention cohorts segmented by role. Users who don't get engaged in the first two weeks rarely come back. This insight can shape your matching algorithm.

## The Payoff

Before analytics, product decisions are based on customer calls and gut feel. After instrumentation, you can see that your most requested feature has significantly lower engagement than a feature nobody asked for. You can see that organizations with admin-driven onboarding have much higher activation rates than self-serve orgs.

The total instrumentation effort is about three days — one day for the infrastructure (helper, hook, initialization), two days for event placement across the codebase. The ongoing cost is near zero: adding a new event is one line of code in the relevant thunk.

If you're building a B2B SaaS product and you're past the "does anyone use this?" stage, structured product analytics isn't optional. It's how you stop guessing and start knowing.

— Atharv Shukla, Founding Engineer`,
  },
];

export default integrations;
