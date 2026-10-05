# Handoff - Shop Local Provo

Everything built, decided and still open for shoplocalprovo.com, as of Monday 5 October 2026 (work ran Friday 2 to Saturday 3 October).
Written for whoever picks this up next, human or Claude. Read the first two sections, then jump to what you need.
**Next:** Rich posts the refreshed pinned post and the group rule change in the Provo Community Facebook group (copy-ready text is at the bottom). Every listing, and so every keyword win, starts there.

---

# ⛔ Needs Rich before anything else moves

- **Facebook group changes are not posted yet.** New rule, optional membership question, refreshed pinned post, weekly spotlight thread. Rich clicks every post and pin personally.
- **The first listings.** The site has no listings yet. A category stays hidden from Google until it has 3 real ones.
- **Rotate the DataForSEO API password.** It was pasted into chat once. It was never saved to a file or the repo.
- **Check Consent on Rich's own test contact.** Claude tried to clear it through GHL and the reply only confirmed the Referral Status change. If it still says "yes", clear it by hand.

---

# Where things stand

- **The site is live** at https://shoplocalprovo.com with the directory, forms, phone line, newsletter signup and community pages. It has no listings yet.
- **Lead handling works end to end.** Forms, the phone AI and the text bot all feed GoHighLevel (GHL) with a consent trail.
- **Listing invites are paused.** 20 HVAC owners were emailed. Results so far are clean.
- **The newsletter is staged, not sent.** Issue 1 is a draft in GHL, aimed at Tuesday 3 November 2026.
- **The keyword map is written.** It says where search demand is and where a new directory can realistically compete.

---

# What is live and where it lives

- **Code:** the Next.js site in `website/`. Production branch is `claude/fervent-hypatia-dh3osp`. Every push to it redeploys on Vercel (project "shoplocalprovo", team Soto Growth Systems).
- **Domain:** bare shoplocalprovo.com is primary, www redirects to it. DNS is at Namecheap.
- **CRM:** GHL, the "Provo SEO Pros" sub-account. Needs a location choice on every API call.
- **Sending domain:** send.provoseopros.com (Mailgun through GHL, DNS in Cloudflare). SPF, DKIM and DMARC all pass.
- **Phone line:** (385) 398-9367, the Shop Local Provo line.
- **Setup notes:** the "My setup" section of [CLAUDE.md](CLAUDE.md) has the long version of everything below.

---

# What was done, by area

## The site

- Built and launched a directory with 160 categories in 13 groups, search, business pages, add-business, get-matched, advertise, community, contact, about, privacy and terms.
- Add-business has a Google Maps lookup that pre-fills the owner's form. Only the Place ID may be stored long term, so the lookup fills a form and the site stores what the owner confirms.
- Prices: premium $29 a month or $290 a year, category sponsor $49 a month, home page sponsor $99 a month. They live in `lib/site.config.ts`.
- A category with fewer than 3 listings is noindexed and left out of the sitemap.
- Google flagged /add-business as a soft 404 early on. Content and a FAQ were added. Not yet checked in Search Console whether the flag cleared.
- Fixes along the way: a server bundling bug that returned errors on /contact and /search, and a suggestion list that reopened after a pick.

## Lead pipeline

- Every form posts to `/api/lead`, which forwards to a GHL webhook.
- The "Shop Local Provo - Website Submissions" workflow creates the contact, fills referral fields, adds tags, adds a **permanent note per submission** (type, category, listing, message, agreed to share, lead opt-in, community member, page), and emails Rich.
- The per-submission note is the consent record. The contact fields are not, because they only keep the latest or first value.
- Tested live with fake example.com submissions. All test contacts were deleted.

## Listing invites

- Owner-confirmed only. Nothing from the CRM goes on the site.
- 20 HVAC contacts invited in three sends, all tagged "directory-invite-sent". Results on the first 15: all delivered, 5 opened, no clicks, replies, bounces, unsubscribes or complaints.
- Chrome sent five emails in the third batch even though it was told to stop at the confirmation screen. All five are tagged now. One of them (Andrews Air SLC) looks like a Salt Lake business and was not meant to be included.
- Held back: 22 roofing, electrical and plumbing contacts carry setters' outreach tags. Rich said leave them alone. Spring Creek Mechanical also stays held.
- **Invites are paused** until Rich sees how these 20 do.

## Phone and voice AI

- A GHL voice agent answers the Shop Local Provo number. It takes messages, never quotes prices or recommends a business, and announces the recording.
- The number only answered after being unlinked and relinked on the agent's Deploy tab.
- A call-end workflow tags the contact, creates a task for Rich and sends an internal email. Proven on a real call.
- The agent saves name, email, phone, category, city, details and consent from calls.

## Text bot

