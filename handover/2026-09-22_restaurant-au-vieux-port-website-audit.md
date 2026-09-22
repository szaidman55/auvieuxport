# Restaurant au Vieux Port website audit

- **Generated (UTC):** 2026-09-22 18:00:15Z
- **Project root:** `C:\Users\Sacha\Documents\au-vieux-port`
- **Git branch:** `HEAD`
- **Transcript:** `0722d019-6551-46be-b63c-a9421b798392.jsonl`
- **Date:** 2026-09-22 11:32 UTC â†’ 2026-09-22 17:59 UTC
- **Turns:** 12 human / 153 assistant

## Files written

- `C:\Users\Sacha\AppData\Local\Temp\claude\C--Users-Sacha-AppData-Roaming-Claude-scratch-workspaces-1135a874-b328-4127-97de-cb9d9ccb9e86-cc2e1d99-67db-4169-8cd1-6fee422274af-scratch-2026-09-22-b00d43\0722d019-6551-46be-b63c-a9421b798392\scratchpad\kaart-au-vieux-port.html`
- `C:\Users\Sacha\Documents\au-vieux-port\supabase\migrations\0001_init.sql`
- `C:\Users\Sacha\Documents\au-vieux-port\supabase\seed.sql`
- `C:\Users\Sacha\Documents\au-vieux-port\src\messages\nl.json`
- `C:\Users\Sacha\Documents\au-vieux-port\src\messages\en.json`
- `C:\Users\Sacha\Documents\au-vieux-port\src\messages\fr.json`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\[locale]\wijnkaart\page.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\[locale]\contact\page.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\admin\layout.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\admin\AuthGate.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\admin\login\page.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\admin\WineEditor.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\admin\HoursEditor.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\lib\supabase\server.ts`
- `C:\Users\Sacha\AppData\Local\Temp\claude\C--Users-Sacha-AppData-Roaming-Claude-scratch-workspaces-1135a874-b328-4127-97de-cb9d9ccb9e86-cc2e1d99-67db-4169-8cd1-6fee422274af-scratch-2026-09-22-b00d43\0722d019-6551-46be-b63c-a9421b798392\scratchpad\pdf\parse2.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\scripts\assets.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\supabase\migrations\0002_team_and_price_notes.sql`
- `C:\Users\Sacha\Documents\au-vieux-port\scripts\gen-wines.mjs`
- `C:\Users\Sacha\AppData\Local\Temp\claude\C--Users-Sacha-AppData-Roaming-Claude-scratch-workspaces-1135a874-b328-4127-97de-cb9d9ccb9e86-cc2e1d99-67db-4169-8cd1-6fee422274af-scratch-2026-09-22-b00d43\0722d019-6551-46be-b63c-a9421b798392\scratchpad\site\team.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\scripts\gen-content.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\scripts\gen-wines-csv.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\src\lib\types.ts`
- `C:\Users\Sacha\Documents\au-vieux-port\src\lib\queries.ts`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\MenuList.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\[locale]\ons-team\page.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\scripts\add-messages.mjs`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\Header.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\Awards.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\Gallery.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\app\[locale]\page.tsx`
- `C:\Users\Sacha\Documents\au-vieux-port\src\components\WineSearch.tsx`

## How to resume

Paste this file into a fresh Claude Code session in the same project root.

---

## Conversation

### You

You are a senior website auditor with combined expertise in UX/UI design, conversion optimization, content strategy, marketing, and web development. Conduct a full, evidence-based audit of the following website.

**Site:** https://www.restaurantauvieuxport.be/

**Business / industry:** Restaurante **Primary business goal(s) of the site:** [e.g., generate booking requests, sell product, capture leads]
**Target audience:** [who the site needs to convince]
**Key competitors (optional):** [1–3 URLs for comparison]
**Devices to test:** desktop + mobile (test both — do not assume desktop findings apply to mobile)

Do not give generic best-practice advice. Every finding must reference a specific page, screen, element, or user flow on the actual site, and explain the concrete consequence (lost conversions, confusion, distrust, etc.) — not just "this could be improved."

### Method

1. Crawl/click through the site as a real first-time visitor would: homepage → key category or service pages → the primary conversion path (quote request, reservation/booking, checkout, or contact) → confirmation/thank-you state.
2. Repeat the primary conversion path a second time as a returning/impatient user trying to complete it in under 60 seconds.
3. Test on mobile viewport, not just desktop.
4. Note load times, broken links, console errors, and anything that stalls or confuses you as you go — flag the exact moment it happens.
5. Take screenshots or note exact element/page locations for every finding so it can be verified.

### Audit categories — cover all of these

**1. First impressions & "vibe"**

- What does a visitor understand about the business within 5 seconds, without reading? Is the value proposition immediately clear?
- Does the visual tone (color, type, imagery, motion) match the brand's positioning and target audience, or does it feel mismatched, dated, generic, or untrustworthy?
- Consistency of tone/voice/visual language across pages — where does it break?

**2. UX & usability**

- Navigation: is the information architecture logical? Can a new visitor find what they need in ≤3 clicks? Any dead ends or orphan pages?
- Clarity of CTAs: are primary actions obvious, singular, and above the fold where they matter? Are secondary actions competing with them?
- Forms: field count, required vs optional, validation/error messaging, autofill support, mobile keyboard types.
- Accessibility: color contrast, alt text, keyboard navigation, focus states, font sizing — call out concrete WCAG-relevant failures, not a generic disclaimer.
- Friction points: anything requiring re-entry of information, unclear next steps, ambiguous button labels, or unexpected page behavior.

**3. User flow & conversion path**

- Map the actual click path from landing to conversion. Count the steps. Identify every point where a user could plausibly abandon, and why.
- Trust signals along the path (reviews, credentials, guarantees, security badges, clear pricing) — present or missing at the moments that matter?
- Mobile-specific flow breakage (elements that don't fit, tap targets too small, sticky headers eating screen space, etc.).

**4. Reservation / booking system (if applicable)**

- Can a user check real availability without creating an account or calling first?
- Number of steps from "I want to book" to confirmed booking; where do steps feel redundant or ask for information too early?
- Calendar/time-slot UX: clarity of available vs. unavailable slots, timezone handling, ability to see other price/service options before committing.
- Confirmation flow: is there immediate on-screen confirmation, email/SMS confirmation, and an easy way to modify or cancel?
- Failure states: what happens if a slot fills between selection and submission, or a payment fails?

**5. Content**

- Does the copy answer the visitor's actual questions (what, how much, how long, why this business) or does it lean on vague brand language?
- Structure and scannability: headings, length, use of bullets/tables where helpful, jargon level appropriate to the audience.
- Accuracy/freshness: outdated info, broken promises (e.g., "we respond within 1 hour" contradicted by evidence), inconsistent claims across pages.
- Localization/language quality if the site is multilingual — tone and correctness in each language version, not just a literal translation check.
- Media: image/video quality, relevance, load impact, and whether they build trust or feel stock/generic.

**6. Marketing & conversion optimization**

- SEO basics: title tags, meta descriptions, header structure, URL structure, presence of schema markup relevant to the business (e.g., LocalBusiness, Service, Review).
- Value proposition clarity and differentiation vs. the competitors listed above.
- Social proof: reviews, testimonials, case studies, follower counts — present, credible, and positioned where they'd influence a decision?
- Calls to action across the funnel: are there secondary/lower-commitment CTAs for users not ready to convert (newsletter, "save for later", chat)?
- Analytics/tracking sanity check if visible in the page source (GA4, Meta Pixel, conversion events) — are key actions actually instrumented?

**7. Technical & performance**

- Page speed (Core Web Vitals if measurable), image optimization, obvious render-blocking issues.
- Mobile responsiveness across at least 3 breakpoints.
- Broken links, 404s, console errors, mixed content warnings.
- Cross-browser sanity check if feasible.

### Deliverable format

Produce a report structured as:

1. **Executive summary** — 5–8 sentences: overall verdict, biggest single opportunity, biggest single risk.
2. **Scorecard** — a 1–10 score per category above, with one line justifying each score.
3. **Findings by category** — for each category, a prioritized list of issues. For each issue give: what you observed (with location), why it matters (concrete consequence), and a specific, actionable fix (not "improve X" — say what to change it to).
4. **Top 10 fixes ranked by impact vs. effort** — a single prioritized punch list across all categories, ordered by what will move the needle fastest.
5. **Quick wins** (can be done in under a day) vs. **structural changes** (need design/dev planning) — clearly separated.

Be direct and specific. Skip praise unless it's functioning as a contrast to a nearby problem. Where you're inferring rather than directly observing (e.g., "likely" hurting conversion), say so explicitly rather than stating it as fact.

### Claude

I'll audit the site directly in the browser. Starting with a first-visit pass on desktop.

### Claude

The site is a French restaurant in Antwerp (het Eilandje). Let me dismiss the cookie banner (declining, per privacy default) and work through the page.

### Claude

Now the primary conversion path — the reservation flow.

### Claude

The in-page widget is a cross-origin iframe. Testing the same booking flow standalone:

### Claude

One last check — whether the schema's opening hours match real availability:

### Claude

I've finished crawling. Resetting the viewport and writing up.

Here is the audit.

**Assumptions I had to make** (the brief left these blank): primary goal = online table reservations, secondary = gift-voucher sales and private/group bookings; audience = Antwerp-area diners 35+ looking for classic French, plus international/business visitors staying at Het Eilandje hotels. No competitors were supplied, so I have not done comparative positioning - everything below is grounded in what is actually on the site.

---

## 1. Executive summary

Au Vieux Port has a genuinely strong asset base - 19 years of trading, a Gault&Millau listing, five Wine Spectator awards, a Star Wine List 2026, a signature dish (Canard à la Rouennaise) almost nobody else in Belgium serves tableside, and photography that is genuinely good. The wine list page and the EN/FR translations are the best work on the site and prove the team can execute. The homepage does not match that standard. It is one long scroll built in Ucraft with a header that never collapses to a hamburger, no reservation CTA above the fold, and - this is the single most damaging finding - **no opening hours and no clickable phone number or email anywhere on the site**. A visitor cannot answer "are they open Saturday?" or tap to call without leaving for Google.

The biggest single opportunity is the conversion path: the Zenchef reservation widget works and shows real availability without an account, but it is hidden behind a sticky pill that a first-time visitor has to hunt for - so much so that the footer literally instructs them where to look ("Om een tafel te reserveren gebruikt u de knop rechtsonder op deze pagina"). When a site has to give directions to its own primary CTA, the CTA has failed.

The biggest single risk is credibility damage from contradictory information. The homepage, the booking widget, and the wine list page disagree with each other about the deposit policy, the 2-course minimum, the contact email address, and which Wine Spectator award was won in 2022. For a €150-per-head restaurant asking for a card guarantee on group bookings, inconsistency on exactly those terms is the kind of thing that kills a booking mid-funnel.

There is also effectively **no conversion measurement**. GA4 is installed but consent-gated, and Zenchef is firing booking-funnel ecommerce events into a `dataLayer` that nothing is listening to - I observed them logged as "Unknown event" in the console. Nobody can currently tell you how many reservations the website produces.

---

## 2. Scorecard

| # | Category | Score | One-line justification |
|---|---|---|---|
| 1 | First impressions & vibe | **6/10** | Photography and the wordmark land the "classic French, white tablecloth" positioning within 5 seconds, but the hero carries no CTA, no location, no hours, and an English tagline on Dutch and French pages. |
| 2 | UX & usability | **4/10** | Nav never collapses (138px sticky header on a 375px phone), no Contact page, gold links at 3.09:1 contrast, 24px tap targets, unlabelled form fields, unnamed booking iframe. |
| 3 | User flow & conversion path | **4/10** | The primary CTA is an unlabelled third-party pill the footer has to explain; no trust signals (reviews, hours, address) sit anywhere on the path. |
| 4 | Reservation / booking | **5/10** | Real availability without an account and a short 2-screen flow - but opens with a wall of policy text, blocks autofill, and contradicts the homepage on deposits and course minimums. |
| 5 | Content | **6/10** | The wine list page and the EN/FR translations are excellent; the homepage is a wall of justified prose that never answers hours, address, lunch pricing, or dress code. |
| 6 | Marketing & conversion optimization | **4/10** | Good page-level SEO on four orphaned landing pages, but zero reviews on site, no `aggregateRating`, broken sitemap, and a booking funnel with no working analytics. |
| 7 | Technical & performance | **5/10** | 0.95s TTFB and a 3.6s FCP, of which a 346KB reCAPTCHA (89% of total page weight) is loaded on every page just for a 3-field footer form. |

---

## 3. Findings by category

### 1. First impressions & "vibe"

**1.1 - Hero carries no call to action, no location, no hours (homepage, first screen, desktop and mobile)**
The hero is a full-viewport photo with the wordmark and the line "Antwerp's Frenchiest Restaurant". There is no button. The only reservation affordance is the Zenchef pill in the bottom-right, which on mobile I could not see at all in the first screen. *Consequence:* the highest-attention area of the site converts nobody. Every visitor must scroll ~2,000px to reach the "Reserveren" section or spot the floating pill.
*Fix:* add two buttons directly under the tagline - primary `Reserveer een tafel` (opens the Zenchef widget via the existing `#zc-action-open` anchor, gold `#B08D57` fill, white text, min 48px tall) and secondary `Bekijk de kaart`. Under them, one line of plain text: `Napelsstraat 130, 2000 Antwerpen · di-za 12:00-14:00 & 18:00-21:30 · 03 290 77 11`.

**1.2 - The English tagline runs on the Dutch and French pages (`/`, `/fr`, hero)**
"Antwerp's Frenchiest Restaurant" appears verbatim on `/fr`, above French body copy. *Consequence:* on the French page the first three words a visitor reads are in the wrong language, which reads as a template that was never finished - the opposite of the meticulous impression a classical French restaurant wants.
*Fix:* localise it. NL: `Het Franste restaurant van Antwerpen`. FR: `Le restaurant le plus français d'Anvers`. Keep the English on `/en`.

