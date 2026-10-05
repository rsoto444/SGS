# Handoff: personal Growth Leak Score links for the Prospecting Console

For the Claude session that maintains and deploys the SGS Prospecting Console (prospecting.sotogrowthsystems.com). Written Monday 5 October 2026 by the session that runs sotogrowthsystems.com.
**Rich: paste this whole file into the console's Claude session and say "apply this handoff, test it, then deploy the way you normally do".**

## What this does

Setters stop sending the ChatGPT-hosted Growth Leak Score copy (it shows results without collecting contact details, and feeds nothing). Instead:

1. Every prospect gets a personal link to the gated score: `https://sotogrowthsystems.com/growth-leak-score/?p=<token>`. The token is random, never the prospect id.
2. The AI drafter writes the generic score link; the message route swaps in the prospect's personal link before the setter sees the draft.
3. When the prospect finishes, sotogrowthsystems.com posts the result to the console at `POST /api/growth-leak`, protected by a shared secret. The console stores it on that prospect.
4. The prospect screen shows a "Growth Leak Score" box: the result (score, label, top three leaks) or "not taken yet", plus a "Copy personal score link" button.
5. Later drafts are told the prospect's top leaks, so the next reply can speak to them.

## Important: base code

These changes were written against the old GitHub copy `rsoto444/sgs-app` (9 September). The live console is newer (commit c35e7f9). **Apply the intent onto the current code, not the diffs blindly.** Where a line below no longer exists, find its equivalent. Never deploy the GitHub copy: it is a month behind and would roll the console back.

## Already done (do not redo)

- **Website side is live:** sotogrowthsystems.com sends finished personal-link scores to `CONSOLE_GROWTH_LEAK_URL` = `https://prospecting.sotogrowthsystems.com/api/growth-leak` with header `x-sgs-secret`.
- **Vercel env var `GROWTH_LEAK_SECRET`** is set on the console's Vercel project ("sgs-app"), Production and Preview, with the same value as the website. It is never printed anywhere; read it only from `process.env`.

## Before deploying: the database (Rich, or this session if it has Supabase access)

Run once in the console's Supabase project (SQL Editor), then confirm the three columns exist on `prospects`:

```sql
alter table prospects add column if not exists growth_leak_token text unique;
alter table prospects add column if not exists growth_leak jsonb;
alter table prospects add column if not exists growth_leak_completed_at timestamptz;
```

The console loads prospects with `select("*")`, so the new columns arrive in the browser without any query change.

## The contract (what sotogrowthsystems.com sends)

`POST /api/growth-leak`, header `x-sgs-secret: <GROWTH_LEAK_SECRET>`, JSON body:

- `token`: the `p` value from the personal link
- `score`: number 0 to 100
- `label`: for example "Growth is leaking"
- `top`: up to three objects `{ name, label, leak, nextMove }`, worst first
- `answers`: one line per leak, "Leak name: chosen answer"
- `name`, `email`, `company`: what the prospect typed

Responses: 401 without the right secret; 400 if `token` or a numeric `score` is missing; `{ ok: true, matched: false }` for an unknown token (not an error: the lead already reached GoHighLevel); `{ ok: true, matched: true }` when stored.

## New files (add as they are)

### `supabase/migrations/2026-10-05-growth-leak-score.sql`

```sql
-- Personal Growth Leak Score links, 2026-10-05.
-- A setter copies a prospect's personal score link from the console. When the
-- prospect finishes the score on sotogrowthsystems.com, the site posts the
-- result to /api/growth-leak, which finds the prospect by its token and stores
-- the result here. The token is random, never the prospect id, so a link
-- reveals nothing and cannot be guessed from another link.
alter table prospects add column if not exists growth_leak_token text unique;
alter table prospects add column if not exists growth_leak jsonb;
alter table prospects add column if not exists growth_leak_completed_at timestamptz;
```

### `lib/growth-leak.ts`

