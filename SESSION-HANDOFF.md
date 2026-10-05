# Session handoff: Soto Growth Systems website, lead system and Growth Leak Score

Everything this Claude session did from Monday 28 September to Monday 5 October 2026, and everything still open.
**First action for whoever picks this up:** finish the Prospecting Console link-up (section 1 of "What remains"), then read the setup notes in `rsoto444/soto-growth-systems` CLAUDE.md under "## My setup".

> Written for Rich and for the next Claude session. Rich: the "What remains" list is your to-do list, with who does each item.

---

## The short version

- **sotogrowthsystems.com was rebuilt** from WordPress onto Next.js and Vercel. All 15 original pages were moved word for word, and it went live on Monday 28 September.
- **Leads flow into GoHighLevel** (SGS sub-account). The website form, the SMS consent and the booking calendar are all on GoHighLevel now. Calendly is gone.
- **Seven new money pages are live**, plus a retargeted Fractional COO page. A 30-page keyword map drives the build order.
- **The free Growth Leak Score was rebuilt inside the website** behind a contact gate, so nobody sees a score without leaving name, email and company. Every lead lands in GoHighLevel with the score and top leaks. The old address `growthleak.sotogrowthsystems.com` now serves the new version.
- **Prospecting console link-up:** half done. The website side is live. The console side is written and tested, but has to be applied by the console's own Claude session, because the live console's code is not on GitHub.

---

## Where everything lives

**Repositories (all `rsoto444` on GitHub)**

- **soto-growth-systems:** the website. Working branch `claude/ecstatic-dijkstra-eond0b`. "Publish" means pushing that branch to `main` as a fast-forward; Vercel deploys `main`.
  - The branch is 1 commit ahead of `main`: setup notes plus two tools, no site change. Nothing is waiting to go live.
  - Never force-push.
- **SGS:** this repo. It holds the SEO toolkit, this handoff and `console-growth-leak-handoff.md`. Working branch `claude/ecstatic-dijkstra-eond0b`.
- **sgs-app:** the old GitHub copy of the Prospecting Console. **It is a month behind the live console. Never deploy from it, and never connect Vercel to it.**
  - Its `main` now also carries the console link-up commit (`4ff32d3`) on that stale base. That's harmless, because nothing deploys from it.
- **Provo-SEO-Pros:** used only as a reference for working code. Never copy its facts onto SGS.

**Hosting and services**

- **Vercel (team Soto Growth Systems):**
  - **soto-growth-systems:** the website. Root Directory `website`, Production Branch `main`. Domains: sotogrowthsystems.com, www, and growthleak.sotogrowthsystems.com.
  - **sgs-app:** the Prospecting Console at prospecting.sotogrowthsystems.com. Not connected to Git; it's deployed by uploads from another Claude session.
  - **growth-leak-assessment:** the old score app. Its domain was removed and the project itself is untouched. Retire it only on Rich's yes.
- **Cloudflare DNS for sotogrowthsystems.com:**
  - root and www are CNAMEs to `8b4c65bacfa452ec.vercel-dns-016.com` (DNS only);
  - `growthleak` is a CNAME to the same target;
  - the WordPress backup is at `wp.sotogrowthsystems.com`, hidden from search engines.
- **GoHighLevel:** sub-account "Soto Growth Systems" (location `zm18Lm5Ivgd51TcsZMuJ`). **Never touch the Provo SEO Pros sub-account (`wSReZrJU6zJSHyQp5LDp`).**
- **Supabase:** the console's database. Project name not yet confirmed.
- **Secrets** live only in each repo's gitignored `.env` / `website/.env.local` and in Vercel. They are never committed and never written in chat. They are: the lead webhook, the Pexels key, the DataForSEO login, and the Growth Leak shared secret.

---

## What was done, in order

### 1. The website rebuild (Monday 28 September)

