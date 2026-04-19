const MAX_URL_LENGTH = 2048;

function isPrivateOrReservedIpv4(hostname: string): boolean {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(hostname);
  if (!m) {
    return false;
  }

  const octets = [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
  if (octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }

  const [a, b] = octets;

  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 192 && b === 0 && octets[2] === 0) return true;
  if (a === 192 && b === 0 && octets[2] === 2) return true;
  if (a === 198 && b === 18) return true;
  if (a === 198 && b === 51) return true;
  if (a === 203 && b === 0 && octets[2] === 113) return true;

  return false;
}

function isBlockedHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase();

  if (lower === "localhost" || lower.endsWith(".localhost")) {
    return true;
  }

  if (lower === "0.0.0.0" || lower === "[::]" || lower === "::1") {
    return true;
  }

  if (isPrivateOrReservedIpv4(lower)) {
    return true;
  }

  if (lower.includes(":")) {
    return true;
  }

  return false;
}

export type ValidatePublicUrlResult =
  | { ok: true; url: URL }
  | { ok: false; error: string };

export function validatePublicHttpUrl(raw: string): ValidatePublicUrlResult {
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return { ok: false, error: "URL is required." };
  }

  if (trimmed.length > MAX_URL_LENGTH) {
    return { ok: false, error: "URL is too long." };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { ok: false, error: "Valid URL with http or https is required." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Only http and https URLs are allowed." };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: "URLs with credentials are not allowed." };
  }

  const host = parsed.hostname;
  if (!host || isBlockedHostname(host)) {
    return { ok: false, error: "That host is not allowed for this audit." };
  }

  return { ok: true, url: parsed };
}
