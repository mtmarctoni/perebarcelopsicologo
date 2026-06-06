import { NextResponse } from "next/server";
import { ConfirmationEmail } from "@/components/emails/ContactFormEmailConfirmation";
import { ContactFormEmail } from "@/components/emails/ContactFormEmailResend";
import {
  type ResendErrorResponse,
  sendAdminEmail,
  sendUserConfirmationEmail,
} from "@/services/email.service";
import type { ContactFormData } from "@/types/navbar";
import { emailSubjects } from "@/utils/email-translations";

export async function POST(req: Request) {
  try {
    const formData: ContactFormData = await req.json();

    const locale = (typeof formData.locale === "string" ? formData.locale : "es") as "es" | "ca";
    const subjects = emailSubjects(locale);

    const userData = {
      name: formData[1],
      email: formData[2],
      phone: formData[3],
      mediaResponse: formData[4],
      interestedIn: formData[5],
      optionalComment: formData[6],
    };

    const adminHtml = ContactFormEmail({ locale, ...userData });

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
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error : ${error}`,
        type: "server_error",
      },
      {
        status: 500,
      },
    );
  }
}
