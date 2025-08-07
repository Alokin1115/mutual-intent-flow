import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set - email functionality will be disabled");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@mutualbook.com';

  static async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('Email would be sent to:', params.to);
        console.log('Subject:', params.subject);
        return true; // Return true for development
      }

      await sgMail.send({
        to: params.to,
        from: params.from || this.FROM_EMAIL,
        subject: params.subject,
        html: params.html,
      });

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  static async sendVerificationEmail(email: string, token: string, type: 'organization' | 'waitlist'): Promise<boolean> {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    const verifyUrl = `${baseUrl}/api/verify-email?token=${token}&type=${type}`;
    
    const subject = type === 'organization' 
      ? 'Verify your MutualBook Organization Email'
      : 'Verify your MutualBook Waitlist Email';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #0a0a0a; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border-radius: 12px; padding: 40px; }
            .logo { text-align: center; margin-bottom: 30px; }
            .logo h1 { color: #ec4899; font-size: 32px; margin: 0; }
            .content { text-align: center; }
            .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #888; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>MutualBook</h1>
            </div>
            <div class="content">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for your interest in MutualBook! Please verify your email address to continue.</p>
              <a href="${verifyUrl}" class="button">Verify Email Address</a>
              <p>Or copy and paste this link into your browser:<br>
              <a href="${verifyUrl}" style="color: #ec4899; word-break: break-all;">${verifyUrl}</a></p>
            </div>
            <div class="footer">
              <p>This verification link will expire in 24 hours.</p>
              <p>© 2025 MutualBook. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}