- **Moved all 15 WordPress pages word for word into Next.js.**
  - `code/import_wordpress.py` turns the WordPress export into `website/lib/wp-pages.json`. Every approved change is an exact-match entry in its CHANGES, SEO_META, MOVED and LINK_FIXES lists.
  - Pages written on the new site live in `website/content/pages/<slug>.html` and are listed in NEW_PAGES. A page marked "draft" stays off the live build unless the importer runs with `SGS_DRAFTS=1`.
- **Facts confirmed by Rich and recorded in setup notes:**
  - offers and prices "correct as is";
  - Fractional Growth Operator: $5,500 a month, 6-month minimum, no setup fee;
  - no appointment-setting service on SGS;
  - no client proof yet;
  - experience: Provo SEO Pros since 2001;
  - phone +1 833-854-0901, email contact@sotogrowthsystems.com, based in Provo, Utah;
  - hours: business days, Mountain Time;
  - SGS founded 2026.
- **Self-hosted fonts, logo, schema, Vercel Analytics and the SGS Rank Tracker script.**
- **SMS consent for toll-free verification:** an unticked, optional checkbox with Rich's exact wording; SMS sections added to the Privacy Policy and Terms of Use; screenshot saved as `sms-optin-screenshot.png`.

### 2. Leads and GoHighLevel

- **`/api/lead/`:**
  - a spam trap and email validation;
  - records SMS consent with its exact wording and timestamp;
  - forwards to the GoHighLevel inbound webhook;
  - normal forms then land on `/thank-you/`, which shows the booking calendar.
- **GoHighLevel workflow "Website Enquiry - sotogrowthsystems.com"** (built through Claude for Chrome):
  - Create/Update Contact;
  - 7 custom fields;
  - tag `website-enquiry`;
  - an SMS-consent branch (tags `sms-opt-in` or `sms-no-consent`);
  - an opportunity in Marketing Pipeline, stage New Lead;
  - an email alert to contact@sotogrowthsystems.com.
- **Booking:** calendar "SGS Strategy Call" (Google Meet) replaced Calendly everywhere.

### 3. Publishing, audit and fixes (Monday 28 to Tuesday 29 September)

- **Published to Vercel**, DNS moved, Search Console set up and the sitemap submitted.
- **Full-site audit** (`audit-report.md` / `.html`): score 83 to 87 after fixes.
  - The fixes: titles, H1s, internal links, schema, colour contrast, number badges, and a moved URL (`growth-os-implementation-draft-v2` to `growth-os-guided-implementation`).
  - Kept on Rich's call: 4 addresses without their keyword.
- **Six contradicting sentences fixed with Rich's approval:** Zoom changed to Google Meet, the "no phone" claim corrected, and the in-person meetings wording and the "no published street address" wording updated on Contact and Booking.

### 4. Google Business Profile (Tuesday 29 September)

- **Created, national service-area profile:**
  - name "Soto Growth Systems", category Business management consultant;
  - 20 service-area cities in Utah County and Salt Lake County;
  - phone, website, description and logo added.
- **The full plan is in `gbp-soto-growth-systems.md`.** 7 stock product photos are ready in `gbp-photos/`.
- **Waiting on Google's video verification** (see "What remains").

### 5. Keyword research

- **US data from DataForSEO** (Semrush has no API units). Business type: national brand, plus an in-person layer in Utah County and Salt Lake County.
- **Built in three passes:**
  - the first map;
  - the expand run (both on Tuesday 29 September);
  - an add run on Sunday 4 October, which added page 29 (business automation services) and page 30 (GoHighLevel expert).
- **Map files:** `keyword-map.md` and `keyword-map.html`, generated by `code/build_keyword_map.py` (edit its data, never the map by hand). DataForSEO calls go through `code/dfs.py`.
- **Status: 30 pages.** 7 written, 23 to build (2 service pages, 21 blog posts).

### 6. Money pages

**Fractional COO retarget, page 1 (Tuesday 29 September):**
- the existing `/fractional-growth-operator/` page got a new title, description and schema;
- "Fractional COO" was added to the headline;
- two FAQ answers were added, and two price contradictions fixed;
- Search Console baseline: zero clicks and zero impressions;
- re-measure on **Tuesday 10 November 2026** (see `optimization-log.md`).