```ts
// Personal Growth Leak Score links (2026-10-05). The score itself lives on
// sotogrowthsystems.com; each prospect gets a link carrying a random token, and
// the finished result comes back to /api/growth-leak. Safe to import in the
// browser: no server-only modules here.

export const GROWTH_LEAK_PAGE = "https://sotogrowthsystems.com/growth-leak-score/";

export type GrowthLeakResult = {
	score: number;
	label: string;
	top: { name: string; label: string; leak: number; nextMove: string }[];
	answers: string;
	name?: string;
	email?: string;
	company?: string;
};

export function growthLeakLink(token: string): string {
	return `${GROWTH_LEAK_PAGE}?p=${encodeURIComponent(token)}`;
}

// What the message drafter is told about a finished score, so the next reply
// can speak to the prospect's actual leaks instead of asking if they took it.
export function growthLeakContext(result: GrowthLeakResult | null | undefined): string {
	if (!result) return "";
	const top = (result.top || [])
		.map((l, i) => `${i + 1}. ${l.name} (${l.label}, ${l.leak}% leak). Recommended next move: ${l.nextMove}`)
		.join("\n");
	return `\nThis prospect has completed the free Growth Leak Score: ${result.score}/100, "${result.label}". Their top three leaks:\n${top}\nYou may refer to one of these leaks naturally and briefly, in plain words. Never paste the whole result, never quote percentages, never call it a test or grade, and do not send the Growth Leak Score link again -- they have already taken it. The natural next step is the strategy call conversation.\n`;
}
```

### `app/api/prospects/[id]/score-link/route.ts`

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomBytes } from "crypto";
import { growthLeakLink } from "@/lib/growth-leak";

// Returns this prospect's personal Growth Leak Score link, creating its token
// the first time. Uses the signed-in client, so Row Level Security decides who
// may read or write the prospect: a setter only gets links for their own rows.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "not signed in" }, { status: 401 });

	const { data: prospect, error } = await supabase
		.from("prospects")
		.select("id, growth_leak_token")
		.eq("id", params.id)
		.single();
	if (error || !prospect) return NextResponse.json({ error: "prospect not found" }, { status: 404 });

	let token = prospect.growth_leak_token as string | null;
	if (!token) {
		token = randomBytes(9).toString("base64url");
		const { error: updateError } = await supabase.from("prospects").update({ growth_leak_token: token }).eq("id", params.id);
		if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
	}
	return NextResponse.json({ url: growthLeakLink(token), token });
}
```

### `app/api/growth-leak/route.ts`

```ts
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

