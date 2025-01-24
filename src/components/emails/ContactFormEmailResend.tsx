import { type Name, type Email, type Phone ,QuestionOptionMediaResponse, QuestionOptionInterestedIn } from "@/types/navbar";

interface Props {
    name: Name;
    email: Email;
    phone: Phone;
    mediaResponse: QuestionOptionMediaResponse;
    interestedIn: QuestionOptionInterestedIn;
  }
  
  export const ContactFormEmail = ({ name, email, phone, mediaResponse, interestedIn }: Props) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #1C4761; padding: 30px; border-radius: 8px 8px 0 0;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-align: center;">Nuevo Contacto Recibido</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 16px;">
                              <strong style="color: #1C4761;">Nombre:</strong> 
                              <span style="margin-left: 8px;">${name}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 16px;">
                              <strong style="color: #1C4761;">Email:</strong>
                              <span style="margin-left: 8px;">${email}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 16px;">
                              <strong style="color: #1C4761;">Teléfono:</strong>
                              <span style="margin-left: 8px;">${phone}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 16px;">
                              <strong style="color: #1C4761;">Interesado en:</strong>
                              <span style="margin-left: 8px;">${interestedIn}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; color: #64748b; font-size: 16px;">
                              <strong style="color: #1C4761;">Medio de respuesta:</strong>
                              <span style="margin-left: 8px;">${mediaResponse}</span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #64748b; font-size: 14px;">
                        © ${new Date().getFullYear()} Pere Barceló | Psicólogo Deportivo
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  };
  
  