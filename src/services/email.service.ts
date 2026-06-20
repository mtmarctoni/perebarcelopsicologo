import { Resend } from "resend";
import { emailConfig } from "@/config/email.config";
import { serverEnv } from "@/config/server-env.config";

const resend = new Resend(serverEnv.RESEND_API_KEY);

interface SendAdminEmailProps {
  html: string;
  subject?: string;
}

interface SendUserEmailProps {
  to: string;
  html: string;
  subject?: string;
}

export interface ResendErrorResponse {
  message: string;
  name: string;
  statusCode?: number;
}

export const sendAdminEmail = async ({ html, subject }: SendAdminEmailProps) => {
  return await resend.emails.send({
    from: emailConfig.fromEmail,
    to: emailConfig.adminEmail,
    subject: subject ?? emailConfig.subjects.contactForm,
    html,
  });
};

export const sendUserConfirmationEmail = async ({ to, html, subject }: SendUserEmailProps) => {
  return await resend.emails.send({
    from: emailConfig.fromEmail,
    to,
    subject: subject ?? emailConfig.subjects.formConfirmation,
    html,
  });
};

export const sendEmail = async ({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  return await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
};
