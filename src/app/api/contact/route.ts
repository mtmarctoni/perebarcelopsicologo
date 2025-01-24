import { NextResponse } from "next/server";

import { type ContactFormData } from "@/types/navbar";
import { ContactFormEmail } from "@/components/emails/ContactFormEmailResend";
import { sendEmail, ResendErrorResponse } from "@/services/email.service";

export async function POST(req: Request) {
  try {
    const formData: ContactFormData = await req.json();

    const html = ContactFormEmail({
      name: formData[1],
      email: formData[2],
      phone: formData[3],
      mediaResponse: formData[4],
      interestedIn: formData[5],
    });

    const { data, error } = await sendEmail({ html });

    if (error) {
      const resendError = error as ResendErrorResponse;
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
      data: data,
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
