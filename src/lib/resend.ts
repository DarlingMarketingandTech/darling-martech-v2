import { Resend } from "resend";
import { appEnv, assertEnvPresent } from "@/lib/env";
import type { GeoAuditCheckKey, GeoAuditResponse } from "@/types";

type ContactNotificationInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  intent?: string;
  problemCluster?: string;
};

type ToolResultEmailInput = {
  email: string;
  toolTitle: string;
  resultLabel?: string;
  resultSummary?: string;
  ctaHref?: string;
};

type ToolLeadNotificationInput = {
  leadId: string;
  toolSlug: string;
  email: string;
  name?: string | null;
  company?: string | null;
  role?: string | null;
  source?: string | null;
  pagePath?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  resultSummary?: Record<string, unknown> | null;
  submittedAt: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getResendClient() {
  assertEnvPresent("Resend", {
    RESEND_API_KEY: appEnv.resendApiKey,
  });

  return new Resend(appEnv.resendApiKey);
}

export async function sendContactNotification(input: ContactNotificationInput) {
  const resend = getResendClient();

  return resend.emails.send({
    from: appEnv.resendFromEmail,
    to: [appEnv.contactToEmail],
    replyTo: input.email,
    subject: `New Darling MarTech contact: ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Company: ${input.company ?? "Not provided"}`,
      `Intent: ${input.intent ?? "Not provided"}`,
      `Problem cluster: ${input.problemCluster ?? "Not provided"}`,
      "",
      input.message,
    ].join("\n"),
    html: `
      <h1>New contact submission</h1>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(input.company ?? "Not provided")}</p>
      <p><strong>Intent:</strong> ${escapeHtml(input.intent ?? "Not provided")}</p>
      <p><strong>Problem cluster:</strong> ${escapeHtml(input.problemCluster ?? "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
    `,
  });
}

type GeoAuditReportEmailInput = {
  email: string;
  name: string;
  company?: string;
  note?: string;
  targetUrl: string;
  audit: GeoAuditResponse;
};

const GEO_CHECK_ORDER: GeoAuditCheckKey[] = [
  "crawler",
  "schema",
  "metadata",
  "structure",
  "faq",
  "authority",
];

function formatGeoAuditPlainText(input: GeoAuditReportEmailInput): string {
  const { audit, targetUrl, name, company, note } = input;
  const lines: string[] = [
    `GEO Readiness Auditor — full report`,
    ``,
    `Audited URL: ${targetUrl}`,
    `Readiness score: ${audit.score} / 100`,
    ``,
    `What was extracted`,
    `- Title: ${audit.extractedData.title}`,
    `- Meta description: ${audit.extractedData.metaDescription}`,
    `- H1: ${audit.extractedData.h1}`,
    `- Top term signals: ${audit.extractedData.entities.join(", ") || "(none)"}`,
    ``,
    `Checks`,
  ];

  for (const key of GEO_CHECK_ORDER) {
    const c = audit.checks[key];
    lines.push(`- ${key}: ${c.passed ? "pass" : "needs work"} (${c.score}/${c.max})`);
  }

  lines.push(``, `Raw signals`, `- Canonical: ${audit.rawXray.canonical ?? "(none)"}`);
  lines.push(`- Meta robots: ${audit.rawXray.metaRobots ?? "(none)"}`);
  lines.push(`- OG title: ${audit.rawXray.ogTitle ?? "(none)"}`);
  lines.push(`- OG description: ${audit.rawXray.ogDescription ?? "(none)"}`);
  lines.push(`- Twitter card: ${audit.rawXray.twitterCard ?? "(none)"}`);
  lines.push(`- JSON-LD blocks: ${audit.rawXray.jsonLdBlockCount}`);
  lines.push(`- JSON-LD @types: ${audit.rawXray.jsonLdTypes.join(", ") || "(none)"}`);
  lines.push(
    `- Heading outline: ${audit.rawXray.headingOutline.map((h) => `[H${h.level}] ${h.text}`).join(" | ") || "(none)"}`
  );
  lines.push(
    `- Link counts: internal ${audit.rawXray.stats.internalLinkCount}, external ${audit.rawXray.stats.externalLinkCount}`
  );
  lines.push(`- Visible text (approx chars): ${audit.rawXray.stats.visibleTextChars}`);

  if (audit.rawXray.jsonLdSnippet) {
    lines.push(``, `JSON-LD snippet (truncated):`, audit.rawXray.jsonLdSnippet);
  }

  lines.push(``, `Requested by: ${name}`);
  if (company) lines.push(`Company: ${company}`);
  if (note) lines.push(`Context: ${note}`);

  return lines.join("\n");
}