**Six new service pages, all live, each scored 9 out of 10:**
- **Contractors:** `/construction-business-consultant/`
- **Business growth:** `/business-growth-consultant/`
- **CRM consulting:** `/crm-consulting-services/`
- **CRM implementation:** `/crm-implementation-services/`
- **Process improvement:** `/business-process-improvement-consultant/`
- **Small business:** `/small-business-consultant/`

The one real proof on these pages is Rich's own booking-flow audit story ("From our own audit"). There are no client numbers yet. Every page is in [the website registry](https://github.com/rsoto444/soto-growth-systems/blob/main/website-index.md), linked from the footer and in the sitemap.

**Facts Rich confirmed for these pages:**
- Rich worked with HVAC, solar, roofing and concrete businesses through Provo SEO Pros since 2001. SGS also takes plumbing and electrical owners, with no past-experience claim for those two.
- GoHighLevel is the only CRM SGS specializes in.
- What SGS migrates onto GoHighLevel: contacts, open deals, notes and history, plus reconnected forms, numbers and calendars. Confirmed per job.
- Process improvement covers the whole business (growth, delivery, finance, HR, admin), but **never** accounting, legal or HR advice. The Fractional Growth Operator stays growth-only.
- Reconnected forms, numbers and calendars are always tested before go-live (Rich said "keep").

### 7. The Growth Leak Score rebuild (Sunday 4 to Monday 5 October)

**Problem:** the old score app showed every result without asking for contact details, never fed GoHighLevel, and linked to the old Calendly.

**What changed:**
- **Rebuilt at `/growth-leak-score/`,** with the same 10 questions, answers and scoring copied word for word from the old app (`website/lib/growth-leak.ts`).
- **The score only appears after** name, business email, company and privacy consent. Phone and SMS consent are optional.
- **Each lead goes to GoHighLevel** with `form = growth_leak_score` plus the score, label, top three leaks and every answer.
- **GoHighLevel setup** (via Claude for Chrome, Monday 5 October):
  - four contact fields in a folder "Growth Leak Score";
  - the fields mapped in Create/Update Contact;
  - both alert emails show score, label and top leaks;
  - tag `growth-leak-score` added by an If/Else at the end of both existing paths. Not right after Create Contact, because that placement made other enquiries skip steps.
- **Every score button on the site** points at the new page.
- **The old address now serves the new version,** through `website/middleware.ts`. Other paths on that address redirect to the main site.
- **The old "Private by design" claim was replaced** with an honest note about where the answers go.

### 8. Prospecting console link-up, option 2: personal score links (Monday 5 October)

**Found:** setters were sending a third copy of the score, hosted on ChatGPT (`growth-leak-assessment.rsoto443.chatgpt.site`), which collects nothing.

**Website side, live and tested:**
- a personal link `/growth-leak-score/?p=<token>` sends the finished result to the console;
- it's signed with a shared secret;
- it never blocks the GoHighLevel lead;
- Vercel settings `GROWTH_LEAK_SECRET` and `CONSOLE_GROWTH_LEAK_URL` are set.

**Console side, written and tested but not live:**
- a personal link for each prospect, created on first need;
- drafts swap in the personal link automatically;
- a Growth Leak Score box on each prospect;
- later drafts use the prospect's top leaks;
- a secured receiving address.

**Why it isn't live:** the live console was deployed yesterday from code that isn't on GitHub (commit `c35e7f9`). The full change is in `console-growth-leak-handoff.md` in this repo, for the console's own Claude session to apply.

---

## What remains

Each item says who does it.

### 1. Finish the console link-up (most urgent)

- **Rich:** paste `console-growth-leak-handoff.md` into the console's Claude session and ask it to apply, test and deploy.
- **Rich or the console session:** run the three-line database change in the console's Supabase project **before** that deploy (the SQL is in the handoff).
- **Rich, after deploy:** copy a prospect's personal link, take the score with a "+test" email, and refresh the prospect. The score and top three leaks should appear.
- **Next session:** check `POST https://prospecting.sotogrowthsystems.com/api/growth-leak` with no secret. It must return 401; it returns 404 until the console change is live.
- **Rich:** turn off the ChatGPT-hosted score copy in your ChatGPT account once the console is updated.
- **Rich, decision:** have the console session push its code to GitHub, so the GitHub copy stops falling behind.

