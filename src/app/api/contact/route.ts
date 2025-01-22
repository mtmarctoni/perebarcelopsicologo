// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

interface ResendErrorResponse {
      message: string;
      name: string;
      statusCode?: number;
  }

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    const { data, error } = await resend.emails.send({
      from: 'Pere Barceló <onboarding@resend.dev>',
      to: 'marctonimas@protonmail.com',
      subject: 'Nuevo formulario de contacto',
      html: `
        <h2>Nuevo contacto recibido:</h2>
        <p><strong>Nombre:</strong> ${formData['1']}</p>
        <p><strong>Email:</strong> ${formData['2']}</p>
        <p><strong>Deporte:</strong> ${formData['3']}</p>
      `
    });

      if (error) {
        const resendError = error as ResendErrorResponse;
        // Return the specific error from Resend
        return NextResponse.json({ 
          error: resendError.message,
          type: 'resend_error',
          statusCode: resendError.statusCode 
        }, { 
          status: resendError.statusCode || 400 
        });
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ 
        error: 'Internal Server Error',
        type: 'server_error' 
      }, { 
        status: 500 
      });
  }
}
