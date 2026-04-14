# **PAGE 5: CONTACT (`/contact`)**

---

**\[COPY FILE: darlingmartech-contact-copy.md\]**

---

## **── SECTION: PAGE HERO ──**

*\[Design note: Intentionally minimal. This is the last page a high-intent visitor sees. The copy here should feel like a handshake, not a form. Left column: copy. Right column: form. Clean 50/50 split on desktop, stacked on mobile. Jacob's photo optional here — small, informal, humanizing.\]*

**Eyebrow (small caps, orange):** START A CONVERSATION

**H1 (Syne):** Tell me what's going on. I'll read it personally and respond the same day.

**Supporting body (16px, off-white):** No intake form with 14 required fields. No automated response that asks you to schedule a call with a calendar bot. You send a message, I read it, and I write back.

If you're not sure how to start, pick the option below that's closest to where you are.

---

## **── SECTION: INTENT SELECTOR ──**

*\[Design note: 4 large selectable cards stacked above the form. Clicking one pre-fills the "What's going on" field with a starter prompt and highlights the selected card in orange. This is the intent-routing mechanism — it helps Jacob understand the trust stage before reading the message, and it reduces friction for the visitor who isn't sure how to start. Each card has a short title and one clarifying sentence.\]*

**Section label (small, muted):** What best describes where you are right now?

---

**Intent Card 1:** **Label:** I know my problem and I'm ready to talk scope. **Clarifier:** You've diagnosed the issue. You want to understand what working together looks like and what it costs. *\[Selecting this pre-fills: "I have a specific problem I'm ready to address and I'd like to understand scope and pricing."\]*

---

**Intent Card 2:** **Label:** I have a problem but I'm not sure what the fix is yet. **Clarifier:** Something isn't working. You're not certain whether it's strategy, systems, website, or something else entirely. *\[Selecting this pre-fills: "I know something isn't working with my marketing but I'm not sure where to start."\]*

---

**Intent Card 3:** **Label:** I want a second opinion on something specific. **Clarifier:** You have a plan, a vendor quote, or a strategy in progress and you'd like a senior read before committing. *\[Selecting this pre-fills: "I have a specific decision or plan in progress and would like an expert opinion before moving forward."\]*

---

**Intent Card 4:** **Label:** I'm not sure yet — I just want to see if this is a fit. **Clarifier:** You're early stage. Nothing's on fire. You want to understand what this kind of engagement even looks like before deciding. *\[Selecting this pre-fills: "I'm exploring whether this is the right fit for my situation and would like to have an initial conversation."\]*

---

## **── SECTION: CONTACT FORM ──**

*\[Design note: Clean, dark form. Minimal fields — exactly what's needed, nothing more. Each field has a human label (not "First Name*" but something that reads like a real question). Form submits to Formbricks webhook → n8n → Twenty CRM → Resend confirmation email \+ Slack alert to Jacob.\]\*

**Form headline (small, muted, above form):** Tell me a bit about what's going on.

---

**Field 1:** **Label:** Your name **Placeholder:** What should I call you? **Type:** Text · Required

**Field 2:** **Label:** Your email **Placeholder:** Where should I reply? **Type:** Email · Required

**Field 3:** **Label:** Your company (optional) **Placeholder:** If relevant **Type:** Text · Optional

**Field 4:** **Label:** What's going on? **Placeholder:** The more specific, the more useful my response will be. You don't have to have it all figured out — just tell me where you are. **Type:** Textarea · Required · Min 2 lines

**Field 5 (conditional — shows only if Intent Card 1 was selected):** **Label:** Approximate monthly budget range **Placeholder:** This helps me scope accurately — no pressure if you're not sure yet. **Type:** Select dropdown **Options:**

* I'm not sure yet  
* Under $2,000/month  
* $2,000 – $5,000/month  
* $5,000 – $10,000/month  
* $10,000+/month

---

**Submit button (full width, orange):** Send it →

**Below button (small, muted):** I reply within one business day. Usually the same day.

---

## **── SECTION: WHAT HAPPENS NEXT ──**

*\[Design note: Below the form, a simple 3-step "what happens after you hit send" explanation. Reduces the anxiety of reaching out to an unknown. Builds trust in the process. Dark surface cards or simple numbered list.\]*

**Section label (small, muted):** After you send this:

**Step 1:** I read it myself — not an assistant, not a bot, not an email routing rule. I read every message.

**Step 2:** If the situation is clear, I reply with specific questions or a direct response. If I need more context, I'll ask.

**Step 3:** If it sounds like a fit, I'll suggest a 30-minute diagnostic call — no prep required, no agenda to follow. Just a conversation.

---

## **── SECTION: THE ALTERNATIVE PATHS ──**

*\[Design note: For visitors who are not yet ready to send a message. Horizontal row of 3 option cards — lower-commitment alternatives. Each card: title, one sentence, and a link. Keeps the trust ladder intact — not everyone reaching the contact page is ready to message.\]*

**Section label (small, muted, centered):** Not quite ready to send a message? That's fine.

---

**Alternative 1:** **Title:** Run a free diagnostic first. **Body:** Take the Growth Bottleneck Quiz. Get a specific result in 3 minutes, no email required. **CTA:** Take the quiz →

**Alternative 2:** **Title:** Read the case studies. **Body:** See exactly what the work looks like and what it produces before deciding. **CTA:** See the proof →

**Alternative 3:** **Title:** Read about the process. **Body:** Understand exactly how engagements work before reaching out. **CTA:** See how I work →

---

## **── SECTION: DIRECT CONTACT DETAILS ──**

*\[Design note: Below the alternatives. Simple, human, low-design. Just the actual contact information laid out cleanly. No design flourishes — just useful information.\]*

**Section label (small, muted):** Or reach out directly:

**Email:** jacob@darlingmt.com

**Location:** Indianapolis, IN Available to work with clients nationally.

**Response window:** Same-day replies during business hours. Within one business day on weekends and holidays.

**\[Optional: Cal.com embed or link for direct booking\]** Prefer to schedule a time directly? \[Book a 30-minute diagnostic call →\] *(Cal.com link)*

---

## **── SECTION: BOTTOM REASSURANCE ──**

*\[Design note: Minimal. A few lines below all the form content. Centered. Muted. Exists to reduce the final hesitation before someone sends a message.\]*

**Copy (small, muted, centered):** There's no commitment attached to sending a message. I'm not going to pressure you into an engagement that isn't right for your situation. If it's not a fit, I'll tell you — and I'll point you toward something that might be.