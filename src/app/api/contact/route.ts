import { NextResponse } from "next/server";

import { type ContactFormData } from "@/types/navbar";
import { ContactFormEmail } from "@/components/emails/ContactFormEmailResend";
import { sendAdminEmail, ResendErrorResponse, sendUserConfirmationEmail } from "@/services/email.service";
import { ConfirmationEmail } from "@/components/emails/ContactFormEmailConfirmation";

export async function POST(req: Request) {
  try {
    const formData: ContactFormData = await req.json();

    const userData = {
      name: formData[1],
      email: formData[2],
      phone: formData[3],
      mediaResponse: formData[4],
      interestedIn: formData[5],
      optionalComment: formData[6],
    }

    const adminHtml = ContactFormEmail(userData);

    const userHtml = ConfirmationEmail({ name: userData.name });

    const adminEmail = await sendAdminEmail({ html: adminHtml})

    if (adminEmail.error) {
      const resendError = adminEmail.error as ResendErrorResponse;
      // Return the specific error from Resend
      return NextResponse.json(
        {
          error: resendError.message,
          type: "resend_error",
          statusCode: resendError.statusCode,
        },
        {
          status: resendError.statusCode || 400,
        }
      );
    }

    const userEmail = await sendUserConfirmationEmail({ to: userData.email, html: userHtml });
    
    if (userEmail.error) {
      const resendError = userEmail.error as ResendErrorResponse;
      // Return the specific error from Resend
      return NextResponse.json(
        {
          error: resendError.message,
          type: "resend_error",
          statusCode: resendError.statusCode,
        },
        {
          status: resendError.statusCode || 400,
        }
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
      }
    );
  }
}