- GHL Conversation AI bot "Shop Local Provo Text Assistant", on the 385 number only, in **Suggestive mode**. Rich approves every draft for one week (until about Saturday 10 October 2026).
- It discloses it is an AI, asks one question at a time, and asks permission once before sharing details with a business.
- Two bugs were fixed: it repeated the permission request after "not sure", and it failed to save category, city and details. The save problem was not fixed. Handover replaced it.
- A fifth handover scenario, "Agreed to share details", hands the chat to Rich after a yes, creates a task, adds the "human handover" tag and puts the bot to sleep for 24 hours.
- The older "Provo SEO Pros ChatBot" now covers only the 866 number.
- Proven end to end on Rich's own phone.

## Referrals

- Decision: Rich refers each lead by hand to ONE listed business (Option A). Later, an automatic version for premium listings only, once a category has 3 or more opted-in businesses (Option C).
- A business must have a **premium listing** and have opted in to leads before it gets a lead.
- The steps are in [referral-checklist.md](referral-checklist.md).
- Pay-per-lead is undecided.

## Newsletter

- Monthly, for **local business owners**.
- Signup box (email, optional business name, required consent tick) is live in the footer, on the home page and on /add-business.
- Signups go to their own GHL webhook and a separate published workflow, which tags "newsletter" and "shoplocalprovo" and notes the consent. No emails go out from it. Proven live.
- The site falls back to the main webhook if the newsletter webhook setting is missing.
- Issue 1 is a draft campaign in GHL. Rich still sets subject, sender, audience (only the "newsletter" tag) and schedule, and sends a test first.
- GHL charges a small fee per inbound webhook run.

## Facebook and the community group

- Rich is an admin of the private Provo Community group (about 4,100 members). The site says "4,000+".
- The "Provo Community member" badge only shows after Rich confirms membership.
- The group's rules currently do not allow business promotion, so a new rule is planned (see below).
- Claude declined, twice, to scrape the member list or mass-message members (see the section on rules).

## Keyword research

- Run with DataForSEO. The run cost under $0.15 and the account has about $46 left.
- Result is [keyword-map.md](keyword-map.md): 50 category pages in order, with primary and secondary keywords and a "what Google shows" section.
- Biggest Provo searches are restaurants, bakeries and dentists. Home services are small (plumbers about 210 a month, HVAC about 40).
- A Google check says restaurants, hotels, pizza and salons are dominated by big directories. The most realistic first categories are **plumbers, auto repair, bakeries and storage units**.
- Rich's GHL contacts are home services and agency prospects. None are restaurants, bakeries or dentists.

---

# What remains

## Rich's to do, in order

1. Post the Facebook group changes (text below). Unpin the old post first, do not delete it.
2. Do the one-to-one messages to plumbers, auto repair shops, bakeries and storage unit businesses found on Google Maps, one at a time, by hand.
3. Rotate the DataForSEO password. Check the Consent field on the test contact.
4. Decide the missed-call text-back (see open questions).
5. Around Tuesday 27 October 2026, finish and schedule newsletter issue 1.
6. Enable two-step login on the Vercel account. Chrome noticed none is set up.

## Claude can do next

- When a listing is submitted, add it to `website/data/listings.json` from exactly what the owner submitted. No badge until Rich confirms group membership.
- Read GHL for new "new-listing" contacts if Rich wants a daily check.
- Build the Facebook **comment-to-message** automation if Rich wants it (Page comments only, not the group). Needs the answers in the open questions.
- Draft the week-by-week category line for the spotlight thread.
- Check in Search Console whether the soft 404 flag on /add-business cleared.
- Category and city page work, and guides, once listings exist. Hold blog posts until then.

## Later

- Option C automatic referrals, once a category has 3 or more opted-in premium businesses.
- Decide pay-per-lead.
- A lawyer should review the privacy policy, terms and consent wording. Claude's wording is labelled "not legal advice".
- A chat widget on the site. Not built.
- The "needs-human" tag still cannot be attached to the handover scenarios in GHL's picker.
- Consider switching the text bot to Auto-pilot after a week of clean drafts.
- Keep a clean-up eye on the invite list as setters release their contacts.

---

# Open questions for Rich

- **Missed-call text-back:** the 385 number still sends "Hi this is Provo SEO Pros...". It is one shared account setting. Options were reword it neutrally, build a 385-only workflow, or leave it. Claude recommended leaving it. No answer yet.
- **Newsletter footer address:** marketing email needs a valid postal address. The draft uses GHL's address placeholder. Does the GHL business profile have one Rich is happy to show?
- **Facebook comment-to-message:** does a Shop Local Provo Facebook Page exist and is it connected to GHL? Which keyword (LISTING)? Which tag for commenters?
- **Newsletter send time:** Tuesday 3 November 2026 is the aim. The hour is open.
- **The stray text:** at 1:47 pm MDT on Saturday 3 October a text from the 385 number to Rich's cell contained instructions meant for Chrome. Rich is not sure whether they pasted it. Keep an eye out for repeats.

