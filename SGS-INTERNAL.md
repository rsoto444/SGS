# SGS Internal Notes - SEO Agent Toolkit

## What this is

This repo is a clone of the free "SEO Agent" blueprint from Jono's YouTube
video ("The SEO Agent: 6 Ranking Problems, Solved For Free") and his public
repo: https://github.com/youtube-jono/seo-agent

It's seven Claude Code slash commands (`/keyword-research`, `/build-website`,
`/blog-post`, `/service-page`, `/seo-optimization`, `/publish`, `/audit`)
that take a business from no keywords to a live, optimized, indexed website,
plus an `/audit` mode for an existing site.

No business-specific data has been added. Everything here is the base
toolkit exactly as published - commands ask for real business facts
(services, cities, reviews, numbers) the first time they run, and refuse to
invent any of it (see the "Never invent proof" and "If you can't find it,
ASK" rules in `CLAUDE.md`).

**Attribution / licensing note:** the source repo has no LICENSE file. It's
publicly published as a free lead magnet with an explicit "clone it and use
it" instruction, which covers running this for our own or client sites. It
does not grant us the right to resell or redistribute the files themselves
as an SGS-branded product - if that's ever the plan, check with Jono/the
Skool community first rather than assuming.

## Using this as reusable client tooling

State from a run (business facts in `CLAUDE.md`'s "## My setup", the
generated `keyword-map.md`, `website-index.md`, and the built site under
`website/`) all live inside this one working directory - the toolkit was
built for one business per checkout, not multi-tenant.

So for each new client engagement:

1. Copy this whole folder to a new directory (or a new repo) named for the
   client - don't run a second business's `/keyword-research` inside this
   base checkout.
2. Keep *this* SGS repo as the clean, untouched template. Never let one
   client's business facts, keywords, or generated pages land here.
3. Semrush and Pexels connections/keys are per-environment (`.env`,
   Claude Code connector), so those get reconnected per client copy too.

## Requirements before running any command

- Claude Code with the Semrush connector added (Settings -> Connectors ->
  Semrush) - powers `/keyword-research` and `/audit`.
- A GitHub + Vercel account for `/publish` on the Next.js path, or a
  WordPress site with the Novamira plugin for the WordPress path.
- Real business inputs ready when asked: services offered, cities served,
  actual reviews/numbers, licence info if applicable. The toolkit will not
  fabricate any of this - see the hard rules in `CLAUDE.md`.

## Known limitations to keep in mind (per Rich's earlier feasibility review)

- This toolkit does not touch backlinks/domain authority - the single
  biggest ranking lever in competitive niches. Pair it with a real link
  strategy, don't treat it as the whole SEO plan.
- Perfect Lighthouse/AI-overview scores in one pass are not realistic -
  `CLAUDE.md` itself says most commands need multiple passes to reach 100.
- Programmatic city x service pages carry real doorway-page risk if not
  genuinely differentiated - `references/doorway-pages.md` has the "3-of-4
  local material test" this toolkit uses to guard against that. Don't skip
  it when generating city pages for a client.