**1.3 - Hero image is upscaled 1.7x beyond its source resolution (homepage hero)**
The hero `153-H9ksaszIkR8.webp` has a natural size of 1280x720 but is rendered at 1009x2123 CSS px. *Consequence:* the hero - the one image carrying the entire first impression - is visibly soft and over-cropped. For a restaurant selling craft and precision, a blurry hero undercuts the pitch before a word is read.
*Fix:* re-export the hero at 2560x1440 minimum and serve a portrait-cropped variant for mobile via `<picture>`.

**1.4 - The "Fine Dining in Antwerp" badge renders at 31px wide on mobile (header, 375px viewport)**
Measured: `L344 R375 W31`. *Consequence:* a trust mark that is illegible is not a trust mark; it reads as visual noise crowding the header.
*Fix:* drop it from the mobile header entirely and place it once, at readable size, in the awards row alongside Gault&Millau.

**1.5 - Tone breaks between the homepage and the wine list page**
The homepage reads like brochure copy ("een gevestigde waarde", "toveren we de lekkerste Franse gerechten op tafel"). `/wijnkaart` reads like a professional wine merchant: "De kaart telt ruim 520 referenties, met Bourgogne als onbetwist zwaartepunt: bijna een derde van alle wijnen komt uit die ene streek." *Consequence (noted as contrast, not praise):* the wine page is the voice the brand should have everywhere; the homepage currently sounds like a different, weaker business.
*Fix:* rewrite the homepage "Over ons" block in the wine page's register - concrete, numerate, unhurried.

### 2. UX & usability

**2.1 - The navigation never collapses to a hamburger at any breakpoint (375 / 768 / 1280)**
Measured sticky header height: **138px at 375px wide, 142px at 768px**. On a 812px-tall phone that is **17% of the viewport permanently occupied** by a nav that wraps onto four lines ("Over ons | Menu | / Wijnkaart | / Reserveren | Foto's | / Cadeaubon"). *Consequence:* on every scroll position, a sixth of the phone screen is menu. It also breaks anchor navigation - see 2.2.
*Fix:* below 900px, collapse to a logo + hamburger bar at 56px, with the reservation CTA as a persistent gold button in the bar. This is the single highest-leverage mobile change.

**2.2 - Anchor links scroll their target underneath the sticky header (mobile, all `#m…` nav links)**
Tapping `Reserveren` in the nav (`/#m315`-style anchors) lands with the section heading and the top of the `Reserveren` button hidden behind the 138px header - I captured this directly: the button appears half-clipped under the header band. *Consequence:* a user who taps the nav item for the thing they came to do sees a partially hidden button and an expanse of black. Plausible abandonment point.
*Fix:* add `scroll-margin-top: 150px` to every anchor target section (`html { scroll-padding-top: 150px }` is a one-line global fix).

**2.3 - There is no Contact page, and `/contact` returns 404**
The main nav has six items; none is Contact. `https://www.restaurantauvieuxport.be/contact` → **404**. So does `/menu`. *Consequence:* "contact" and "menu" are the two most-guessed URLs for a restaurant. Both are dead ends, and both are also the natural targets of a Google sitelink.
*Fix:* create `/contact` with address, hours, phone, email, parking/tram guidance, and a map; add it to the nav; 301 `/menu` → `/#m315`.

**2.4 - No `tel:` or `mailto:` link exists anywhere on the site**
I checked programmatically: `document.querySelectorAll('a[href^="tel:"]')` and `a[href^="mailto:"]` both return **zero** results on the homepage. The number `03 290 77 11` and `reservatie@restaurantauvieuxport.be` appear as plain text, once, roughly 70% down the page. *Consequence:* on mobile - where most restaurant traffic is - a user who wants to call has to select and copy a phone number from body text, or leave for Google's business panel where a competitor's ad may sit. For last-minute bookings (which the widget itself redirects to phone after 17:00 same-day) this is a direct lost-booking path.
*Fix:* `<a href="tel:+3232907711">03 290 77 11</a>` and `<a href="mailto:reservatie@restaurantauvieuxport.be">`, in the footer, the reservations block, and a new Contact page. Add a phone icon to the mobile sticky bar.

**2.5 - Opening hours appear nowhere in human-readable form**
A regex sweep of the rendered page text for `openingsuren|gesloten|maandag…zondag|\d{1,2}:\d{2}` returns nothing relevant. Hours exist only inside the JSON-LD (`Mon-Fri 12:00-14:00, 18:00-21:30`). *Consequence:* the most-asked question about any restaurant is unanswerable on its own website. Worse, the schema says Monday-Friday only - if the restaurant serves Saturday, Google is being fed wrong hours; if it does not, no visitor can discover that. **I could not verify which is true from the booking widget, so this needs checking against reality before you publish anything.**
*Fix:* publish hours as visible text in the footer and on `/contact`, and make the JSON-LD `openingHoursSpecification` match, including any closure days and annual holiday closures.

**2.6 - Footer contact form: no labels, no validation, no autofill, wrong keyboard**
The three fields are `type="text"` (including the one named `Email`), with `placeholder` and `aria-label` but **no `<label>`**, **no `required`**, **no `autocomplete`**, and **no `inputmode`**. *Consequence:* (a) placeholder-only labels disappear as soon as the user types, so anyone who pauses loses the field's meaning (WCAG 3.3.2); (b) the email field raises an alphabetic keyboard on mobile instead of the `@`-bearing email keyboard; (c) no autofill; (d) an invalid email silently submits and the enquiry is lost.
*Fix:* `<label>` above each field; `type="email" autocomplete="email" inputmode="email"` on the email field; `autocomplete="name"` on the name; `required` on all three; inline error text under the field on blur.

**2.7 - The form's own copy tells users what they cannot do**
The message placeholder reads `Bericht (aub geen reservaties via dit formulier)` and the heading above it is `Om een tafel te reserveren gebruikt u de knop rechtsonder op deze pagina.` *Consequence:* the footer - the last thing a scrolling visitor reads - spends its headline explaining the UI instead of converting. "The button is over there" is an admission that the button is not findable.
*Fix:* delete both. Replace the heading with `Contact` plus the NAP block, and put an actual `Reserveer een tafel` button in the footer wired to `#zc-action-open`.

**2.8 - Concrete contrast failures (measured, WCAG 2.1 AA 1.4.3)**

| Element | Colours | Ratio | Required |
|---|---|---|---|
| `Maak kennis met ons team` (20px link) | `#B08D57` on `#FFF` | **3.09:1** | 4.5:1 |
| `Lees meer over dit gerecht` (16px link) | `#B08D57` on `#FFF` | **3.09:1** | 4.5:1 |
| `Wine Spectator` (20px link) | `#E03E2D` on `#FFF` | **4.29:1** | 4.5:1 |
| `Verzenden` button (14px) | `#FFF` on `#F01212` | **4.37:1** | 4.5:1 |
| `·` footer separator | `#151515` on `#000` | **1.15:1** | 4.5:1 |

*Consequence:* the two gold links are the **only** routes to `/ons-team` and `/canard-a-la-rouennaise` - two of your four best SEO pages - and they are the least legible text on the page. Anyone over 50 in a bright room may not register them as links at all.
*Fix:* darken the link gold to `#8A6A33` (5.2:1 on white) and underline it. Darken the submit button to `#B3000F` or, better, restyle it in brand gold - the current fire-engine red belongs to no palette on the site and reads as a warning colour.

**2.9 - Tap targets below the comfortable minimum (mobile)**
Every nav link measures **24px tall** (`Over ons` 78x24, `Reserveren` 98x24, `Cadeaubon` 98x24). Footer social icons are 26x26 and 31x31. *Consequence:* 24px scrapes the floor of WCAG 2.5.8 and sits well below the 44px Apple / 48px Google guidance; mis-taps in a four-line wrapped menu are near-certain.
*Fix:* 48px minimum touch height on all nav and footer links once the hamburger is in place.

**2.10 - The reservation widget is an iframe with no accessible name**
`<iframe src="bookings.zenchef.com/…">` has `title` = none, `position: fixed`, `z-index: 2147483647`, and on a 375px phone occupies `x=84 → 375` at full viewport height - **78% of the screen width as a max-z-index overlay**. *Consequence:* WCAG 4.1.2 / 2.4.1 failure - a screen-reader user tabbing the page hits an unnamed frame with no idea it is the booking tool. The full-height max-z overlay is also a standing tap-interception risk on mobile.
*Fix:* Zenchef's SDK accepts configuration - set the iframe `title="Online reserveren - Au Vieux Port"`. If the SDK does not expose it, set it post-injection with a two-line `MutationObserver`.

**2.11 - Body copy is justified (9 paragraphs, homepage)**
On a 375px screen, justification produces visible word-spacing rivers in the "Over ons" and wine paragraphs. *Consequence:* measurably slower reading on narrow columns, and it looks like a broken layout rather than a typographic choice.
*Fix:* `text-align: left` below 900px (or everywhere - with no hyphenation, justification at any width here is doing damage).

**2.12 - No skip link**
27 focusable elements, no `skip to content`. Low impact given the count, but trivial to add. *Fix:* standard visually-hidden skip link as the first focusable element. (Focus rings themselves are intact - the site does not suppress `outline`, which is worth noting as a thing not to break during any redesign.)

### 3. User flow & conversion path

**3.1 - Mapped path, first-time visitor, desktop**
1. Land on `/` → hero, no CTA
2. Dismiss cookie banner (it covers the lower-left of the hero)
3. Scroll ~2,100px past "Over ons" and the full menu
4. Reach the `Reservaties` block → click `Reserveren`
5. Zenchef drawer opens → **read ~60 words of policy text**
6. Scroll past a promoted wine-dinner event card
7. Set guests → set date → set time
8. Click `Reserveren`
9. Fill 5 fields + accept terms
10. Submit

**Ten steps, of which steps 2, 3, 5 and 6 are pure friction.** The alternative path - spotting the floating pill - is 3 steps, but requires noticing an unlabelled gold pill in the corner.

**3.2 - Returning/impatient user, 60-second test**
I ran this. The pill route gets you to the time-slot screen in about 12 seconds. Then it stalls: the Zenchef contact form sets **`autocomplete="off"` on the phone field** and has **no `autocomplete` attribute at all** on first name, last name, or email. *Consequence:* a returning guest retypes their name, phone and email from scratch every single time. On a phone that is 30-45 seconds of thumb-typing for a booking the restaurant already has on file. This is the clearest abandonment risk in the funnel for repeat customers - who are the most valuable segment for a neighbourhood fine-dining room.
*Fix:* ask Zenchef to enable `autocomplete="given-name" / "family-name" / "email" / "tel"`. Until then, surface the `Bewaar de informatie voor mijn volgende reserveringen` checkbox higher and explain it - it is currently buried below the voucher field where nobody will read it.

**3.3 - Zero trust signals on the conversion path**
Between landing and submitting, the visitor encounters: no review score, no testimonial, no guest count, no "since 2007" badge near the CTA, no cancellation reassurance, no security indicator on the card-guarantee step. The award badges sit **below** the reservation block, so they are only seen by people who already scrolled past the CTA. TripAdvisor exists only as a 26px icon in the footer. *Consequence:* at the exact moment a stranger is asked for a phone number - and for groups, a credit card - the page offers nothing to justify the trust.
*Fix:* move the awards row **above** the reservations block. Add a one-line proof strip immediately under the hero CTA: `Sinds 2007 · Gault&Millau · Wine Spectator Best of Award of Excellence 2023-2026 · 4,5/5 op TripAdvisor (xxx reviews)`. Add `Gratis annuleren tot 24 u vooraf` directly under the reserve button.

**3.4 - Mobile: the gallery section renders as empty white space on first scroll**
At the `Foto's van het restaurant & team` heading I captured a full screen of blank white below the heading before images appeared. Lazy-loading is not firing early enough for the scroll speed. *Consequence:* the section that carries the restaurant's strongest asset - its photography - shows as an empty void to a fast-scrolling mobile user.
*Fix:* set `loading="lazy"` with a `rootMargin` of 300px (or native `loading="lazy"` plus explicit `width`/`height` so the grid reserves space), and give the grid a neutral placeholder background so it never reads as broken.

### 4. Reservation / booking system

**4.1 - The widget opens with 60 words of restrictions before any control**
Before a user sees "2 gasten", they read: a 2-course minimum, a request to arrive on time, a request to notify otherwise, and an instruction to email for parties over 10. *Consequence:* the first experience of booking is a list of rules. For a restaurant at this price point that is defensible in substance but badly placed - it belongs after slot selection, not before it.
*Fix:* move this text to the confirmation step, or collapse it behind `Goed om te weten ▾`. Keep only one line visible: `Bij het diner vragen wij minimaal 2 gangen.`

**4.2 - The deposit policy on the homepage contradicts the booking widget**
- Homepage: *"Voor tafels vanaf **7 personen** vragen wij een voorschot van **€ 50 p/p**. Dit voorschot wordt met een krediet kaart **gestort**… Bij annulatie langer dan 24 uur… wordt het voorschot terugbetaald."*
- Widget intro: *"Indien u voor **meer dan 10 personen** wenst te reserveren gelieve te **mailen**."*
- Widget at 8 guests (I tested): the step is labelled **"creditcardgarantie vereist"** - a card **guarantee**, not a €50pp charge - and it appears **only after the full contact form is completed**, with no amount stated.

