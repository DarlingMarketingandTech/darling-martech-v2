import { NextResponse } from "next/server";
import { appEnv, assertEnvPresent } from "@/lib/env";
import {
  buildOauthRandomToken,
  buildPkceCodeChallenge,
  CAL_PKCE_STATE_COOKIE,
  CAL_PKCE_VERIFIER_COOKIE,
  getCalOauthCookieOptions,
  getCalOauthRedirectUri,
} from "@/lib/cal-oauth";

export const runtime = "nodejs";

export async function GET() {
  const redirectUri = getCalOauthRedirectUri();

  assertEnvPresent("Cal OAuth start", {
    CAL_OAUTH_CLIENT_ID: appEnv.calOauthClientId,
    CAL_OAUTH_REDIRECT_URI: redirectUri,
    CAL_OAUTH_AUTHORIZE_URL: appEnv.calOauthAuthorizeUrl,
  });

  const state = buildOauthRandomToken();
  const codeVerifier = buildOauthRandomToken(64);
  const codeChallenge = await buildPkceCodeChallenge(codeVerifier);

  const authorizeUrl = new URL(appEnv.calOauthAuthorizeUrl);
  authorizeUrl.searchParams.set("client_id", appEnv.calOauthClientId!);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri!);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("scope", appEnv.calOauthScope);

  const response = NextResponse.redirect(authorizeUrl);
  const cookieOptions = getCalOauthCookieOptions();
  response.cookies.set(CAL_PKCE_STATE_COOKIE, state, cookieOptions);
  response.cookies.set(CAL_PKCE_VERIFIER_COOKIE, codeVerifier, cookieOptions);

  return response;
}
