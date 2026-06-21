/**
 * Client-safe (public) environment variable validation.
 *
 * ✅ Safe to import in client components, pages, and server code.
 * These variables are prefixed with NEXT_PUBLIC_ and are inlined at build time.
 * No zod here -- we keep the client bundle lean.
 */

export interface ClientEnv {
  NEXT_PUBLIC_CALENDLY_URL?: string;
  NEXT_PUBLIC_GTM_ID?: string;
  NEXT_PUBLIC_COOKIEBOT_CBID?: string;
}

function validateEnv(): ClientEnv {
  return {
    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || undefined,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined,
    NEXT_PUBLIC_COOKIEBOT_CBID: process.env.NEXT_PUBLIC_COOKIEBOT_CBID?.trim() || undefined,
  };
}

export const clientEnv = validateEnv();