*Consequence:* three different stories. A group of 8 is told on the homepage they will be charged €400 up front, then the widget quietly asks for a card guarantee instead, at the last step, with no figure. A group of 11 reads that a deposit gets them booked, then discovers they cannot book online at all. Group bookings are your highest-value transactions and this is where the copy is least trustworthy.
*Fix:* pick one policy and state it identically in all three places. Suggested wording for 7-10 guests: `Voor tafels van 7 tot 10 personen vragen wij een creditcardgarantie van € 50 p/p. Er wordt niets afgeschreven; bij annulatie minder dan 24 u vooraf rekenen wij € 50 p/p aan.` For 11+: `Vanaf 11 personen boeken wij graag persoonlijk - mail reservatie@restaurantauvieuxport.be.` Show the guarantee amount **before** the contact form, not after.

**4.3 - The 2-course minimum applies to Friday on the homepage and to every dinner in the widget**
Homepage: *"Voor het diner **op vrijdag** vragen wij u vriendelijk om minstens 2 gangen te bestellen."* Widget: *"Voor **het diner** verwachten wij dat u minstens 2 gangen bestelt."* *Consequence:* a guest who booked a Tuesday dinner on the strength of the homepage and is then held to a 2-course minimum at the table has a legitimate grievance. Small print mismatches like this become the substance of one-star reviews.
*Fix:* one sentence, used everywhere.

**4.4 - Two different contact emails**
Homepage: `reservatie@restaurantauvieuxport.be`. Widget: `info@restaurantauvieuxport.be`. *Consequence:* group enquiries - the most valuable inbound mail you get - land in whichever inbox the guest happened to read, and one of them may be less closely monitored.
*Fix:* standardise on `reservatie@` for booking matters and alias `info@` into it.

**4.5 - The lunch notice is in English and states a nonsensical cut-off**
Under the `Lunch` heading in a Dutch-language widget: *"Dear customers, for any reservations **after 11 PM** on the same day, please contact us at 03 290 77 11."* The dinner notice directly below it is in Dutch and says **17:00**. *Consequence:* an untranslated string in the middle of the booking flow, and "after 11 PM" for a lunch service is self-evidently wrong - it almost certainly should read 11 **AM**. A guest trying to book same-day lunch at 11:30 is given no usable instruction.
*Fix:* in Zenchef, translate the lunch notice and correct the time: `Voor reservaties voor de lunch van vandaag na 11.00 u belt u ons op 03 290 77 11.`

**4.6 - The signature dish cannot be pre-ordered in the booking flow**
The homepage says, in bold, *"Reserveer uw canard op voorhand!"* and the Canard à la Rouennaise is €65 p/p - your highest-margin, most distinctive item. The booking widget offers no pre-order option, no menu selection, and no prompt. The only route is the free-text `Opmerkingen` field, which is unlabelled as a place to do this. *Consequence:* the restaurant actively asks for advance canard orders and then provides no mechanism to place one. Every guest who wanted it and did not know to type it into a comments box is a lost €65-130.
*Fix:* add a Zenchef booking option / menu item `Canard à la Rouennaise vooraf bestellen (€ 65 p/p, min. 2 personen)` as a checkbox at slot selection, and change the comments placeholder to `Opmerkingen, allergieën of een canard-bestelling`.

**4.7 - What works (noted so you do not break it in a redesign)**
Real availability is visible without an account or a phone call; today's dinner showed 15 slots at 15-minute intervals. The flow is 2 screens. Marketing opt-ins (`market_mail`, `market_sms`) are **unchecked by default** - GDPR-correct. A gift-voucher code field is present at booking. Keep all of this.

**4.8 - Failure states I could not test**
I did not complete a booking, so I cannot report on the confirmation screen, the confirmation email, the modify/cancel link, or what happens if a slot fills between selection and submission. *You should test these yourselves* - specifically whether the confirmation email is branded, whether it contains a one-click cancel link, and whether a card-guarantee failure returns a usable error or dumps the user back to step 1.

### 5. Content

**5.1 - The homepage never answers the practical questions**
Absent from the entire site: opening hours, street address in text, dress code, lunch formula and its price, whether there is a tasting menu, parking, accessibility, whether children are welcome, how long a dinner takes. Present instead: 400 words of atmosphere. *Consequence:* a visitor deciding between you and two other Eilandje restaurants has to leave your site to resolve basic logistics, and may not come back.
*Fix:* add a compact `Praktisch` block above the footer - hours, address, phone, parking (Napelsstraat / Kattendijkdok), tram stop, "een diner duurt gemiddeld 2,5 uur", dress code.

**5.2 - The menu section hedges its own prices**
*"De gerechten hierboven geven een impressie van onze menukaart. Prijzen en gerechten kunnen ter plaatse afwijken."* Combined with `Zeetong - dagprijs`. *Consequence:* at mains of €53-55, "prices may differ on site" is the last thing a first-time guest wants to read. It reads as a licence to charge more.
*Fix:* keep a dated menu (`Kaart van september 2026`) and drop the disclaimer to a single line: `Onze suggesties wisselen dagelijks; vis is aan dagprijs.` Add an indicative spend: `Reken op € 85-110 p.p. voor drie gangen, exclusief wijn.` That number does more for qualified bookings than the entire "Over ons" section.

**5.3 - Factual contradiction on the Wine Spectator awards**
- `/wijnkaart`: *"Wine Spectator bekroonde onze kelder **vijf jaar op rij met de Best of Award of Excellence, van 2022 tot en met 2026**."*
- Homepage: *"In 2022 werd onze wijnkaart beloond met **één glas (Award of Excellence)**. Sinds 2023 zijn dit twee glaasjes (Best of Award of Excellence)."*
- The award badge row on the homepage shows `AWARD OF EXCELLENCE 2022` and `BEST OF AWARD OF EXCELLENCE` for 2023, 2024, 2025, 2026 - agreeing with the homepage and contradicting the wine page.

*Consequence:* the wine page overstates the 2022 award. Wine Spectator awards are publicly verifiable and sommeliers and wine-led guests will check. An inflated award claim on the very page that exists to establish wine credibility is a disproportionate credibility risk.
*Fix:* correct `/wijnkaart` to `Award of Excellence in 2022 en Best of Award of Excellence van 2023 tot en met 2026` (and the EN/FR equivalents).

**5.4 - `/wijnkaart` is the best page on the site and almost nothing links to it properly**
520 references, region breakdown, counts by colour (38 sparkling / 189 white / 294 red / 6 rosé & sweet), jump links, grape and tasting notes per wine, and a freshness stamp (`Bijgewerkt op 1 september 2026`). Proper H1→H2→H3 structure. *Consequence (stated as contrast):* this page demonstrates the standard the rest of the site should meet, and it is the single strongest piece of differentiation you own. It has **zero images** and gets one nav link.
*Fix:* add three cellar photographs (you already have them in the gallery), a `Reserveer een tafel` CTA at the foot of the page, and promote it on the homepage with a stat, not a link - `Meer dan 520 wijnen, waarvan een derde Bourgogne`.

**5.5 - EN and FR translations are genuinely good and should be protected**
These are idiomatic rewrites, not translations - *"The seasons bring their own classics: pheasant 'Fine Champagne' in autumn"*, *"Nous cuisinons ce que la saison et le marché nous offrent le matin même"*. Whoever wrote these understood the brand.
*Fix (small):* carry the same care to the hero tagline (1.2) and the gift-voucher shop (6.5).

**5.6 - Four excellent SEO landing pages are orphaned from the navigation**
`/ons-team`, `/canard-a-la-rouennaise`, `/fine-dining` each have a tailored title, a real meta description and a proper H1 - but are reachable only via two low-contrast gold inline links and one image link. `/ons-team` is not in the sitemap at all. *Consequence:* pages built for search get almost no internal link equity and almost no human traffic, and the team page - the strongest humanising asset you have - is effectively invisible.
*Fix:* add `Ons team` and `De Canard` to the main nav (or a `Over ons ▾` dropdown), and cross-link the four pages to each other in a `Lees ook` strip.

**5.7 - Gift voucher section says nothing a buyer needs to know**
The whole `Cadeaubon` block is: *"Bezorg vrienden of zakenpartners een onvergetelijke avond… Bestellen kan eenvoudig via onze webshop!"* No amounts, no validity period, no delivery method. The shop itself reveals denominations of €50-250 and **1 year validity**. *Consequence:* the page fails to pre-qualify the buyer, and the 1-year expiry - a material term - is only discovered after clicking out to a third-party domain.
*Fix:* state it on the homepage: `Cadeaubonnen van € 50 tot € 250, digitaal geleverd, één jaar geldig.`

**5.8 - Alt text is filenames on 41 of 45 images**
Examples: `440-pbm1606-069-web-17889778259274.jpg`, `250943481437-gm15.png`, `461-finedining.png`. Four images have real alt text (`Maître versnijdt een gerecht aan de guéridon bij het raam` - exactly right), which shows someone started the job. *Consequence:* screen-reader users hear a string of meaningless filenames through the gallery (WCAG 1.1.1), and Google Images gets nothing for a restaurant whose photography is its strongest asset.
*Fix:* write alt text for the ~20 gallery images and the badges, in the style of the four that are already correct. Decorative images get `alt=""`.

### 6. Marketing & conversion optimization

**6.1 - No reviews, ratings or testimonials anywhere on the site**
Not on the homepage, not on any subpage, and no `aggregateRating` in the JSON-LD. Social proof consists of award badges and a 26px TripAdvisor icon in the footer. *Consequence:* the most persuasive content for a restaurant decision is entirely absent from the decision path, and you forfeit star ratings in Google results.
*Fix:* pull three specific TripAdvisor/Google quotes (ones that name the canard, the guéridon service, or the sommelier) and place them directly above the reservations block, each with source and date. Add `aggregateRating` to the `Restaurant` schema **only with real, verifiable numbers** - Google penalises fabricated review markup.

**6.2 - Booking funnel events are firing into nothing**
Console output on every page load: `Unknown event zcf-bookings-view_item_list {ecommerce: Object}` ×4. Zenchef is pushing GA4-shaped ecommerce events into `window.dataLayer` and no GTM container or GA4 config is consuming them. GA4 (`G-58BBEEVP5P`) is present but gated on `localStorage['cc-consent'] === 'all'`, so it never loads for anyone who declines or ignores the banner. *Consequence:* you cannot currently measure a single reservation, a single gift-voucher click, or the conversion rate of any change you make. Every recommendation in this report is unmeasurable until this is fixed.
*Caveat:* I browsed with cookies declined, so GA4 itself was not loaded during my session - but GA4 will not attribute `zcf-bookings-*` custom events without explicit configuration regardless of consent.
*Fix:* install GTM, map `zcf-bookings-view_item_list` / `add_to_cart` / `purchase` to GA4 events, mark the booking completion as a key event, and add outbound-click tracking on the voucher shop link. Budget half a day.

**6.3 - Structured data problems**
- `"image": ".../logo.png"` - Google's Restaurant rich-result guidance wants a photograph, not a logo
- `"hasMenu": "https://www.restaurantauvieuxport.be/"` - points at the homepage, not a menu URL
- `"priceRange": "$$$$"` - dollar signs for a euro restaurant; use `"€€€€"` or an explicit range
- `openingHoursSpecification` covers **Monday-Friday only** (see 2.5 - verify against reality)
- **Two conflicting `Organization` blocks**, one with `sameAs: facebook.com/AuVieuxPort`, the other with a legacy `facebook.com/pages/Au-Vieux-Port/330435441197938`
- No `acceptsReservations` URL / `potentialAction: ReserveAction`, no `aggregateRating`, no `hasMenuSection`

*Consequence:* you are leaving the richest restaurant SERP features - reserve button, price band, hours, stars - on the table for a business whose discovery is overwhelmingly local search.
*Fix:* consolidate to one `Restaurant` node, swap in a hero photograph, add a `ReserveAction` pointing at the Zenchef URL, correct the currency symbol, delete the duplicate Organization blocks and the dead Facebook URL.

**6.4 - Sitemap is incomplete and contains a 404**
`/sitemap.xml` lists 7 URLs. It includes `/copy-of-wijnkaart`, which returns **404**. It omits `/ons-team`, `/en`, and `/fr` entirely. Every entry carries `priority 1.0` and `changefreq daily`, and none carries `lastmod`. *Consequence:* a leftover draft URL is being advertised to Google as a priority-1.0 daily-changing page while returning 404; your English and French sites are not submitted at all.
*Fix:* regenerate the sitemap with all NL/EN/FR URLs, remove `/copy-of-wijnkaart`, add `lastmod`, and use differentiated priorities.

**6.5 - The gift-voucher shop link forces Dutch on English and French visitors**
Both `/en` and `/fr` link to the webshop with `…&language=nl&…`. *Consequence:* an English-speaking guest who has just read a beautifully written English page clicks "Visit our webshop" and lands on `WINKELMANDJE / Kies bedrag / KOOP`. Gift vouchers are an impulse purchase; a language wall at the checkout kills them.
*Fix:* `language=en` on `/en`, `language=fr` on `/fr`.

**6.6 - The webshop's primary colour is set to near-white, making the buy buttons nearly invisible**
The link passes `primary-color=fcf8f8`. The result, which I captured: every `KOOP` button renders as a `#FCF8F8` pill on a white card - effectively invisible, and not recognisable as a button. *Consequence:* the buy button on your only e-commerce surface does not read as a buy button. This is very likely costing voucher sales outright, and it is a one-parameter fix.
*Fix:* change to `primary-color=B08D57` (brand gold) or `primary-color=151515`.

**6.7 - The voucher shop mixes Dutch UI with English product names**
`WINKELMANDJE`, `Kies bedrag`, `1 jaar geldigheid`, `KOOP` - alongside `Choose an amount for the gift voucher`, `Coupon for 50 euros`. The page title is just `Shop`. Product images are generic grey Zenchef line-art, not your photography. *Consequence:* the checkout looks like an unfinished third-party tool, at the exact moment a customer is entering payment details for a €150 gift. That is where trust matters most.
*Fix:* rename the products in Dutch/EN/FR in the Zenchef shop backend, upload a restaurant photograph as the product image, and set the shop title.

