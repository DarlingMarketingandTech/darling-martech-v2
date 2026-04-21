import { NextResponse } from "next/server";
import { appEnv, assertEnvPresent } from "@/lib/env";
import {
  CAL_PKCE_STATE_COOKIE,
  CAL_PKCE_VERIFIER_COOKIE,
  getCalOauthCookieOptions,
  getCalOauthRedirectUri,
} from "@/lib/cal-oauth";

export const runtime = "nodejs";

const CONTACT_SUCCESS_PATH = "/contact?oauth=cal-connected";
const CONTACT_ERROR_PATH = "/contact?oauth=cal-error";

export async function GET(request: Request) {
  const callbackUrl = new URL(request.url);
  const origin = callbackUrl.origin;
  const code = callbackUrl.searchParams.get("code");
  const state = callbackUrl.searchParams.get("state");
  const upstreamError = callbackUrl.searchParams.get("error");

  if (upstreamError) {
    return NextResponse.redirect(new URL(`${CONTACT_ERROR_PATH}&reason=provider`, origin));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL(`${CONTACT_ERROR_PATH}&reason=missing_code`, origin));
  }

  const requestCookies = request.headers.get("cookie") ?? "";
  const stateCookie = requestCookies
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CAL_PKCE_STATE_COOKIE}=`))
    ?.split("=")[1];
  const verifierCookie = requestCookies
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CAL_PKCE_VERIFIER_COOKIE}=`))
    ?.split("=")[1];

  if (!stateCookie || !verifierCookie || stateCookie !== state) {
    const response = NextResponse.redirect(new URL(`${CONTACT_ERROR_PATH}&reason=state_mismatch`, origin));
    response.cookies.delete(CAL_PKCE_STATE_COOKIE);
    response.cookies.delete(CAL_PKCE_VERIFIER_COOKIE);
    return response;
  }

  const redirectUri = getCalOauthRedirectUri();
  assertEnvPresent("Cal OAuth callback", {
    CAL_OAUTH_CLIENT_ID: appEnv.calOauthClientId,
    CAL_OAUTH_REDIRECT_URI: redirectUri,
  });

  const successResponse = NextResponse.redirect(new URL(CONTACT_SUCCESS_PATH, origin));
  const cookieOptions = getCalOauthCookieOptions();
  successResponse.cookies.set(CAL_PKCE_STATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  successResponse.cookies.set(CAL_PKCE_VERIFIER_COOKIE, "", { ...cookieOptions, maxAge: 0 });

  return successResponse;
}
