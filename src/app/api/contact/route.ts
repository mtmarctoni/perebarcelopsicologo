import { NextResponse } from "next/server";
import { z } from "zod";
import { ConfirmationEmail } from "@/components/emails/ContactFormEmailConfirmation";
import { ContactFormEmail } from "@/components/emails/ContactFormEmailResend";
import {
  type ResendErrorResponse,
  sendAdminEmail,
  sendUserConfirmationEmail,
} from "@/services/email.service";
import { QuestionOptionInterestedIn, QuestionOptionMediaResponse } from "@/types/navbar";
import { emailSubjects, t } from "@/utils/email-translations";
import { isValidSpanishPhone } from "@/utils/validation";

const ALLOWED_ORIGINS = [
  "https://perebarcelopsicologo.com",
  "https://app.perebarcelopsicologo.com",
  /^https:\/\/perebarcelopsicologo-[-a-z0-9]*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
];

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const contactSchema = z.object({
  locale: z.enum(["es", "ca"]),
  "1": z.string().min(1).max(100),
  "2": z.email(),
  "3": z.string().min(6).max(20).refine(isValidSpanishPhone, {
    message: "Must be a valid Spanish phone number",
  }),
  // react-doctor-disable-next-line react-doctor/zod-v4-no-deprecated-schema-apis
  "4": z.nativeEnum(QuestionOptionMediaResponse),
  // react-doctor-disable-next-line react-doctor/zod-v4-no-deprecated-schema-apis
  "5": z.nativeEnum(QuestionOptionInterestedIn),
  "6": z.string().max(1000).default(""),
});

function getClientIp(req: Request): string {
  return (
    req.headers.get("true-client-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// Clean up expired rate limit entries every 5 minutes
const CLEANUP_INTERVAL_MS = 300_000;
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL_MS).unref();

function checkOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return ALLOWED_ORIGINS.some((allowed) =>
    typeof allowed === "string" ? origin === allowed : allowed.test(origin),
  );
}

function getErrorMessage(error: unknown, locale: string): string {
  if (error instanceof z.ZodError) {
    return t(locale, "Form.errorValidation");
  }
  return t(locale, "Form.errorServer");
}

function resendErrorResponse(error: ResendErrorResponse, locale: string) {
  const isInvalidEmail = error.statusCode === 422;
  return NextResponse.json(
    {
      error: isInvalidEmail ? t(locale, "Form.errorResendEmail") : t(locale, "Form.errorServer"),
      type: "resend_error",
      statusCode: error.statusCode,
    },
    { status: error.statusCode || 400 },
  );
}

async function sendAllEmails(
  userHtml: string,
  userSubject: string,
  userEmailTo: string,
  adminHtml: string,
  adminSubject: string,
): Promise<{
  userResult: Awaited<ReturnType<typeof sendUserConfirmationEmail>>;
  adminResult: Awaited<ReturnType<typeof sendAdminEmail>>;
}> {
  const [userPromise, adminPromise] = await Promise.allSettled([
    sendUserConfirmationEmail({ to: userEmailTo, html: userHtml, subject: userSubject }),
    sendAdminEmail({ html: adminHtml, subject: adminSubject }),
  ]);

  return {
    userResult:
      userPromise.status === "fulfilled"
        ? userPromise.value
        : {
            data: null,
            error: { message: userPromise.reason?.message ?? "Unknown error", name: "SendError" },
          },
    adminResult:
      adminPromise.status === "fulfilled"
        ? adminPromise.value
        : {
            data: null,
            error: { message: adminPromise.reason?.message ?? "Unknown error", name: "SendError" },
          },
  } as {
    userResult: Awaited<ReturnType<typeof sendUserConfirmationEmail>>;
    adminResult: Awaited<ReturnType<typeof sendAdminEmail>>;
  };
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) {
    return NextResponse.json(
      { error: t("es", "Form.errorForbidden"), type: "forbidden" },
      { status: 403 },
    );
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: t("es", "Form.errorRateLimit"), type: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: t("es", "Form.errorServer"), type: "server_error" },
      { status: 500 },
    );
  }

  try {
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const bodyObj = body as Record<string, unknown> | null;
      const locale = bodyObj?.locale === "ca" ? "ca" : "es";
      return NextResponse.json(
        {
          error: t(locale, "Form.errorValidation"),
          type: "validation_error",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const formData = parseResult.data;
    const locale = formData.locale;
    const subjects = emailSubjects(locale);

    const escapedName = escapeHtml(formData["1"]);
    const escapedEmail = escapeHtml(formData["2"]);

    const adminHtml = ContactFormEmail({
      locale,
      name: escapedName,
      email: escapedEmail,
      phone: escapeHtml(formData["3"]),
      mediaResponse: formData["4"],
      interestedIn: formData["5"],
      optionalComment: escapeHtml(formData["6"]),
    });

    const userHtml = ConfirmationEmail({ locale, name: escapedName });

    const { userResult, adminResult } = await sendAllEmails(
      userHtml,
      subjects.formConfirmation,
      formData["2"],
      adminHtml,
      subjects.contactForm,
    );

    const warnings: string[] = [];
    if (adminResult.error) warnings.push("admin_email_failed");
    if (userResult.error) warnings.push("user_email_failed");

    if (warnings.length === 2) {
      return resendErrorResponse(
        (adminResult.error ?? userResult.error) as ResendErrorResponse,
        locale,
      );
    }

    return NextResponse.json({
      data: {
        admin: adminResult.data ?? null,
        user: userResult.data ?? null,
      },
      success: true,
      ...(warnings.length > 0 ? { warnings } : {}),
    });
  } catch (error) {
    const bodyObj = body as Record<string, unknown> | null;
    const locale = bodyObj?.locale === "ca" ? "ca" : "es";
    return NextResponse.json(
      {
        error: getErrorMessage(error, locale),
        type: "server_error",
      },
      { status: 500 },
    );
  }
}