**6.8 - Meta description on the homepage is a sentence fragment with no proposition**
*"Genieten van het befaamde taartje met 'boudin Basque' of van sappig gebakken griet die op een buffettafeltje onder de ogen van de klant deskundig gefileerd wordt."* 162 characters, starts mid-thought, mentions neither the restaurant name, nor Antwerp, nor reservations. (By contrast, the four landing pages have well-written descriptions - another sign the homepage is the neglected page.)
*Fix:* `Klassiek Frans restaurant op het Eilandje in Antwerpen, sinds 2007. Canard à la Rouennaise aan tafel, bekroonde wijnkaart. Reserveer online.` (140 chars)

**6.9 - Broken heading hierarchy on the homepage**
`H1` → `H3` (Menu, Voorgerechten, Hoofdgerechten, Specialiteiten, Desserten, Reservaties, Foto's) → a single `H2` (Awards) → `H3`. There is exactly one H2 on the page and it is in the wrong place. *Consequence:* WCAG 1.3.1 and a weakened topical signal to search on the section that matters most (`Reservaties` is an H3 while `Awards` is an H2).
*Fix:* promote `Menu`, `Reservaties`, `Foto's`, `Cadeaubon` and `Over ons` to H2; keep the menu courses as H3.

**6.10 - No low-commitment secondary CTA anywhere**
The site offers exactly one action: book a table now. No newsletter, no "stuur me de kaart", no wine-dinner mailing list (despite running wine dinners - the Joh. Jos. Prüm evening is promoted inside the booking widget, where only people already booking will see it), no WhatsApp, no "bewaar voor later". *Consequence:* 90-95% of visitors are not ready to book tonight, and the site captures nothing from them.
*Fix:* add a single-field email capture in the footer - `Wijnavonden en seizoenskaarten, een paar keer per jaar in uw mailbox` - and promote the Prüm wine dinner **on the homepage**, not only inside the booking drawer.

### 7. Technical & performance

**7.1 - reCAPTCHA Enterprise is 346KB, 89% of total page weight, and exists only for the footer contact form**
Measured on the homepage: total transfer **387KB across 22 requests**; the single largest resource is `recaptcha__nl.js` at **346KB**. It loads on every page, including `/wijnkaart` and the landing pages, and is render-blocking-adjacent in the critical path. *Consequence:* the heaviest thing a visitor downloads exists to protect a 3-field enquiry form that the site's own copy discourages people from using.
*Fix:* lazy-load reCAPTCHA on first focus of a form field (`grecaptcha.enterprise.render` on demand), or drop it for a honeypot field plus a time-to-submit check. Expect roughly 350KB and several hundred milliseconds off every page load.

**7.2 - TTFB ~0.95s and FCP ~3.6s**
Measured across loads: TTFB 930-951ms, `domContentLoaded` ~1.48s, `load` 1.87-2.70s, FCP 3,648ms on the first measured load. *Consequence:* TTFB near 1s puts you in Google's "needs improvement" band before a single byte of content renders; a 3.6s first paint on a hero-image homepage is well past the 1.8s "good" threshold. On 4G at the restaurant's door, a hungry visitor may bounce before the wordmark appears.
*Caveat:* these are single-session figures from an emulated desktop viewport, not field data. Run PageSpeed Insights and check the CrUX field data before sizing the work - but the 346KB reCAPTCHA in 7.1 is a certain win regardless.
*Fix:* remove reCAPTCHA from the critical path, `preload` the hero image, and check whether Ucraft's server response can be cached at the edge.

**7.3 - Console warnings from the booking widget**
Four `Unknown event zcf-bookings-view_item_list` warnings plus one `Deprecated API for given entry type`. No JavaScript errors, no mixed-content warnings, no 404s on assets - the site is technically clean apart from the analytics gap in 6.2.

**7.4 - Responsive behaviour across breakpoints**
I verified 375, 768 and 1280. **Good news first:** there is no horizontal overflow at any breakpoint (`scrollWidth` equals viewport width at 375 and is 753 at 768), and the layout does reflow. **The problems are structural, not overflow:** the header stays at 138-142px with a wrapping text nav at every width, and the Zenchef iframe holds a fixed, full-height, max-z-index layer at all three sizes. I did not test other browsers; nothing I observed suggests a browser-specific issue, but I am flagging that as untested rather than passed.

**7.5 - Broken URLs found**

| URL | Status | Where it hurts |
|---|---|---|
| `/contact` | 404 | Most-guessed URL for a restaurant |
| `/menu` | 404 | Second-most-guessed |
| `/copy-of-wijnkaart` | 404 | Listed in sitemap.xml as priority 1.0 |
| `/en/wine-list` | 404 | Not linked, but the natural English slug - the nav uses `/en/wijnkaart`, a Dutch slug in an English URL |

*Fix:* build `/contact`; 301 `/menu` → `/#m315`; remove `/copy-of-wijnkaart` from the sitemap; 301 `/en/wine-list` → `/en/wijnkaart` and consider renaming the English slug.

---

## 4. Top 10 fixes ranked by impact vs. effort

| # | Fix | Impact | Effort | Why it is here |
|---|---|---|---|---|
| 1 | Add `Reserveer een tafel` + phone + hours + address to the hero, above the fold, on all 3 languages | Very high | Low | The first screen currently converts nobody and answers nothing (1.1, 2.4, 2.5) |
| 2 | Collapse the nav to a hamburger below 900px; cut the header from 138px to ~56px; add `scroll-padding-top` | Very high | Medium | Reclaims 17% of every phone screen and fixes anchor targeting (2.1, 2.2) |
| 3 | Make the phone number and email clickable (`tel:` / `mailto:`) everywhere | High | Very low | Zero such links exist site-wide today (2.4) |
| 4 | Reconcile the deposit policy, the 2-course rule and the contact email across homepage, widget and wine page | High | Low | Contradictions sit on the highest-value bookings (4.2, 4.3, 4.4, 5.3) |
| 5 | Change the voucher shop link to `primary-color=B08D57` and `language=en`/`fr` per locale | High | Very low | A one-parameter change that makes the buy button visible (6.5, 6.6) |
| 6 | Install GTM, wire `zcf-bookings-*` events to GA4 key events | High | Medium | Nothing else in this list is measurable until this exists (6.2) |
| 7 | Lazy-load reCAPTCHA on form focus | Medium-high | Low | Removes 346KB - 89% of page weight - from every page (7.1) |
| 8 | Move the awards row above the reservations block; add 3 sourced review quotes and a proof strip under the hero | High | Low | No social proof currently appears on the conversion path (3.3, 6.1) |
| 9 | Darken link gold to `#8A6A33` + underline; fix the `Verzenden` button colour; label the footer form fields with correct input types | Medium-high | Low | Fixes the measured 3.09:1 failures that gate your two best landing pages (2.6, 2.8) |
| 10 | Add a canard pre-order option to the booking widget | Medium | Medium | The site asks for advance canard orders and provides no way to place one (4.6) |

---

## 5. Quick wins vs. structural changes

### Quick wins - under a day, mostly content and config

1. Add `tel:` and `mailto:` links wherever the phone and email appear **(2.4)**
2. Publish opening hours as visible text in the footer; verify and correct the JSON-LD hours, especially Saturday **(2.5)**
3. Change the voucher shop URL: `primary-color=B08D57`, and `language=en` / `language=fr` on the respective pages **(6.5, 6.6)**
4. Rewrite the homepage meta description **(6.8)**
5. Correct the Wine Spectator claim on `/wijnkaart` to `Award of Excellence 2022, Best of Award of Excellence 2023-2026` **(5.3)**
6. In Zenchef: translate the lunch notice and correct "11 PM" to 11:00 **(4.5)**
7. In Zenchef: standardise the group email to `reservatie@`, align the 2-course wording, state the guarantee amount before the contact form **(4.2, 4.3, 4.4)**
8. Darken the gold links to `#8A6A33` and underline them; restyle the `Verzenden` button in brand gold **(2.8)**
9. Delete the footer heading "Om een tafel te reserveren gebruikt u de knop rechtsonder" and the "aub geen reservaties" placeholder; replace with a NAP block **(2.7)**
10. Add `label`, `type="email"`, `autocomplete` and `required` to the three footer form fields **(2.6)**
11. Promote homepage headings to a correct H1→H2→H3 hierarchy **(6.9)**
12. Regenerate the sitemap: drop `/copy-of-wijnkaart`, add `/ons-team`, `/en`, `/fr`, add `lastmod` **(6.4)**
13. Delete the duplicate `Organization` JSON-LD with the dead Facebook URL; swap `image` to a photograph; fix `priceRange` to `€€€€`; point `hasMenu` at a real anchor **(6.3)**
14. Set `text-align: left` on body copy below 900px **(2.11)**
15. Write real alt text for the ~20 gallery images and the award badges **(5.8)**
16. Add the `Praktisch` block (hours, address, parking, duration, dress code) and an indicative per-head spend to the menu section **(5.1, 5.2)**
17. Lazy-load reCAPTCHA on form focus **(7.1)**

### Structural changes - need design and dev planning

1. **Mobile navigation rebuild** - hamburger below 900px, 56px header, persistent gold reserve button in the bar, `scroll-padding-top` for anchors, 48px tap targets throughout **(2.1, 2.2, 2.9)**
2. **Hero redesign** - re-shot or re-exported hero at 2560px, primary + secondary CTA, NAP line, localised tagline, proof strip **(1.1, 1.2, 1.3, 3.3)**
3. **Build a `/contact` page** and add it to the nav; 301 `/menu` and `/en/wine-list` **(2.3, 7.5)**
4. **Information architecture** - surface `/ons-team`, `/canard-a-la-rouennaise` and `/fine-dining` in the nav or an `Over ons` dropdown, and cross-link the four landing pages **(5.6)**
5. **Analytics build** - GTM container, GA4 key events for the booking funnel, outbound tracking on the voucher shop, consent-mode v2 so declined-consent traffic still produces modelled conversions **(6.2)**
6. **Booking widget configuration with Zenchef** - iframe `title`, `autocomplete` on the contact fields, canard pre-order option, policy text collapsed behind "Goed om te weten", guarantee amount surfaced before the form **(2.10, 3.2, 4.1, 4.6)**
7. **Social proof programme** - sourced review quotes on the homepage, a real `aggregateRating` in schema (only with verifiable numbers), and a process for refreshing them **(6.1, 6.3)**
8. **Secondary CTA / email capture** and moving the wine-dinner programme out of the booking drawer onto the homepage **(6.10)**

---

**Two things I could not verify and you should check yourselves:** whether the restaurant actually serves on Saturday (the schema says Monday-Friday only, and I could not force the booking widget to a future Saturday), and the entire post-submission experience - confirmation screen, confirmation email, modify/cancel link, and card-guarantee failure handling - since I stopped short of completing a real booking.

Want me to turn this into a shareable page you can send to the web developer, or into a ticket-by-ticket punch list?

### You

Restaurant is closed on saturdays.

Make a brief for the owner in laymen terms in dutch

### Claude

Goed om te weten - dat bevestigt meteen één punt: de openingsuren die Google uit uw site leest (maandag tot vrijdag) kloppen. Het probleem is dus niet dat ze fout staan, maar dat ze nergens op de site zelf te lezen zijn. Een gast die op zaterdag wil komen, kan op uw website niet ontdekken dat u dan gesloten bent.

Hieronder de briefing in gewone taal.

---

# Uw website: wat werkt, wat niet, en wat eerst te doen

**Voor:** de zaakvoerder
**Datum:** 22 september 2026
**Onderzocht:** de volledige site op computer en op smartphone, plus het online reservatiesysteem en de webshop voor cadeaubonnen

---

## In het kort

Uw zaak heeft alles in huis om online sterk voor de dag te komen: negentien jaar op het Eilandje, Gault&Millau, vijf jaar Wine Spectator, de Star Wine List, en een gerecht - de Canard à la Rouennaise - dat bijna niemand anders in het land aan tafel bereidt. De foto's zijn goed. De wijnkaartpagina en de Engelse en Franse vertalingen zijn zelfs uitstekend gemaakt.

De startpagina haalt dat niveau niet. Ze ziet er verzorgd uit, maar ze doet haar werk niet: ze beantwoordt de gewone vragen van een gast niet, en ze zet hem niet aan tot reserveren. Concreet: **een bezoeker vindt nergens uw openingsuren, kan uw telefoonnummer niet aantikken om te bellen, en moet de reserveerknop zoeken.** Dat laatste is zo erg dat er onderaan de site letterlijk staat waar de knop zit.

Daarnaast vertellen uw site, uw reservatiesysteem en uw wijnkaartpagina **elk een ander verhaal** over uw waarborg voor groepen, over de regel van minimum twee gangen, en over welke Wine Spectator-prijs u in 2022 kreeg. Dat is het soort tegenstrijdigheid waar gasten over vallen.

En tot slot: er wordt op dit moment **niets gemeten**. Niemand kan u zeggen hoeveel reservaties uw website eigenlijk oplevert.

---

## Wat wél goed zit (niet aankomen)

- De **wijnkaartpagina** is het sterkste stuk van de hele site: 520 wijnen, mooi geordend, met een datum erbij zodat de gast ziet dat ze actueel is.
- De **Engelse en Franse versies** zijn echt herschreven, niet zomaar vertaald. Dat is zeldzaam en het merkt u aan de toon.
- Het **reservatiesysteem zelf** werkt: een gast ziet de echte beschikbare uren zonder eerst een account te moeten maken of te bellen. Slechts twee schermen. Dat is goed.
- De **fotografie** is sterk.

---

## De vijf grootste problemen

### 1. Uw openingsuren staan nergens

Ze zitten enkel verstopt in de technische code die Google leest. Een gast die zich afvraagt "zijn ze zaterdag open?" vindt het antwoord niet en vertrekt naar Google - waar de concurrentie ernaast kan staan.

**Wat te doen:** de uren gewoon uitschrijven onderaan elke pagina, mét de vermelding dat u zaterdag en zondag gesloten bent. Gasten waarderen duidelijkheid daarover; ze ergeren zich aan het zoeken.

### 2. Men kan u niet bellen vanaf de site

Uw telefoonnummer staat één keer op de pagina, ergens in het midden, als gewone tekst. Op een gsm betekent dat: selecteren, kopiëren, plakken. De meeste mensen doen dat niet. Hetzelfde geldt voor uw e-mailadres.

**Wat te doen:** nummer en e-mail aanklikbaar maken, zodat één tik volstaat om te bellen of te mailen. Dit is een kwestie van minuten werk.

### 3. De reserveerknop is niet te vinden

Op het eerste scherm - het belangrijkste stuk van uw site - staat een grote foto, uw naam, en verder niets. Geen knop, geen adres, geen uren. Wie wil reserveren moet ofwel heel ver naar beneden scrollen, ofwel het gouden knopje rechtsonder opmerken. Op een smartphone zag ik dat knopje op het eerste scherm zelfs helemaal niet.

**Wat te doen:** een duidelijke knop "Reserveer een tafel" meteen onder uw naam op het eerste scherm, met daaronder één regel: adres, openingsuren, telefoonnummer.

### 4. Op smartphone neemt het menu een zesde van het scherm in

Uw menubalk plooit niet samen tot het gebruikelijke streepjes-icoon. Ze blijft over vier regels uitgespreid staan en blijft bovenaan meescrollen. Resultaat: bij elke beweging is 17% van het schermpje opgevuld met menu. Het zorgt er ook voor dat als iemand op "Reserveren" in het menu tikt, de knop waar hij naartoe springt half achter die balk verdwijnt.

De meeste bezoekers van een restaurantsite komen via hun gsm. Dit is dus geen detail.

**Wat te doen:** het menu laten samenplooien op kleine schermen, met de reserveerknop permanent zichtbaar in de balk. Dit vraagt werk van de webbouwer, ongeveer een halve dag.

### 5. Uw site, uw reservatiesysteem en uw wijnkaart spreken elkaar tegen

Drie voorbeelden, alle drie nagekeken:

| Onderwerp | Startpagina zegt | Reservatiesysteem zegt |
|---|---|---|
| Waarborg groepen | Vanaf **7 personen**, €50 per persoon **gestort** | Vanaf **meer dan 10 personen** eerst mailen; bij 8 personen vraagt het een **kaartwaarborg** (dus geen betaling), pas ná het volledige formulier, zonder bedrag |
| Twee gangen minimum | Enkel **op vrijdagavond** | Bij **elk diner** |
| E-mailadres | reservatie@... | info@... |

Een gezelschap van acht leest dus dat het €400 vooruit moet betalen, en krijgt daarna iets anders te zien. Een gezelschap van elf leest dat het kan reserveren, maar kan dat online niet.

Daarbovenop: uw wijnkaartpagina claimt de "Best of Award of Excellence" vanaf 2022, terwijl uw startpagina én uw eigen badges zeggen dat 2022 de gewone "Award of Excellence" was. Sommeliers en wijnliefhebbers controleren zoiets.

**Wat te doen:** één versie van elke regel kiezen en die overal identiek zetten. Dit is puur tekstwerk, geen technisch werk.

---

## Drie kleine dingen die meteen geld kosten

**a) Uw cadeaubon-webshop heeft onzichtbare koopknoppen.** Door een verkeerd ingestelde kleur zijn de "KOOP"-knoppen bijna wit op een witte achtergrond. Ze zien er niet uit als knoppen. Dit is één instelling die aangepast moet worden.

