import { Resend } from 'resend';

import { envConfig } from '@/config/env.config';
import { emailConfig } from '@/config/email.config';

const resend = new Resend(envConfig.email.resendApiKey);
//const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
    from: string;
    to: string;
    subject: string;
    html: string;
}

interface SendAdminEmailProps {
    html: string
}

interface SendUserEmailProps {
    to: string;
    html: string
}

export interface ResendErrorResponse {
  message: string;
  name: string;
  statusCode?: number;
}

export const sendAdminEmail = async ({ html }: SendAdminEmailProps) => {
  return await resend.emails.send({
    from: emailConfig.fromEmail,
    to: emailConfig.adminEmail,
    subject: emailConfig.subjects.contactForm,
    html,
  });
};

export const sendUserConfirmationEmail = async ({ to, html }: SendUserEmailProps) => {
    return await resend.emails.send({
      from: emailConfig.fromEmail,
      to,
      subject: emailConfig.subjects.formConfirmation,
      html,
    });
};
  
export const sendEmail = async ({ from, to, subject, html }: SendEmailProps) => {
    return await resend.emails.send({
        from,
        to,
        subject,
        html,
    });
};
    