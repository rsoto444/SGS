---
description: Enrich a contact list for appointment setters - verified business email and phone, professional profiles, company context, and a one-line setter brief. Enrich only, never sends anything.
argument-hint: "[path or Google Sheet link] [focus: email | phone | profiles | brief]"
---

Enrich the contacts in: $ARGUMENTS (if nothing is given, ask for the CSV or Google Sheet). Output is the same list plus enrichment columns, ready for a setter to work from.

**This command only enriches. It never sends a message, email, DM or text, and it never adds anyone to a campaign.** Outreach waits for launch approval.

**Focus mode:** `/enrich-contacts email`, `phone`, `profiles` or `brief` runs only that slice, same checks. No focus = all four. Unknown focus: list the four and ask.

---

## Roadmap first

Print the standard four-part roadmap (what happens, how long, what I need from you, what might go wrong) before touching anything. Use real numbers: row count, and the provider credits the run will use. Then start.

---

## Step 0 - Prerequisites, just in time

Check the first time only, then record under "## My setup" in CLAUDE.md so nothing is asked twice.

- **Providers:** the user has Clay and Apollo (Lusha or similar optional). Ask, one at a time, for what they actually have: an Apollo API key, a Lusha API key, a Clay table webhook URL. Keys go in `.env` (see `.env.example`), never in chat, a file in git, or a sheet.
- **No key for a provider = skip that provider and say so.** Never fake a lookup or fill a field from memory.
- **Credits:** before a batch over 25 rows, tell the user how many provider credits it will likely use and wait for a yes.

## Step 1 - Read and clean the list

Inputs vary per row (LinkedIn URL, name + company, name + website, or a mix). For each row:

1. Normalize: trim, fix casing, strip tracking parameters from URLs, lowercase emails.
2. Dedupe on LinkedIn URL, then email, then name + company. Keep the row with more data.
3. Decide the match key, best first: LinkedIn URL, then work email, then name + company domain, then name + company name.
4. Rows with only a first name, or only a company, cannot be matched. Mark them `Needs more info` and list them in the report. Do not guess.

## Step 2 - Enrich in this order, stop when a field is filled

Cheapest and most reliable first:

1. **The row itself.** Keep anything the user already gave. Never overwrite it.
2. **Apollo** for work email, title, company, company size, business phone, LinkedIn URL.
3. **Lusha (if connected)** only for fields Apollo left empty.
4. **Clay** by sending unmatched rows to the user's table webhook and reading back its results, if they use Clay for waterfall lookups.
5. **Public web (company site contact page, Google Business Profile, public business social pages)** for company-level phone, address and business social links.

For every field filled, record where it came from and how sure we are.

## Step 3 - What counts as okay to include

- **Include:** work email, business or company phone, job title, company, company site, LinkedIn profile, and public business pages (Facebook Page, Instagram business account, X, YouTube channel) that the person or company lists publicly for business.
- **Mobile numbers:** include only if the provider returns it as a business number. Label it `Mobile` and flag `Check consent before calling or texting`. Never describe a number as verified unless the provider says so.
- **Personal social profiles:** include only if the person publicly links them from their own business site or professional profile. Never go looking for private accounts, family, home address, or personal email.
- **Never invent anything.** No guessed email patterns presented as real. If a pattern guess is the only lead, put it in `Email (unverified guess)` with confidence `Low`, never in the main email column.
- **Platform rules:** do not scrape logged-in LinkedIn pages or bypass any platform restriction. Use provider data and public pages only.

## Step 4 - Confidence and verification

Each contact gets one overall confidence: **High** (matched on LinkedIn URL or email, provider-verified email), **Medium** (matched on name + company domain), **Low** (name + company name only, or any unverified guess).

- Email status: `Verified`, `Risky`, `Unverified`, or `Not found` (use the provider's own status, never my guess).
- Two contacts matching one record, or a record that disagrees with the input (different company, different title), is flagged `Check match`. Do not merge silently.

## Step 5 - The setter brief

One line per contact, plain words, built only from enriched facts:
`Role at Company (size) - what the company does - best first channel and why - one safe opener angle.`

Rules: no fake personalization, no claims about their results or revenue, no "I saw your post" unless the post was actually found and is linked in the sheet. If there is nothing real to say, the brief says `Not enough to personalize - use the approved script as written.`

## Step 6 - Output

Write the enriched list next to the input (`<name>-enriched.csv`, or a new tab if it is a Google Sheet). Keep original columns first, then:

- Work email
- Email status
- Business phone
- Mobile (flagged for consent check)
- Title
- Company
- Company size
- Company website
- LinkedIn
- Facebook / Instagram / X (business pages)
- Other public profile
- Location
- Setter brief
- Confidence
- Source for each filled field
- Status (`Ready`, `Check match`, `Needs more info`)
- Notes

Then print a plain summary: how many rows were enriched, how many have a verified email, how many have a phone, how many need a human look, credits used, and the 3 to 5 rows that most need Rich's eyes. No raw JSON, no tables in chat.

## Step 7 - Quality gate

Score the run honestly out of 10 on: match accuracy, no invented data, sources recorded, consent flags present, and brief usefulness. Spot-check 5 random rows against their sources before reporting. Anything under 9, fix or report exactly what is wrong. Report the count of fields I filled without a recorded source (must be zero).

## Never

- Send, queue, or draft outbound messages from this command.
- Overwrite the user's own data.
- Pad a missing field with a plausible value.
- Hand setters a number or email with no source.