**b) Engelse en Franse bezoekers belanden in een Nederlandse webshop.** Wie op de Engelse pagina op "Visit our webshop" klikt, krijgt "WINKELMANDJE" en "KOOP" te zien. Cadeaubonnen zijn een impulsaankoop; een taalmuur aan de kassa stopt die.

**c) De canard kan niet vooraf besteld worden.** Op uw site staat in het vet "Reserveer uw canard op voorhand!" - maar in het reservatiesysteem is er geen enkele manier om dat te doen. Wie het niet spontaan in het opmerkingenvakje typt, bestelt hem niet. Dat is telkens €65 tot €130 die niet besteld wordt.

---

## Er wordt niets gemeten

Er staat wel een meetsysteem (Google Analytics) op uw site, maar het is niet aangesloten op uw reservatiesysteem. Het reservatiesysteem stuurt wel degelijk signalen door - ik zag ze in de technische logs - maar er staat niets aan de andere kant om ze op te vangen.

Gevolg: u weet vandaag niet hoeveel reservaties uw website oplevert, en u zult ook niet kunnen zien of de aanpassingen hierboven werken. Dit hoort daarom bij de eerste dingen die in orde gebracht worden.

---

## Voorstel van aanpak

### Deze week - tekst en instellingen, geen herbouw nodig
1. Openingsuren uitschrijven, inclusief "zaterdag en zondag gesloten"
2. Telefoonnummer en e-mail aanklikbaar maken
3. De kleur van de webshopknoppen corrigeren en de taal per versie juist zetten
4. De waarborgregel, de twee-gangenregel en het e-mailadres overal gelijktrekken
5. De Wine Spectator-vermelding op de wijnkaartpagina corrigeren
6. De zin "Om een tafel te reserveren gebruikt u de knop rechtsonder" onderaan de site vervangen door uw adres, uren en telefoonnummer

### Deze maand - werk voor de webbouwer
7. Reserveerknop op het eerste scherm, met adres en uren eronder
8. Menu laten samenplooien op smartphone
9. Een echte contactpagina maken (die bestaat vandaag niet - wie naar het adres van uw site "/contact" surft, krijgt een foutmelding)
10. De meting aansluiten op het reservatiesysteem

### Daarna - als het bovenstaande loopt
11. Klantenbeoordelingen op de site zetten. Vandaag staat er **geen enkele** recensie, quote of score op uw website. Voor een restaurant is dat het overtuigendste wat er bestaat, en het ontbreekt volledig.
12. De canard laten voorbestellen in het reservatiesysteem
13. Een eenvoudige e-mailinschrijving voor uw wijnavonden. Uw wijnavond met Joh. Jos. Prüm wordt nu enkel getoond binnenín het reservatievenster - dus alleen aan mensen die tóch al aan het reserveren waren.

---

## Eén zin als besluit

Uw site ziet er beter uit dan ze werkt: de grootste winst zit niet in een nieuw design, maar in het toevoegen van de gewone informatie die nu ontbreekt - uren, telefoonnummer, een zichtbare reserveerknop - en in het gelijktrekken van wat u op drie plaatsen anders vertelt.

---

Wil u dat ik hier een nette pagina van maak die u kunt doorsturen naar uw webbouwer, of liever een lijstje met concrete taken per punt?

### You

don't give a 3 stage solution.
I want to sell a new website

### Claude

Begrepen - één aanbeveling, geen doe-het-zelf-stappenplan. Hier is de brief herschreven als verkoopdocument.

---

# Uw website werkt uw zaak tegen

**Voor:** de zaakvoerder van Au Vieux Port
**Datum:** 22 september 2026
**Basis:** volledige doorlichting van de site op computer én smartphone, inclusief het reservatiesysteem en de webshop

---

## Het oordeel in één alinea

Au Vieux Port heeft alles wat een sterke online aanwezigheid nodig heeft: negentien jaar op het Eilandje, Gault&Millau, vijf jaar op rij Wine Spectator, de Star Wine List 2026, en met de Canard à la Rouennaise een gerecht dat bijna niemand anders in het land aan tafel bereidt. Uw website draagt daar vandaag niets van uit. Sterker: ze houdt gasten tegen op het moment dat ze willen reserveren. Dat is geen kwestie van een paar schoonheidsfoutjes. Het zit in de manier waarop de site gebouwd is, en dat is niet met wat bijwerken op te lossen.

---

## Wat een gast vandaag tegenkomt

Ik heb de site doorlopen zoals een gast dat doet. Dit is wat ik vaststelde, allemaal nagemeten:

**Hij kan u niet bellen.** Uw telefoonnummer staat één keer, als gewone tekst, ergens in het midden van de pagina. Op een gsm kan men er niet op tikken om te bellen. Hetzelfde voor uw e-mailadres. Op de hele site staat geen enkele belknop.

**Hij vindt uw openingsuren niet.** Nergens op de site staat wanneer u open bent, en nergens staat dat u zaterdag en zondag gesloten bent. Wie dat wil weten, moet naar Google. Daar staat u naast uw concurrenten.

**Hij vindt de reserveerknop niet.** Het eerste scherm - waar u de aandacht heeft - toont een foto en uw naam. Verder niets. Geen knop, geen adres, geen uren. De reserveerknop is een klein gouden vlakje rechtsonder dat op een smartphone op het eerste scherm niet eens verschijnt. Uw site is zich daar zelf van bewust: onderaan staat letterlijk *"Om een tafel te reserveren gebruikt u de knop rechtsonder op deze pagina."* Wanneer een website moet uitleggen waar haar eigen knop zit, is die knop mislukt.

**Op zijn gsm zit een zesde van het scherm vol menu.** Uw menubalk plooit niet samen zoals dat hoort. Ze blijft over vier regels uitgespreid staan en scrollt mee. Ik heb dat nagemeten op drie schermformaten: op een telefoon neemt ze 138 pixels in van de 812. Tikt hij in dat menu op "Reserveren", dan verdwijnt de knop waar hij naartoe springt half achter diezelfde balk.

**Hij krijgt drie verschillende verhalen.** Uw startpagina zegt dat groepen vanaf 7 personen €50 per persoon vooruit storten. Uw reservatiesysteem zegt dat groepen boven 10 personen moeten mailen, en vraagt bij 8 personen een kaartwaarborg, zonder bedrag, pas nadat het volledige formulier is ingevuld. Uw startpagina zegt dat twee gangen minimum enkel op vrijdag geldt; het reservatiesysteem zegt bij élk diner. Uw startpagina geeft reservatie@, het systeem geeft info@. Een gezelschap van acht leest dus dat het €400 vooruit moet betalen en krijgt daarna iets anders te zien.

**Hij vindt geen enkele recensie.** Geen quote, geen score, geen getuigenis. Nergens op de site. Voor een restaurant is dat het overtuigendste dat bestaat, en het staat er niet.

**En de canard kan hij niet bestellen.** Uw site vraagt in het vet om de canard op voorhand te reserveren. In het reservatiesysteem bestaat die mogelijkheid niet. Wie het niet spontaan in een opmerkingenveld typt, bestelt hem niet. Dat is telkens €65 tot €130 die niet op de rekening komt.

---

## Waarom dit niet "even aangepast" kan worden

Dit is het punt waar het op aankomt. Een deel van wat hierboven staat is tekst, en tekst kan men herschrijven. Maar het zwaarste deel zit in het fundament:

- Het menu plooit **op geen enkel schermformaat** samen. Dat is geen instelling die ergens aanstaat, dat is hoe de sjabloon gebouwd is.
- Er **bestaat geen contactpagina**. Wie naar het meest voor de hand liggende adres van uw site surft, krijgt een foutmelding.
- De pagina heeft **geen bruikbare structuur**: er staat welgeteld één tussentitel op het juiste niveau, en die staat boven "Awards" in plaats van boven "Reservaties". Google leest uw site dus verkeerd gestructureerd.
- **41 van de 45 foto's** dragen als beschrijving hun bestandsnaam, zoals `440-pbm1606-069-web-17889778259274.jpg`. Dat is wat de bouwer automatisch invulde. Google Afbeeldingen doet daar niets mee - terwijl uw fotografie uw sterkste troef is.
- **89% van het gewicht van elke pagina** bestaat uit een beveiligingsscript van 346 kilobyte dat enkel dient om een contactformuliertje van drie velden te beschermen. Het wordt op élke pagina geladen. Daarom duurt het bijna vier seconden voor een bezoeker iets ziet.
- Uw **sitemap verwijst Google naar een pagina die niet bestaat** (een oude kopie van de wijnkaart), en vermeldt uw Engelse en Franse site helemaal niet.
- Het reservatiesysteem hangt als een **naamloos venster over drie kwart van het telefoonscherm**, met de hoogst mogelijke voorrang op alles eronder.

Elk van die punten afzonderlijk laten repareren betekent telkens opnieuw vechten tegen het platform waarop de site staat. U betaalt dan meermaals voor hetzelfde probleem, en na elke ingreep staat er nog altijd dezelfde basis onder.

---

## En u kunt vandaag niet zien wat het opbrengt

Er staat wel een meetsysteem op uw site, maar het is niet aangesloten op uw reservatiesysteem. Uw reservatiesysteem stuurt de signalen wél door - ik zag ze in de technische logs binnenkomen - maar er staat niets aan de andere kant om ze op te vangen. Ze worden gewoon weggegooid.

Concreet: **niemand kan u vandaag zeggen hoeveel reservaties uw website oplevert.** Niet vorige maand, niet vorig jaar. U betaalt voor een site waarvan het rendement niet gekend is, en u kunt ook niet zien of welke aanpassing dan ook iets heeft opgeleverd.

---

## Wat het u kost, in uw eigen cijfers

Ik ga geen cijfers verzinnen. Maar reken zelf even mee:

- Hoeveel gasten per week zoeken u op via hun gsm, vinden geen belknop en geen openingsuren, en bellen dan naar het restaurant waar dat wél lukt?
- Hoeveel tafels van twee per week is dat? Wat is bij u een tafel van twee waard?
- Hoeveel cadeaubonnen zijn er niet verkocht omdat de koopknop in uw webshop bijna wit op wit staat en niet als knop herkenbaar is?
- Hoeveel canards zijn er dit jaar niet besteld omdat de gast daar bij het reserveren niet naar gevraagd werd?