function formatGeoAuditHtml(input: GeoAuditReportEmailInput): string {
  const textBody = formatGeoAuditPlainText(input);
  const preBlock = escapeHtml(textBody).replaceAll("\n", "<br />\n");

  const checkRows = GEO_CHECK_ORDER.map((key) => {
    const c = input.audit.checks[key];
    return `<tr><td>${escapeHtml(key)}</td><td>${c.passed ? "Pass" : "Needs work"}</td><td>${c.score}/${c.max}</td></tr>`;
  }).join("");

  return `
    <h1>GEO Readiness Auditor — full report</h1>
    <p><strong>URL:</strong> ${escapeHtml(input.targetUrl)}</p>
    <p><strong>Score:</strong> ${input.audit.score} / 100</p>
    <h2>Extracted</h2>
    <p><strong>Title:</strong> ${escapeHtml(input.audit.extractedData.title)}</p>
    <p><strong>Meta description:</strong> ${escapeHtml(input.audit.extractedData.metaDescription)}</p>
    <p><strong>H1:</strong> ${escapeHtml(input.audit.extractedData.h1)}</p>
    <p><strong>Top terms:</strong> ${escapeHtml(input.audit.extractedData.entities.join(", ") || "(none)")}</p>
    <h2>Checks</h2>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Signal</th><th>Status</th><th>Points</th></tr></thead>
      <tbody>${checkRows}</tbody>
    </table>
    <h2>Full detail (plain layout)</h2>
    <p style="font-family:monospace;font-size:13px;line-height:1.5">${preBlock}</p>
  `;
}

export async function sendGeoAuditReportEmail(input: GeoAuditReportEmailInput) {
  const resend = getResendClient();

  const subject = `GEO Readiness report — ${input.audit.score}/100 for ${input.targetUrl}`;

  return resend.emails.send({
    from: appEnv.resendFromEmail,
    to: [input.email],
    subject: subject.length > 180 ? `${subject.slice(0, 177)}…` : subject,
    text: formatGeoAuditPlainText(input),
    html: formatGeoAuditHtml(input),
  });
}

export async function sendToolResultEmail(input: ToolResultEmailInput) {
  const resend = getResendClient();

  const summary = input.resultSummary ?? "Your tool submission was received successfully.";
  const nextStep = input.ctaHref
    ? `Review your next recommended step here: ${input.ctaHref}`
    : "Jacob will use this result to inform the next step.";

  return resend.emails.send({
    from: appEnv.resendFromEmail,
    to: [input.email],
    subject: `${input.toolTitle} result`,
    text: [
      `Tool: ${input.toolTitle}`,
      `Result: ${input.resultLabel ?? "Completed"}`,
      "",
      summary,
      "",
      nextStep,
    ].join("\n"),
    html: `
      <h1>${escapeHtml(input.toolTitle)} result</h1>
      <p><strong>Result:</strong> ${escapeHtml(input.resultLabel ?? "Completed")}</p>
      <p>${escapeHtml(summary)}</p>
      <p>${escapeHtml(nextStep)}</p>
    `,
  });
}

export async function sendToolLeadNotification(input: ToolLeadNotificationInput) {
  const resend = getResendClient();
  const resultSummaryText = input.resultSummary ? JSON.stringify(input.resultSummary, null, 2) : "Not provided";
  const subject = `New tool lead: ${input.toolSlug}`;
  const text = [
    "New tool lead captured",
    "",
    `Lead ID: ${input.leadId}`,
    `Submitted at: ${input.submittedAt}`,
    `Tool slug: ${input.toolSlug}`,
    `Email: ${input.email}`,
    `Name: ${input.name ?? "Not provided"}`,
    `Company: ${input.company ?? "Not provided"}`,
    `Role: ${input.role ?? "Not provided"}`,
    `Source: ${input.source ?? "site"}`,
    `Page path: ${input.pagePath ?? "Not provided"}`,
    `Referrer: ${input.referrer ?? "Not provided"}`,
    `UTM source: ${input.utmSource ?? "Not provided"}`,
    `UTM medium: ${input.utmMedium ?? "Not provided"}`,
    `UTM campaign: ${input.utmCampaign ?? "Not provided"}`,
    "",
    "Result summary:",
    resultSummaryText,
  ].join("\n");

  const html = `
    <h1>New tool lead captured</h1>
    <p><strong>Lead ID:</strong> ${escapeHtml(input.leadId)}</p>
    <p><strong>Submitted at:</strong> ${escapeHtml(input.submittedAt)}</p>
    <p><strong>Tool slug:</strong> ${escapeHtml(input.toolSlug)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Name:</strong> ${escapeHtml(input.name ?? "Not provided")}</p>
    <p><strong>Company:</strong> ${escapeHtml(input.company ?? "Not provided")}</p>
    <p><strong>Role:</strong> ${escapeHtml(input.role ?? "Not provided")}</p>
    <p><strong>Source:</strong> ${escapeHtml(input.source ?? "site")}</p>
    <p><strong>Page path:</strong> ${escapeHtml(input.pagePath ?? "Not provided")}</p>
    <p><strong>Referrer:</strong> ${escapeHtml(input.referrer ?? "Not provided")}</p>
    <p><strong>UTM source:</strong> ${escapeHtml(input.utmSource ?? "Not provided")}</p>
    <p><strong>UTM medium:</strong> ${escapeHtml(input.utmMedium ?? "Not provided")}</p>
    <p><strong>UTM campaign:</strong> ${escapeHtml(input.utmCampaign ?? "Not provided")}</p>
    <p><strong>Result summary:</strong></p>
    <pre>${escapeHtml(resultSummaryText)}</pre>
  `;

  const { data, error } = await resend.emails.send(
    {
      from: appEnv.resendFromEmail,
      to: [appEnv.contactToEmail],
      replyTo: input.email,
      subject: subject.length > 180 ? `${subject.slice(0, 177)}...` : subject,
      text,
      html,
    },
    { idempotencyKey: `tool-lead/${input.leadId}` }
  );

  if (error) {
    throw new Error(error.message || "Resend send failed.");
  }

  return { id: data?.id ?? null };
}
