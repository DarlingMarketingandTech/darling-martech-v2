import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { validatePublicHttpUrl } from "@/lib/geo-audit-url";
import type { GeoAuditCheckKey, GeoAuditHeadingItem, GeoAuditRawXray, GeoAuditResponse } from "@/types";

export const runtime = "nodejs";

const STOP_WORDS = new Set([
  "the",
  "and",
  "to",
  "of",
  "a",
  "in",
  "for",
  "is",
  "on",
  "that",
  "by",
  "this",
  "with",
  "i",
  "you",
  "it",
  "not",
  "or",
  "be",
  "are",
  "from",
  "at",
  "as",
  "your",
  "have",
  "all",
  "can",
  "if",
  "our",
  "more",
  "about",
  "contact",
  "home",
  "page",
  "was",
  "but",
  "what",
  "will",
  "one",
  "there",
  "their",
  "has",
  "had",
  "an",
  "may",
  "out",
  "who",
  "its",
  "also",
  "into",
  "than",
  "then",
  "them",
  "these",
  "some",
  "her",
  "she",
  "been",
  "other",
  "when",
  "where",
  "which",
  "while",
  "how",
  "get",
  "like",
  "just",
  "over",
  "such",
]);

const FETCH_TIMEOUT_MS = 18_000;

function extractTypesFromJsonLd(value: unknown, into: Set<string>): void {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      extractTypesFromJsonLd(item, into);
    }
    return;
  }

  if (typeof value !== "object") {
    return;
  }

  const obj = value as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") {
    into.add(t);
  } else if (Array.isArray(t)) {
    for (const entry of t) {
      if (typeof entry === "string") {
        into.add(entry);
      }
    }
  }

  if ("@graph" in obj) {
    extractTypesFromJsonLd(obj["@graph"], into);
  }
}