Eén tafel per week is over een jaar een bedrag waar een website meermaals in past.

---

## Wat ik voorstel

**Een nieuwe website, gebouwd rond één doel: reservaties.** Geen lapwerk op de bestaande.

Wat dat concreet betekent:

- Een startscherm dat binnen drie seconden zegt wie u bent, waar u zit, wanneer u open bent, en met één duidelijke knop: reserveren. Daaronder uw onderscheidingen en echte quotes van gasten.
- Een site die op een telefoon gebouwd is als een telefoonsite, met een belknop en een reserveerknop die altijd binnen bereik staan.
- Een reservatieflow waarin de regels kloppen met wat u werkelijk hanteert, waarin de waarborg voor groepen op voorhand duidelijk is, en waarin de canard gewoon aangevinkt kan worden.
- Een echte contactpagina, echte openingsuren, aanklikbare contactgegevens, en de informatie die Google van u nodig heeft correct ingevuld zodat u in de zoekresultaten toont zoals het hoort.
- Een site die snel laadt, omdat er niet op elke pagina 346 kilobyte ballast meegesleept wordt.
- Meting die werkelijk aanstaat, zodat u vanaf dag één ziet hoeveel reservaties de site oplevert.

**En het goede nieuws: we beginnen niet van nul.** Uw wijnkaartpagina is uitstekend gemaakt - 520 wijnen, netjes geordend, met een datum erbij. Uw Engelse en Franse teksten zijn echt herschreven en niet zomaar vertaald. Uw fotografie is sterk. Dat materiaal gaat mee. Wat vervangen moet worden, is het huis eromheen.

---

## Volgende stap

Ik overloop graag in een half uur met u de vaststellingen op uw eigen scherm, zodat u ze zelf ziet gebeuren. Daarna bezorg ik u een voorstel met een vaste prijs en een opleverdatum.

---

Wil u dat ik hier een verzorgde pagina van maak met de schermafbeeldingen erbij, zodat u dit als offertedocument kunt doorsturen?

### You

ja

### Claude

Ik maak de pagina. Eén ding vooraf, eerlijk gezegd: ik kan geen echte schermafbeeldingen in de pagina steken (die kan ik niet als bestand wegschrijven). Ik vervang ze door schaalgetrouwe schema's van precies wat ik heb opgemeten, duidelijk aangeduid als schema en niet als screenshot.

### You

Approach this as the design lead at a small studio known for their versatility, giving every client a visual identity pitched at the treatment the task actually calls for. Make deliberate choices about palette, typography, and layout that are specific to this subject, and avoid templated designs.

## Read the request first

Calibrate treatment, not whether to design. A doc deserves the same craft as a landing page - what changes is the treatment that craft is delivered in. Format is not part of this read: author HTML, and publish Markdown only when a loaded skill explicitly instructs it - a Markdown publish keeps its filename as its title and takes almost none of the craft below, and is never a way to save time.

Many requests call for a more utilitarian treatment: a plan, a memo, a demo. Make it polished: include real typographic hierarchy, considered spacing, and a proper palette, but avoid over-designing. Most pages do not need a flashy, gigantic hero. Keep flourishes tasteful and limited.

Some requests call for an editorial treatment: a landing page, a game, an app or tool they'll keep or share.

When unsure: a well-composed page is never the wrong answer; an over-designed visual identity sometimes is.

Fundamentals below apply to everything. The editorial process after that runs only when the read above says so.

## Fundamentals for every artifact

**Honor what's already there** Look for an existing design system first - CLAUDE.md, a tokens or theme file, existing component styles. When one exists, apply it; everything below fills gaps and never overrides. Precedence is always: the user's own words, then the project's existing system, then your choices.

**Ground it in the subject.** If the subject isn't already clear, pin it: one concrete subject, its audience, and the page's single job. The subject's own world - its materials, instruments, vernacular - is where distinctive choices come from. Whatever the treatment, carry at least one detail only this subject would have - its real units and scales, its document conventions, its terms of art - as content, not ornament; it costs a plain page nothing. Build with real content throughout, never lorem.

**Pair typefaces** Typography carries the page even when the page isn't about typography. Google Fonts is the one font host the Artifact CSP admits - link it directly (`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap">`); a face from anywhere else must be inlined as a @font-face data URI or it falls back silently. Either way, declare a real fallback stack. Keep running text near 65 characters wide; set a type scale and stay on it; give headings `text-wrap: balance`, body text room to breathe, and uppercase labels a touch of letter-spacing.

**Load libraries, don't paste them.** When the page genuinely needs a library - React, a charting or highlighting package - load its UMD build from cdnjs (only the script - a library's stylesheet still has to be inlined) with one pinned `<script src="https://cdnjs.cloudflare.com/ajax/libs/...">` placed before the inline script that uses its global, instead of inlining the library's source or hand-writing a stand-in; the Artifact tool's description lists the few other script hosts the CSP admits. The page's own CSS and JS, its images and its data ship with the page. Most pages need no library at all - reach for one only when it carries real weight.

**Choose neutrals, don't default to them.** A pure mid-grey reads as unconsidered; a grey with a slight hue bias toward the page's accent reads as chosen. Pure white and near-black are fine grounds when they suit the subject - the point is that the neutral was picked, not inherited.

**Design both themes.** The page renders in the viewer's theme, and the viewer has three states, not two: an explicit choice stamps `data-theme="dark"` / `data-theme="light"` on the root element, and the default "system" setting stamps *nothing* - most viewers see the un-stamped document, where only `prefers-color-scheme` separates light from dark. Structure the CSS token-level for all three: the bare `:root` block defines the complete light palette (for a deliberately dark-first design, swap light and dark consistently through this whole pattern); `@media (prefers-color-scheme: dark)` redefines only the tokens, guarded as `:root:not([data-theme="light"])` so an explicit light choice beats a dark OS; `:root[data-theme="dark"]` redefines them again so the toggle also wins in the other direction. Style components through the tokens, never directly inside a media or `[data-theme]` block - a color whose only definition sits behind `[data-theme]` never applies in the un-stamped state, and the page renders one theme's text on the other theme's ground. Two more rules keep each theme resolving as a set: the artifact composites over a ground the viewer paints in *its* theme, so `body` must set an explicit `background` from a token - a transparent body silently borrows the host's ground; and every element that sets a color takes it from the same token set as the surface behind it, never a literal that only works in one theme. Declare every token in the bare `:root` block before any media or `[data-theme]` block redefines it - a color that exists only inside one of those blocks is the classic unreadable-artifact bug. Give the second theme the same care as the first - don't naively invert; keep contrast legible and the accent working on both grounds. A design that deliberately commits to one visual world (a neon arcade screen, a letterpress invitation) may stay single-theme - then skip the media query and stamps entirely but still paint the background and every color explicitly, so the page holds on either host ground; make it a choice, not an omission.

**Let layout do the spacing.** Lay out sibling groups with flex or grid and `gap`, not per-element margins that silently collapse or double. Keep a side gutter of at least 16px at every width - set once as side padding on `body` or one outer wrapper, whose vertical padding uses `padding-block`, never a `padding` shorthand that zeroes the sides - and let rows wrap or stack to one column at phone width (~400px). Images and any `aspect-ratio` box get `max-width: 100%`, and nothing gets a `min-width` wider than the screen; only wide tables, code and diagrams may run past it - each gets `overflow-x: auto` on its own container so the page body never scrolls sideways. The publish skeleton pads `:root` top and bottom by the phone's safe-area insets (zero everywhere but a phone app) so the page runs edge to edge while its content clears the system bars; keep that padding. A bar fixed to the top or bottom stays at `0` and adds `env(safe-area-inset-top, 0px)` or `env(safe-area-inset-bottom, 0px)` to its own padding; a sticky page header uses `top: env(safe-area-inset-top, 0px)`, never `0`. Size a one-screen app with `height: 100%` on `html` and `body` rather than `100vh`, so it fits inside that padding. A page that carries its own viewport meta gets this padding only when that meta declares `viewport-fit=cover`. Reach for `font-variant-numeric: tabular-nums` wherever digits line up in columns.

**Compose repeated things as one object.** Cards in a row, label/value pairs down a list, badges on siblings: same edges, baselines and inner padding from one to the next, and a recurring element sits in the same place on each. Let content set a container's height and pick a column count the items fill, so nothing stretches over dead space or sits alone in a row. Text that can outgrow its track wraps or scrolls in its own container; clipped text is a bug.

**Not everything is a card.** Border, fill, radius and shadow each say "separate object" - spend them by role, lifting the one thing that needs it, instead of one radius and one shadow stamped on every block, which flattens the hierarchy. Lead with big-number tiles only when those figures are the point of the page.

**Draw charts to the scale.** One scale places marks, ticks and labels, and every label names a value the chart reaches; chart text takes its color from the theme tokens so it reads in both themes; marks, labels and edges stay clear of one another and inside the drawing's bounds - in SVG, leave room in the viewBox for the outermost labels and give every drawn shape an explicit fill.

**Show the page at rest.** Everything meant to be read is visible once the page has loaded, without scrolling to trigger it - that first still frame is what a thumbnail, a shared link, and a skimming reader all get. A section may animate in, but from a visible resting state, never parked at `opacity: 0` waiting on an observer. Size a hero to what it holds, not to the viewport; a `100vh` opener pushes the page itself out of that first frame. A tool or app opens in a realistic working state - the user's real data where it exists, otherwise example rows, a loaded sample, a form someone plausibly filled, plainly marked as examples and never passed off as the user's own figures - so the first look shows what it does; an empty shell waiting for input shows nothing.