---

# Reminders already scheduled

- Two reminders were scheduled **inside this session** (Tuesday 27 October and Friday 30 October 2026, both 9:00 am Mountain). One reminds Rich to set up the newsletter send. One checks the "newsletter" list size and looks for test addresses.
- A new session may not receive them. If you are in a new session, recreate them.

---

# How to work here

## Rich's standing rules

- Open every command with a short roadmap. Never use em-dashes. No tables or raw data in files Rich opens. Plain words, one next action.
- Never invent proof, claims or numbers. Ask when something is missing.
- Every markdown file starts with three lines: what it is, when it was made, the one next action.
- Rich works by pasting Chrome prompts into Claude in Chrome and pasting Chrome's report back.
- Always ask clarifying questions. Put every copy-ready text in its own box.

## Compliance principles

- Listings are owner-confirmed. Nothing from the CRM goes on the site.
- A business only gets a lead after a **clear yes** in the conversation. A "not sure" is a no.
- No fake claims, urgency, or promises of results or timing.
- Do not scrape the Facebook member list or mass-message members. It breaks Facebook's rules, and GHL cannot message people who never contacted the Page. The compliant route is a Page post that people comment on.
- Never bypass a platform restriction.
- Rich's setters own the outreach tags (fb, li, ig, "status - contact now"). Do not invite those contacts.

## Chrome lessons

- Chrome has clicked send, and typed into a message box, when told not to. For anything that sends or posts, Chrome should stage only. Rich clicks the final button.
- Chrome stops when a prompt asks it to, which is useful. Say "stop if anything differs" every time.
- Edits to a published GHL workflow go live on save. A draft workflow silently drops webhook traffic, so publish it before pointing the site at it.

## GHL connection tips

- Every call needs the sub-account (location) id. Large results get saved to a file, so read them with a script, not on screen.
- Updating contact custom fields needs the key `field_value`. Notes, tasks and tags have their own operations.
- GHL capture actions in the bot only update empty fields. Do not rely on them for consent.

## DataForSEO

- Credentials belong in the environment settings as `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`. A new session picks them up. Never put them in a file.
- Cheap calls used: Google Ads volume (about 9 cents per 640 keywords), bulk difficulty, and live Google results (about a cent each).

---

# Copy-ready texts for the Facebook group

**Group rule to add** (Group settings > Group rules):

```
Business promotion: not allowed in posts, except in the pinned "Local business" thread and the weekly spotlight thread.
```

**Membership question** (optional, Group settings > Membership questions):

```
Do you own or run a local business? If yes, you can get a free listing at shoplocalprovo.com (optional).
```

**Refreshed pinned post:**

```
Do you own or run a business in Provo or Utah County?

We built a free local directory just for our community: shoplocalprovo.com

What you get with a free listing:
- Your business page with your hours, services and contact info
- A spot in the right category so neighbors can find you
- A "Provo Community member" badge, once we confirm you're in this group

It takes about 5 minutes. Start typing your business name and Google Maps fills in the details for you. You check them, change anything that's wrong, and submit.

(This is an admin post. Business promotion is otherwise not allowed in this group, and this thread is the one exception.)

Add your business here: https://shoplocalprovo.com/add-business?utm_source=facebook&utm_medium=group&utm_campaign=provo-community-refresh

You decide what gets listed. Nothing goes on the site without your OK.

Questions? Comment below and I'll answer.
```

**Weekly spotlight thread** (swap the category each week: plumbers, auto repair, bakeries, storage units):

```
Business spotlight: show us your business!

Own or run a local business in Provo or Utah County? Comment with:
1. Your business name
2. What you do, in a sentence
3. Your best tip for a neighbor who needs your service

Want a free listing on shoplocalprovo.com too? You can add it in about 5 minutes: https://shoplocalprovo.com/add-business?utm_source=facebook&utm_medium=group&utm_campaign=provo-community-spotlight

Be kind, be honest, and support local.
```

**One-to-one message** (sent by Rich by hand, never in bulk):

```
Hi, I'm Rich with Shop Local Provo, a free directory for Provo area businesses. I noticed [business name] and thought you'd be a good fit. A free listing takes about 5 minutes: https://shoplocalprovo.com/add-business. No obligation. Happy to answer questions.
```

---

# Files worth opening

- [CLAUDE.md](CLAUDE.md) - project rules and the long "My setup" log
- [keyword-map.md](keyword-map.md) - the 50 category pages in build order
- [referral-checklist.md](referral-checklist.md) - Rich's steps for each referral
- [website-index.md](website-index.md) - page registry