function buildRawXray(
  $: ReturnType<typeof cheerio.load>,
  pageUrl: URL,
  visibleTextSampleLength: number
): GeoAuditRawXray {
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  const metaRobots = $('meta[name="robots"]').attr("content")?.trim() || null;
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() || null;
  const ogDescription = $('meta[property="og:description"]').attr("content")?.trim() || null;
  const twitterCard = $('meta[name="twitter:card"]').attr("content")?.trim() || null;

  const jsonLdTypes = new Set<string>();
  let jsonLdSnippet: string | null = null;

  $("script[type=\"application/ld+json\"]").each((_, el) => {
    const raw = $(el).html()?.trim() ?? "";
    if (!raw) {
      return;
    }

    if (!jsonLdSnippet) {
      jsonLdSnippet = raw.length > 450 ? `${raw.slice(0, 450)}…` : raw;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      extractTypesFromJsonLd(parsed, jsonLdTypes);
    } catch {
      // ignore invalid JSON-LD blocks
    }
  });

  const jsonLdBlockCount = $("script[type=\"application/ld+json\"]").length;

  const headingOutline: GeoAuditHeadingItem[] = [];
  $("h1, h2, h3").each((_, el) => {
    if (headingOutline.length >= 18) {
      return false;
    }

    const tag = el.tagName.toLowerCase();
    const level = tag === "h1" ? 1 : tag === "h2" ? 2 : 3;
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text) {
      headingOutline.push({ level: level as 1 | 2 | 3, text: text.length > 120 ? `${text.slice(0, 120)}…` : text });
    }
    return undefined;
  });

  const host = pageUrl.hostname.toLowerCase();
  let internalLinkCount = 0;
  let externalLinkCount = 0;

  $("a[href]").each((_, el) => {
    const href = ($(el).attr("href") ?? "").trim();
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:")) {
      return;
    }

    let linkHost: string;
    try {
      const abs = new URL(href, pageUrl);
      linkHost = abs.hostname.toLowerCase();
    } catch {
      return;
    }

    if (linkHost === host || linkHost === "") {
      internalLinkCount += 1;
    } else {
      externalLinkCount += 1;
    }
  });

  const h1Count = $("h1").length;
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;

  return {
    canonical,
    metaRobots,
    ogTitle,
    ogDescription,
    twitterCard,
    jsonLdBlockCount,
    jsonLdTypes: [...jsonLdTypes].slice(0, 12),
    jsonLdSnippet,
    headingOutline,
    stats: {
      h1Count,
      h2Count,
      h3Count,
      internalLinkCount,
      externalLinkCount,
      visibleTextChars: visibleTextSampleLength,
    },
  };
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    const urlRaw =
      typeof body === "object" && body !== null && "url" in body && typeof (body as { url: unknown }).url === "string"
        ? (body as { url: string }).url
        : "";

    const validated = validatePublicHttpUrl(urlRaw);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const targetUrl = validated.url;

    const response = await fetch(targetUrl.toString(), {
      headers: { "User-Agent": "DarlingMarTech-GEO-Auditor/1.0" },
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not fetch that URL. It must be publicly reachable over HTTP." },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (
      contentType &&
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml+xml")
    ) {
      return NextResponse.json(
        { error: "That URL did not return HTML. Point the audit at a normal web page." },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const metaRobots = $('meta[name="robots"]').attr("content")?.toLowerCase() ?? "";
    const isBlocked = metaRobots.includes("noindex");
    const crawlScore = isBlocked ? 0 : 20;

    const hasSchema = $("script[type=\"application/ld+json\"]").length > 0;
    const schemaScore = hasSchema ? 20 : 0;

    const title = $("title").first().text().trim();
    const description = $('meta[name="description"]').attr("content")?.trim() ?? "";
    let metaScore = 0;
    if (title && title.length > 10) metaScore += 10;
    if (description && description.length > 50) metaScore += 10;

    const h1Text = $("h1").first().text().trim();
    const hasH1 = $("h1").length === 1;
    const hasH2 = $("h2").length > 0;
    const structureScore = (hasH1 ? 10 : 0) + (hasH2 ? 10 : 0);

    const questionWords = ["how", "what", "why", "where", "who", "?"];
    let faqScore = 0;
    $("h2, h3").each((_, el) => {
      const headingText = $(el).text().toLowerCase();
      if (questionWords.some((q) => headingText.includes(q))) {
        faqScore = 15;
        return false;
      }
      return undefined;
    });

    const pageHost = targetUrl.hostname.toLowerCase();
    let externalLinks = 0;
    $('a[href^="http"]').each((_, el) => {
      const href = $(el).attr("href") ?? "";
      try {
        const u = new URL(href);
        if (u.hostname.toLowerCase() !== pageHost) {
          externalLinks += 1;
        }
      } catch {
        // ignore
      }
    });
    const authorityScore = externalLinks > 0 ? 15 : 0;

    const totalScore = crawlScore + schemaScore + metaScore + structureScore + faqScore + authorityScore;

    const $clone = cheerio.load(html);
    $clone("script, style, noscript").remove();
    const rawText = $clone("body").text().toLowerCase();
    const words = rawText.match(/\b[a-z]{3,15}\b/g) ?? [];
    const wordCounts: Record<string, number> = {};

    for (const word of words) {
      if (!STOP_WORDS.has(word)) {
        wordCounts[word] = (wordCounts[word] ?? 0) + 1;
      }
    }

    const topEntities = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([w]) => w);

    const visibleTextChars = rawText.replace(/\s+/g, " ").trim().length;

    const rawXray = buildRawXray($, targetUrl, visibleTextChars);

    const checks: Record<GeoAuditCheckKey, { passed: boolean; score: number; max: number }> = {
      crawler: { passed: !isBlocked, score: crawlScore, max: 20 },
      schema: { passed: hasSchema, score: schemaScore, max: 20 },
      metadata: { passed: metaScore === 20, score: metaScore, max: 20 },
      structure: { passed: structureScore === 20, score: structureScore, max: 20 },
      faq: { passed: faqScore > 0, score: faqScore, max: 15 },
      authority: { passed: authorityScore > 0, score: authorityScore, max: 15 },
    };

    const payload: GeoAuditResponse = {
      score: totalScore,
      extractedData: {
        title: title || "Missing title",
        metaDescription: description || "Missing meta description",
        h1: h1Text || "Missing H1",
        entities: topEntities,
      },
      checks,
      rawXray,
    };

    return NextResponse.json(payload);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error processing URL.";
    const isAbort = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json(
      { error: isAbort ? "The request timed out. Try a faster-loading public page." : message },
      { status: 500 }
    );
  }
}
