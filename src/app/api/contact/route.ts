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

const contactSchema = z.object({
  locale: z.enum(["es", "ca"]),
  "1": z.string().min(1).max(100),
  "2": z.string().email(),
  "3": z.string().min(6).max(20),
  "4": z.string().min(1).max(100),
  "5": z.string().min(1).max(100),
  "6": z.string().max(1000).default(""),
});

export async function POST(req: Request) {
  try {
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
      name: formData["1"],
      email: formData["2"],
      phone: formData["3"],
      mediaResponse: formData["4"],
      interestedIn: formData["5"],
      optionalComment: formData["6"],
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

    const userHtml = ConfirmationEmail({ locale, name: userData.name });

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
