import { appEnv } from "@/lib/env";

export const CAL_PKCE_STATE_COOKIE = "cal_oauth_state";
export const CAL_PKCE_VERIFIER_COOKIE = "cal_oauth_verifier";

const PKCE_COOKIE_MAX_AGE_SECONDS = 60 * 10;

function toBase64Url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function buildOauthRandomToken(byteLength = 32) {
  return toBase64Url(Buffer.from(crypto.getRandomValues(new Uint8Array(byteLength))));
}

export async function buildPkceCodeChallenge(verifier: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return toBase64Url(Buffer.from(digest));
}

export function getCalOauthRedirectUri() {
  const isProduction = appEnv.vercelEnv === "production" || appEnv.nodeEnv === "production";
  return isProduction ? appEnv.calOauthRedirectUriProd ?? appEnv.calOauthRedirectUri : appEnv.calOauthRedirectUri;
}

export function getCalOauthCookieOptions() {
  const secure = appEnv.nodeEnv === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: PKCE_COOKIE_MAX_AGE_SECONDS,
  };
}