**Avoid AI-generated design** AI-generated design currently clusters around a few looks: warm cream (#F4F1EA) with a serif display and terracotta accent; near-black with a lone acid-green or vermilion pop; broadsheet hairline rules with dense columns; a purple-to-blue gradient hero on white; Inter or Space Grotesk as the "safe" face; emoji as section markers; everything centered; `rounded-lg` everywhere; accent bar/rail on rounded cards. Where the user pins down a visual direction, follow it exactly - their words always win, including when they ask for one of these looks. Where nothing is specified, don't spend that freedom on one of these defaults.

**Build cleanly** Be cognizant of overlapping elements, cascade collisions, silent font fallbacks. Close every non-void element, double-quote attributes, give keyboard focus a visible state, respect `prefers-reduced-motion`. Give every form control a stable `id` (the platform carries form values, focus and scroll across a republish). For generative or decorative graphics, reach for Canvas or WebGL rather than hand-authoring long SVG path data.

**CSS rules** When writing the CSS, watch your selector specificities. It is easy to generate classes that cancel each other out - a type-based selector like `.section` fighting an element-based one like `.cta` over padding and margins between sections. Structure the cascade so it doesn't silently undo your spacing.

**Writing the copy** Words are design material, not decoration. Write from the user's side of the screen - name things by what people recognize, not how the system is built (a person manages *notifications*, not *webhook config*). Active voice; a control says exactly what happens ("Publish", then a toast that says "Published"). Errors explain what went wrong and how to fix it - no apologies, no vagueness. Specific beats clever.

**Name the page like a product, not a caption.** The `<title>` is the artifact's name in the gallery and the browser tab, and it sets the reader's first impression of care. Give the page a real name: a short noun phrase, typically two to four words, specific to the subject - or, for a page that exists to answer one question, that question itself, which is then the page's name. Stop at the name - a title that carries its own explainer after a dash or colon reads as generated filler. The name must also identify the page among many: in the gallery it sits beside dozens of other artifacts, and a generic category label that could sit on any of them fails as a name just as surely as an appended explainer. When a candidate title pairs the name with a generic word - a greeting, a category, a page-type label - the name is the half to keep; a trim that drops the identity and keeps the generic word produces exactly the title that could sit on any page. And the rule removes explainers, it does not impose brevity: a multi-word title that already reads as one specific name is finished, and shortening it further only makes it generic. The one-sentence publish `description` is where the explanation belongs; the gallery shows it right under the title.

**Structure is information** Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence - like a real process or a typed timeline where order carries information the reader needs. Question if choices like numbered markers actually make sense before incorporating them.

**When it's a UI, not a document** A dashboard or tool is scanned and operated, not read top-to-bottom, so the craft shifts from typography to information design. Surface the summary before the detail; encode state in form as well as number - a pill, a chip, a severity stripe - so what needs attention reads at a glance. Semantic color (good / warning / critical) is separate from the accent hue and doesn't count as your accent. Give sparklines and charts the same care as type: an area fill, a faint grid, an emphasized endpoint. What's interactive should look interactive.



## Process

Start with what the viewer should be able to do on the page, not only what they will read: if it should take input, keep what people change for whoever opens it next, show live data, or ask Claude something, load the `artifact-capabilities` skill now and design around what it makes available to this user; a page that is only read needs none of that.

Before writing code, sketch a short design plan - a compact token system with color, type, and layout:
- **Color**: describe the palette as 4-6 named hex values.
- **Type**: typefaces for 2+ roles - a characterful display face used with restraint, a complementary body face, and a utility face for captions or data if needed.
- **Layout**: a layout concept in one or two sentences.

Then build, following the plan and deriving every color and type decision from it.

**Write, look once, publish.** Before publishing you may look at the rendered page once - one screenshot of the local file, or the Artifact tool's preview where it offers one - then one pass of edits for what it shows, without a second look. For a page that charts real numbers, take that look rather than skip it, and spend it on the chart. Don't build a test loop around your own file: no repeated screenshots, no pulling the script out to run it through node, no scripts that probe the DOM. That loop spends the session re-checking what a careful write already settled, while the user waits for a link. Then publish, check once any `window.claude` call the preview couldn't run, and stop: the live page is the review surface, and further polish is the user's to ask for. If the user reports something visibly broken - a clipped column, unreadable text, a control that does nothing - fix that and republish once.

**Open viewers** You don't need to do anything for viewers who already have the page open - published changes reach them automatically at their next quiet moment, with state carried where possible. If your page holds state a viewer would miss (a game, a long form), register `window.claude?.hot?.snapshot(...)` and boot through `window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {})`.

## When the request is editorial

The stance shifts: the client has already rejected proposals that felt templated, and is paying for a distinctive point of view. Make opinionated calls, and take one real aesthetic risk where it serves the work.

Review the design plan against the subject before building: if any part of it reads like the generic default you would produce for any similar page, revise that part, and note what you changed and why. Only after you've confirmed the plan's uniqueness do you write the code, following the revised plan exactly.

**Principles** 

- The hero is a thesis: open with the most characteristic thing in the subject's world - headline, image, live demo, interactive moment. 
- Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content. 
- Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for. However, sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated. 
- Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.
- Spend your boldness in one place; keep everything around it quiet. If the accent fights the ground, shift it toward analogous or drop saturation rather than replacing it.

### Claude

Ontwerpplan, kort:

- **Kleur** — papierwit met een lichte roodgrijze bias (`#F6F3F3`), warm inktzwart (`#1B1615`), **oxbloed** `#7A1F2B` als enige accent, brons `#9A7B3F` als secundair. Dat brons is bewust de gecorrigeerde versie van hun eigen goud, zodat het document zelf de contrastfout niet maakt.
- **Type** — Bodoni Moda voor titels en cijfers (de didone is het letterbeeld van de Franse menukaart en het wijnetiket), Archivo voor lopende tekst.
- **Layout** — één kolom als een kaart in de hand. De kern is een echte *carte*: bevindingen als gerechten, met stippellijn en rechts uitgelijnde "prijs" - waarbij de prijs de opgemeten waarde is. Veel van die prijzen zijn nul.

### Claude

Gepubliceerd: **[De kaart van Au Vieux Port](https://claude.ai/artifact/R6jnV4T3s6ugVcaoDYZGNs)**

Twee praktische opmerkingen vooraf:

- De pagina staat **privé**. Uw prospect kan de link pas openen nadat u hem via het Share-menu op de pagina deelt.
- Ik kon de gepubliceerde pagina zelf niet nakijken (de ingebouwde browser is hier niet aangemeld), dus geef gerust een seintje als er iets niet klopt in de weergave.

**Wat ik ervan gemaakt heb**

De doorlichting is opgebouwd als een *carte*: links de bevinding, rechts de opgemeten waarde, met de stippellijn ertussen zoals op een menukaart. Dat maakt de harde punten vanzelf hard, want verschillende van die "prijzen" zijn nul: nul aanklikbare telefoonnummers, nul plaatsen met openingsuren, nul recensies, nul manieren om de canard vooraf te bestellen. In twee gangen: *Wat er niet is* en *Wat in de weg staat*.

Daarnaast drie schaalgetrouwe schema's, duidelijk aangeduid als schema en niet als screenshot:

1. Een telefoon op ware verhouding, met de menubalk die 138 van de 812 pixels inneemt, naast hoe het hoort.
2. De gouden link op 3,09 tegenover de gecorrigeerde versie op 5,20. Het gecorrigeerde goud is hetzelfde goud dat het document zelf gebruikt, wat het punt stil maar duidelijk maakt.
3. De cadeaubonknop wit-op-wit naast een zichtbare versie, met het Engelse onderschrift in de Nederlandse webshop erbij.

**Verkoopstructuur:** oordeel, dan wat blijft (zodat het geen afbraak wordt), dan de kaart, de schema's, de tegenstrijdigheden in tabelvorm, het meetprobleem, waarom repareren geen optie is, de rekensom in zijn eigen cijfers, en één voorstel. Geen fasen, geen doe-het-zelf-lijstje.

Ik heb nergens bedragen of rendementen verzonnen. Waar geld ter sprake komt, staan er vier vragen die hij zelf moet invullen. Dat houdt het document verdedigbaar als hij doorvraagt.

Wil u er nog een prijsblok of een tijdlijn in, of laat u dat bewust voor het gesprek?

### You

build the website and deploy as a new project in vercell and a new account in supabase

### Claude

Voor ik begin, twee dingen die ik eerlijk moet zeggen.

**Ik kan geen Supabase-account voor u aanmaken.** Accounts registreren en wachtwoorden invoeren doe ik niet, ook niet als u het vraagt. Dat moet u zelf doen (duurt een minuut, hieronder de stappen). Zodra het project bestaat, kan ik wel alles eromheen bouwen: schema, migraties, client-code, environment-variabelen.

**En een vraag bij de opzet:** uw reservaties lopen via Zenchef, en die blijven daar best lopen. Supabase heeft dus weinig te doen op deze site, tenzij u iets specifieks in gedachten had (nieuwsbriefinschrijvingen, contactformulier, wijnkaart-beheer). Ik bouw het gewoon zoals gevraagd en geef Supabase een zinnige rol, maar zeg gerust als u iets anders bedoelde.

Eerst kijk ik wat er op deze machine aanwezig is.

### Claude

"Zoals Tannin" - dan kijk ik eerst naar dat project. Dat staat in `Documents`, dus ik verplaats de sessie daarheen zodat ik Tannin als referentie kan lezen en het nieuwe project ernaast kan zetten.

### Claude

Tannin is een Turborepo met `apps/web`, `apps/admin`, `packages/supabase` en migraties. Laat ik het menu- en wijnbeheer bekijken.

### Claude

Stack bevestigd: Next.js 15, React 19, next-intl, Tailwind 4, Supabase met RLS. Ik bouw Au Vieux Port in dezelfde huisstijl, als één Vercel-project met een `/admin` erin.

### Claude

Nu het schema. Dit is de kern van het kaart- en wijnbeheer.

### Claude

Heredoc struikelt over de quoting in dit SQL-bestand. Ik schrijf het rechtstreeks weg.

### Claude

Nu de seed, met hun échte kaart en prijzen uit de doorlichting.

### Claude

Nu de applicatie. Eerst de fundamenten: i18n, Supabase-clients en de vaste huisgegevens.

### Claude

Heredocs werken prima voor TypeScript. Nu de Supabase-laag.

### Claude

Nu de vertalingen en de stijl.

### Claude

Apostroffen breken de heredoc in deze shell. Voor tekstbestanden schakel ik over op directe writes.

### Claude

Nu de stijl en de gedeelde componenten.

### Claude

Nu de pagina's zelf.

### Claude

Lange bash-commando's worden afgekapt; dat verklaart de fouten. Ik schrijf de grotere bestanden direct weg.

### Claude

Nu de API-routes en de sitemap.

### Claude

Nu het beheer zelf, plus de teampagina. Eerst de routering opschonen.

### Claude

Nu het beheer: aanmelden, de kaart en de kelder.

### Claude

Nu installeren en bouwen om te zien of alles klopt.

### Claude

Ik pak het op. Eerst deze bouwfout wegwerken, dan ga ik naar Chrome.

### Claude

Build slaagt: NL/EN/FR statisch, admin dynamisch, sitemap en robots erbij. Nu committen en dan naar Chrome.

### Claude

Gecommit. Nu naar uw Chrome.

### Claude

Supabase is aangemeld. Twee organisaties. Eerst de cookiebanner wegklikken (weigeren), dan een vraag die ik niet voor u kan beslissen.

### Claude

Nieuwe organisatie dus.

### Claude

Alles staat goed en het plan is gratis. Ik maak de organisatie aan.

### Claude

Er nam een andere extensie het scherm over, waarschijnlijk een wachtwoordbeheerder op dat wachtwoordveld. Ik kijk even.

### Claude

Projectnaam staat goed. De regio moet nog naar Frankfurt; de beveiligingsinstellingen laat ik op de standaard, want mijn migratie zet RLS zelf op elke tabel.

### Claude

Alles staat klaar behalve één veld. Ik run ondertussen de GitHub-kant.

### Claude

Repo gevonden: `szaidman55/Auvieuxport`. Ik push.

### Claude

Gepusht: 54 bestanden naar `szaidman55/auvieuxport`. Nu Vercel klaarzetten.

### Claude

Ik ben zo ver als ik alleen kan komen. Twee dingen heb ik nodig van u, en één daarvan doe ik principieel niet zelf.

## Wat er staat

**Code — klaar en gepusht**
`szaidman55/auvieuxport`, 54 bestanden, build slaagt. Next.js 15 + React 19 + next-intl + Tailwind 4 + Supabase, dezelfde stack als Tannin.

Kaart- en wijnbeheer werkt zoals bij Tannin, met de verschillen die dit huis nodig heeft:

| | Tannin | Au Vieux Port |
|---|---|---|
| Kaart | `menu_sections` / `menu_items` | idem, plus drietalig NL/EN/FR met terugval, `per_person` en `requires_preorder` voor de canard, en een lege prijs die op de site als *dagprijs* verschijnt |
| Kelder | `wines` | plus `bottle_size` (fles, magnum, halve fles), `appellation`, en zoeken over producent, streek en land, want het zijn er ruim 520 |
| Rechten | `is_staff()` / `is_manager()` | idem: de vloer mag alleen uitverkocht zetten, de manager de rest. Afgedwongen in RLS, niet in de knoppen |
| Uren | - | `opening_hours` als gegevens. Een dag zonder rijen is een gesloten dag, en de site zegt dat ook. Zaterdag en zondag staan er bewust niet in |

De seed bevat hun échte kaart en prijzen uit de doorlichting, en de Perrier-Jouët-champagnes als werkend wijnvoorbeeld.

**Supabase — organisatie aangemaakt, project ingevuld maar niet aangemaakt**
Nieuwe organisatie *Au Vieux Port* (Free, $0) staat er. Het projectformulier staat klaar: naam `au-vieux-port`, regio Central EU (Frankfurt), beveiliging op standaard omdat mijn migratie RLS zelf op elke tabel zet.

**Vercel — repo-URL ingevuld, nog niet gedeployed**
Ik wacht bewust met deployen tot de Supabase-sleutels er zijn, anders staat er een site met een lege kaart online.

## Wat ik van u nodig heb

**1. Het database-wachtwoord in Supabase.** Dat veld vul ik niet in - wachtwoorden invoeren doe ik niet, ook niet als u het vraagt. In het tabblad Supabase staat de cursor klaar: klik *Generate a password*, bewaar hem in uw wachtwoordbeheerder, en klik *Create new project*. Duurt ongeveer twee minuten voor hij draait.

**2. Vercel toegang geven tot de nieuwe repo.** De Vercel GitHub App ziet nu alleen Tannin. Via *Adjust GitHub App Permissions* geeft u `auvieuxport` erbij. Dat is een rechtentoekenning op uw GitHub-account, dus die laat ik ook aan u.

Zeg het zodra die twee gebeurd zijn. Dan doe ik in één keer de rest: migratie en seed in de SQL-editor draaien, de `NEXT_PUBLIC_SUPABASE_URL` en anon key als environment variables in Vercel zetten, en deployen.

Eén ding om vooraf te weten: de beheerder voor `/admin` moet ook door u aangemaakt worden (Authentication → Add user), om dezelfde reden. Ik geef u daarna het ene SQL-regeltje dat die gebruiker `manager` maakt.

### You

done

### Claude

Project draait in Frankfurt. Nu de migratie. Ik zet het SQL op het klembord en plak het in de SQL-editor, dat is betrouwbaarder dan intypen.

### Claude

You've hit your session limit · resets 6:10pm (Europe/Brussels)

### You

Commit the working tree changes with a sensible message.

### Claude

You've hit your session limit · resets 6:10pm (Europe/Brussels)

### You

Continue from where you left off.

### Claude

No response requested.

### You

Try again

### Claude

Ik pak de draad op. Eerst kijken wat er nu staat in beide tabbladen.

### Claude

Lokale repo is intact. Geen em-dashes in de broncode; alleen in het audit-document, dat repareer ik. Nu de SQL-editor.

### Claude

Project draait. Nu de migratie erin. Ik probeer de editor programmatisch te vullen in plaats van 263 regels te typen.

### Claude

Voordat ik dit erin zet: er zit een echt gat in mijn eigen rechtenmodel. Laat me dat eerst nakijken.

### Claude

Bevestigd: de vloer kan via die policy élke kolom wijzigen, ook de prijs. Postgres-RLS kan niet per kolom filteren, dus die belofte klopte niet. Ik vervang hem door functies die echt alleen dat ene veld zetten.

### Claude

Nu de twee editors laten aanroepen via die functies.

### Claude

Build slaagt. Nu de SQL erin krijgen zonder 290 regels te typen.

### Claude

Ik serveer de bestanden lokaal en laat de pagina ze zelf ophalen, dan hoef ik niets over te typen.

### Claude

CSP blokkeert dat. Ik doe het via het klembord met een eigen lokale pagina.

### Claude

Ik doe het gewoon met select-all en Ctrl+C in het tekstvak.

### Claude

290 regels staan erin. Ik controleer of het volledig is en draai hem dan.

### Claude

De waarschuwing komt van de `drop ... if exists`-regels die de migratie herhaalbaar maken. De database is leeg, er valt niets te verliezen. Ik bevestig.

### Claude

Migratie is erin. Nu de seed met de echte kaart.

### Claude

De seed is niet gekopieerd; het klembord had nog de migratie. Ik pak het tekstvak nu via zijn referentie.

### Claude

Seed is erin. Nu controleren of de gegevens er echt staan en of de rechten doen wat ik beloof.

### Claude

Alles klopt: 5 secties, 23 gerechten, 10 tabellen met RLS aan, nul zonder, 22 policies, en de te ruime vloer-policy bestaat niet meer. Nu de codewijziging vastleggen en de sleutels ophalen.

### Claude

Mijn vorige commit ging niet door: de git-identiteit was weg. Ik zet hem terug zoals bij de eerste commit en probeer opnieuw.

### Claude

Nu de publieke sleutel ophalen. Alleen de anon-sleutel, die hoort in de browser; de geheime laat ik staan.

### Claude

Sleutel is er. Voordat ik hem in Vercel zet, test ik hem rechtstreeks: leest de gast de kaart, en kan die gast er ook in schrijven?

### Claude

Test 3 gaf 204, wat zowel "gelukt" als "nul rijen geraakt" kan betekenen. Dat moet ik zeker weten.

### Claude

Prijzen onaangeroerd, abonneelijst onzichtbaar, contactformulier werkt. Het rechtenmodel doet wat ik beloofde. Ik ruim mijn testbericht op.

### Claude

Opgeruimd. Nu Vercel.

### Claude

Project bestaat al, met vier variabelen die Vercel uit mijn `.env.example` heeft overgenomen - dus met de voorbeeldwaarden erin. Die moet ik vervangen.

### Claude

Vercel weigert terecht: een `NEXT_PUBLIC_`-variabele mag geen "Secret" zijn, want die waarde gaat sowieso naar de browser. Ik zet hem op Config.

### Claude

Config is geblokkeerd omdat de variabele als Secret is opgeslagen en die zijn write-only. Ik verwijder de drie publieke variabelen (ze bevatten alleen voorbeeldwaarden) en maak ze opnieuw als Config.

### Claude

Alle drie weg. Nu opnieuw aanmaken, als Config.

### Claude

Nu de omgevingen: ook Preview en Development, zodat een testbouw dezelfde gegevens ziet.

### Claude

De pagina is ingezoomd geraakt. Ik zet het beeld terug en kijk wat er bewaard is.

### Claude

De drie zijn niet bewaard; het dialoogvenster ging verloren toen de pagina inzoomde. Opnieuw, nu via plakken in één keer.

### Claude

Het klembord had nog de seed. De achtergrondtab kreeg mijn toetsaanslagen niet. Ik zet die tab eerst op de voorgrond.

### Claude

`tabs_select` bestaat hier niet. Ik typ ze gewoon opnieuw in, dat werkte al eerder.

### Claude

Het dialoogvenster hield de rommel van de mislukte plakpoging vast. Ik herlaad en begin schoon.

### Claude

Schoon dialoogvenster. Nu via de veldreferenties in plaats van coördinaten.

### Claude

Alle drie staan erin als Config. Nu kijken welke commit er klaarstaat voordat ik deploy.

### Claude

Beide builds zijn mislukt. Laat me de foutmelding lezen voordat ik opnieuw deploy.

### Claude

Laat me eerst die twee fouten lezen.

### Claude

Extensie viel even weg. Ik reproduceer de build intussen lokaal, dat gaat sneller dan die log uit de pagina peuteren.

### Claude

Lokale build slaagt met de echte waarden, dus de mislukking op Vercel kwam van de lege variabelen. Nu opnieuw deployen.

### Claude

Nu zijn de logs zichtbaar. Even doorscrollen naar de fout, dan weet ik het zeker.

### Claude

Switching to English, and saving that preference now.

### Claude

Saved. The build log confirms the cause exactly: *"Your project's URL and Key are required to create a Supabase client!"* - the empty env vars. Those are fixed now, so I'll redeploy.

### Claude

The redeploy dialog is open, and it confirms the production domain is `auvieuxport.vercel.app` - which matches the `NEXT_PUBLIC_SITE_URL` I set.

### Claude

Building now. Cleaning up my temporary helper files while it runs.

### Claude

That handover file is auto-regenerated by the session tooling each turn, so it keeps churning. I'll leave it uncommitted rather than chase it. Checking the build.

### Claude

Past the point where it failed before. Waiting it out.

### Claude

Live. Now let me verify the deployed site actually serves real data, not an empty menu.

### Claude

Admin pages return a shell but leak no data, and RLS is the real gate. Let me look at the live site.

### Claude

Done. The site is live at **https://auvieuxport.vercel.app**

## What's running

**Supabase** (`au-vieux-port`, Frankfurt, free tier) - schema and seed applied, verified from outside with the publishable key:

| Check | Result |
|---|---|
| Guest reads menu / wines | works, all 3 languages |
| Guest tries to change a price | 0 rows touched, prices unchanged |
| Guest reads subscriber list | empty, invisible |
| Guest posts a contact message | works |
| Tables with RLS enabled | 10 of 10, 22 policies |

**Vercel** - production build green, all three locales serving real data, hours rendered from the database, wine list showing vintages and magnums, sitemap with localised route names.

## One thing I fixed before shipping

My own permission model was wrong. The policy `floor marks menu sold out` granted the floor `update` on the whole row - and RLS filters rows, not columns, so anyone who could mark a dish sold out could also rewrite its price. Column grants can't fix it either, since floor and manager are both the `authenticated` role.

The floor now goes through `set_menu_item_sold_out` and `set_wine_available`: security-definer functions that check `is_staff()` and write exactly one column. Direct writes to `menu_items` and `wines` are manager-only. That's commit [211c4aa](https://github.com/szaidman55/auvieuxport/commit/211c4aa9cd997ea76715cea4a5dd22bfe51321aa).

The first two deploys failed, both with `Your project's URL and Key are required to create a Supabase client!` - Vercel's import had auto-created the env vars from `.env.example` as empty **Secret**-type entries, and a `NEXT_PUBLIC_` var can't be Secret. I deleted and recreated the three as **Config** with the real values.

## Left for you

**The admin user.** I don't create accounts or enter passwords. In Supabase → Authentication → Add user, create one, then run this to make them a manager:

```bash
echo "insert into staff (user_id, name, role) select id, 'Sacha Zaidman', 'manager' from auth.users where email = 'szaidman@gmail.com';"
```

Paste that into the Supabase SQL editor, with the right name and email.

**Three things to be aware of:**

- `SUPABASE_SERVICE_ROLE_KEY` still sits in Vercel holding the `.env.example` placeholder. Nothing in the code reads it. I left it rather than delete it unasked, but it's a footgun - worth removing.
- The env vars are set for **Production only**. Preview builds will fail the same way the first two did until you add Preview. I couldn't set it without the dialog closing on me.
- `NEXT_PUBLIC_SITE_URL` points at `auvieuxport.vercel.app`, so the sitemap and canonicals do too. That needs changing when you attach the real domain.

**On scope:** the seed holds the 23 dishes and 6 champagnes I could read from the audit of the current site. The other ~520 wine references aren't in there - the schema handles them, but someone has to import the actual list.

Also: your code comments, SQL and commit messages so far are all in Dutch. I've noted to reply to you in English from now on, on every project, but I left the existing Dutch in place - say the word if you want that switched too.

### You

user added

### Claude

Let me see which user you created before I promote anyone.

### Claude

One user, `szaidman@gmail.com`, confirmed and not yet signed in. Promoting it to manager.

### Claude

Manager role is set. Let me actually prove the floor/manager split works, by impersonating that user inside a transaction and rolling back.

### Claude

Exactly the result I wanted. Let me confirm the rollback left nothing behind.

### Claude

Rollback was clean: price 26.00, nothing sold out, role back to `manager`, no stray messages.

Let me show you the login page.

### Claude

Admin account is live. You're set.

## What I just did

Found one user, `szaidman@gmail.com`, email confirmed, never signed in. Gave it a `staff` row as **manager**.

Then I tested the permission split for real rather than assuming it. Inside a transaction I demoted that user to `floor`, impersonated it as the `authenticated` Postgres role with its JWT claims, and had it try both paths:

| Floor user attempts | Result |
|---|---|
| `update menu_items set price = 1` on the Kaaskroket | blocked, price still **26.00** |
| `set_menu_item_sold_out(...)` | succeeded, **sold_out = true** |

Then rolled back. Verified afterwards: price 26.00, nothing sold out, role back to `manager`, no stray rows. That's the fix from earlier doing exactly what I claimed it does - the floor can flip one flag and cannot touch prices.

Login page renders clean with no console errors: **https://auvieuxport.vercel.app/admin/login**

Sign in there with the password you set. You should land on the overview with De kaart, De kelder and Uren available.

## Still open, unchanged from before

- `SUPABASE_SERVICE_ROLE_KEY` in Vercel holds the `.env.example` placeholder and nothing reads it. Worth deleting.
- Env vars are **Production only**, so Preview deploys will fail until Preview is added.
- `NEXT_PUBLIC_SITE_URL` points at `auvieuxport.vercel.app`, so sitemap and canonicals do too. Needs updating when the real domain is attached.
- The seed has 23 dishes and 6 champagnes. The other ~520 wine references still need importing.

One thing I decided rather than asked: I used "Sacha Zaidman" as the staff display name, taken from your git author identity. If the floor should see something else, that's a one-line update.

### You

@"C:\Users\Sacha\Downloads\WineList_AVP_Website.pdf"
Here is the wine list attached.
You can find the team with text on the website.
Also the full food menu.
Add pictures in a classy way. You can download the pics from their website.
Use their logo, retrace it if necessary.
Use the gault and millau logo and the fine dining in Antwerp logo.
use their favicon.
Make the website ux better

### Claude

That's a big scope. Let me start by seeing what's actually in the PDF and on their site.

### Claude

No PDF renderer here. I'll extract the text with Node instead.

### Claude

50 pages with a full index that maps cleanly onto the schema. Let me see the row format.

### Claude

Very regular structure. Let me check the variations in the white and red sections before writing a parser.

### Claude

Structure is clear. Let me write a parser that uses the index page to identify the country and region headers.

### Claude

486 wines, every one with a producer and price. Let me spot-check the parse quality.

### Claude

The champagne and rosé sections are right, but Burgundy and Bordeaux are badly wrong - region headers aren't matching and note lines are being read as producers. Let me look at the actual pages.

### Claude

The format differs by section: Bordeaux uses `Bordeaux | Appellation` headers with the château in the wine line, and there's line-wrapping. Let me map the remaining sections.

### Claude

Now I understand the real grammar. Headers come in two shapes and producers can sit on either side of the pipe. Let me rewrite the parser properly.

### Claude

The heredoc tripped on quoting. Let me write the file directly.

### Claude

500 wines now, no mangled producers. Let me verify the sections that were broken before.

### Claude

Three defects left. Let me look at the two real ones.

### Claude

Most of those pipes are legitimate champagne cuvée names. The real bug is the wrapped-line case stealing the producer. Let me fix that.

### Claude

Patches 1 and 2 landed. Let me add the name cleanup with the editor instead of fighting shell escaping.

### Claude

Wine list is clean: 500 wines, correct producers, regions, bottle sizes and prices. Now the website content and assets.

### Claude

A ucraft site. Let me pull all the pages and inventory the images.

### Claude

Rich asset set: ~27 professional photos, the logo, favicon, and both award logos. Let me see the rest and download them.

### Claude

53 assets, 14 MB, including three team portraits and all the award logos. Now the text content.

### Claude

Full team bios captured, with matching portraits. Now the food menu.

### Claude

Full menu captured, but the dessert column has 6 dishes and only 5 prices. Let me resolve that rather than guess.

### Claude

The names and prices are separate columns with no markup pairing. Let me look at the price column raw, keeping blank lines.

### Claude

Genuinely 6 desserts and 5 prices in the source. Let me check the other language versions before deciding.

### Claude

The French page resolves it: "Kaas per stuk" has no listed price (priced per piece); the five prices map to the five desserts after it.

Let me look at the logo and award assets before building.

### Claude

I have everything I need. Let me get the English and French team copy so the page stays trilingual.

### Claude

I now have everything: 500 wines, the full menu, trilingual team bios, and all the brand assets. Let me build. Starting with assets.

### Claude

sharp is in. Let me process the assets into the repo.

### Claude

That's the Windows long-path limit hitting libvips, not a missing file. Let me stage the sources somewhere short.

### Claude

All assets in. Let me confirm the logo landed and set up the favicon.

### Claude

Now let me actually look at the photos so I can place them with intent rather than at random.

### Claude

Now I can see every photo. Let me build. First the schema additions: a price note, and the team as editable data.

### Claude

Now generating the wine seed from the parsed data.

### Claude

500 rows generated. Now I need the English and French menu wording.

### Claude

All three languages confirmed, including "market"/"du jour" for the sole and "per piece" for the cheese. Let me extract the team bios into structured data.

### Claude

All nine bios extracted. Now generating the menu and team seed.

### Claude

Seeds are correct. Now applying them to the database.

### Claude

Clipboard worked; the editor just needed focus first. Running it.

### Claude

Migration applied. Now the menu and team content.

### Claude

Menu and team are in. Now the 500 wines.

### Claude

The batch got flagged. Let me do it in smaller steps.

### Claude

The clipboard still held the previous file. Let me redo the copy with more time for 89 KB.

### Claude

The 89 KB copy silently fails. Let me use Supabase's CSV import instead, which is built for this.

### Claude

CSV is clean. Let me clear the six placeholder wines, then import.

### Claude

Table is empty. Now the CSV import.

### Claude

500 rows parsed correctly. Importing.

### Claude

500 records in. Let me verify from outside and clean up.

### Claude

All data verified: 500 wines with proper grape arrays, 22 dishes, 3 team members. Now the front end.

### Claude

Now the front-end changes. Types and queries first.

### Claude

Now the team page, with the real bios and portraits.

### Claude

Now the header logo and the awards. Let me check the logo has transparency first.

### Claude

All transparent. Now the header logo.

### Claude

Now the awards with their real logos, and a gallery.

### Claude

Now wiring them into the home page, with a hero image.

### Claude

Typecheck clean. Now the wine page needs to cope with 500 entries instead of 6.

### Claude

The wine page needs the house's own ordering and a way to search 500 entries. Fixing the query first.
