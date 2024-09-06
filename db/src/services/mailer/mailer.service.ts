import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', 
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com', 
        pass: 'your-password',
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: '"Your App" <your-email@example.com>', 
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