// Receives a finished Growth Leak Score from sotogrowthsystems.com (its
// /api/lead route) and stores it on the prospect whose personal link was used.
// Not behind the login gate (middleware only covers /dashboard and /login), so
// every request must carry the shared secret in GROWTH_LEAK_SECRET.
function authorized(req: Request): boolean {
	const expected = process.env.GROWTH_LEAK_SECRET || "";
	const given = req.headers.get("x-sgs-secret") || "";
	if (!expected || given.length !== expected.length) return false;
	return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

export async function POST(req: Request) {
	if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	const body = await req.json().catch(() => null);
	const token = String(body?.token || "").trim();
	if (!token || typeof body?.score !== "number") return NextResponse.json({ error: "token and score are required" }, { status: 400 });

	const admin = createAdminClient();
	const { data: prospect } = await admin.from("prospects").select("id").eq("growth_leak_token", token).maybeSingle();
	// An unknown token is not an error for the sender: the lead already reached
	// GoHighLevel. It just means the link was not issued by this console.
	if (!prospect) return NextResponse.json({ ok: true, matched: false });

	const result = {
		score: body.score,
		label: String(body.label || ""),
		top: Array.isArray(body.top) ? body.top.slice(0, 3) : [],
		answers: String(body.answers || ""),
		name: String(body.name || ""),
		email: String(body.email || ""),
		company: String(body.company || ""),
	};
	const { error } = await admin
		.from("prospects")
		.update({ growth_leak: result, growth_leak_completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
		.eq("id", prospect.id);
	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ ok: true, matched: true });
}
```

## Edits to existing files (apply the intent; the diffs show exactly what changed against the 9 September copy)

- **`lib/prompts.ts`:** `GROWTH_LEAK_URL` becomes `https://sotogrowthsystems.com/growth-leak-score/` (it was the chatgpt.site copy).
- **`app/api/ai/message/route.ts`:**
  - accept `scoreLink` and `growthLeak` from the request body;
  - add `growthLeakContext(growthLeak)` after the route note in the opener, follow-up and reply prompts;
  - run every returned draft (opener `draft`, follow-up `draft`, reply `suggestedReply`) through `personalize(text, scoreLink)`.
  The connection-note mode is unchanged.
- **`app/dashboard/console-client.tsx`**, in the prospect detail component:
  - `leakToken` state seeded from `prospect.growth_leak_token`;
  - `ensureScoreLink()` (creates the token on first need via `POST /api/prospects/[id]/score-link`);
  - `copyScoreLink()`;
  - pass `scoreLink: await ensureScoreLink(), growthLeak: prospect.growth_leak` in the opener, reply and follow-up calls to `/api/ai/message`;
  - render the Growth Leak Score box just above the "unreachable" form.
- **`app/globals.css`:** two rules for `.growth-leak-box`.
- **`supabase/schema.sql`:** document the three new columns on `prospects`.

```diff
diff --git a/app/api/ai/message/route.ts b/app/api/ai/message/route.ts
index eefaec3..ee44cee 100644
--- a/app/api/ai/message/route.ts
+++ b/app/api/ai/message/route.ts
@@ -1,7 +1,8 @@
 import { NextRequest, NextResponse } from "next/server";
 import { createClient } from "@/lib/supabase/server";
 import { matchIndustries, painPointBlock, prospectText } from "@/lib/industry-match";
-import { POLICY_SYSTEM_PROMPT, CORE_SCRIPT, NETWORKING_STEP1, CONNECTION_NOTE_INSTRUCTIONS, LINKEDIN_INMAIL_FOLLOWUP_NOTE, callClaude, parseJsonLoose, sanitizeDraft } from "@/lib/prompts";
+import { growthLeakContext } from "@/lib/growth-leak";
+import { GROWTH_LEAK_URL, POLICY_SYSTEM_PROMPT, CORE_SCRIPT, NETWORKING_STEP1, CONNECTION_NOTE_INSTRUCTIONS, LINKEDIN_INMAIL_FOLLOWUP_NOTE, callClaude, parseJsonLoose, sanitizeDraft } from "@/lib/prompts";
 
 // LinkedIn's own hard cap. Enforced here too (not just in the prompt) because
 // a prompt instruction is never a guarantee -- see sanitizeDraft's own
@@ -19,6 +20,15 @@ function enforceNoteLimit(text: string): string {
 	return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
 }
 
+// The drafter writes the generic score link; this swaps in the prospect's
+// personal link, so their result comes back to the console when they finish.
+function personalize(text: string, scoreLink?: string): string {
+	if (!scoreLink || !text) return text;
+	const base = GROWTH_LEAK_URL.replace(/\/$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
+	// The plain link, with or without its trailing slash, never one that already carries a token.
+	return text.replace(new RegExp(`${base}(?:/(?![?\\w-])|(?![/?\\w-]))`, "g"), scoreLink);
+}
+
 export async function POST(req: NextRequest) {
 	const supabase = createClient();
 	const {
@@ -28,7 +38,7 @@ export async function POST(req: NextRequest) {
 
 	const body = await req.json().catch(() => ({}));
 	const { mode, channel, research, bioText, messages, outboundCount, followUpNumber,
-		contactChannel, contactPerson, contactRole } = body;
+		contactChannel, contactPerson, contactRole, scoreLink, growthLeak } = body;
 
 	// A prospect has one primary channel, but the contact ledger can hold several
 	// routes (personal LinkedIn, the company page, a business phone). When the
@@ -38,6 +48,8 @@ export async function POST(req: NextRequest) {
 	const routeNote = contactChannel
 		? `\nThis message is going out specifically on the "${contactChannel}" route${contactPerson ? `, addressed to ${contactPerson}` : ""}${contactRole ? ` (${contactRole})` : ""}. Follow the channel notes for that route exactly.`
 		: "";
+	// A finished Growth Leak Score rides along on every draft for this prospect.
+	const growthNote = growthLeakContext(growthLeak);
 
 	try {
 		if (mode === "connectionNote") {
@@ -115,7 +127,7 @@ Research summary: ${research?.summary || "none available"}
 Fit score: ${research?.fitScore ?? "unknown"}
 Recommended offer: ${research?.recommendedOffer || "not yet determined"} -- ${research?.offerReasoning || ""}
 Pasted bio: """${bioText}"""
-${routeNote}
+${routeNote}${growthNote}
 ${angleContext}
 
 ${CORE_SCRIPT}
@@ -146,7 +158,7 @@ Respond with ONLY this JSON, no other text:
 				/* fall through and treat the whole response as the message */
 			}
 			return NextResponse.json({
-				draft: sanitizeDraft(draft),
+				draft: personalize(sanitizeDraft(draft), scoreLink),
 				// The networking variant doesn't use a pain-point angle at all, so
 				// its badge in the console says what it actually is rather than
 				// showing whatever label the model happened to invent for "angle".
@@ -174,7 +186,7 @@ Respond with ONLY this JSON, no other text:
 
 Research summary: ${research?.summary || "none"}
 Recommended offer: ${research?.recommendedOffer || "not yet determined"} -- ${research?.offerReasoning || ""}
-${routeNote}
+${routeNote}${growthNote}
 ${CORE_SCRIPT}
 Use the "Approved no-response follow-ups" guidance above: follow-up 1 is the light circle-back on whether growth is a priority this quarter, follow-up 2 is the no-pressure check on whether consistent qualified conversations matter to them right now, follow-up 3 is the final "reach back out if it becomes a priority" message. Write follow-up ${n} specifically -- do not write a different one of the three, and do not skip ahead or repeat an earlier one.
 
@@ -186,7 +198,7 @@ ${needsInMail ? LINKEDIN_INMAIL_FOLLOWUP_NOTE : ""}
 Write ONLY this one follow-up message. Short and low-pressure, no more than 2-3 sentences. Do not repeat the exact wording of the original opener or any earlier follow-up. ${needsInMail ? "Respond in the two labelled parts described above (SUBJECT: then MESSAGE:), nothing else." : "Respond with ONLY the message text, nothing else."}`;
 
 			const text = await callClaude({ system: POLICY_SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }], label: "followup" });
