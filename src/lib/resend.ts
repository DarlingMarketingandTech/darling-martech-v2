import { Resend } from "resend";
import { appEnv, assertEnvPresent } from "@/lib/env";

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
    to: [appEnv.resendFromEmail],
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