### 2. Close out the Growth Leak Score

- **Rich via Claude for Chrome:** the check of the second test contact is still to report. It should show the four Growth Leak fields, the `growth-leak-score` tag and the alert email lines. Then mark the test contact DND.
- **Rich:** mark "Test Person 5" DND or delete it (a test lead from Tuesday 29 September).
- **Rich, decision:** retire the old Vercel project `growth-leak-assessment`. Needs an explicit yes.
- **Optional:** the old app emailed people their results. A GoHighLevel email that sends the result to the person would bring that back.

### 3. Get new pages indexed

- **Rich via Claude for Chrome:** request indexing in Search Console for the six new service pages and `/growth-leak-score/`.
  - The prompt is in the chat history; it covers each URL and stops if the daily limit is hit.
  - The fractional COO page was already requested on Tuesday 29 September.
- **Next session:** the Search Console re-crawl check that was due around Friday 2 October is overdue. Ask Rich for a Pages report.

### 4. Build the rest of the map

- **Page 29, business automation services:** waiting on one answer from Rich. Which tools does SGS build automations in: GoHighLevel only; plus Zapier, Make or n8n; plus accounting or field-service software; or it depends on the job?
- **Page 30, GoHighLevel expert:** next. Rich chose SGS to own these searches, positioned as implementation for owner-led businesses, never hourly setup gigs.
- **21 blog posts (map pages 8 to 28):** none started. Each needs one real example from Rich to reach 9 out of 10.
- **Rich:** confirm a content pace (posts per week).

### 5. Google Business Profile

- **Rich:** finish Google's video verification.
- **Then Part 2,** per `gbp-soto-growth-systems.md`: hours (Monday to Friday, 9 to 5), secondary categories, services, products with the photos in `gbp-photos/`, attributes, and the booking link.
- **Rich:** send the attribute list Google offers, so each can get a yes or no.
- **Rich via Claude for Chrome:** consent wording on the GoHighLevel booking and checklist forms (prompt given on Tuesday 29 September).

### 6. Smaller open items

- **Rich:** send social profile links (LinkedIn, Facebook, Business Profile) for the schema's sameAs. This is the only on-page check waiting on Rich.
- **Rich:** confirm the alert emails actually arrive at contact@sotogrowthsystems.com.
- **Next session, Tuesday 10 November 2026:** re-measure the Fractional COO page in `optimization-log.md`.
- **Optional:**
  - split the footer's Offers column (11 links);
  - run the off-page SEO skill (`.claude/skills/offpage-seo`) for sotogrowthsystems.com, which hasn't been run yet.
- **Risk to fix:** the WordPress export the importer reads lives in this session's upload folder, not in the repo, so a new session can't re-run `code/import_wordpress.py` without it.
  - Ask Rich to re-upload it. Or decide whether to keep a copy in the repo; check it for personal data first.

---

## Rules every session follows here

- **Plain English**, no em dashes, no tables in files Rich reads. Copy-ready text goes in code blocks.
- **Nothing goes live without Rich saying "publish".** Never force-push. If `main` has commits the branch lacks, merge (never rebase) and say so.
- **Never delete anything without an explicit yes.** That includes pages, projects, contacts and the old score app.
- **Never invent proof, numbers, reviews or claims.** Ask, one question at a time. A page needs one real example to score 9.
- **Never rewrite Rich's copy.** Make the smallest insertion and show a before/after for his veto.
- **GoHighLevel:** SGS sub-account only. Test leads go to a stand-in webhook, never the real one, unless Rich submits them himself.
- **Before saying "done":** build, run `python3 code/check_page_done.py /path/ --port 4321` on a production build (`npx next start -p 4321`), run Lighthouse mobile 3 times, and screenshot at 1440 and 390 pixels wide.
- **Candidates:** never offer or send a Zoom link.