-			return NextResponse.json({ draft: sanitizeDraft(text) });
+			return NextResponse.json({ draft: personalize(sanitizeDraft(text), scoreLink) });
 		}
 
 		if (mode === "reply") {
@@ -198,7 +210,7 @@ Write ONLY this one follow-up message. Short and low-pressure, no more than 2-3
 
 Research summary: ${research?.summary || "none"}
 Recommended offer: ${research?.recommendedOffer || "not yet determined"} -- ${research?.offerReasoning || ""}
-${routeNote}
+${routeNote}${growthNote}
 ${CORE_SCRIPT}
 Use this script as closely as possible, adapted for ${ch} per the channel notes above, and picking up at whichever stage the conversation is actually at -- don't restart from Step 1 if they're already further along.
 
@@ -222,7 +234,7 @@ Respond with ONLY this JSON, no other text:
 			const parsed = parseJsonLoose(text);
 			// Only the text the setter actually sends is cleaned; "analysis" and
 			// "milestoneNote" are internal notes shown in the console, not messages.
-			parsed.suggestedReply = sanitizeDraft(parsed.suggestedReply || "");
+			parsed.suggestedReply = personalize(sanitizeDraft(parsed.suggestedReply || ""), scoreLink);
 			return NextResponse.json({ analysis: parsed });
 		}
 
diff --git a/app/dashboard/console-client.tsx b/app/dashboard/console-client.tsx
index 5cde5ce..d813d47 100644
--- a/app/dashboard/console-client.tsx
+++ b/app/dashboard/console-client.tsx
@@ -7,6 +7,7 @@ import { useRouter } from "next/navigation";
 import { createClient } from "@/lib/supabase/client";
 import { businessDay } from "@/lib/dates";
 import { OPENER_ANGLE_TEST_USER_ID } from "@/lib/ab-tests";
