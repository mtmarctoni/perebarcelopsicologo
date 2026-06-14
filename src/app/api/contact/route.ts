import { NextResponse } from "next/server";
import { z } from "zod";
import { ConfirmationEmail } from "@/components/emails/ContactFormEmailConfirmation";
import { ContactFormEmail } from "@/components/emails/ContactFormEmailResend";
import {
  type ResendErrorResponse,
  sendAdminEmail,
  sendUserConfirmationEmail,
} from "@/services/email.service";
import type { QuestionOptionInterestedIn, QuestionOptionMediaResponse } from "@/types/navbar";
import { emailSubjects, t } from "@/utils/email-translations";

const ALLOWED_ORIGINS = [
  "https://perebarcelopsicologo.com",
  "https://app.perebarcelopsicologo.com",
  /^https:\/\/.*\.vercel\.app$/,
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
  "2": z.string().email(),
  "3": z.string().min(6).max(20),
  "4": z.string().min(1).max(100),
  "5": z.string().min(1).max(100),
  "6": z.string().max(1000).default(""),
});

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
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

function checkOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return ALLOWED_ORIGINS.some((allowed) =>
    typeof allowed === "string" ? origin === allowed : allowed.test(origin),
  );
}

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) {
      return NextResponse.json({ error: "Forbidden", type: "forbidden" }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: t("es", "Form.errorRateLimit"), type: "rate_limited" },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: t(body.locale ?? "es", "Form.errorValidation"),
          type: "validation_error",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const formData = parseResult.data;
    const locale = formData.locale;
    const subjects = emailSubjects(locale);

    const userData = {
      name: escapeHtml(formData["1"]),
      email: escapeHtml(formData["2"]),
      phone: escapeHtml(formData["3"]),
      mediaResponse: escapeHtml(formData["4"]),
      interestedIn: escapeHtml(formData["5"]),
      optionalComment: escapeHtml(formData["6"]),
    };

    const adminHtml = ContactFormEmail({
      locale,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      mediaResponse: userData.mediaResponse as QuestionOptionMediaResponse,
      interestedIn: userData.interestedIn as QuestionOptionInterestedIn,
      optionalComment: userData.optionalComment,
    });

    const translatableName = formData["1"];
    const userHtml = ConfirmationEmail({ locale, name: translatableName });

    const adminEmail = await sendAdminEmail({ html: adminHtml, subject: subjects.contactForm });

    if (adminEmail.error) {
      const resendError = adminEmail.error as ResendErrorResponse;
      return NextResponse.json(
        {
          error: resendError.message,
          type: "resend_error",
          statusCode: resendError.statusCode,
        },
        {
          status: resendError.statusCode || 400,
        },
      );
    }

    const userEmail = await sendUserConfirmationEmail({
      to: userData.email,
      html: userHtml,
      subject: subjects.formConfirmation,
    });

    if (userEmail.error) {
      const resendError = userEmail.error as ResendErrorResponse;
      return NextResponse.json(
        {
          error: resendError.message,
          type: "resend_error",
          statusCode: resendError.statusCode,
        },
        {
          status: resendError.statusCode || 400,
        },
      );
    }

    return NextResponse.json({
      data: {
        admin: adminEmail.data,
        user: userEmail.data,
      },
      success: true,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        error: t("es", "Form.errorServer"),
        type: "server_error",
      },
      {
        status: 500,
      },
    );
  }
}