+import { growthLeakLink } from "@/lib/growth-leak";
 import {
   Search, Send, Plus, Loader2, Target, MessageSquare, Link2, Copy, Check,
   AlertCircle, Sparkles, Trash2, Settings2, X, LogOut, Users, BarChart3, CalendarCheck, BookOpen, Upload, Bug, Eye,
@@ -806,6 +807,30 @@ function ProspectDetail({ prospect, currentUser, users, canReassign, update, rem
 
   useEffect(() => { threadEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [prospect.messages?.length]);
 
+  // Personal Growth Leak Score link (2026-10-05). The token is created the
+  // first time a draft or the copy button needs it, so every score link a
+  // setter sends can bring the prospect's result back to this record.
+  const [leakToken, setLeakToken] = useState<string | null>(prospect.growth_leak_token || null);
+  const [leakCopied, setLeakCopied] = useState(false);
+  useEffect(() => { setLeakToken(prospect.growth_leak_token || null); }, [prospect.id, prospect.growth_leak_token]);
+  const ensureScoreLink = async (): Promise<string | undefined> => {
+    if (leakToken) return growthLeakLink(leakToken);
+    try {
+      const res = await fetch(`/api/prospects/${prospect.id}/score-link`, { method: "POST" });
+      const data = await res.json();
+      if (!res.ok) return undefined;
+      setLeakToken(data.token);
+      return data.url;
+    } catch { return undefined; }
+  };
+  const copyScoreLink = async () => {
+    const url = await ensureScoreLink();
+    if (!url) { setError("Couldn't create the score link -- try again."); return; }
+    navigator.clipboard?.writeText(url);
+    setLeakCopied(true);
+    setTimeout(() => setLeakCopied(false), 1500);
+  };
+
   // `route` is an optional contact-ledger row. When present the draft is written
   // for that specific route (its channel, its named contact) instead of the
   // prospect's primary channel, and we remember which route it was for so the
@@ -821,6 +846,7 @@ function ProspectDetail({ prospect, currentUser, users, canReassign, update, rem
         method: "POST", headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           mode: "opener", channel: prospect.channel, research, bioText: prospect.bio_text,
+          scoreLink: await ensureScoreLink(), growthLeak: prospect.growth_leak,
           // Everything the industry matcher reads. It runs server-side and
           // decides whether this prospect gets a pain-point angle at all.
           companyName: prospect.company_name, displayName: prospect.display_name,
@@ -848,6 +874,7 @@ function ProspectDetail({ prospect, currentUser, users, canReassign, update, rem
         method: "POST", headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           mode: "reply", channel: prospect.channel, research, messages: prospect.messages,
+          scoreLink: await ensureScoreLink(), growthLeak: prospect.growth_leak,
           outboundCount: prospect.outbound_count,
           contactChannel: route?.channel, contactPerson: route?.contact_person, contactRole: route?.role_title,
         }),
@@ -900,6 +927,7 @@ function ProspectDetail({ prospect, currentUser, users, canReassign, update, rem
         method: "POST", headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           mode: "followup", channel: prospect.channel, research,
+          scoreLink: await ensureScoreLink(), growthLeak: prospect.growth_leak,
           messages: prospect.messages, outboundCount: prospect.outbound_count,
           followUpNumber,
           contactChannel: route?.channel, contactPerson: route?.contact_person, contactRole: route?.role_title,
@@ -1105,6 +1133,25 @@ function ProspectDetail({ prospect, currentUser, users, canReassign, update, rem
         </div>
       </div>
 
+      <div className="growth-leak-box">
+        <div className="field-label">Growth Leak Score</div>
+        {prospect.growth_leak ? (
+          <div>
+            <div><strong>{prospect.growth_leak.score}/100</strong> &middot; {prospect.growth_leak.label}
+              {prospect.growth_leak_completed_at && <span className="muted small"> &middot; taken {new Date(prospect.growth_leak_completed_at).toLocaleDateString()}</span>}
+            </div>
+            <ol className="small">
+              {(prospect.growth_leak.top || []).map((l: any) => (
+                <li key={l.name}><strong>{l.name}</strong> ({l.label}): {l.nextMove}</li>
+              ))}
+            </ol>
+          </div>
+        ) : (
+          <div className="muted small">Not taken yet. Drafts that offer the score use this prospect&apos;s personal link automatically.</div>
+        )}
+        <button className="btn btn-ghost" onClick={copyScoreLink}>{leakCopied ? "Link copied" : "Copy personal score link"}</button>
+      </div>
+
       {pendingUnreachable && (
         <div className="unreachable-form">
           <div className="field-label">Why can&apos;t this prospect be reached?</div>
diff --git a/app/globals.css b/app/globals.css
index 595a941..8455462 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -1081,3 +1081,7 @@ h2, h3 { font-weight: 700; }
   .welcome-backdrop { padding: 0; align-items: stretch; }
   .welcome-modal { max-width: none; max-height: none; border-radius: 0; }
 }
+
+/* Growth Leak Score on a prospect (2026-10-05) */
+.growth-leak-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; align-items: flex-start; }
+.growth-leak-box ol { margin: 4px 0 0; padding-left: 18px; }
diff --git a/lib/prompts.ts b/lib/prompts.ts
index d8c6728..1804817 100644
--- a/lib/prompts.ts
+++ b/lib/prompts.ts
@@ -1,4 +1,8 @@
-export const GROWTH_LEAK_URL = "https://growth-leak-assessment.rsoto443.chatgpt.site/";
+// The live, gated score on sotogrowthsystems.com (2026-10-05). Replaced the
+// ChatGPT-hosted copy, which showed results without collecting contact details.
+// Drafts are written with this generic link; the message route swaps in the
+// prospect's personal link (lib/growth-leak.ts) before the setter sees it.
+export const GROWTH_LEAK_URL = "https://sotogrowthsystems.com/growth-leak-score/";
 // Deprecated: booking is now done conversationally by offering specific times.
 // Kept only so any lingering import doesn't break the build.
 export const CALENDLY_URL = "https://calendly.com/rsoto443/30min";
diff --git a/supabase/schema.sql b/supabase/schema.sql
index 7856622..a318df9 100644
--- a/supabase/schema.sql
+++ b/supabase/schema.sql
@@ -149,7 +149,12 @@ create table prospects (
   scheduled_timezone text,
 
   created_at timestamptz not null default now(),
-  updated_at timestamptz not null default now()
+  updated_at timestamptz not null default now(),
+  -- Personal Growth Leak Score link and result (2026-10-05, see
+  -- migrations/2026-10-05-growth-leak-score.sql).
+  growth_leak_token text unique,
+  growth_leak jsonb,                   -- { score, label, top: [{name,label,leak,nextMove}], answers, name, email, company }
+  growth_leak_completed_at timestamptz
 );
 
 
```

## Test before deploying

1. `npx tsc --noEmit` and `npm run build` pass.
2. The link swap: a draft containing `https://sotogrowthsystems.com/growth-leak-score/` (with or without the trailing slash) becomes the personal link; a link that already has `?p=` is left alone; two plain links both become personal. (Tested on the old copy: all five cases pass.)
3. Locally, `POST /api/growth-leak` returns 401 with no header and with a wrong secret, and 400 with the right secret and an empty body. `/dashboard` still redirects to `/login` when signed out.

## After deploying: verify live

1. `curl -X POST https://prospecting.sotogrowthsystems.com/api/growth-leak -H "Content-Type: application/json" -d '{}'` returns **401** (it returns 404 before this change is live).
2. Rich: open any prospect, click "Copy personal score link", take the score with that link using a "+test" email, refresh the prospect. The score, label and top three leaks should appear in the box. Then mark the GoHighLevel test contact DND.

## Do not

- Do not deploy from the GitHub repo `rsoto444/sgs-app` or connect the Vercel project to it. It is a month behind.
- Do not print, log or commit the secret.
- Do not change how the website sends results; that side is live and tested.
